import World from './src/_world.js'
import sky from './src/_sky.js'
import { CameraSwitch_dev, FirstPersonCamera, OrbitCamera } from './src/_camera.js'
import Transform_dev from './src/_transform.js'
import { Box, Sphere } from './src/_primitives.js'
import { GLTFLoader } from './vendors/GLTFLoader.js'

import Water from './src/water.js'
import Aeroplane from './src/aeroplane.js'
import Cloud from './src/cloud.js'

window.ENV = 'dev'

;(async function main() {
    const canvas = document.getElementById('canvas')
    const world = new World(canvas)
    const camera = new CameraSwitch_dev(canvas)

    world.addChildren(sky)

    const water = new Water()
    world.addChildren(water.Mesh)

    const loader = new GLTFLoader()
    const aeroplaneGLTF = await loader.loadAsync('./assets/airplane/Airplane_1354.gltf')
    const aeroplane = new Aeroplane(aeroplaneGLTF.scene)
    world.addChildren(aeroplane.Mesh)

    const cloud = new Cloud()
    world.addChildren(cloud.Meshes)

    function run(dt) {
        water.update(dt)
        aeroplane.update(dt)
        cloud.update(dt)

        world.render(camera.Object3D)
        requestAnimationFrame(run)
    }
    run(0)

    window.addEventListener('resize', () => {
        camera.updateAspect(window.innerWidth/window.innerHeight)
        world.setSize(window.innerWidth, window.innerHeight)
    })
})()