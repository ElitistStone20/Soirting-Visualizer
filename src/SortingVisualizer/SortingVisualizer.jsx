import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms.js';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    //On mount create the array
    componentDidMount() {
        this.resetArray();
    }

    //Generates a new array of length n of n random integers, where n = the length of the array
    resetArray() {
        const array = [];
        for (let i = 0; i < 310; i++){
            array.push(randomIntFromInterval(10, 700));
        }
        this.setState({array});
    }

    mergeSort() {
        const javaScriptSorted = this.state.array
            .slice()
            .sort((a, b) => a - b);
        const sortedArray = sortingAlgorithms.mergeSort(this.state.array);

        console.log(arraysAreEqual(javaScriptSorted, sortedArray));
    }

    quickSort(){}

    heapSort() {}

    bubbleSort() {}

    testSortingAlgorithms() {
        // Generate 100 different arrays to test
        for (let i = 0; i < 100; i++){
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for (let i = 0; i < length; i++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSorted = array.slice().sort((a, b) => a - b);
            const mergeSorted = sortingAlgorithms.mergeSort(array.slice());

            console.log(`Merge Sort Test ${i}. Pass: ${arraysAreEqual(javaScriptSorted, mergeSorted)}`);
                
        }
    }

    render() {
        const {array} = this.state;

        return ( 
            <>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div 
                        className="array-bar" 
                        key={idx}
                        style={{height: `${value}px`}}></div>
                    ))}
                </div>
                <div className="options-container">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button>
                </div>
            </>
        )
    }
}

// From StackOverflow
function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++){
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}