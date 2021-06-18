export function getBubbleSortAnimations(array){
    // Check if the array length is less than 2
    if (array.length < 2) return array;
    // Declare animations array
    var animations = [];
    // Execute bubble sort on the array
    animations = BubbleSortAlgorithm(array, animations);
    return animations;
}

function BubbleSortAlgorithm(array, animations) {
    // Declare local variables
    let swapped = false, 
    temp = 0,
    count = -1,
    arrayLength = 0;

    // Loop until there has been no swap in elements
    do {
        count++;
        swapped = false;
        // Calculate items left to ensure we don't loop through sorted items
        arrayLength = (array.length-1) - count;
        // Loop through array
        for (let i = 0; i <= arrayLength-1; i++) {    
            // Compare the current index with it's next index       
            if (array[i] > array[i+1]){
                // Perform swap
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