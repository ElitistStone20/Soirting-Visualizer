export function getHeapSortAnimations(array) {
    var animations = [];
    if (array.length <= 1) return array;
    animations = HeapSortAlgorithm(array, animations);
    console.log(animations);
    return animations;
}

function swap(array, index_a, index_b, animations) {
    console.log(animations);
    var temp = array[index_a];
    array[index_a] = array[index_b];
    array[index_b] = temp;
    animations.push([index_a, index_b, array[index_a], array[index_b]]);
    return animations;
}

function heap_root(array, i, array_length, animations) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < array_length && array[left] > array[max]){
        max = left;
    }
    if (right < array_length && array[right] > array[max]) {
        max = right;
    }
    if (max !== i) {
        animations = swap(array, i, max, animations);
        animations = heap_root(array, max, animations);
    }
    return animations;
}

function HeapSortAlgorithm(array, animations) {
    var array_length = array.length;
    for (let i = Math.floor(array_length / 2); i>= 0; i -= 1) {
        animations = heap_root(array, i, array_length);
    }
    for (let i = array.length - 1; i > 0; i--){
        animations = swap(array, 0, i, animations);
        array_length--;

        animations = heap_root(array_length, 0, animations);
    }
    return animations;
}