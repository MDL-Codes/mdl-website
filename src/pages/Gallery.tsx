import { galleryPhotos } from '../data/galleryData'
import PageShell from '../components/PageShell'

export default function Gallery() {
  return (
    <PageShell
      eyebrow="photo archive"
      title="Gallery"
      intro="Moments from workshops, designathons, and everything in between."
      meta={`${galleryPhotos.length} photos`}
    >
      <div className="grid grid-cols-1 gap-[clamp(16px,2vw,28px)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3">
        {galleryPhotos.map(photo => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full border border-navy-600 object-cover"
          />
        ))}
      </div>
    </PageShell>
  )
}
