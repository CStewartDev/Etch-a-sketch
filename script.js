const container = document.querySelector('.sketch-container');
const clearBtn = document.querySelector('.clearBtn');
const gridSize = document.getElementById('gridsize')
const slider = document.querySelector('.sliderOutput')
let size = gridSize.value; //the grid is square. size X size 

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
    arr.forEach(item=> item.classList.remove('filled'))
}

function handleRangeUpdate() {
    size = this.value;
    createGrid(size);
}

container.addEventListener('mouseover',(e) => {
    e.target.classList.add('filled')
})

gridSize.addEventListener('change',handleRangeUpdate)

createGrid(size);


