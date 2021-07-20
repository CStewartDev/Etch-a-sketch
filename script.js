const container = document.querySelector('.sketch-container');
const gridSize = document.getElementById('gridsize')
const slider = document.querySelector('.sliderOutput')

let size = gridSize.value; //the grid is square. size X size
let shadeOn = false;
let multicolorOn = false; 

function createGrid (size){
    container.textContent ="";
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    slider.textContent = `${size}`;
    let pow = Math.pow(size,2);
    for(let i =0; i< pow; i++){
        let div = createDiv(i);
        container.appendChild(div)
    }
}

function createDiv (i) {
    let div = document.createElement("div");
        div.classList.add('sketch');
        div.id="s"+i;
    return div
}

function clearGrid () {
    let arr = Array.from(container.children)
    arr.forEach(item=> item.style.backgroundColor = "white")
}

function handleRangeUpdate() {
    size = this.value;
    createGrid(size);
}

function multicolor() {
    multicolorOn = !multicolorOn;
    shadeOn = false;
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + .9 + ')';
}

function shade() {
shadeOn = !shadeOn;
multicolorOn = false;
}

container.addEventListener('mouseover',(e) => {
    if(e.target.className === "sketch-container") return;
    if(shadeOn){             
        if (e.target.style.backgroundColor.match(/rgba/)) {
        let currentOpacity = Number(e.target.style.backgroundColor.slice(-4, -1));
        if (currentOpacity <= 0.9) {
            e.target.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
            e.target.classList.add('gray');
        }
    } else if (e.target.style.backgroundColor == 'rgb(0, 0, 0)') {
        return;
    } else {
        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
    }
    
    }else if(multicolorOn){ e.target.style.backgroundColor = `${random_rgba()}`

    } else e.target.style.backgroundColor = "black"
})


gridSize.addEventListener('change',handleRangeUpdate)

createGrid(size);


