import { BoxGeometry, CylinderGeometry, Mesh, MeshStandardMaterial, SphereGeometry } from '../vendors/three.module.js'

const box = new BoxGeometry()
const sphere = new SphereGeometry(1, 30, 30)
const cylinder = new CylinderGeometry()
const material = new MeshStandardMaterial()

const Box = (color) => {
    const mat = color ? new MeshStandardMaterial({color}) : material
    const mesh = new Mesh(box, mat)
    mesh.name = 'Box' 
    return mesh
}

const Sphere = (color) => {
    const mat = color ? new MeshStandardMaterial({color}) : material
    const mesh = new Mesh(sphere, mat)
    mesh.name = 'sphere'
    return mesh
}

const Cylinder = (color) => {
    const mat = color ? new MeshStandardMaterial({color}) : material
    const mesh = new Mesh(cylinder, mat)
    mesh.name = 'cylinder'
    return mesh
}

export {
    Box,
    Sphere,
    Cylinder
}