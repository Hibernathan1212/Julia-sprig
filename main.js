/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Julia Set
@author: Nathan
@tags: []
@addedOn: 2024-00-00
Instructions:
Explore different Julia Sets
*/

let n;

const a = "0";
const b = "1";
const c = "2";
const d = "3";
const e = "4";
const f = "5";
const g = "6";

let res = 32 /* * 1.25 */
let max = res
let xoff = 0
let yoff = 0

let maxiter = 64

let resfac = 1.25
let movefac = 0.2
let zoomfac = 0.2

let mode = "zoom"

let posFac = 0.1

setLegend(
  [ a, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ b, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ c, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [ d, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ e, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [ f, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ g, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`]
);

class Complex {
    constructor(r, i) {
        this.r = r;
        this.i = i;
    }
    add(other) {
        return new Complex(this.r + other.r, this.i + other.i);
    }
    abs() {
        return Math.sqrt(Math.pow(this.r, 2) + Math.pow(this.i, 2))
    }
    square() {
        return new Complex((this.r * this.r) - (this.i * this.i), (this.r * this.i) + (this.i * this.r));
    }
}

function julia(x, y) {
    // With just a few tweaks, this becomes a Julia Set viewer!
    // let c = new Complex(x, y)
    let c = juliaPos
    let n = 0
    // let z = new Complex(i, j)
    let z = new Complex(x, y)
    while (z.abs() <= 2 && n < (Math.log2(max) * 32)) {
        z = c.add(z.square())
        n += 1
    }
    return [n, z.abs()]

}

let juliaPos = new Complex(0.5, 0.5)

function render() {
    var screen = ``

    for (let x = 0; x < res; x++) {
    for (let y = 0; y < res; y++) {
        n = julia(((y / max) * 2) - 1.35 - xoff, ((x / max) * 2) - 1 - yoff)
        if (n[1] < 2) {
            screen += "0"
        } else if (n[0] > 64 * 0.6) {
            screen += "2"
        } else if (n[0] > 64 * 0.4) {
            screen += "5"
        } else if (n[0] > 64 * 0.3) {
            screen += "3"
        } else if (n[0] > 64 * 0.2) {
            screen += "6"
        } else if (n[0] > 64 * 0.1) {
            screen += "4"
        } else {
            screen += "5"
        }

    }
    screen += "\n"

    }
    setMap(screen);
    clearText()
    if (mode == "zoom") {
        addText("Zoom: 2^" + Math.log2(1 / (res/max)), { 
            x: 2, 
            y: 0, 
            color: color`0`
        })
    } else if (mode == "resolution") {
        addText("Res: " + res, { 
            x: 2, 
            y: 0, 
            color: color`0`
        })
    } else if (mode == "julia pos") {
        addText("Pos: " + juliaPos.r + " + " + juliaPos.i + "i", { 
            x: 2, 
            y: 0, 
            color: color`0`
        })
    }
    
    addText("Mode: " + mode, { 
        x: 2, 
        y: 15, 
        color: color`0`
    })
}
render()

//move
onInput("w", () => {
    if (mode != "julia pos") {
        yoff += movefac * (res/max)
    } else {
        juliaPos.i += posFac
        juliaPos.i = Math.round(juliaPos.i * 100) / 100
    }
    render()
})

onInput("s", () => {
    if (mode != "julia pos") {
        yoff -= movefac * (res/max)
    } else {
        juliaPos.i -= posFac
        juliaPos.i = Math.round(juliaPos.i * 100) / 100
    }
    render()
})
onInput("a", () => {
    if (mode != "julia pos") {
        xoff += movefac * (res/max)
    } else {
        juliaPos.r += posFac
        juliaPos.r = Math.round(juliaPos.r * 100) / 100
    }
    render()
})

onInput("d", () => {
    if (mode != "julia pos") {
        xoff -= movefac * (res/max)
    } else {
        juliaPos.r -= posFac
        juliaPos.r = Math.round(juliaPos.r * 100) / 100
    }
    render()
})

onInput("i", () => { //zoom, increase detail, or change julia position
    if (mode == "zoom") {
        max *= 2
        yoff -= 1 * (res/max)
        xoff -= 1 * (res/max)
    } else if (mode == "resolution") {
        res *= resfac
        max *= resfac
    } else if (mode == "julia pos") {

    }
    
    render()
})

onInput("k", () => { //zoom, increase detail, or change julia position
    if (mode == "zoom") {
        max *= 0.5
        yoff += 0.5 * (res/max)
        xoff += 0.5 * (res/max)
    } else if (mode == "resolution") {
        res /= resfac
        max /= resfac
    } else if (mode == "julia pos") {
        
    }
        
    render()
})

onInput("j", () => { //change mode
    if (mode == "zoom") {
        mode = "resolution"
    } else if (mode == "resolution") {
        mode = "julia pos"
    } else if (mode == "julia pos") {
        mode = "zoom"
    }

    render()
})

onInput("l", () => { //change mode
    if (mode == "zoom") {
        mode = "julia pos"
    } else if (mode == "resolution") {
        mode = "zoom"
    } else if (mode == "julia pos") {
        mode = "resolution"
    }

    render()
})
