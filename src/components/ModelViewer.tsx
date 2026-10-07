import { Suspense, useMemo } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

/**
 * An STL on a turntable: drag to orbit, scroll to zoom, right-drag to pan.
 *
 * Loaded as raw STL rather than converted to a compressed GLB. That is a
 * deliberate exception for a part this small — the tag is 1,846 triangles and
 * 92KB, where Draco's win would be a few tens of KB against a build step and a
 * decoder download. A real assembly is a different conversation: past a few
 * hundred KB, convert to GLB with `gltf-transform` and load it with useGLTF.
 *
 * STL carries geometry and nothing else — no colour, no material, not even
 * vertex normals worth trusting — so the look is entirely ours: navy ground,
 * paper-white part, redline rim light.
 */

const PAPER = '#F6F4EE'
const REDLINE = '#C0392B'
const NAVY_950 = '#1B2138'
const NAVY_600 = '#465184'

/**
 * Half-height of the box the part is normalised into. The camera, the grid and
 * the zoom limits are all expressed against this one number, so a model's own
 * units — millimetres, inches, whatever the exporter felt like — never reach
 * the scene. A 200mm bracket and a 20mm tag both arrive this size.
 */
const FIT = 50

function Part({ url }: { url: string }) {
  const geometry = useLoader(STLLoader, url)

  const { prepared, scale } = useMemo(() => {
    const g = geometry.clone()
    // STL is a triangle soup with per-facet normals at best. Recomputing gives
    // three.js something consistent to light, and centring puts the part's own
    // middle at the origin so the orbit turns around the model rather than
    // swinging it around a point off in space.
    g.computeVertexNormals()
    g.center()
    g.computeBoundingSphere()

    const radius = g.boundingSphere?.radius ?? FIT
    return { prepared: g, scale: FIT / radius }
  }, [geometry])

  return (
    <mesh geometry={prepared} scale={scale}>
      <meshStandardMaterial color={PAPER} roughness={0.45} metalness={0.05} />
    </mesh>
  )
}

export default function ModelViewer({ url, label }: { url: string; label: string }) {
  return (
    <div className="relative aspect-[4/3] w-full border border-navy-600 bg-navy-950">
      {/* Default frameloop, deliberately. `demand` renders only when something
          asks it to, which is the right setting for an idle 3D canvas — but the
          model arrives through Suspense AFTER that first and only paint, so the
          viewer sat empty until you happened to drag it. Worth revisiting with
          an explicit invalidate() on load if this ever ships somewhere busy. */}
      <Canvas dpr={[1, 2]} camera={{ position: [FIT * 1.6, FIT * 1.2, FIT * 2], fov: 40 }}>
        <color attach="background" args={[NAVY_950]} />

        {/* Three lights, not an environment map: an HDR is a few hundred KB for
            a part that is one flat colour. Key, fill, and a redline rim to pull
            the silhouette off the dark ground. */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[FIT, FIT * 2, FIT]} intensity={1.6} />
        <directionalLight position={[-FIT * 1.5, FIT * 0.4, -FIT]} intensity={0.6} color={REDLINE} />

        <Suspense fallback={null}>
          <Part url={url} />
        </Suspense>

        {/* The blueprint grid, in the site's own inks, so the part sits ON a
            sheet rather than floating in a void. */}
        <gridHelper args={[FIT * 8, 32, REDLINE, NAVY_600]} position={[0, -FIT * 1.1, 0]} />

        <OrbitControls
          makeDefault
          enablePan
          enableDamping
          dampingFactor={0.08}
          minDistance={FIT * 1.2}
          maxDistance={FIT * 8}
        />
      </Canvas>

      {/* The canvas is opaque to a screen reader and to anyone who cannot use a
          drag gesture, so the part is named in text beside it. */}
      <p className="pointer-events-none absolute bottom-0 left-0 p-[12px] font-plex text-[10px] uppercase leading-none tracking-[1.54px] text-navy-400">
        {label} — drag to rotate
      </p>
    </div>
  )
}
