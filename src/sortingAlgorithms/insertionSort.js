export default function insertionSort(array, originalArray, speed, runner) {
    let n = array.length
    if(n <= 1) return 
    let k = 0;

    for(let i = 1; i < n; i++) {
        let curr = array[i];
        
        let phase = 0;
        //console.log("this is pre ", j)
        if(array[i-1] <= curr) {
            for (let j = 0; j < 2; j++){
                const arrayBars = document.getElementsByClassName('array-bar');
                const barOneStyle = arrayBars[i].style;
                setTimeout(()=>{
                    barOneStyle.backgroundColor = j === 0 ? 'red' : 'turquoise'
                }, k++ * (151 - speed)/3)
            }
        }

        for (let j = i - 1; ((phase >= 3) || (j >= 0 && array[j] > curr) ) ;) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const barOneStyle = arrayBars[j].style;
            const barTwoStyle = arrayBars[j+1].style;
            const iBar = arrayBars[i].style;
            
            //phase-0 set curr to green
            if(phase === 0) {
                setTimeout(()=> {
                    barOneStyle.backgroundColor = 'red'
                    //barTwoStyle.backgroundColor = 'red'
                    
                    
                    //iBar.backgroundColor = 'green'
                }, k * (151 - speed)/3)
                
                
                phase++;
            } else if (phase === 1) {

                setTimeout(() => {
                    barOneStyle.backgroundColor = 'red'
                    barTwoStyle.backgroundColor = 'red'
                }, k * (151 - speed)/3)
                phase++;

            } else if (phase === 2) {
                // comparing bars color to red

                // const barOneStyle = arrayBars[j].style;
                // const barTwoStyle = arrayBars[j+1].style;
                // const iBar = arrayBars[i].style;
                setTimeout(()=> {
                    //console.log("this is ", j, "  jjjj  ")
                
                    const temp = barTwoStyle.height;
                    barTwoStyle.height = barOneStyle.height;
                    barOneStyle.height = temp;
                    
                    barOneStyle.backgroundColor = 'turquoise'
                    barTwoStyle.backgroundColor = 'turquoise'
                    
                    iBar.backgroundColor = 'yellow'
                }, k * (151 - speed)/3)
                array[j+1] = array[j];
                j--;

                if(j >= 0 && array[j] > curr) {
                    phase = 0;
                   
                }else {
                    j++;
                    phase = 3;
                } 
            } else if(phase === 3) {
                // const barOneStyle = arrayBars[j].style;
                // const barTwoStyle = arrayBars[i].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'purple'
                    iBar.backgroundColor = 'purple'

                }, k * (151 - speed)/3)
                
                phase++;
            } else if (phase === 4) {
                
                // const barOneStyle = arrayBars[j].style;
                // const barTwoStyle = arrayBars[i].style;
                setTimeout(() => {
                   // barOneStyle.height = iBar.height;

                    barOneStyle.backgroundColor = 'turquoise'
                    iBar.backgroundColor = 'turquoise'
                }, k * (151 - speed)/3)
                array[j] = curr;
                break;
            }
            k++;
        }   
    }
    setTimeout(()=> {
        runner();
        originalArray.length = 0;
        originalArray.push(...array)
    }, ++k * (151 - speed)/3)
}