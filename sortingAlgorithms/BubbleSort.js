
const maxSpeed = parseInt(document.querySelector("#slider").attributes.getNamedItem("max").value);
const minSpeed = parseInt(document.querySelector("#slider").attributes.getNamedItem("min").value);


const sort = {sort:BubbleSort,sorting:false};

async function helper(array,speed)
{
  
   const n = array.length;

   for(let i=0;i<n-1;i++){
      for(let j = 0;j<n-1;j++){
        if(!sort.sorting){
            return;
        }
        const h1 = array[j].getBoundingClientRect().height;
        const h2  = array[j+1].getBoundingClientRect().height;
        array[j].style.backgroundColor = "red";
        array[j+1].style.backgroundColor = "red";
        
        await new Promise(resolve => setTimeout(resolve,
            (maxSpeed+minSpeed)-speed
            ));

        if(h1>h2){
            array[j].style.height = `${h2}px`;
            array[j+1].style.height = `${h1}px`;
        }
        array[j].style.backgroundColor = "aquamarine";
        array[j+1].style.backgroundColor = "aquamarine";
      }
   }


}


 function BubbleSort(array,sortingSpeed){

    sort.sorting = true;
    return new Promise(async (resolve,reject)=>{
            try{
                await helper(array,sortingSpeed);
                sort.sorting = false
                resolve("Sorting completed")
            }
            catch(err){
                reject(err)
            }
    })
} 



export default sort;