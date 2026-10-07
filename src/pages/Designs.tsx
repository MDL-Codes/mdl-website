import { Suspense, lazy } from 'react'
import PageShell from '../components/PageShell'
import tagModel from '../assets/models/mdl-ww-tag.stl?url'

/**
 * A test bed for putting real CAD on the site.
 *
 * The viewer is lazy, and that is the whole reason this page can exist. three.js
 * is ~150KB gzipped against a site that ships 75KB total, so importing it
 * anywhere in the shell would more than triple what every visitor downloads to
 * read the events page. Split out here it is fetched only by someone who has
 * actually opened this route.
 */
const ModelViewer = lazy(() => import('../components/ModelViewer'))

export default function Designs() {
  return (
    <PageShell
      eyebrow="work in progress"
      title="CAD, in the browser"
      intro="A test: a real part from the club, rendered live rather than as a screenshot. Drag to rotate it, scroll to zoom, right-drag to pan."
    >
      <div className="max-w-[720px]">
        <Suspense
          fallback={
            <div className="flex aspect-[4/3] w-full items-center justify-center border border-navy-600 bg-navy-950 font-plex text-[11px] uppercase tracking-[1.54px] text-navy-400">
              loading viewer…
            </div>
          }
        >
          <ModelViewer url={tagModel} label="MDL WW Tag" />
        </Suspense>

        <p className="mt-[16px] font-plex text-[12px] leading-[1.75] text-navy-400">
          MDL WW Tag — 1,846 triangles, 92KB, served as raw STL.
        </p>
      </div>
    </PageShell>
  )
}
