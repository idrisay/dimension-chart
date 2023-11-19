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

// Function to create the table
function createTable() {
  let table = document.createElement("table");

  table.classList.add('w-full')
  table.classList.add('mx-auto')

  // Create the header row
  let headerRow = table.insertRow();
  let firstHeaderCell = document.createElement("th");
  firstHeaderCell.textContent = "Questions";
  headerRow.appendChild(firstHeaderCell);

  // Add headers for datasets
  for (let i = 0; i < numberOfDatasets; i++) {
    let headerCell = document.createElement("th");
    headerCell.textContent = `Dataset ${i + 1}`;
    headerCell.classList.add('p-2')
    headerRow.appendChild(headerCell);
  }

  // Create rows for each question
  dimensionQuestions.forEach((question, index) => {
    let row = table.insertRow();
   
    let questionCell = row.insertCell();
    questionCell.textContent = question;
    questionCell.classList.add('py-2')
    let newDataChartRow = new Array(numberOfDatasets).fill(null);
    dataChartValues = [...dataChartValues, newDataChartRow];

    // Add input cells for each dataset
    for (let i = 0; i < numberOfDatasets; i++) {
      let inputCell = row.insertCell();
      inputCell.classList.add('text-center')
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
  console.log("questionIndex: ", questionIndex);
  console.log("dataSetIndex: ", dataSetIndex);
  console.log("handleInputChange", event.target.value);

  dataChartValues[questionIndex][dataSetIndex] = event.target.value;

  myChart.update();
};

// Call the function to create the table
createTable();

const ctx = document.getElementById("radial-chart").getContext("2d");

const data = {
  labels: ["Dataset 1", "Dataset 2", "Dataset 3", "Dataset 4"],
  datasets: [
    {
      label: "Dataset 1",
      data: dataChartValues[0],
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
      data: dataChartValues[1],
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
      data: dataChartValues[2],
      fill: true,
      backgroundColor: "rgba(75, 192, 192, 0.2)", // Color for Dataset 3
      borderColor: "rgb(75, 192, 192)",
      pointBackgroundColor: "rgb(75, 192, 192)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(75, 192, 192)",
    },
    {
      label: "Dataset 4",
      data: dataChartValues[3],
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

// const config = {
//   // type: "radar",
//   // type: "bar",
//   // type: "line",
//   type: chartType,
//   data: data,
//   options: {
//     scales: {
//       r: {
//         beginAtZero: true,
//         min: 0,
//         max: 100,
//         ticks: {
//           stepSize: 20,
//         },
//       },
//     },
//     elements: {
//       line: {
//         borderWidth: 3,
//       },
//     },
//   },
// };

// const myChart = new Chart(ctx, config);

document.querySelector("#chart-type").onchange = function (e) {
  console.log("onc", e.target.value);
  chartType = e.target.value;

  // Destroy the old chart and create a new one with the new type
  if (myChart) {
    myChart.destroy();
  }
  myChart = initializeChart(chartType);
};

// Create a function to initialize the chart
function initializeChart(type) {
  const ctx = document.getElementById("radial-chart").getContext("2d");

  const config = {
    type: type,
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

  return new Chart(ctx, config);
}

// Initialize the chart with the default type
let myChart = initializeChart(chartType);

document.querySelector("#number-of-datasets").onchange = function (e) {
  console.log("onc", e.target.value);
  numberOfDatasets = e.target.value;

  console.log(numberOfDatasets);
  document.querySelector('#table-container').innerHTML = ''
  createTable()
};
