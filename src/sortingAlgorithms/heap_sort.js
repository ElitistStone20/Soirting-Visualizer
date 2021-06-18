var animations;
export function getHeapSortAnimations(array) {
    // Check if array length is less than or equal to 1
    if (array.length <= 1) return array;
    animations = [];
    // Execute heap sort
    HeapSortAlgorithm(array);
    return animations;
}

function swap(array, firstIdx, lastIdx) {
    const temp = array[firstIdx];

    // Swap first and last items in the array
    array[firstIdx] = array[lastIdx];
    array[lastIdx] = temp;

    //Push animation to animation array
    animations.push([firstIdx, lastIdx, array[firstIdx], array[lastIdx]]);
}

function heapify(heap, i, max) {
    // Declare local variables
    let index, leftChild, rightChild;

    while (i < max) {
        index = i;

        leftChild = 2 * i + 1;
        rightChild = leftChild + 1;

        // If the left child is not last element 
        // And its value is bigger
        if (leftChild < max && heap[leftChild] > heap[index]) {
            index = leftChild;
        }
    
        // If the right child is not last element 
        // And its value is bigger
        if (rightChild < max && heap[rightChild] > heap[index]) {
            index = rightChild;
        }
    
        // If none of the above conditions is true
        // Just return
        if (index === i) return
        // Else swap elements
        swap(heap, i, index);
        // Continue by using the swapped index
        i = index;
    }
}

function buildMaxHeap(array) {
    // Get index of middle element
    let i = Math.floor(array.length / 2 - 1);

    // Build max heap out of all elements passed
    while (i >= 0) {
        heapify(array, i, array.length);
        i -=1;
    }
}

function HeapSortAlgorithm(array) {
    buildMaxHeap(array);

    var lastElement = array.length - 1;

    while (lastElement > 0) {
        swap(array, 0, lastElement);
        heapify(array, 0, lastElement);
        lastElement -= 1;
    }
}