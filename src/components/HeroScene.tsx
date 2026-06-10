import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Group } from 'three'

const PALETTE = {
  pink: '#ff5da2',
  pinkDeep: '#e63e87',
  lemon: '#ffe14d',
  lemonDeep: '#ffc907',
  cream: '#fff7e0',
  sky: '#5ccfff',
  mint: '#7fe8c3',
  tang: '#ff8c42',
}

/** Low-poly kawaii lemon: squashed sphere + two nub spheres. */
function Lemon({
  position,
  scale = 1,
  phase = 0,
  spin = 0.3,
}: {
  position: [number, number, number]
  scale?: number
  phase?: number
  spin?: number
}) {
  const ref = useRef<Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + phase) * 0.28
    ref.current.rotation.z = Math.sin(t * 0.5 + phase) * 0.25
    ref.current.rotation.y += spin * 0.004
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh scale={[1, 0.72, 0.72]}>
        <sphereGeometry args={[0.85, 24, 18]} />
        <meshStandardMaterial color={PALETTE.lemon} roughness={0.55} />
      </mesh>
      <mesh position={[0.88, 0, 0]}>
        <sphereGeometry args={[0.17, 12, 10]} />
        <meshStandardMaterial color={PALETTE.lemonDeep} roughness={0.55} />
      </mesh>
      <mesh position={[-0.88, 0, 0]}>
        <sphereGeometry args={[0.17, 12, 10]} />
        <meshStandardMaterial color={PALETTE.lemonDeep} roughness={0.55} />
      </mesh>
    </group>
  )
}

/** The hero lemonade cup — procedural geometry, no model download. */
function LemonadeCup() {
  const ref = useRef<Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (!ref.current) return
    ref.current.rotation.y = t * 0.35
    ref.current.position.y = Math.sin(t * 0.7) * 0.18 - 0.2
    ref.current.rotation.z = Math.sin(t * 0.45) * 0.06 - 0.08
  })

  return (
    <group ref={ref} position={[0, -0.2, 0]}>
      {/* lemonade base layer */}
      <mesh position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.92, 0.74, 1.2, 36]} />
        <meshStandardMaterial color={PALETTE.lemon} roughness={0.4} />
      </mesh>
      {/* flavor swirl layer */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[1.0, 0.92, 1.25, 36]} />
        <meshStandardMaterial color={PALETTE.pink} roughness={0.4} />
      </mesh>
      {/* clear plastic cup */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.12, 0.82, 2.75, 36, 1, true]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.15}
          metalness={0.05}
          transparent
          opacity={0.32}
        />
      </mesh>
      {/* rim ring */}
      <mesh position={[0, 1.38, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.12, 0.06, 10, 36]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} transparent opacity={0.7} />
      </mesh>
      {/* ice cubes peeking out */}
      <mesh position={[0.4, 1.42, 0.3]} rotation={[0.4, 0.6, 0.2]}>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshStandardMaterial color={PALETTE.sky} roughness={0.2} transparent opacity={0.85} />
      </mesh>
      <mesh position={[-0.35, 1.35, -0.2]} rotation={[0.2, 0.3, 0.5]}>
        <boxGeometry args={[0.36, 0.36, 0.36]} />
        <meshStandardMaterial color="#bfeaff" roughness={0.2} transparent opacity={0.85} />
      </mesh>
      {/* lemon wheel resting on the rim */}
      <group position={[-0.78, 1.45, 0]} rotation={[0.15, 0, -0.35]}>
        <mesh>
          <cylinderGeometry args={[0.52, 0.52, 0.1, 24]} />
          <meshStandardMaterial color={PALETTE.lemonDeep} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.02, 24]} />
          <meshStandardMaterial color={PALETTE.cream} roughness={0.5} />
        </mesh>
      </group>
      {/* straw */}
      <mesh position={[0.42, 1.85, 0]} rotation={[0, 0, -0.32]}>
        <cylinderGeometry args={[0.09, 0.09, 1.3, 12]} />
        <meshStandardMaterial color={PALETTE.sky} roughness={0.4} />
      </mesh>
      <mesh position={[0.78, 2.4, 0]} rotation={[0, 0, -1.45]}>
        <cylinderGeometry args={[0.09, 0.09, 0.55, 12]} />
        <meshStandardMaterial color={PALETTE.sky} roughness={0.4} />
      </mesh>
    </group>
  )
}

/** Chunky 3D sparkle (two crossed octahedrons). */
function Star({
  position,
  scale = 1,
  color = PALETTE.tang,
  phase = 0,
}: {
  position: [number, number, number]
  scale?: number
  color?: string
  phase?: number
}) {
  const ref = useRef<Group>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.z = clock.elapsedTime * 0.6 + phase
    const s = scale * (1 + Math.sin(clock.elapsedTime * 1.4 + phase) * 0.12)
    ref.current.scale.setScalar(s)
  })
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh scale={[0.45, 1, 0.45]}>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh scale={[1, 0.45, 0.45]}>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
    </group>
  )
}

/** Mouse-parallax rig: the whole scene leans gently toward the pointer. */
function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null)
  useFrame(({ pointer }) => {
    if (!ref.current) return
    ref.current.rotation.y += (pointer.x * 0.22 - ref.current.rotation.y) * 0.04
    ref.current.rotation.x += (-pointer.y * 0.12 - ref.current.rotation.x) * 0.04
  })
  return <group ref={ref}>{children}</group>
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={1.1} color="#fff5e8" />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#ffeede" />
      <directionalLight position={[-6, -2, 4]} intensity={0.7} color={PALETTE.pink} />
      <directionalLight position={[6, -3, 2]} intensity={0.5} color={PALETTE.sky} />

      <Rig>
        <LemonadeCup />
        <Lemon position={[-3.4, 1.1, -1.5]} scale={0.9} phase={0.4} />
        <Lemon position={[3.5, 1.6, -2]} scale={0.7} phase={2.1} spin={-0.4} />
        <Lemon position={[-2.6, -1.7, -0.5]} scale={0.65} phase={4.2} />
        <Lemon position={[3.1, -1.3, -1]} scale={0.8} phase={1.2} spin={0.5} />
        <Lemon position={[0.2, 2.4, -3]} scale={0.5} phase={3.3} />
        <Star position={[-4.2, -0.4, -2]} scale={0.5} color={PALETTE.tang} phase={1} />
        <Star position={[4.6, 0.3, -2.5]} scale={0.6} color={PALETTE.pink} phase={2.4} />
        <Star position={[-1.6, 2.6, -2]} scale={0.4} color={PALETTE.sky} phase={4} />
      </Rig>
    </Canvas>
  )
}
