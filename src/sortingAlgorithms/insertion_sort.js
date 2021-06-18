export function getInsertionSortAnimations(array) {
    // Check if the array length is less than or equal to 1
    if (array.length <= 1) return array;
    // Declare animations array
    var animations = [];
    // Execute insertion sort of the array
    animations = InsertionSortAlgorithm(array, animations);
    return animations;
}

function InsertionSortAlgorithm(array, animations) {
    // Declare local variables
    var temp, inner;
    /*
    Start at index 1
    Execute outer loop once per index from 1 to the last index
    */
    for (var outer = 1; outer <= array.length - 1; ++outer) {
        // Store value at current index in temp variable
        temp = array[outer];
        inner = outer;
        /*
        Providing the 'inner' variable is not the first index
        and providing there is an item in the array whose index is less than
        inner, but values is greater than the temp variable
        */
        while (inner > 0 && (array[inner - 1] >= temp)){    
            // Swap the value at inner with the larger value       
            array[inner] = array[inner-1];
            // Push animation to animations array
            animations.push([inner, array[inner]]);
            --inner;
        }
        // Push animation to animations array
        animations.push([inner, temp]);
        // Finish sorting this index
        array[inner] = temp;
    }
    return animations;
}