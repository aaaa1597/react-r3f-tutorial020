import React, {useMemo, useRef, useState} from 'react';
import './App.css';
import { Canvas, useFrame, MeshProps } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, Environment, Center, Stats } from '@react-three/drei'

const Button = (props: MeshProps) => {
  const ref = useRef<THREE.Mesh>(null!)
  const refMat = useRef<THREE.MeshPhysicalMaterial>(null!)
  const [hovered, setHovered] = useState(false)
  const [selected, setSelected] = useState(false)
  const colorTo = useMemo(() => new THREE.Color(Math.floor(Math.random() * 16777216)),[])

  useFrame((_, delta) => {
    ref.current.rotation.x = hovered
      ? THREE.MathUtils.lerp(ref.current.rotation.x, -Math.PI * 2, 0.025)
      : THREE.MathUtils.lerp(ref.current.rotation.x, 0, 0.025)

    ref.current.position.z = selected
      ? THREE.MathUtils.lerp(ref.current.position.z, 0, 0.025)
      : THREE.MathUtils.lerp(ref.current.position.z, -3, 0.025)

      refMat.current.color.lerp(selected ? colorTo : new THREE.Color(0x000000), 0.025)
  })

  return (
    <mesh {...props} ref={ref}
      onPointerDown={() => {setSelected(!selected)}}
      onPointerOver={() => {setHovered(true)}}
      onPointerOut={() => {setHovered(false)}} >
      <icosahedronGeometry />
      <meshPhysicalMaterial ref={refMat}
        roughness={0} metalness={0} thickness={3.12} ior={1.74} transmission={1.0}/>
    </mesh>
  )
}

const vec = new THREE.Vector3()
const Rig = () => {
  return useFrame(({camera, mouse}) => {
    vec.set(mouse.x * 2, mouse.y * 2, camera.position.z)
    camera.position.lerp(vec, 0.025)
    camera.lookAt(0, 0, 0)
  })
}

const App = () => {
  return (
    <div style={{ width: "100vw", height: "75vh" }}>
      <Canvas camera={{ position: [0, 0, 8] }}>
        <Environment preset="forest" background />
        <Center>
          {[...Array(5).keys()].map((x) => 
            [...Array(5).keys()].map((y) => { 
              return <Button key={y*5 + x} position={[x*2.5, y*2.5, 0]}/>
            }) 
          )}
        </Center>
        <OrbitControls />
        <axesHelper args={[5]} />
        <gridHelper />
        <Rig />
        <Stats/>
      </Canvas>
    </div>
  );
}

export default App;
