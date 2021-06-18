export function getBubbleSortAnimations(array){
    var animations = [];
    if (array.length <= 1) return array;
    animations = BubbleSortAlgorithm(array, animations);
    return animations;
}

function BubbleSortAlgorithm(array, animations) {
    if (array.length < 2) return array;
    let swapped = false, 
    temp = 0,
    count = -1,
    arrayLength = 0;

    do {
        count++;
        swapped = false;
        // Calculate items left to ensure we don't loop through sorted items
        arrayLength = (array.length-1) - count;
        for (let i = 0; i <= arrayLength-1; i++) {           
            if (array[i] > array[i+1]){
                temp = array[i+1];
                array[i+1] = array[i];
                array[i] = temp;
                //Push swap animation
                animations.push([i, i+1, array[i], array[i+1]]);              
                swapped = true;
            }
        }
    }
    while (swapped)  
    return animations;
}