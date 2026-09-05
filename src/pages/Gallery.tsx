import gallery1 from '../assets/gallery1.webp'
import gallery2 from '../assets/gallery2.webp'
import gallery3 from '../assets/gallery3.webp'
import gallery4 from '../assets/gallery4.webp'
import gallery5 from '../assets/gallery5.webp'
import gallery6 from '../assets/gallery6.webp'
import gallery7 from '../assets/gallery7.webp'
import PageShell from '../components/PageShell'

const PHOTOS = [
  { id: 0, src: gallery1 },
  { id: 1, src: gallery2 },
  { id: 2, src: gallery3 },
  { id: 3, src: gallery4 },
  { id: 4, src: gallery5 },
  { id: 5, src: gallery6 },
  { id: 6, src: gallery7 },
]

export default function Gallery() {
  return (
    <PageShell title="Gallery" intro="Moments from workshops, designathons, and everything in between.">
      <div className="grid grid-cols-1 gap-[clamp(16px,2vw,28px)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3">
        {PHOTOS.map(photo => (
          <img
            key={photo.id}
            src={photo.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full border border-navy-600 object-cover"
          />
        ))}
      </div>
    </PageShell>
  )
}
