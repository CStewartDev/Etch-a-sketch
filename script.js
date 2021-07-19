const container = document.querySelector('.sketch-container');
let size = 6; //6X6

function createGrid (size){
    let pow = Math.pow(size,2);
    console.log(pow)
    for(let i =0; i< pow; i++){
        let div = document.createElement("div");
        div.classList.add('sketch');
        div.id="s"+i
        container.appendChild(div)
    }
}

createGrid(size);
console.log(container)