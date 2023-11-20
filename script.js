let numberOfDatasets = 4;
let dimensionQuestions = [
  "Question 1",
  "Question 2",
  "Question 3",
  "Question 4",
  "Question 5",
  "Question 6",
  "Question 7",
  "Question 8",
];
let dataChartValues = [];
let chartType = "radar";

const generateChartData = () => {
    const dimensionChartData = dimensionQuestions.map((dimension, index) => ({
        label: dimension,
        data: dataChartValues[index],
    }));
    console.log('dimensionChartData--->',dimensionChartData)

  const labels = dimensionChartData.map((dataset) => dataset.label);

  return { labels, datasets: dimensionChartData };
};
// Function to create the table
function createTable() {
  let table = document.createElement("table");
  table.classList.add("w-full", "mx-auto");

  // Create the header row
  let headerRow = table.insertRow();
  addHeaderCell(headerRow, "Questions");

  // Add headers for datasets
  for (let i = 0; i < numberOfDatasets; i++) {
    addHeaderCell(headerRow, `Dataset ${i + 1}`, ["p-2"]);
  }

  // Create rows for each question
  dimensionQuestions.forEach((question, index) => {
    let row = table.insertRow();
    addQuestionCell(row, question);

    // Initialize row in dataChartValues
    if (!dataChartValues[index]) {
      dataChartValues[index] = new Array(numberOfDatasets).fill(null);
    }

    // Add input cells for each dataset
    for (let i = 0; i < numberOfDatasets; i++) {
      addInputCell(row, question, index, i);
    }
  });

  // Append the table to the container
  document.getElementById("table-container").appendChild(table);
}

const handleInputChange = (event, questionIndex, dataSetIndex) => {
//   console.log(questionIndex, dataSetIndex);
  // Ensure the row array exists
  if (!dataChartValues[questionIndex]) {
    dataChartValues[dataSetIndex] = new Array(dimensionQuestions.length).fill(
      null
    );
  }

  dataChartValues[dataSetIndex][questionIndex] = event.target.value;

//   console.log(dataChartValues);
  updateChart();

  //   myChart.update();
};

// Helper functions for creating table cells
function addHeaderCell(row, text, classes = []) {
  const headerCell = document.createElement("th");
  headerCell.textContent = text;
  headerCell.classList.add(...classes);
  row.appendChild(headerCell);
}

function addQuestionCell(row, text) {
  const cell = row.insertCell();
  cell.textContent = text;
  cell.classList.add("py-2");
}

function addInputCell(row, question, rowIndex, datasetIndex) {
    
  const inputCell = row.insertCell();
  inputCell.classList.add("text-center");
  const input = document.createElement("input");
  input.type = "number";
  input.value = dataChartValues[rowIndex][datasetIndex];
  input.name = `input-${question}-${datasetIndex}`;
  input.classList.add("w-16", "text-center", "border");
  input.addEventListener("input", (e) =>
    handleInputChange(e, rowIndex, datasetIndex)
  );

  inputCell.appendChild(input);
}

// Call the function to create the table
createTable();

let myChart = null;
const chartContext = document.getElementById("radial-chart").getContext("2d");

document.querySelector("#chart-type").onchange = (e) => {
  chartType = e.target.value;
  updateChart();
};

document.querySelector("#number-of-datasets").onchange = (e) => {
  numberOfDatasets = +e.target.value;
  clearTableContainer();
  createTable();
  updateChart();
};

function initializeChart(chartType, chartData) {
  const chartConfig = {
    type: chartType,
    data: chartData,
    options: {
      scales: {
        r: {
          beginAtZero: true,
        },
      },
    },
  };

  return new Chart(chartContext, chartConfig);
}

function updateChart() {
  if (myChart) {
    myChart.destroy();
  }
  console.log('GEN DATA -> ',generateChartData());
  myChart = initializeChart(chartType, generateChartData());
}

function clearTableContainer() {
  const container = document.querySelector("#table-container");
  container.innerHTML = "";
}

// Initialize the chart with the default type
updateChart();
