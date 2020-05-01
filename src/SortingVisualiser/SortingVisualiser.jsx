import React from  'react';
import './SortingVisualiser.css';
import {getBubbleSortAnimations} from '../SortingAlgorithm/bubblesort.js';
import {getMergeSortAnimations} from '../SortingAlgorithm/mergesort.js';
import {getSelectionSortAnimations} from '../SortingAlgorithm/selectionsort.js';
const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 310;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';


export default class SortingVisualiser extends React.Component{
  constructor(props){
    super(props);
    this.state={
      array:[],
    };
  }
  componentDidMount(){
    this.resetArray();
  }
  resetArray(){
    const array=[];
    for(let i=0;i<NUMBER_OF_ARRAY_BARS;i++){
      array.push(randomIntFromIntervals(5,730));
    }
    this.setState({array});
  }
  mergeSort(){
   const animations = getMergeSortAnimations(this.state.array);
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
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

  }
  selectionSort(){
    const [animations,sortArray] = getSelectionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [temp, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);
            }
        }
  }
  bubbleSort(){
    const [animations,sortArray] = getBubbleSortAnimations(this.state.array);
       for (let i = 0; i < animations.length; i++) {
           const isColorChange = (i % 4 === 0) || (i % 4 === 1);
           const arrayBars = document.getElementsByClassName('array-bar');
           if(isColorChange === true) {
               const color = (i % 4 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
               const [barOneIndex, barTwoIndex] = animations[i];
               const barOneStyle = arrayBars[barOneIndex].style;
               const barTwoStyle = arrayBars[barTwoIndex].style;
               setTimeout(() => {
                   barOneStyle.backgroundColor = color;
                   barTwoStyle.backgroundColor = color;
               },i * ANIMATION_SPEED_MS);
           }
           else {
               const [barIndex, newHeight] = animations[i];
               if (barIndex === -1) {
                   continue;
               }
               const barStyle = arrayBars[barIndex].style;
               setTimeout(() => {
                   barStyle.height = `${newHeight}px`;
               },i * ANIMATION_SPEED_MS);
           }
       }
  }
  render(){
    const {array}=this.state;
    return (

      <div className="array-container">
      {array.map((value,idx)=>(
        <div className="array-bar" key={idx}
         style={{
            backgroundColor: PRIMARY_COLOR,
           height:`${value}px`}}>
        </div>
      ))}
      <button onClick={()=>this.resetArray()}>Generate New Array</button>
      <button onClick={()=>this.mergeSort()}>Merge Sort</button>
      <button onClick={()=>this.quickSort()}>Quick  Sort</button>
      <button onClick={()=>this.selectionSort()}>Selection  Sort</button>
      <button onClick={()=>this.bubbleSort()}>Bubble Sort</button>
      </div>

    );
  }
}
function randomIntFromIntervals(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
function arraysAreEqual(arrayOne,arrayTwo)
{
  if(arrayOne.length!=arrayTwo.length)return false;
  for(let i=0;i<arrayOne.length;i++)
   {
     if(arrayOne[i]!=arrayTwo[i])return false;
   }
   return true;
}
