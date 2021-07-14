
class Input {
    constructor() {
        this._keys = {
            KeyW: false,
            KeyS: false,
            KeyD: false,
            KeyA: false,

            ArrowUp: false,
            ArrowDown: false,
            ArrowRight: false,
            ArrowLeft: false,

            Numpad0: false,
            Numpad1: false,
            Numpad2: false,
            Numpad3: false,
            NumpadAdd: false,
            NumpadSubtract: false,
            NumpadEnter: false,
        }
        this._click = {
            left: false,
            right: false,
            middle: false
        }

        document.addEventListener('keydown', e => this._onKeyDown(e))
        document.addEventListener('keyup', e => this._onKeyUp(e))
        document.addEventListener('click', e => this._onClick(e))
    }

    _onKeyDown(e) {
        switch (e.code) {
            case "KeyW":
                this._keys.KeyW = true
                break
            case "KeyS":
                this._keys.KeyS = true
                break
            case "KeyD":
                this._keys.KeyD = true
                break
            case "KeyA":
                this._keys.KeyA = true
                break
            case "ArrowUp":
                this._keys.ArrowUp = true
                break
            case "ArrowDown":
                this._keys.ArrowDown = true
                break
            case "ArrowRight":
                this._keys.ArrowRight = true
                break
            case "ArrowLeft":
                this._keys.ArrowLeft = true
                break
            case "Numpad0":
                this._keys.Numpad0 = true
                break
            case "Numpad1":
                this._keys.Numpad1 = true
                break
            case "Numpad2":
                this._keys.Numpad2 = true
                break
            case "Numpad3":
                this._keys.Numpad3 = true
                break
            case "NumpadEnter":
                this._keys.NumpadEnter = true
                break
            case "NumpadAdd":
                this._keys.NumpadAdd = true
                break
            case "NumpadSubtract":
                this._keys.NumpadSubtract = true
                break
        }
    }

    _onKeyUp(e) {

    }

    _onClick() {

    }
}

export default Input