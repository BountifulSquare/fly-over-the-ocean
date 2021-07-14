import { PerspectiveCamera } from "../vendors/three.module.js";
import { OrbitControls } from '../vendors/OrbitControls.js'
import { PointerLockControls } from '../vendors/PointerLockControls.js'

class Camera {
    constructor(canvas) {
        this._camera = new PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.5,
            5000
        )
    }

    get Object3D() {
        return this._camera
    }

    updateAspect(aspect) {
        this._camera.aspect = aspect
        this._camera.updateProjectionMatrix()
    }
}

class OrbitCamera extends Camera {
    constructor(canvas) {
        super(canvas)
        this._camera.position.set(0, 5, 40)
        this._orbit = new OrbitControls(this._camera, canvas)
        this._orbit.update()
    }
}

class FirstPersonCamera extends Camera {
    constructor(canvas, active) {
        super(canvas)
        this._camera.position.set(0, 1.8, 0)
        this._pointerLock = new PointerLockControls(this._camera, canvas)
        this._active = active || false

        canvas.addEventListener('click', () => {
            if (this._active) {
                this._pointerLock.lock()
            }
        })
    }
}

class CameraSwitch_dev {
    constructor(canvas) {
        this._orbitCamera = new OrbitCamera(canvas)
        this._firstPersonCamera = new FirstPersonCamera(canvas)
        this._currentActiveCamera = 'orbit'
        this._camera = this._orbitCamera

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Numpad0') {
                if (this._currentActiveCamera === 'orbit') {
                    this._currentActiveCamera = 'firstPerson'
                    this._firstPersonCamera._active = true
                    this._camera = this._firstPersonCamera
                } else if (this._currentActiveCamera === 'firstPerson') {
                    this._currentActiveCamera = 'orbit'
                    this._firstPersonCamera._active = false
                    this._camera = this._orbitCamera
                }
            }
        })
    }

    get Object3D() {
        return this._camera.Object3D
    }
    get Orbit() {
        return this._camera._orbit
    }

    get Type() {
        return this._currentActiveCamera
    }

    updateAspect(aspect) {
        this._camera._camera.aspect = aspect
        this._camera._camera.updateProjectionMatrix()
    }
}

export { OrbitCamera, FirstPersonCamera, CameraSwitch_dev }