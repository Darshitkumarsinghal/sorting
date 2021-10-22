import React, { Component, useState } from 'react'
import './SortingVisualizer.css'
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms'
import bubbleSort from '../sortingAlgorithms/bubbleSort'
import quickSort from '../sortingAlgorithms/quickSort'
import insertionSort from '../sortingAlgorithms/insertionSort'


export default class SortingVisualizer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            array: [],
            inputSize: '50',
            speed: '90',
            barWidth: '6',
            sorting: false,
            
        }
        // this.runner = this.runner.bind(this)
        this.isRunning = false;
    }

    componentDidMount() {
        this.resetArray();
    }

   

    resetArray() {
        const array = []
        for(let i = 0; i < this.state.inputSize; i++){
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array});
    }

    onChange = (e) => {
        // let oldRange = 200 - 10;
        // let newRange = 3.5 - 0.001;
        // let oldVal = e.target.value;
        // let newVal = (((oldVal - 10)*newRange)/oldRange) + 0.001;
        // newVal = 3.5001 - newVal;
        // console.log(newVal)

        let numWidth = Math.floor(window.screen.width / (e.target.value * 3));

        this.setState({inputSize: e.target.value, barWidth: numWidth});
        this.resetArray();
        
    }

    speedChange = (e) => {
        this.setState({speed: e.target.value})
        //console.log(this.state.speed)
    }
    
    // mergeSort() {
    //     const animations = sortingAlgorithms.mergeSort(this.state.array);
    //     for (let i = 0; i < animations.length; i++){
    //         const arrayBars = document.getElementsByClassName('array-bar');
    //         const isColorChange = i % 3 !== 2;
    //         if(isColorChange) {
    //             const [barOneIdx, barTwoIdx] = animations[i];
                
    //             const barOneStyle = arrayBars[barOneIdx].style;
    //             const barTwoStyle = arrayBars[barTwoIdx].style;
    //             const color = i % 3 === 0 ? 'red' : 'turquoise';
    //             setTimeout(() => {
    //                 barOneStyle.backgroundColor = color;
    //                 barTwoStyle.backgroundColor = color;
    //             }, i * (151 - this.state.speed )) 
    //         } else {
    //             setTimeout(() => {
    //                 const [barOneIdx, newHeight] = animations[i];
    //                 const barOneStyle = arrayBars[barOneIdx].style;
    //                 barOneStyle.height = `${newHeight}px`;
    //             },i * (151 - this.state.speed ))
    //         }
    //     }
    // }
    // hider() {
    //     this.forceUpdate();
    //     return "disabled"
    // }
    
    runner = () => {
        this.isRunning = !this.isRunning;
       this.setState({sorting: !this.state.sorting})
        
        
        console.log(this.isRunning)
    }

    mergeSort() {
        //this.setState({isRunning: true})
        //this.isRunning = !this.isRunning;
        this.runner();
        //this.forceUpdate();
        let newarray = this.state.array.slice();
        this.mergeSortHelper(newarray);
        

    }
    
    mergeSortHelper (array) {
        const animations = sortingAlgorithms.mergeSort(array);
        let k = 0;
        for (let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = animations[i][2];
           // console.log(animations[i])
            if(isColorChange) {
                if(isColorChange === 3) {
                    setTimeout(() => {
                        const [barOneIdx, newHeight, tempBool] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.backgroundColor = 'turquoise';
                    }, i * (151 - this.state.speed )/3)
                    
                } else {
                    const [barOneIdx, barTwoIdx, tempBool] = animations[i];
                    
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = isColorChange === 1 ? 'red' : 'turquoise';
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * (151 - this.state.speed )/3) 
                }
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight, tempBool] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.backgroundColor = 'red';
                    barOneStyle.height = `${newHeight}px`;
                },i * (151 - this.state.speed )/3)
            }
            k = i;
        }
        setTimeout(() => {
            //this.setState({isRunning: false})
            this.runner();
            this.setState({array: array})
        }, ++k * (151 - this.state.speed)/3)
    }

    bubbleSort() {
        this.runner();
        let newArray = this.state.array.slice();
        
        bubbleSort(newArray, this.state.array, this.state.speed,this.runner);

        
        // setTimeout(() => {
        //     this.setState({array: newArray})
        // }, ++k * (151 - this.state.speed))
        
        
        // const animations = bubbleSort(this.state.array);
        // for( let i =0; i< animations.length; i++){
        //     const arrayBars = document.getElementsByClassName('array-bar');
        //     const isColorChange = animations[i][2];
        //     if(isColorChange) {
        //         const [barOneIdx, barTwoIdx, tempbool] = animations[i];
        //         //console.log(animations[i])
        //         const barOneStyle = arrayBars[barOneIdx].style;
        //         const barTwoStyle = arrayBars[barTwoIdx].style;
        //         const color = isColorChange === 1 ? 'red' : 
        //                         isColorChange === 2 ? 'turquoise' : 'green'
        //         setTimeout(()=> {
        //             barOneStyle.backgroundColor = color;
        //             barTwoStyle.backgroundColor = color;

        //         },i * (151 - this.state.speed ) )
        //     } else {
        //         setTimeout(()=>{
        //             const [barOneIdx, barTwoIdx, tempbool] = animations[i];
        //             //console.log(animations[i])
        //             const barOneStyle = arrayBars[barOneIdx].style;
        //             const barTwoStyle = arrayBars[barTwoIdx].style;
        //             const temp = barOneStyle.height;
        //             barOneStyle.height = barTwoStyle.height;
        //             barTwoStyle.height = temp;

        //             // const [barOneIdx, newHeight, temp] = animations[i];
        //             // const barOneStyle = arrayBars[barOneIdx].style;
        //             // barOneStyle.height = `${newHeight}px`
        //         }, i * (151 - this.state.speed ))
        //     }

        // }
    }


    quickSort() {
        this.runner()
        let newArray = this.state.array.slice();
        const animations = quickSort(newArray) 
        let k = 0;
            for(let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                const [barOneIndex, barTwoIndex, option] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style
                const barTwoStyle = arrayBars[barTwoIndex].style
                if(option) {
                    const color = option === 1 ? 'yellow' : 
                                    option === 2 ? 'red' : 'turquoise'
                    setTimeout(()=> {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * (151 - this.state.speed)/3)
                } else {
                    setTimeout(()=> {
                        barOneStyle.backgroundColor = 'green';
                        barTwoStyle.backgroundColor = 'green';
                        let temp = barOneStyle.height
                        barOneStyle.height = barTwoStyle.height
                        barTwoStyle.height = temp;
                    }, i * (151 - this.state.speed)/3)
                    
                }
                k = i;
            }
            setTimeout(()=> {
                this.runner()
                this.setState({array : newArray})
            }, ++k * (151 - this.state.speed)/3);

    }

    insertionSort() {
        this.runner();
        let newArray = this.state.array.slice();
        insertionSort(newArray, this.state.array, this.state.speed, this.runner);
    }




    render() {
        const {array} = this.state;
        const toDisable = this.isRunning ? 'disabled' : null;
        const buttonStyle = this.isRunning ? "buttons" : null;
        const cursorStyle = this.isRunning ? {
            cursor : "default"
        } : {
            cursor: "pointer"
        }
        const rangerStyle = this.isRunning ? {
            color: "black"
        } : {
            color : "white"
        }

        return (
            <div className="array-container">
              
                <div className="header-container">
                    <div className="resetArray">
                        <button className={buttonStyle}
                                style={cursorStyle} 
                             onClick={() => this.resetArray()}
                            disabled={toDisable}>

                            Generate New Array</button>
                    </div>
                    <div className="separator"></div>

                    <div className="sizeChanger"
                        style={rangerStyle}>
                        Adjust The Array size
                    </div>
                    <input className="sizer"
                        type="range"
                        name="arraySize"
                        min="10"
                        max="200"
                        defaultValue="100"
                        onChange={this.onChange} 
                        disabled={toDisable}
                        style={cursorStyle}
                        />
                    

                    <div className="separator"></div>

                    <div className="speedChanger"
                        style={rangerStyle}>
                    Adjust The Speed of Sorting
                    </div>
                    <input className="speeder" 
                        type="range"
                        name="sorting-speed"
                        min="1"
                        max="150"
                        defaultValue="90"
                        onChange={this.speedChange}
                        disabled={toDisable}
                        style={cursorStyle}
                    />
                    

                    
                    <div className="separator"></div>
                    
                       

                    
                        
                    

                    

                    <div className="algos">
                        
                        <button className={buttonStyle}
                            style={cursorStyle}
                                
                                //onClick={!this.isRunning ? () =>this.mergeSort() : null}>
                                onClick={()=> {
                                    if(!this.isRunning){
                                        this.mergeSort();
                                    }
                                }}>
                            Merge Sort</button>
                        <button className={buttonStyle}
                                style={cursorStyle}
                                onClick={() => {
                                if(!this.isRunning){
                                    this.quickSort()    
                                }
                            }}>
                            Quick Sort</button>
                        <button className={buttonStyle}
                            style={cursorStyle}
                            onClick={() => {
                            if(!this.isRunning) {
                                this.insertionSort()
                            }
                        }}>
                            Insertion Sort</button>
                        <button className={buttonStyle}
                            style={cursorStyle} 
                            onClick={() => {
                            if(!this.isRunning) {
                                this.bubbleSort()
                            }
                        }}>
                            Bubble Sort</button>
                    </div>

                </div>
                <div className="array-graph">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{ height: `${value}px`,
                                    width:`${this.state.barWidth }px`
                                }}>
                        </div>
                    ))} 
                </div>


            </div>
        )
    }
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}


