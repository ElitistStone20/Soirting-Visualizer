import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../sortingAlgorithms/mergeSort.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubble_sort';
import { getQuickSortAnimations } from '../sortingAlgorithms/quicksort';
import { getHeapSortAnimations } from '../sortingAlgorithms/heap_sort';

var ANIMATION_SPEED_MS = 6;
var NUMBER_OF_ARRAY_BARS = 310;
const COMPLETED_SPEED = 3;
const BAR_COLOUR = 'turquoise';
const FINALISED_COLOR = 'lightgreen';

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
        this.reset_bar_colours();
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            array.push(randomIntFromInterval(10, 700));
        }
        this.setState({array});      
    }

    reset_bar_colours(){
        const array_bars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < array_bars.length; i++) {          
            const bar_style = array_bars[i].style;
            bar_style.backgroundColor = BAR_COLOUR;                 
        }
    }

    sort_complete(array_bars){
        for (let i = 0; i < array_bars.length; i++) {
            setTimeout(() => {
                const bar_style = array_bars[i].style;
                bar_style.backgroundColor = FINALISED_COLOR;
            }, i * COMPLETED_SPEED);           
        }
        enable_disable_buttons(false);
    }

    mergeSort() {
        enable_disable_buttons(true);
        // Get all the animations for merge sort
        const animations = getMergeSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++){                            
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);            
            if (i === animations.length-1){
                setTimeout(() => {
                    this.sort_complete(arrayBars); 
                }, i * ANIMATION_SPEED_MS);           
            }
        }             
    }

    quickSort(){
        enable_disable_buttons(true);
        const animations = getQuickSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {         
            // Perform swap operation on bars
            setTimeout(() => {               
                const [barOneIdx, barTwoIdx, newHeightOne, newHeightTwo] = animations[i];
                console.log(barOneIdx, barTwoIdx);
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                barOneStyle.height = `${newHeightOne}px`;
                barTwoStyle.height = `${newHeightTwo}px`;
            }, i * ANIMATION_SPEED_MS);            
            if (i === animations.length-1){
                setTimeout(() => {
                    this.sort_complete(arrayBars);
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    heapSort() {
        enable_disable_buttons(true);
        const animations = getHeapSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {         
            // Perform swap operation on bars
            setTimeout(() => {               
                const [barOneIdx, barTwoIdx, newHeightOne, newHeightTwo] = animations[i];
                console.log(barOneIdx, barTwoIdx);
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                barOneStyle.height = `${newHeightOne}px`;
                barTwoStyle.height = `${newHeightTwo}px`;
            }, i * ANIMATION_SPEED_MS);            
            if (i === animations.length-1){
                setTimeout(() => {
                    this.sort_complete(arrayBars);
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    bubbleSort() {
        ANIMATION_SPEED_MS = 1;
        enable_disable_buttons(true);
        const animations = getBubbleSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {                    
            // Perform swap operation on bars
            setTimeout(() => {
                const [barOneIdx, barTwoIdx, newHeightOne, newHeightTwo] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                barOneStyle.height = `${newHeightOne}px`;
                barTwoStyle.height = `${newHeightTwo}px`;
            }, i * ANIMATION_SPEED_MS);           
            if (i === animations.length-1){
                setTimeout(() => {
                    this.sort_complete(arrayBars);
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    insertionSort() {
        alert("Not implemented in this version!");
    }

    render() {
        const {array} = this.state;

        return ( 
            <div className="App">               
                <div className="options-container">
                    <button type="button" id="option-button" onClick={() => this.resetArray()}>Generate New Array</button>
                    <button type="button" id="option-button" onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button type="button" id="option-button" onClick={() => this.quickSort()}>Quick Sort</button>
                    <button type="button" id="option-button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button type="button" id="option-button" onClick={() => this.heapSort()}>Heap Sort</button>
                    <button type="button" id="option-button" onClick={() => this.insertionSort()}>Insertion Sort</button>
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

function enable_disable_buttons(enabled) {
    const buttons = document.getElementById("option-button");
    for (let i = 0; i < buttons.length; i++){
        buttons[i].disabled = enabled;
    }
}