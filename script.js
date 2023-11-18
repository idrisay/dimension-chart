let numberOfDatasets = 4;
let dataOfChartSets = [];
let dimensionQuestions = [
    'Question 1',
    'Question 2',
    'Question 3',
    'Question 4',
    'Question 5',
    'Question 6',
    'Question 7',
    'Question 8',
];

dimensionQuestions.forEach((elem, index) => {
    let questionText = document.createElement('h2')
    questionText.innerHTML = elem
    questionText.classList.add('py-1')
    document.querySelector('#dimension-questions').appendChild(questionText)
})

new Array(numberOfDatasets).fill(0).forEach((element, index) => {
  let newData = new Array(dimensionQuestions?.length).fill(0);

  dataOfChartSets[index] = newData;
});

dataOfChartSets.forEach((element, index) => {
  let newDatasetDiv = document.createElement("div");
  newDatasetDiv.classList.add("dataset");
  let dataTitle = document.createElement("h2");
  
  dataTitle.innerHTML = `${index + 1}. Dataset`;
  newDatasetDiv.appendChild(dataTitle);

  console.log(element);
  element.forEach((subElement, subIndex) => {
    let dimensionDiv = document.createElement("div");
    dimensionDiv.classList.add("dimension");
    let dimensionLabel = document.createElement("label")
    // let dimensionSpan = document.createElement("span")
    // dimensionSpan.innerHTML = `${subIndex + 1}. dimension`
    // dimensionLabel.appendChild(dimensionSpan);
    
    let dimensionInput = document.createElement("input")
    dimensionInput.classList.add("border");
    dimensionInput.classList.add("w-20");
    dimensionLabel.appendChild(dimensionInput);


    dimensionDiv.appendChild(dimensionLabel);
    
    // let text = document.createTextNode(`${subIndex + 1}. dimension`);
    newDatasetDiv.appendChild(dimensionDiv);
  });
  document.querySelector("#dimension-inputs").appendChild(newDatasetDiv);

  //     let div = document.createElement('div');
  // div.classList.add('test');
  // let text = document.createTextNode('Test');
  // div.appendChild(text);
  // document.body.appendChild(div)
});

///////////

let dataOfChart = [
  [10, 50, 70, 60, 0], // Dataset 1
  [30, 40, 60, 70, 50], // Dataset 2
  [50, 60, 80, 90, 100], // Dataset 3
];

const ctx = document.getElementById("radial-chart").getContext("2d");

const data = {
  labels: [
    "1. Dimension",
    "2. Dimension",
    "3. Dimension",
    "4. Dimension",
    "5. Dimension",
  ],
  datasets: [
    {
      label: "Dataset 1",
      data: dataOfChart[0],
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)", // Color for Dataset 1
      borderColor: "rgb(255, 99, 132)",
      pointBackgroundColor: "rgb(255, 99, 132)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(255, 99, 132)",
    },
    {
      label: "Dataset 2",
      data: dataOfChart[1],
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)", // Color for Dataset 2
      borderColor: "rgb(54, 162, 235)",
      pointBackgroundColor: "rgb(54, 162, 235)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(54, 162, 235)",
    },
    {
      label: "Dataset 3",
      data: dataOfChart[2],
      fill: true,
      backgroundColor: "rgba(75, 192, 192, 0.2)", // Color for Dataset 3
      borderColor: "rgb(75, 192, 192)",
      pointBackgroundColor: "rgb(75, 192, 192)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(75, 192, 192)",
    },
  ],
};

const config = {
  type: "radar",
  data: data,
  options: {
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  },
};

const handleChangeInput = (event, datasetIndex, valueIndex) => {
  let inputValue = parseInt(event.target.value);
  if (inputValue >= 0 && inputValue <= 100) {
    dataOfChart[datasetIndex][valueIndex] = inputValue;
    myChart.data.datasets[datasetIndex].data = dataOfChart[datasetIndex];
    myChart.update();
  } else {
    console.warn("Input value must be between 0 and 100");
  }
};

let dimensionInputs = document.querySelectorAll("#dimension-inputs input");

dimensionInputs.forEach((element, index) => {
  // Assuming each input element has attributes data-dataset-index and data-value-index
  let datasetIndex = parseInt(element.getAttribute("data-dataset-index"));
  let valueIndex = parseInt(element.getAttribute("data-value-index"));
  element.addEventListener("input", (event) =>
    handleChangeInput(event, datasetIndex, valueIndex)
  );
});

const myChart = new Chart(ctx, config);
