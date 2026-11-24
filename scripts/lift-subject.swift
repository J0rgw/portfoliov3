// Lifts the subject of a photo with Apple's Vision (the model behind iOS "lift subject",
// which Jorge used for his own cut-outs), at the photo's full resolution: an RGBA PNG.
// macOS 14 or later. Used by scripts/prepare-about-art.py (ADR-004); not part of the build.
//
//     swift scripts/lift-subject.swift <in> <out.png> [all | x,y]
//
// `all` keeps every subject Vision finds; `x,y` (0..1 from the top left of its mask) keeps
// only the one under that point (Godzilla's head, not the cinema sign under it).
import CoreImage
import Foundation
import ImageIO
import UniformTypeIdentifiers
import Vision

let args = CommandLine.arguments
guard args.count >= 3 else {
  print("usage: lift-subject <in> <out.png> [all|x,y]")
  exit(1)
}
let input = URL(fileURLWithPath: args[1])
let output = URL(fileURLWithPath: args[2])
let pick = args.count > 3 ? args[3] : "all"

guard let source = CGImageSourceCreateWithURL(input as CFURL, nil),
  let image = CGImageSourceCreateImageAtIndex(source, 0, nil)
else {
  print("cannot read \(input.path)")
  exit(1)
}
let properties = CGImageSourceCopyPropertiesAtIndex(source, 0, nil) as? [CFString: Any]
let orientation = CGImagePropertyOrientation(rawValue: (properties?[kCGImagePropertyOrientation] as? UInt32) ?? 1) ?? .up

let handler = VNImageRequestHandler(cgImage: image, orientation: orientation, options: [:])
let request = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([request])
guard let result = request.results?.first else {
  print("no subject in \(input.path)")
  exit(2)
}

var instances = result.allInstances
if pick != "all" {
  let point = pick.split(separator: ",").compactMap { Double($0) }
  let labels = result.instanceMask
  CVPixelBufferLockBaseAddress(labels, .readOnly)
  let width = CVPixelBufferGetWidth(labels), height = CVPixelBufferGetHeight(labels)
  let row = CVPixelBufferGetBytesPerRow(labels)
  let base = CVPixelBufferGetBaseAddress(labels)!.assumingMemoryBound(to: UInt8.self)
  let label = Int(base[Int(point[1] * Double(height)) * row + Int(point[0] * Double(width))])
  CVPixelBufferUnlockBaseAddress(labels, .readOnly)
  guard label > 0 else {
    print("no subject under \(pick)")
    exit(3)
  }
  instances = IndexSet(integer: label)
}

let masked = try result.generateMaskedImage(ofInstances: instances, from: handler, croppedToInstancesExtent: false)
let lifted = CIImage(cvPixelBuffer: masked)
guard let rendered = CIContext().createCGImage(lifted, from: lifted.extent, format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)),
  let destination = CGImageDestinationCreateWithURL(output as CFURL, UTType.png.identifier as CFString, 1, nil)
else { exit(4) }
// Nothing of the photo's metadata (place, time, camera) is written.
CGImageDestinationAddImage(destination, rendered, nil)
CGImageDestinationFinalize(destination)
print("  \(output.lastPathComponent)  \(rendered.width)×\(rendered.height)")
