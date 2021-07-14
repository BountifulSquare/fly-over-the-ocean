import { Euler, Vector3 } from '../vendors/three.module.js'
import { TransformControls } from '../vendors/TransformControls.js'

const id = 'key_goes_here'

class Transform_dev {
    constructor(camera, canvas) {
        this._id = id
        this._camera = camera
        this._transform = new TransformControls(this._camera.Object3D, canvas)
        this._transform.addEventListener('dragging-changed', e => {
            if (this._camera.Type === 'orbit') {
                this._camera.Orbit.enabled = !e.value
            }
        })
        this._transform.addEventListener('change', () => { this._UI() })

        this._meshes = undefined
        this._currentMesh = undefined
        this._currentIndex = 0

        this._positionUI = document.getElementById('position')
        this._rotationUI = document.getElementById('rotation')
        this._scaleUI = document.getElementById('scale')

        document.addEventListener('keydown', (e) => { this._onKeyDown(e) })
    }

    get Object3D() {
        return this._transform
    }

    _onKeyDown(e) {
        switch (e.code) {
            case "Numpad1":
                this._transform.setMode('translate')
                break
            case "Numpad2":
                this._transform.setMode('rotate')
                break
            case "Numpad3":
                this._transform.setMode('scale')
                break
            case "NumpadAdd":
                this._attach(1)
                break
            case "NumpadSubtract":
                this._attach(-1)
                break
            case "NumpadEnter":
                this._saveToLocal()
                break
            case "NumpadDecimal":
                this._updateMesh()
                break
        }
    }

    _attach(index) {
        const currentIndex = this._currentIndex + index

        if (currentIndex === this._meshes.length) {
            this._currentIndex = 0
        } else if (currentIndex === -1) {
            this._currentIndex = this._meshes.length - 1
        } else {
            this._currentIndex = currentIndex
        }

        const mesh = this._meshes[this._currentIndex]
        this._transform.attach(mesh)
        this._currentMesh = mesh
        this._UI()
    }

    _updateMesh() {
        const posUI = this._positionUI.children
        const posX = +posUI[0].value
        const posY = +posUI[1].value
        const posZ = +posUI[2].value

        const rotUI = this._rotationUI.children
        const rotX = +rotUI[0].value
        const rotY = +rotUI[1].value
        const rotZ = +rotUI[2].value

        const scaleUI = this._scaleUI.children
        const scaleX = +scaleUI[0].value
        const scaleY = +scaleUI[1].value
        const scaleZ = +scaleUI[2].value

        this._currentMesh.position.set(posX, posY, posZ)
        this._currentMesh.rotation.set(rotX, rotY, rotZ)
        this._currentMesh.scale.set(scaleX, scaleY, scaleZ)
    }

    _saveToLocal() {
        const data = this._meshes
            .map(({ name, position, rotation, scale }) => ({ name, position, rotation, scale }))
        localStorage.setItem(this._id, JSON.stringify(data))
    }

    _UI() {
        if (this._currentMesh) {
            const { position, rotation, scale } = this._currentMesh

            this._positionUI.children[0].value = position.x
            this._positionUI.children[1].value = position.y
            this._positionUI.children[2].value = position.z

            this._rotationUI.children[0].value = rotation.x
            this._rotationUI.children[1].value = rotation.y
            this._rotationUI.children[2].value = rotation.z

            this._scaleUI.children[0].value = scale.x
            this._scaleUI.children[1].value = scale.y
            this._scaleUI.children[2].value = scale.z
        }
    }

    register(meshes) {
        this._meshes = meshes
        this._transform.attach(this._meshes[0])
        this._currentMesh = this._meshes[0]

        // update old transformation
        let transformations = localStorage.getItem(this._id)
        if (transformations) {
            transformations = JSON.parse(transformations)
            const posV = new Vector3()
            const rotV = new Vector3()
            const scaV = new Vector3()
            const euler = new Euler()
            const tempMesh = this._meshes.map(_ => _)

            for (let tfm of transformations) {
                for (let i = 0; i < tempMesh.length; i++) {
                    if (tfm.name === tempMesh[i].name) {
                        posV.set(
                            tfm.position.x,
                            tfm.position.y,
                            tfm.position.z
                        )
                        rotV.set(
                            tfm.rotation._x,
                            tfm.rotation._y,
                            tfm.rotation._z
                        )
                        scaV.set(
                            tfm.scale.x,
                            tfm.scale.y,
                            tfm.scale.z,
                        )
                        euler.setFromVector3(rotV, 'XYZ')
                        tempMesh[i].position.copy(posV)
                        tempMesh[i].setRotationFromEuler(euler)
                        tempMesh[i].scale.copy(scaV)

                        tempMesh.splice(i, 1)

                        break
                    }
                }
            }
        }
    }
}


export default Transform_dev