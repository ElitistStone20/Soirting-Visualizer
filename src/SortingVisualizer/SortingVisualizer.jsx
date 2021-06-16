import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../sortingAlgorithms/mergeSort.js';

const ANIMATION_SPEED_MS = 3;
const NUMBER_OF_ARRAY_BARS = 310;
const COMPARISON_COLOUR = 'red';
const BAR_COLOUR = 'turquoise';

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
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            array.push(randomIntFromInterval(10, 700));
        }
        this.setState({array});
    }

    mergeSort() {
        // Get all the animations for merge sort
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            // Check to see if there is a colour change
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? COMPARISON_COLOUR : BAR_COLOUR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort(){
        alert("Not implemented in this version!")
    }

    heapSort() {
        alert("Not implemented in this version!")
    }

    bubbleSort() {
        alert("Not implemented in this version!")
    }

    render() {
        const {array} = this.state;

        return ( 
            <div className="App">               
                <div className="options-container">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div 
                        className="array-bar" 
                        key={idx}
                        style={{height: `${value}px`}}></div>
                    ))}
                </div>              
            </div>
        )
    }
}

// From StackOverflow
function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}