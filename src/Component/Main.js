import React, { useState, useEffect, useRef } from 'react';
import './Main.css';

function Main() {

  const [n, setN] = useState(300);
  // const [n, setN] = useState(50);
  const [arr, setArr] = useState([]);
  const [element, setElement] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const buttonRef = useRef(null)
  const submitRef = useRef(null)
  const divRefs = useRef(Array(n).fill(null).map(() => React.createRef()));
  const [swap,setSwap] = useState(0);

  const generateRandomArray = (length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 500) + 1);
  };

  const generateBlocks = (arr) => {
    return arr.map((height, index) => (
      <div
        key={index}
        ref={divRefs.current[index]}
        id={`element-${index}`}
        className="block"
        style={{
          height: `${height}px`,
          width: '3px',
          backgroundColor: 'black',
          marginLeft: '1px',
        }}
      ></div>
    ));
  };

  const swapElements = async (arr, i, j) => {
    // Swap positions
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    setSwap((prevCount) => prevCount + 1)

    setArr([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 10));
  };

  const bubbleSort = async () => {
    let newArray = [...arr];
    let n = newArray.length;

    for (let i = 0; i < n - 1; i++) {
      divRefs.current[i].current.style.backgroundColor = 'red';
      for (let j = 0; j < n - i - 1; j++) {
        divRefs.current[j].current.style.backgroundColor = 'red';
        if (newArray[j] > newArray[j + 1]) {
          await swapElements(newArray, j, j + 1);
        }
        divRefs.current[j].current.style.backgroundColor = 'black';
      }
      divRefs.current[i].current.style.backgroundColor = 'black';
    }
    buttonToggle(false)
  };

  const insertionSort = async () => {
    let newArray = [...arr];
    const n = newArray.length;

    for (let i = 1; i < n; i++) {
      let currentElement = newArray[i];
      let j = i - 1;
      divRefs.current[i].current.style.backgroundColor = 'red';
      while (j >= 0 && newArray[j] > currentElement) {
        divRefs.current[j].current.style.backgroundColor = 'red';
        newArray[j + 1] = newArray[j];
        await swapElements(newArray, j, j + 1);
        divRefs.current[j].current.style.backgroundColor = 'black';
        j--;
      }

      newArray[j + 1] = currentElement;
      divRefs.current[i].current.style.backgroundColor = 'black';
      setArr([...newArray]);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    buttonToggle(false)
  };

  const merge = async (arr, left, mid, right) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const leftArray = new Array(n1);
    const rightArray = new Array(n2);

    for (let i = 0; i < n1; i++) {
      leftArray[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
      rightArray[j] = arr[mid + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
      // Highlight elements being compared
      divRefs.current[left + i].current.style.backgroundColor = 'red';
      divRefs.current[mid + 1 + j].current.style.backgroundColor = 'red';

      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      setArr([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Reset background color after comparison
      if (left + i - 1 > -1)
        divRefs.current[left + i - 1].current.style.backgroundColor = 'black';
      divRefs.current[mid + 1 + j - 1].current.style.backgroundColor = 'black';

      k++;
    }

    while (i < n1) {
      arr[k] = leftArray[i];
      setArr([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 10));
      divRefs.current[left + i].current.style.backgroundColor = 'black';
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = rightArray[j];
      setArr([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 10));
      divRefs.current[mid + 1 + j].current.style.backgroundColor = 'black';
      j++;
      k++;
    }
  };


  const mergeSort = async (arr, left, right) => {
    if (left < right) {
      const mid = Math.floor(left + (right - left) / 2);

      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);

      await merge(arr, left, mid, right);
    }
  };

  const performMergeSort = async () => {
    const newArray = [...arr];
    const n = newArray.length;
    await mergeSort(newArray, 0, n - 1);
    buttonToggle(false)
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;


    for (let j = low; j <= high - 1; j++) {
      divRefs.current[j].current.style.backgroundColor = 'red';
      divRefs.current[high].current.style.backgroundColor = 'red';

      if (arr[j] < pivot) {
        i++;
        await swapElements(arr, i, j);
      }

      divRefs.current[j].current.style.backgroundColor = 'black';
      divRefs.current[high].current.style.backgroundColor = 'black';
    }

    await swapElements(arr, i + 1, high);

    divRefs.current[i + 1].current.style.backgroundColor = 'black';
    divRefs.current[high].current.style.backgroundColor = 'black';
    return i + 1;
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const partitionIndex = await partition(arr, low, high);

      await quickSort(arr, low, partitionIndex - 1);
      await quickSort(arr, partitionIndex + 1, high);
    }
  };

  const performQuickSort = async () => {
    let newArray = [...arr];
    await quickSort(newArray, 0, newArray.length - 1);
    buttonToggle(false)
  };

  const selectionSort = async () => {
    let newArray = [...arr];

    for (let i = 0; i < newArray.length - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < newArray.length; j++) {
        // Change color to red while comparing
        divRefs.current[j].current.style.backgroundColor = 'red';
        divRefs.current[minIndex].current.style.backgroundColor = 'red';

        if (newArray[j] < newArray[minIndex]) {
          // Reset background color after comparison
          divRefs.current[minIndex].current.style.backgroundColor = 'black';
          minIndex = j;
        } 
        
        divRefs.current[j].current.style.backgroundColor = 'black';
      }

      if (minIndex !== i) {
        await swapElements(newArray, i, minIndex);
      }
    }
  };

  const performSelectionSort = async () => {
    await selectionSort();
    buttonToggle(false)
  };
  

  const buttonToggle = (flag)=>{
    buttonRef.current.disabled = flag
    submitRef.current.disabled = flag
  }
  useEffect(() => {
    setArr(generateRandomArray(n));
  }, [n]);

  useEffect(() => {
    setElement(generateBlocks(arr));
  }, [arr]);


  const reset = () => {
    setArr(generateRandomArray(n));
    setElement(generateBlocks(arr));
  }

  const sortingAlgorithms = {
    bubbleSort: bubbleSort,
    insertionSort: insertionSort,
    performMergeSort: performMergeSort,
    performQuickSort: performQuickSort,
    performSelectionSort: performSelectionSort,
  };

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleButtonClick = () => {
    const selectedFunction = sortingAlgorithms[selectedAlgorithm];
    buttonToggle(true)
    setSwap(0);
    if (selectedFunction) {
      selectedFunction();
    }
  };

  return (
    <div className="mainBody">
      <div className='header' style={{ color: 'black' }}>
        <h3>Swapping - {swap} Sort visualization</h3>
      </div>
      <div>
        <select value={selectedAlgorithm} onChange={handleAlgorithmChange}>
          <option value="bubbleSort">Bubble Sort</option>
          <option value="insertionSort">Insertion Sort</option>
          <option value="performMergeSort">Merge Sort</option>
          <option value="performQuickSort">Quick Sort</option>
          <option value="performSelectionSort">Selection Sort</option>
        </select> &nbsp; &nbsp;
        <button ref={submitRef} onClick={handleButtonClick}>Start</button>
      </div>
      <div className="blockContainer" style={{ margin: "50px", display: "flex", alignItems: "flex-end" }}>{element}</div>
      <div className='footer' style={{ color: 'black' }}>
        <button ref={buttonRef} className='resetButton' onClick={reset}>Reset</button>
      </div>

    </div>
  );
}

export default Main;
