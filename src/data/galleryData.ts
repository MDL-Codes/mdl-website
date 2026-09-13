import gallery1 from '../assets/gallery1.webp'
import gallery2 from '../assets/gallery2.webp'
import gallery3 from '../assets/gallery3.webp'
import gallery4 from '../assets/gallery4.webp'
import gallery5 from '../assets/gallery5.webp'
import gallery6 from '../assets/gallery6.webp'
import gallery7 from '../assets/gallery7.webp'
import welcomeWeek202501 from '../assets/gallery/welcome-week-2025-01.webp'
import welcomeWeek202502 from '../assets/gallery/welcome-week-2025-02.webp'
import welcomeWeek202503 from '../assets/gallery/welcome-week-2025-03.webp'
import welcomeWeek202504 from '../assets/gallery/welcome-week-2025-04.webp'
import welcomeWeek202505 from '../assets/gallery/welcome-week-2025-05.webp'
import welcomeWeek202506 from '../assets/gallery/welcome-week-2025-06.webp'
import welcomeWeek202507 from '../assets/gallery/welcome-week-2025-07.webp'
import welcomeWeek202508 from '../assets/gallery/welcome-week-2025-08.webp'
import welcomeWeek202509 from '../assets/gallery/welcome-week-2025-09.webp'
import workshop202501 from '../assets/gallery/workshop-2025-01.webp'
import workshop202502 from '../assets/gallery/workshop-2025-02.webp'
import workshop202401 from '../assets/gallery/workshop-2024-01.webp'
import workshop202402 from '../assets/gallery/workshop-2024-02.webp'
import workshop202403 from '../assets/gallery/workshop-2024-03.webp'
import workshop202404 from '../assets/gallery/workshop-2024-04.webp'
import workshop202405 from '../assets/gallery/workshop-2024-05.webp'
import workshop202406 from '../assets/gallery/workshop-2024-06.webp'
import miniEvent202401 from '../assets/gallery/mini-event-2024-01.webp'
import miniEvent202402 from '../assets/gallery/mini-event-2024-02.webp'
import miniEvent202403 from '../assets/gallery/mini-event-2024-03.webp'
import miniEvent202404 from '../assets/gallery/mini-event-2024-04.webp'
import miniEvent202405 from '../assets/gallery/mini-event-2024-05.webp'
import miniEvent202406 from '../assets/gallery/mini-event-2024-06.webp'
import miniEvent202407 from '../assets/gallery/mini-event-2024-07.webp'

export type GalleryGroup = {
  /** Doubles as the alt text for every photo in the group. */
  event: string
  photos: string[]
}

/**
 * Gallery photos, newest event first.
 *
 * Grouped by event rather than kept as one flat list, so each photo can carry
 * alt text that says what it is — the page used to render alt="" on all seven,
 * which tells a screen reader there is nothing here. The page flattens it.
 *
 * The last group is the seven photos that were already on the page. Nobody
 * recorded which event they came from, so they keep a general label until
 * somebody does.
 */
export const galleryGroups: GalleryGroup[] = [
  {
    event: 'Welcome Week 2025',
    photos: [welcomeWeek202501, welcomeWeek202502, welcomeWeek202503, welcomeWeek202504, welcomeWeek202505, welcomeWeek202506, welcomeWeek202507, welcomeWeek202508, welcomeWeek202509],
  },
  {
    event: 'CAD workshop, 2025',
    photos: [workshop202501, workshop202502],
  },
  {
    event: 'CAD workshop, 2024',
    photos: [workshop202401, workshop202402, workshop202403, workshop202404, workshop202405, workshop202406],
  },
  {
    event: 'Mini event, 2024',
    photos: [miniEvent202401, miniEvent202402, miniEvent202403, miniEvent202404, miniEvent202405, miniEvent202406, miniEvent202407],
  },
  {
    event: 'MDL events',
    photos: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7],
  },
]

/** Flat, in group order — what the grid renders. */
export const galleryPhotos = galleryGroups.flatMap(group =>
  group.photos.map(src => ({ src, alt: group.event }))
)
