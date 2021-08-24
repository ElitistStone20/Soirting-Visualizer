import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort.js";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubble_sort";
import { getQuickSortAnimations } from "../sortingAlgorithms/quicksort";
import { getHeapSortAnimations } from "../sortingAlgorithms/heap_sort";
import { getInsertionSortAnimations } from "../sortingAlgorithms/insertion_sort";
import OptionButton from "./optionButton";
import 'react-dropdown/style.css';

export default function SortingVisualizer() {
  
  // State variables
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [animationSpeedMs, setAnimationSpeedMs] = useState(9);
  const numberOfArrayBars = useState(310)[0];
  let visualise_props = {
    id:"option-button",
    clickCallback:runSortAlgorithm  
  }
  let generate_props = {
    id:"reset-button",
    clickCallback:resetArray
  }

  useEffect(() => {
    resetArray();
    resetBarColours();
  }, []);

  const completedSpeed = 3;
  const barColor = "turquoise";
  const finalisedColor = "lightgreen";

  //Generates a new array of length n of n random integers, where n = the length of the array
  function resetArray() {
    // Check if bars are being sorted at present
    if (isSorting) return;
    // Resets bar colours
    resetBarColours();
    const newArray = Array(numberOfArrayBars)
      .fill()
      .map(() => randomIntFromInterval(10, 700));
    setArray(newArray);
  }

  // Resets the bar colours
  function resetBarColours() {
    // Get bars by class name
    const arrayBars = document.getElementsByClassName("array-bar");
    // Loop through all the bars
    for (const bar of arrayBars) {
      // Set bar's background colour to the default bar colour
      bar.style.backgroundColor = barColor;
    }
  }

  //Sort completed animation
  function sortComplete(arrayBars) {
    // Loop through all the bars
    for (let i = 0; i < arrayBars.length; i++) {
      setTimeout(() => {
        // Get individual bar's style property
        const barStyle = arrayBars[i].style;
        // Set bar colour to the finalised colour
        barStyle.backgroundColor = finalisedColor;
      }, i * completedSpeed);
    }
    // Set is sorted to false so that other functions can be used
    setIsSorting(false);
    // Reset animation speed
    setAnimationSpeedMs(6);
  }

  //Run animations for algorithms that swap both elements
  function runAnimations(animations) {
    // Get all bars using class name identifier
    const arrayBars = document.getElementsByClassName("array-bar");
    // Loop through all the bars
    for (let i = 0; i < animations.length; i++) {
      // Perform swap operation on bars
      setTimeout(() => {
        // Define appropiate variables
        const [barOneIdx, barTwoIdx, newHeightOne, newHeightTwo] =
          animations[i];
        // Get bar one and two styles
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        // Set the height of both bars
        barOneStyle.height = `${newHeightOne}px`;
        barTwoStyle.height = `${newHeightTwo}px`;
      }, i * animationSpeedMs);
      // If the loop is on the last element of the aniamtion list
      if (i === animations.length - 1) {
        setTimeout(() => {
          // Call sort completed function
          sortComplete(arrayBars);
        }, i * animationSpeedMs);
      }
    }
  }

  // Run animation for algorithms that overright elements
  function runAnimationsSingleSwap(animations) {
    // Get all bars using class name identifier
    const arrayBars = document.getElementsByClassName("array-bar");
    // Loop through all animation elements
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        // Declare appropiate variables
        const [barOneIdx, newHeight] = animations[i];
        // Get current bar style
        const barOneStyle = arrayBars[barOneIdx].style;
        // Set current bar's height to the new height
        barOneStyle.height = `${newHeight}px`;
      }, i * animationSpeedMs);
      // If the loop is on the last element in the animations array
      if (i === animations.length - 1) {
        setTimeout(() => {
          // Call sort complete function
          sortComplete(arrayBars);
        }, i * animationSpeedMs);
      }
    }
  }


  function sortAnimation(getAnimationsFunc, runAnimationsFunc) {
    // Check if the bars are currently being sorted
    if (isSorting) return;
    setIsSorting(true);
    // Getting animations
   
    const animations = getAnimationsFunc([...array]);
    // Running animations
    runAnimationsFunc(animations);
  }

  function mergeSort() {
    sortAnimation(getMergeSortAnimations, runAnimationsSingleSwap);
  }

  function quickSort() {
    sortAnimation(getQuickSortAnimations, runAnimations);
  }

  function heapSort() {
    sortAnimation(getHeapSortAnimations, runAnimations);
  }

  function bubbleSort() {
    setAnimationSpeedMs(1);
    sortAnimation(getBubbleSortAnimations, runAnimations);
  }

  function insertionSort() {
    setAnimationSpeedMs(4);
    sortAnimation(getInsertionSortAnimations, runAnimationsSingleSwap);
  }

  // Function to determine which sorting algorithm to execute and visualise
  function runSortAlgorithm(){
    // Get select object
    const selection = document.getElementById("algo-select");

    // Switch the potential value
    switch (selection.value) {
      case "1":
        return mergeSort();       
      case "2":
        return quickSort();      
      case "3":
        return bubbleSort();        
      case "4":
        return heapSort();       
      case "5":
        return insertionSort();        
      default:
        console.log("No algorithm selected!");
        break;
    }
  }

  // Rendering page
  return (
    <div className="App">
      <div className="options-container">        
        <OptionButton {...visualise_props}>Visualise!</OptionButton> 
        <div className="options">         
          <select id="algo-select">
            <option value="1">Merge Sort</option>
            <option value="2">Quick Sort</option>
            <option value="3">Bubble Sort</option>
            <option value="4">Heap Sort</option>
            <option value="5">Insertion Sort</option>
          </select>                   
          <OptionButton {...generate_props}>Generate New Array</OptionButton>    
        </div>    
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px` }}
          />
        ))}
      </div>
    </div>
  );
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
