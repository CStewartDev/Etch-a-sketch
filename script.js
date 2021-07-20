const container = document.querySelector('.sketch-container');
const gridSize = document.getElementById('gridsize')
const slider = document.querySelector('.sliderOutput')

let size = gridSize.value; //the grid is square. size X size
let shadeOn = false;
let multicolorOn = false; 

function createGrid (size){
    container.textContent =""; //clears all previous divs if any
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`; // makes our grid
    slider.textContent = `${size}`; //displays number for slider span
    let pow = Math.pow(size,2); 
    for(let i =0; i< pow; i++){
        let div = createDiv(i);
        div.style.backgroundColor = "rgba(255,255,255,.99)"
        container.appendChild(div)
    }
}

//creates a sketch block
function createDiv (i) {
    let div = document.createElement("div");
        div.classList.add('sketch');
        div.id="s"+i;
    return div
}

//clears background for all divs
function clearGrid () {
    let arr = Array.from(container.children)
    arr.forEach(item=> item.style.backgroundColor = "rgba(255,255,255,.99)")
}

//fires when the range updates
function handleRangeUpdate() {
    size = this.value;
    createGrid(size);
}

// turns multi on and all others off
function multicolor() {
    multicolorOn = !multicolorOn;
    shadeOn = false;
}
// grabbed from Stack Overflow. very consise way of randomizing. i hard coded A to .9 to make the colors brighter
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + .9 + ')';
}
// turns shade on and all others off
function shade() {
shadeOn = !shadeOn;
multicolorOn = false;
}

//this grabs the A value and cuts it down. The background behind the container is Black, so they start to blend together.
function shader(e) {
    if(e.target.style.backgroundColor.match(/rgba/)){
        let currentColor = e.target.style.backgroundColor;
        let cut = currentColor.match(/\.\w/gm);
        if(cut===null) cut = 0
        let shadedColor = currentColor.replace(/\.\w/gm, cut[0]-.1)
        e.target.style.backgroundColor = shadedColor;
    }
}

//switching logic.
container.addEventListener('mouseover',(e) => {
    if(e.target.className === "sketch-container") return; //kept triggering events on the container
    if(shadeOn){ shader(e)    
    }else if(multicolorOn){ e.target.style.backgroundColor = `${random_rgba()}`
    }else e.target.style.backgroundColor = "rgba(0,0,0,.1)"
})


gridSize.addEventListener('change',handleRangeUpdate)

//creates the first default grid on page load.
createGrid(size);


