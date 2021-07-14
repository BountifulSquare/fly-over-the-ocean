import { TetrahedronGeometry, MeshPhongMaterial, Mesh, BoxGeometry, Group } from '../vendors/three.module.js'

const cloudMesh = () => {
    const geo = new BoxGeometry()
    const mat = new MeshPhongMaterial({
        flatShading: true
    })
    const group = new Group()

    for (let i = 0; i < 5; i++) {
        const t = 2 - i
        const u = (2 - Math.abs(t) + 1) / 2.5
        const m = new Mesh(geo, mat)
        m.position.set(t, 0, 0)
        m.scale.set(u, u, u)
        m.rotation.x = Math.random() * Math.PI
        m.rotation.y = Math.random() * Math.PI

        group.add(m)
    }

    return group
}

class Cloud {
    constructor() {
        this._meshes = []

        for (let i = 0; i < 10; i++) {
            const m = cloudMesh()
            const s = (Math.random() + 1)

            m.scale.set(s, s, s)
            m.position.set(
                i * 20 + (Math.random() * 3),
                (Math.random() + 2) * 7.5,
                (Math.random() - 0.5) * 50
            )

            this._meshes.push(m)
            console.log(m.position)
        }

        this._prev = 0
        this._curr = 0
    }

    get Meshes() {
        return this._meshes
    }

    update(dt) {
        this._prev = this._curr
        this._curr = dt

        for (let m of this._meshes) {
            m.translateX((this._curr - this._prev) / -90)

            if (m.position.x < -100) {
                m.position.set(
                    60,
                    (Math.random() + 2) * 7.5,
                    (Math.random() - 0.5) * 50
                )
            }
        }
    }
}

export default Cloud