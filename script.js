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

const generateChartData = (numberOfDatasets, dataChartValues) => {
  const datasets = Array.from({ length: numberOfDatasets }, (v, i) => ({
    label: `Dataset ${i + 1}`,
    data: dataChartValues[i],
    fill: true,
  }));

  const labels = datasets.map((dataset) => dataset.label);

  return { labels, datasets };
};

// Function to create the table
function createTable() {
  let table = document.createElement("table");

  table.classList.add("w-full");
  table.classList.add("mx-auto");

  // Create the header row
  let headerRow = table.insertRow();
  let firstHeaderCell = document.createElement("th");
  firstHeaderCell.textContent = "Questions";
  headerRow.appendChild(firstHeaderCell);

  // Add headers for datasets
  for (let i = 0; i < numberOfDatasets; i++) {
    let headerCell = document.createElement("th");
    headerCell.textContent = `Dataset ${i + 1}`;
    headerCell.classList.add("p-2");
    headerRow.appendChild(headerCell);
  }

  // Create rows for each question
  dimensionQuestions.forEach((question, index) => {
    let row = table.insertRow();

    let questionCell = row.insertCell();
    questionCell.textContent = question;
    questionCell.classList.add("py-2");
    let newDataChartRow = new Array(numberOfDatasets).fill(null);
    dataChartValues = [...dataChartValues, newDataChartRow];

    // Add input cells for each dataset
    for (let i = 0; i < numberOfDatasets; i++) {
      let inputCell = row.insertCell();
      inputCell.classList.add("text-center");
      let input = document.createElement("input");
      input.classList.add("w-16");
      input.classList.add("text-center");
      input.classList.add("border");
      input.addEventListener("input", (e) => handleInputChange(e, index, i));
      input.type = "number";
      input.value = dataChartValues[index][i];
      input.name = `input-${question}-${i}`;
      inputCell.appendChild(input);
    }
  });

  // Append the table to the container
  document.getElementById("table-container").appendChild(table);
}

const handleInputChange = (event, questionIndex, dataSetIndex) => {
  dataChartValues[questionIndex][dataSetIndex] = event.target.value;

  myChart.update();
};

// Call the function to create the table
createTable();

const ctx = document.getElementById("radial-chart").getContext("2d");

const data = generateChartData(numberOfDatasets, dataChartValues);

document.querySelector("#chart-type").onchange = function (e) {
  chartType = e.target.value;

  // Destroy the old chart and create a new one with the new type
  if (myChart) {
    myChart.destroy();
  }
  myChart = initializeChart(
    chartType,
    generateChartData(numberOfDatasets, dataChartValues)
  );
};

// Create a function to initialize the chart
function initializeChart(type, _data) {
  const ctx = document.getElementById("radial-chart").getContext("2d");

  const config = {
    type: type,
    data: _data,
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

  return new Chart(ctx, config);
}

// Initialize the chart with the default type
let myChart = initializeChart(
  chartType,
  generateChartData(numberOfDatasets, dataChartValues)
);

document.querySelector("#number-of-datasets").onchange = function (e) {
  numberOfDatasets = e.target.value;
  document.querySelector("#table-container").innerHTML = "";
  createTable();

  if (myChart) {
    myChart.destroy();
  }
  myChart = initializeChart(
    chartType,
    generateChartData(numberOfDatasets, dataChartValues)
  );
};
