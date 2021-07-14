import { SphereGeometry, ShaderMaterial, BackSide, Mesh, Color } from "../vendors/three.module.js"

const Sky = () => {
    const VS = `
    varying vec3 vWorldPosition;

    void main() {
        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `
    const FS = `
    uniform vec3 uTopColor;
    uniform vec3 uBottomColor;
    uniform float uOffset;
    uniform float uExponent;

    varying vec3 vWorldPosition;

    void main() {
        float h = normalize( vWorldPosition + uOffset ).y;
        gl_FragColor = vec4( mix( uBottomColor, uTopColor, max( pow( max( h , 0.0), uExponent ), 0.0 ) ), 1.0 );
    }
    `
    const geo = new SphereGeometry(500)
    const mat = new ShaderMaterial({
        uniforms: {
            uTopColor: { value: new Color(0x8B97FF) },
            uBottomColor: { value: new Color(0xFFCEAA) },
            uOffset: { value: 33 },
            uExponent: { value: 0.6 }
        },
        vertexShader: VS,
        fragmentShader: FS,
        side: BackSide
    })
    const mesh = new Mesh(geo, mat)
    return mesh
}

const sky = Sky()

export default sky