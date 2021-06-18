import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../sortingAlgorithms/mergeSort.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubble_sort';
import { getQuickSortAnimations } from '../sortingAlgorithms/quicksort';
import { getHeapSortAnimations } from '../sortingAlgorithms/heap_sort';
import { getInsertionSortAnimations } from '../sortingAlgorithms/insertion_sort';

// Adjustable variables
var ANIMATION_SPEED_MS = 9;
var NUMBER_OF_ARRAY_BARS = 310;
var isSorting = false;
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
        // Check if bars are being sorted at present
        if (isSorting) return;
        // Resets bar colours
        this.reset_bar_colours();
        const array = [];
        // Loop through all bars
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            // generate random integer between 10 and 700
            array.push(randomIntFromInterval(10, 700));
        }
        this.setState({array});   
    }

    reset_bar_colours(){
        // Get bars by class name
        const array_bars = document.getElementsByClassName('array-bar');
        // Loop through all the bars
        for (let i = 0; i < array_bars.length; i++) {          
            // Get the style property for the individual bar
            const bar_style = array_bars[i].style;
            // Set bar's background colour to the default bar colour
            bar_style.backgroundColor = BAR_COLOUR;                 
        }
    }

    sort_complete(array_bars){
        // Loop through all the bars
        for (let i = 0; i < array_bars.length; i++) {            
            setTimeout(() => {
                // Get individual bar's style property
                const bar_style = array_bars[i].style;
                // Set bar colour to the finalised colour
                bar_style.backgroundColor = FINALISED_COLOR;
            }, i * COMPLETED_SPEED);           
        }
        // Set is sorted to false so that other functions can be used
        isSorting = false;
        // Reset animation speed
        ANIMATION_SPEED_MS = 6;
    }

    run_animations(animations) {
        // Get all bars using class name identifier
        const arrayBars = document.getElementsByClassName('array-bar');
        // Loop through all the bars
        for (let i = 0; i < animations.length; i++) {         
            // Perform swap operation on bars
            setTimeout(() => {        
                // Define appropiate variables       
                const [barOneIdx, barTwoIdx, newHeightOne, newHeightTwo] = animations[i];    
                // Get bar one and two styles          
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                // Set the height of both bars
                barOneStyle.height = `${newHeightOne}px`;
                barTwoStyle.height = `${newHeightTwo}px`;
            }, i * ANIMATION_SPEED_MS);    
            // If the loop is on the last element of the aniamtion list        
            if (i === animations.length-1){
                setTimeout(() => {
                    // Call sort completed function
                    this.sort_complete(arrayBars);
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    run_animations_single_swap(animations) {
        // Get all bars using class name identifier
        const arrayBars = document.getElementsByClassName('array-bar');
        // Loop through all animation elements
        for (let i = 0; i < animations.length; i++){                            
            setTimeout(() => {
                // Declare appropiate variables
                const [barOneIdx, newHeight] = animations[i];
                // Get current bar style
                const barOneStyle = arrayBars[barOneIdx].style;
                // Set current bar's height to the new height
                barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);       
            // If the loop is on the last element in the animations array     
            if (i === animations.length-1){
                setTimeout(() => {
                    // Call sort complete function
                    this.sort_complete(arrayBars); 
                }, i * ANIMATION_SPEED_MS);           
            }
        }           
    }

    mergeSort() {
        // Check if the bars are currently being sorted
        if (isSorting) return;
        isSorting = true;
        // Get all the animations for merge sort
        const animations = getMergeSortAnimations(this.state.array);
        // Run animations
        this.run_animations_single_swap(animations);  
    }

    quickSort(){
        // Check if the bars are currently being sorted
        if (isSorting) return;
        isSorting = true;
        // Get animations for the quick sort
        const animations = getQuickSortAnimations(this.state.array);
        // Run the animations
        this.run_animations(animations);
    }

    heapSort() {
        // Check if the bars are currently being sorted
        if (isSorting) return;
        isSorting = true;
        // Get the animations for the heap sort
        const animations = getHeapSortAnimations(this.state.array);
        this.run_animations(animations);
    }

    bubbleSort() {
        // Check if the bars are currently being sorted
        if (isSorting) return;
        isSorting = true;
        // Set animation speed for this sort as it is slow for the current array size
        ANIMATION_SPEED_MS = 1;
        // Get animations for the bubble sort
        const animations = getBubbleSortAnimations(this.state.array);
        // Run the animations
        this.run_animations(animations);
    }

    insertionSort() {
        // Check if the bars are currently being sorted
        if (isSorting) return;
        isSorting = true;
        // Set the animation speed for this sort
        ANIMATION_SPEED_MS = 4;
        // Get the animations for the insertion sort
        const animations = getInsertionSortAnimations(this.state.array);
        // Run the animations
        this.run_animations_single_swap(animations);
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

/*
Function to generate a random integer between minimum and maximum values
From StackOverflow
 */
function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}