const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Event Listeners
// addEventListener('mouseover', growStar)

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

//Objects
function MiniStar (x, y, radius, color){
    this.x= x,
    this.y= y,
    this.radius= Math.random()*radius,
    this.color= color,
    this.velocity = {
        x: Math.random() *(7),
        y: Math.random() *(7)-5
    },
    this.ttl = 300,
    this.opacity = 1
}

MiniStar.prototype.draw = function () {
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
    c.fillStyle = this.color
    c.fillStyle = `rgba(227, 234, 239, ${this.opacity})`
    c.shadowColor ='#E3EAEF'
    c.shadowBlur = 20
    c.fill()
    c.closePath()
    c.restore()
}

MiniStar.prototype.update = function () {
    this.draw()
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.ttl -= 1
    this.opacity -= 1/this.ttl
}

// function growStar(e){
//     // console.log('it worked')
//     mouseX = e.clientX
//     mouseY = e.clientY
//     if(mouseX < canvas.width/2 -350 && mouseY < canvas.height/2 -150){
//         console.log(`Your Mouse Position Is ${mouseX} and ${mouseY}`)
        
//     }
// }

function createMountainRange(mountainAmount, height, color){
    for (let i = 0; i < mountainAmount; i++) {
        const mountainWitdh = canvas.width/mountainAmount
        c.beginPath()       
        c.moveTo(i*mountainWitdh,canvas.height)
        c.lineTo(i*mountainWitdh + mountainWitdh + canvas.width*0.1, canvas.height)
        c.lineTo(i*mountainWitdh + mountainWitdh/2, canvas.height - height - groundHeight)
        c.lineTo(i * mountainWitdh- canvas.width*0.1, canvas.height)
        c.fillStyle = color
        c.fill()
        c.closePath()
    }
}

//Implementation
const backgroundGradient = c.createLinearGradient(0,0,0,canvas.height)
backgroundGradient.addColorStop(0, '#171E26')
backgroundGradient.addColorStop(1, '#3F586B')
let stars
let miniStars
let backgroundStars
let groundHeight = canvas.height *0.1
let ticker = 0

function init(){
    stars = []
    miniStars = []
    backgroundStars = []

    for (let i = 0; i < 1; i++) {
        miniStars.push(new MiniStar(30, canvas.height/2, 3)) //new => creates a new object
    }

    for (let i=0; i<300; i++){
        const x = Math.random()*canvas.width
        const y = Math.random()*canvas.height
        const radius = Math.random()* 3
        backgroundStars.push(new MiniStar(x,y,radius, 'white'))
    }

}

//Animation Loop
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = backgroundGradient
    c.fillRect(0,0, canvas.width, canvas.height)

    miniStars.forEach((miniStar,index) => {
        miniStar.update()
        if(miniStar.ttl ==0){
            miniStars.splice(index, 1)
        }
    })

    backgroundStars.forEach(backgroundStar => {
        backgroundStar.draw()
    })

    createMountainRange(1, canvas.height*0.7, '#384551')
    createMountainRange(2, canvas.height*0.5, '#2B3843')
    createMountainRange(3, canvas.height*0.3, '#26333E')
    c.fillStyle = '#182028'
    c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight)

    ticker++
    if (ticker%5 == 0){
        miniStars.push(new MiniStar(Math.random()*canvas.width, Math.random()*canvas.height, 4 ))
    }

}

init();
animate();

