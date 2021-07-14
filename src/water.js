import { Color, Mesh, MeshPhongMaterial, PlaneGeometry, ShaderMaterial } from "../vendors/three.module.js"

class Water {
    constructor() {
        const a = 100
        const b = 40
        this._geo = new PlaneGeometry(a, a, b, b)
        this._mat = new MeshPhongMaterial({
            color: new Color(0x9BE4FF),
            flatShading: true
        })
        this._shader = null

        this._mat.onBeforeCompile = (shader) => {
            const token = '#include <begin_vertex>'
            const changes = `
                vec2 xy = position.xy;
                float k = (2.0 * PI) / 30.0;
                float xComponent = sin(k * position.x + u_time);
                float yComponent = random(xy) / 4.0;
                float z = (xComponent + yComponent) * 2.0;

                vec3 transformed = vec3(xy, z);
            `

            const noise = `
                // 2D Random
                float random (in vec2 st) {
                    return fract(sin(dot(st.xy,
                                        vec2(12.9898,78.233)))
                                * 43758.5453123);
                }
                
                // 2D Noise based on Morgan McGuire @morgan3d
                // https://www.shadertoy.com/view/4dS3Wd
                float noise (in vec2 st) {
                    vec2 i = floor(st);
                    vec2 f = fract(st);
                
                    // Four corners in 2D of a tile
                    float a = random(i);
                    float b = random(i + vec2(1.0, 0.0));
                    float c = random(i + vec2(0.0, 1.0));
                    float d = random(i + vec2(1.0, 1.0));
                
                    // Smooth Interpolation
                
                    // Cubic Hermine Curve.  Same as SmoothStep()
                    vec2 u = f*f*(3.0-2.0*f);
                    // u = smoothstep(0.,1.,f);
                
                    // Mix 4 coorners percentages
                    return mix(a, b, u.x) +
                            (c - a)* u.y * (1.0 - u.x) +
                            (d - b) * u.x * u.y;
                }\n
            `

            shader.vertexShader = noise + shader.vertexShader
            shader.vertexShader = `uniform float u_time;\n` + shader.vertexShader
            shader.vertexShader = shader.vertexShader.replace(token, changes)
            this._shader = shader
            this._shader.uniforms.u_time = { value: 0 }
        }

        this._mesh = new Mesh(this._geo, this._mat)
        this._mesh.position.set(0, 0, -10)
        this._mesh.rotation.x = -Math.PI / 2
        this._mesh.receiveShadow = true
    }

    get Mesh() {
        return this._mesh
    }

    update(dt) {
        if (this._shader) {
            this._shader.uniforms.u_time.value = dt / 1000
        }
    }
}

export default Water