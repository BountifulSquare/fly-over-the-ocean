import {
    WebGLRenderer, Scene, GridHelper, AxesHelper,
    DirectionalLight, AmbientLight, sRGBEncoding, HemisphereLight, Fog
} from '../vendors/three.module.js'
import Stats from '../vendors/stats.module.js'

class World {
    constructor(canvas) {
        this._renderer = new WebGLRenderer({
            antialias: true
        })
        this._renderer.physicallyCorrectLights = true
        this._renderer.gammaFactor = 2.2
        this._renderer.gammaFactor = sRGBEncoding
        this._renderer.setSize(canvas.clientWidth, canvas.clientHeight)
        this._renderer.shadowMap.enabled = true
        this._scene = new Scene()

        if (window.ENV === 'dev') {
            const axes = new AxesHelper(10)
            const grid = new GridHelper(200, 20)

            const dLight = new DirectionalLight(0xFFFFFF, 2)
            dLight.position.set(-5, 10, 5)
            dLight.castShadow = true
            const aLight = new AmbientLight(0xFFFFFF, 0.2)
            const hLight = new HemisphereLight(0xCFF2FF, 0xFFD089, 0.5)

            // this._scene.add(axes)
            // this._scene.add(grid)
            this._scene.add(dLight)
            this._scene.add(aLight)
            this._scene.add(hLight)

            this._stats = new Stats()
            document.body.appendChild(this._stats.dom)
        }

        canvas.appendChild(this._renderer.domElement)
    }

    addChildren(children) {
        if (Array.isArray(children) && children.length > 0) {
            
            children.forEach(c => {
                this._scene.add(c)
            })

        } else {
            
            this._scene.add(children)
        
        }
    }

    setSize(width, height) {
        this._renderer.setSize(width, height)
    }

    render(camera) {
        this._stats.update()
        this._renderer.render(this._scene, camera)
    }
}

export default World