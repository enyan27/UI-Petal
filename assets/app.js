const sign = document.querySelector('.signature-main')
const uppercase = document.querySelectorAll('.letter-bank .up')
const lowercase = document.querySelectorAll('.letter-bank .lo')
const modal = document.querySelector('.modal')
const content = "Truong Duc Dat";

function draw(key, animate) {
    if (key == " ") {
        const space = document.createElement("div");
        space.style.minWidth = '12px'
        sign.appendChild(space)
    } else {
        const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
        for (let i = 0; i < alphabet.length; i++) {
            var item = alphabet[i]
            if (key.toLowerCase() == item) {
                const letter = document.createElement("div");
                if (key == item.toUpperCase()) {
                    letter.innerHTML = uppercase[i].innerHTML
                    letter.classList.add('up')
                } else {
                    letter.innerHTML = lowercase[i].innerHTML
                    letter.classList.add('lo')
                }
                letter.classList.add(item)
                if (animate) {
                    setTimeout(() => {
                        letter.querySelector('svg path').style.strokeDashoffset = '0'
                    }, 50);
                } else {
                    letter.querySelector('svg path').style.strokeDashoffset = '0'
                }
                sign.appendChild(letter)
            }
        }
    }
}
function createSignature() {
    content.split('').forEach((char, index) => {
        setTimeout(() => {
            draw(char, true)
        }, index * 300);
    });
}
window.onload = () => {
    setTimeout(() => {
        modal.classList.add('active');
        createSignature();
    }, 33000);
};

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const TOTAL = 100;
const petalArray = [];
const petalImages = [];

for (let i = 1; i <= 11; i++) {
    const img = new Image();
    img.src = `./assets/images/flower_${i}.png`;
    petalImages.push(img);
}
petalImages.forEach((img, index) => {
    img.addEventListener('load', () => {
        if (index === petalImages.length - 1) {
            for (let i = 0; i < TOTAL; i++) {
                petalArray.push(new Petal());
            }
            render();
        }
    })
})
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    petalArray.forEach(petal => petal.animate());
    window.requestAnimationFrame(render);
}
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
let mouseX = 0
function touchHandler(e) {
    mouseX = (e.clientX || e.touches[0].clientX) / window.innerWidth;
}
window.addEventListener('mousemove', touchHandler);
window.addEventListener('touchmove', touchHandler);

class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = (Math.random() * canvas.height * 2) - canvas.height;
        this.w = 25 + Math.random() * 15;
        this.h = 20 + Math.random() * 10;
        this.opacity = this.w / 40;
        this.xSpeed = (1.5 + Math.random() * 2) * 0.3;
        this.ySpeed = (1 + Math.random() * 1) * 0.3;
        // this.xSpeed = (2 + Math.random()) * 0.3;
        // this.ySpeed = (1 + Math.random() * 0.5) * 0.3;

        this.flip = Math.random();
        this.flipSpeed = Math.random() * 0.03;
        this.petalImg = petalImages[Math.floor(Math.random() * petalImages.length)]
    }
    draw() {
        // if (this.y > canvas.height || this.x > canvas.width) {          // l->r
        if (this.y > canvas.height || this.x < -this.petalImg.width) {
            this.x = canvas.width;
            // this.x = -this.petalImg.width    // l->r

            this.y = (Math.random() * canvas.height * 2) - canvas.height
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            // this.xSpeed = 2 + Math.random();
            // this.ySpeed = 1 + Math.random() * 0.5;
            this.flip = Math.random();
        }
        ctx.globalAlpha = this.opacity
        ctx.drawImage(
            this.petalImg,
            this.x,
            this.y,
            this.w * (0.6 + (Math.abs(Math.cos(this.flip)) / 3)),
            this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 5))
            // this.w * (0.66 + (Math.abs(Math.cos(this.flip)) / 3)),
            // this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 2)),
        )
    }
    animate() {
        // this.x += this.xSpeed + mouseX * 0.1;
        // this.y += this.ySpeed + mouseX * 0.1;

        // this.x += this.xSpeed;   // l->r
        this.x -= this.xSpeed;
        this.y += this.ySpeed;
        this.flip += this.flipSpeed;
        this.draw();
    }
}
document.body.addEventListener('click', () => {
    document.getElementById('bg-soundtrack').play();
});
function resizeImage() {
    var height = window.innerHeight;
    var width = window.innerWidth;

    if (width < 769) {
        var x = 150 + (height - 700) * 0.2;
        document.body.style.backgroundPosition = `calc(50% + ${x}px)`;
    } else {
        document.body.style.backgroundPosition = 'center center';
    }
}
window.addEventListener('DOMContentLoaded', () => resizeImage());
window.addEventListener('resize', () => resizeImage());
