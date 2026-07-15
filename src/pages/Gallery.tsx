import gallery1 from '../assets/gallery1.png'
import gallery2 from '../assets/gallery2.png'
import gallery3 from '../assets/gallery3.png'
import gallery4 from '../assets/gallery4.png'
import gallery5 from '../assets/gallery5.png'
import gallery6 from '../assets/gallery6.png'
import gallery7 from '../assets/gallery7.png'

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
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {PHOTOS.map((photo) => (
          <img
            key={photo.id}
            src={photo.src}
            alt=""
            loading="lazy"
            className="w-full aspect-[4/3] object-cover rounded-lg border border-border/60"
          />
        ))}
      </div>
    </section>
  )
}
