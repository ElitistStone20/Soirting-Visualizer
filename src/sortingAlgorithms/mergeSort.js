export function getMergeSortAnimations(array) {
    // Check if the array length is less than or equal to 1
    if (array.length <= 1) return array;
    // Declare animations array
    const animations = [];
    // Declare auxilary array
    const auxilaryArray = array.slice();
    // Execute the merge sort helper
    mergeSortHelper(array, 0, array.length - 1, auxilaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray, 
    startIdx, 
    endIdx, 
    auxilaryArray, 
    animations
) {
    // Check if start index equals the end index
    if (startIdx === endIdx) return;
    // Calculate the middle index
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    // Recursive section
    mergeSortHelper(auxilaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxilaryArray, middleIdx + 1, endIdx, mainArray, animations);
    mergeSortAlgorithm(mainArray,  startIdx, middleIdx, endIdx, auxilaryArray, animations);
}

function mergeSortAlgorithm(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    // Declare local variables
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {       
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}
