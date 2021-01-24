const map = document.getElementById('map')
const mapImg = document.getElementById('map__img')
const menuMoves = document.getElementById('menu__moves')


// zoom functionality
let scale = 1;
function zoom(event) {
    scale += event.deltaY * -0.001
    // Restrict scale
    scale = Math.min(Math.max(0.5, scale), 4)
    // Apply scale transform
    map.style.transform = `scale(${scale})`
  }


// Pan Functionality
let img_ele = null
let x_cursor = 0
let y_cursor = 0
let x_img_ele = 0
let y_img_ele = 0

function start_drag() {
    img_ele = this;
    console.log(img_ele)
    if (event.type == 'mousedown') {
        x_img_ele = window.event.clientX - mapImg.offsetLeft
        y_img_ele = window.event.clientY - mapImg.offsetTop
    } else if (event.type == 'touchstart') {
        let touch = event.touches[0] || event.changedTouches[0]
        x_img_ele = touch.clientX - mapImg.offsetLeft
        y_img_ele = touch.clientY - mapImg.offsetTop
        console.log('touchstart',x,y)
    }
}

function stop_drag() {
    img_ele = null
}

function while_drag() {
    console.log(arguments)
    if (event.type == 'mousemove') {
        x_cursor = window.event.clientX
        y_cursor = window.event.clientY
    } else if (event.type = 'touchmove') {
        let touch = event.touches[0] || event.changedTouches[0]
        x_cursor = touch.clientX
        y_cursor = touch.clientY
    }
    if (img_ele !== null) {
        img_ele.style.left = (x_cursor - x_img_ele) + 'px'
        img_ele.style.top = ( y_cursor - y_img_ele) + 'px'
        //track movement in console
        console.log(img_ele.style.left+' - '+img_ele.style.top)

    }
}
  
// enable pan
mapImg.addEventListener('mousedown', start_drag)
map.addEventListener('mousemove', while_drag)
map.addEventListener('mouseup', stop_drag)
mapImg.addEventListener('touchstart', start_drag)
map.addEventListener('touchmove', while_drag)
map.addEventListener('touchend', stop_drag)
// enable zoom
map.onwheel = zoom
// disable right-click the image
mapImg.addEventListener('contextmenu', event => event.preventDefault())




// UI - Buttons
let moveID = 1
let moveIDtoURL = {
    13: 'images/karta_13_khod.png',
    12: 'images/karta_12_khod.png',
    11: 'images/Karta_11khod.png',
    10: 'images/Karta_10khod.png',
    9: 'images/Karta_9khod.png',
    8: 'images/Karta_8khod.png',
    7: 'images/Karta_7khod.png',
    6: 'images/Karta_6khod.png',
    5: 'images/Karta_5khod.png',
    4: 'images/Karta_4khod.png',
    3: 'images/Karta_3khod.png',
    2: 'images/Karta_2khod.png',
    1: 'images/Karta_1khod.png',
}


function updateURL(event) {
    if (event.target.classList.contains('move')) {
        moveID = event.target.innerText
        let newURL = moveIDtoURL[moveID]
        if (newURL) {
            mapImg.src = newURL
            document.getElementsByClassName('button active')[0].classList.remove('active')
            event.target.classList.add('active')
            event.stopPropagation()
            event.preventDefault()
        } else {
            mapImg.src = ''
        } 
    }}

menuMoves.addEventListener('touchend', event => { updateURL(event) })
menuMoves.addEventListener('click', event => { updateURL(event) })