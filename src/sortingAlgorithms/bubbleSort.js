// export default function bubbleSort(array) {
//     if(array.length <= 1) return array;
//     const animations = [];
//     const auxilaryArray = array.slice();
//     let n = array.length;

//     for (let i = 0; i < n -1; i++){
//         for( let j = 0; j < n - i - 1; j++){
//             // making the bar red at 1
//             animations.push([j, j+1, 1])
            
//             if(array[j] > array[j + 1]) {
//                 // color to be exchanged at 3
//                 animations.push([j, j+1, 3])
                
//                 animations.push([j, j+1, 0])
//                 let temp = array[j+1];
//                 array[j+1] = array[j];
//                 array[j] = temp
                
//             }
//             // back to normal color at 2
//             animations.push([j, j+1, 2])

//         }
//     }
//     console.log(document.getElementsByClassName('array-bar'))
    
//     return animations;
// }


export default function bubbleSort(array, originalArray, speed, runner) {
    if(array.length <= 1) return;
    const animations = [];
   
    let n = array.length;
    let k = 0;
    let phase = 0;

    for (let i = 0; i < n -1; i++){
        for( let j = 0; j < n - i - 1; ){
            const arrayBars = document.getElementsByClassName('array-bar');

            // making the bar red at 1
            const barOneStyle = arrayBars[j].style;
            const barTwoStyle = arrayBars[j+1].style;

            if(phase === 0) {
                setTimeout(()=> {
                    barOneStyle.backgroundColor = 'red'
                    barTwoStyle.backgroundColor = 'red'
                }, k * (151 - speed )/8)
                phase++;
            } else if (phase === 1) {
                if(array[j] > array[j + 1]) {
                    // color to be exchanged at 3
                    setTimeout(()=> {
                        barOneStyle.backgroundColor = 'green'
                        barTwoStyle.backgroundColor = 'green'
                    }, k * (151 - speed )/8)
                    
                    //exchange the hieghts
                    setTimeout(()=> {
                        const tempHeight = barOneStyle.height;
                        barOneStyle.height = barTwoStyle.height;
                        barTwoStyle.height = tempHeight;
                    }, k * (151 - speed )/8)
    
                    let temp = array[j+1];
                    array[j+1] = array[j];
                    array[j] = temp
                }
                phase++;

            } else if (phase === 2) {
                // back to normal color at 2
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'turquoise'
                    barTwoStyle.backgroundColor = 'turquoise'
                }, k * (151 - speed)/8)
                phase++;
                j++;
            } 

            k++;
            phase %= 3;

        }
    }
    //console.log(document.getElementsByClassName('array-bar'))
    
    setTimeout(()=> {
        runner()
        originalArray.length = 0;
        originalArray.push(...array)
        //console.log(originalArray)
    }, ++k * (151 - speed)/8)
    
}