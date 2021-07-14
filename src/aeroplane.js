
class Aeroplane {
    constructor(mesh) {
        this._mesh = mesh
        this._mesh.position.set(-10, 10, 0)
        this._mesh.traverse(m => {
            if (m.isMesh) {
                m.castShadow = true
            }
        })

        this._mesh.scale.set(0.02, 0.02, 0.02)
        this._mesh.rotation.y = -Math.PI
    }

    get Mesh() {
        return this._mesh
    }

    update(dt) {
        const change = Math.sin(dt / 550) * 3
        this._mesh.position.z = change
        this._mesh.rotation.x = change / -10
    }
}

export default Aeroplane