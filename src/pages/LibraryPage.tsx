import BonusTrack from '../sections/BonusTrack/BonusTrack';

/**
 * /libreria/ (ADR-003, 2026-11-12): the bonus track as a page of its own,
 * listed in the menu and the footer, never in the header: the upcoming
 * component library, its one action and the talk it grew from. The back
 * cover closes it (PageShell).
 */
export function LibraryPage() {
  return <BonusTrack />;
}

export default LibraryPage;
