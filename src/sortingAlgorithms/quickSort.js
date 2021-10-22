function pivotIndex(array, start, end, animations) {
    let pivotValue = array[end];
    
    let pIndex = start; 
    //pivot color to red 
    animations.push([pIndex, end, 1]);
    
    for( let i = start; i < end; i++){
        //comparing bars to green
        let bool = false;
        animations.push([i, pIndex, 2])
        if(array[i] < pivotValue) {
            bool = true;
            //change the height
            animations.push([i, pIndex, 0])

            let temp = array[pIndex]
            array[pIndex] = array[i];
            array[i] = temp;

            pIndex++;
        }
        if(bool) {
            animations.push([i, pIndex-1, 3])
        } else {
            animations.push([i, pIndex, 3])
        }

        
        //back to turqoise
    }

    //swap pivot with pivot Index
    //change the height
    animations.push([end, pIndex, 2])
    animations.push([end, pIndex, 0])
    animations.push([end, pIndex, 3])
    array[end] = array[pIndex]
    array[pIndex] = pivotValue;

    return pIndex;
}

export default function quickSort(array){
    let animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
} 

function quickSortHelper(array, start, end, animations) {
    if(start >= end ) return;

    let pivot = pivotIndex(array, start, end, animations)
    quickSortHelper(array, start, pivot - 1, animations)
    quickSortHelper(array, pivot+1, end, animations)
}