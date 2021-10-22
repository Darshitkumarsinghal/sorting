// export const mergeSort = array => {
//     if(array.length === 1) return array;
//     const middleIdx = Math.floor(array.length / 2)
//     const firstHalf = mergeSort(array.slice(0, middleIdx))
//     const secondHalf = mergeSort(array.slice(middleIdx))

//     const sortedArray = [];
//     let i =0, j = 0;
//     while (i < firstHalf.length && j < secondHalf.length){
//         if(firstHalf[i] < secondHalf[j]){
//             sortedArray.push(firstHalf[i++])
//         }else {
//             sortedArray.push(secondHalf[j++])
//         }
        
//     }
//     while (i < firstHalf.length) sortedArray.push(firstHalf[i++])
//     while (j < secondHalf.length) sortedArray.push(secondHalf[j++])
//     return sortedArray;
// }

export function mergeSort(array) {
    const animations = [];
    if(array.length <= 1) return array;
    const auxilaryArray = array.slice();
    mergeSortHelper(array, 0, array.length-1, auxilaryArray, animations);
    return animations;
}

function mergeSortHelper (
    mainArray,
    startIdx,
    endIdx,
    auxilaryArray,
    animations
) {
    if(startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxilaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxilaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxilaryArray, animations);
}

// function doMerge(
//     mainArray, 
//     startIdx,
//     middleIdx,
//     endIdx,
//     auxilaryArray,
//     animations
// ) {
//     let k = startIdx;
//     let i = startIdx;
//     let j = middleIdx + 1;

//     while (i <= middleIdx && j <= endIdx) {
//         animations.push([i, j])
//         // animations.push([i, j])
        
//         if(auxilaryArray[i] <= auxilaryArray[j]) {
//             animations.push([k, auxilaryArray[i]]);
//             mainArray[k++] = auxilaryArray[i++];
//             animations.push([i-1, j])
//         } else {
//             animations.push([k, auxilaryArray[j]])
//             mainArray[k++] = auxilaryArray[j++];
//             animations.push([i, j - 1])
//         }
//     }
    
//     while (i <= middleIdx) {
//         animations.push([i, i]);
        
//         animations.push([k, auxilaryArray[i]])
//         mainArray[k++] = auxilaryArray[i++];
//         animations.push([i-1, i-1]);
//     }

//     while (j <= endIdx) {
//         animations.push([j, j])
        
//         animations.push([k, auxilaryArray[j]])
//         mainArray[k++] = auxilaryArray[j++];
//         animations.push([j-1, j-1])
//     } 
// }

function doMerge(
    mainArray, 
    startIdx,
    middleIdx,
    endIdx,
    auxilaryArray,
    animations
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    let tempAnimations = [];

    while (i <= middleIdx && j <= endIdx) {
        //comparing to red
        animations.push([i, j, 1])
        
        //back to turquoise
        animations.push([i, j, 2])
        
        if(auxilaryArray[i] <= auxilaryArray[j]) {

            //overwriting values
            tempAnimations.push([k, auxilaryArray[i], 0]);
            tempAnimations.push([k, auxilaryArray[i], 3]);

            mainArray[k++] = auxilaryArray[i++];

        } else {
            // overwriting value
            tempAnimations.push([k, auxilaryArray[j], 0])
            tempAnimations.push([k, auxilaryArray[j], 3])
            mainArray[k++] = auxilaryArray[j++];

            // //back turquoise
            // animations.push([i, j - 1])
        }
    }
    
    while (i <= middleIdx) {
        animations.push([i, i, 1]);
        animations.push([i, i, 2]);
        
        tempAnimations.push([k, auxilaryArray[i], 0])
        tempAnimations.push([k, auxilaryArray[i], 3])
        mainArray[k++] = auxilaryArray[i++];
    }

    while (j <= endIdx) {
        animations.push([j, j, 1])
        animations.push([j, j, 2])
        
        tempAnimations.push([k, auxilaryArray[j], 0])
        tempAnimations.push([k, auxilaryArray[j], 3])
        mainArray[k++] = auxilaryArray[j++];
    }
    animations.push(...tempAnimations);
}



 
