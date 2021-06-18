export function getQuickSortAnimations(array) {
    // Check if the array length is less than equal to 1
    if (array.length <= 1) return array;
    // Declare animations array
    var animations = [];
    // Execute quicksort on the array
    animations = QuickSortAlgorithm(array, 0, array.length-1, animations);
    return animations;  
}

function QuickSortAlgorithm(array, startIdx, endIdx, animations) {
    // Declare local variables
    var i = startIdx;
    var j = endIdx;
    var temp;

    // Calculate pivot index as the midpoint between the start index and the end index
    var pivotIdx = (startIdx + endIdx) / 2;
    var pivot = parseInt(array[pivotIdx.toFixed()]);

    /*Partition array*/
    while (i <= j) {
        while (array[i] < pivot)
            i++;       
        while (array[j] > pivot)
            j--;
        if (i <= j){
            // Perform swap
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            // Add swap animation to animations list
            animations.push([i, j, array[i], array[j]]);
            i++;
            j--;         
        }
    }
    /*recursion section*/
    if (startIdx < j)
        QuickSortAlgorithm(array, startIdx, j, animations);
    if (i < endIdx)
        QuickSortAlgorithm(array, i, endIdx, animations);   
    return animations;
}