import BubbleSort from "./sortingAlgorithms/BubbleSort.js";


const container = document.querySelector(".container");
const {width,height} = container.getBoundingClientRect()
const speedSlider = document.querySelector("#slider")
const randomizer = document.querySelector(".randomize-btn")
const sortButton = document.querySelector(".sort-btn");
const sizeChanger = document.querySelector("#size-select");
const stopSorting = document.querySelector(".stop-sorting");
const maxSpeed = parseInt(document.querySelector("#slider").attributes.getNamedItem("max").value);
const minSpeed = parseInt(document.querySelector("#slider").attributes.getNamedItem("min").value);
let sizeOfArray = 10;
let elementWidth = width/sizeOfArray;
const array = []
const heightInterval = [10,height]
let sortingSpeed = getRandomValueFromInterval(minSpeed,maxSpeed);








function getRandomValueFromInterval(min,max){
    return min+Math.random()*(max-min);
}



function createArray(){
    for(let i=0;i<sizeOfArray;i++){
        const div = createElement();
        array.push(div);
        container.appendChild(div);
     }
}





function init(){
    speedSlider.value = sortingSpeed+"";
    sizeChanger.value = sizeOfArray+"";
    createArray();
    addEventListeners();
}





function createElement(){
    const div =  document.createElement("div");
    div.style.width = `${elementWidth}px`;
    const elementHeight = 
    getRandomValueFromInterval(heightInterval[0],heightInterval[1]);
    div.style.height = `${elementHeight}px`;
    return div;
}






function randomizeHeights(){
    array.forEach((element)=>{
       const h =  getRandomValueFromInterval(heightInterval[0],heightInterval[1]);
       element.style.height = `${h}px`
    })
}




function changeSizeOfArray(newSize){

  if(newSize>=sizeOfArray)
  {
    let extraElements = newSize-sizeOfArray;
    while(extraElements--){
        const div = createElement();
        container.appendChild(div);
        array.push(div);
    }
  }

  else{
    let elementsToRemove = sizeOfArray-newSize;
    while(elementsToRemove--){
        const div = array.pop();
        container.removeChild(div);
    }
   
  }

   sizeOfArray = newSize;
   elementWidth = width/sizeOfArray;
   for(let i=0;i<sizeOfArray;i++){
     array[i].style.width = `${elementWidth}px`;
   }
   randomizeHeights();

}



function addEventListeners(){
    randomizer.addEventListener("click",()=>{
        if(!BubbleSort.sorting){
            randomizeHeights();
        }
    })
    
    
    
    
    sizeChanger.addEventListener("change",(ev)=>{
        if(!BubbleSort.sorting){
            const newSize = parseInt(ev.target.value)
            changeSizeOfArray(newSize)
        }
       
    })
    
    
    stopSorting.addEventListener("click",()=>{
       BubbleSort.sorting = false
    })

    speedSlider.addEventListener("change",(ev)=>{
        if(!BubbleSort.sorting){
            sortingSpeed = parseInt(ev.target.value)
        }
        
    })
    
    
    
    
    
    sortButton.addEventListener("click",()=>{
        
        if(!BubbleSort.sorting){
            stopSorting.style.display = "inline-block";
            sortButton.style.display = "none";
            BubbleSort.sort(array,sortingSpeed).then((msg)=>{
                console.log(msg);
               
                stopSorting.style.display = "none";
                sortButton.style.display = "inline-block";
            })
            .catch((err)=>{
                console.log(err);
            })
        }
      
    })
    
}


init();

