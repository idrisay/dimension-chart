import { chartContext, questions } from "./variables.js";

export let createArrayByNumber = (number) => {
  return new Array(number).fill(null);
};

export const generateChartData = (dataSetArray, dataArrays) => {
  let data = [];
  dataSetArray.forEach((elm, index) => {
    data = [
      ...data,
      {
        label: elm,
        data: dataArrays[index],
        fill: true,
      },
    ];
  });
  return data;
};

export const generateInitialDataArrays = (dArr) => {
  let dataArrays = [];

  dArr.forEach((elm) => {
    dataArrays = [...dataArrays, createArrayByNumber(9)];
  });
  return dataArrays;
};

export function initializeChart(labels, data, type) {

  const chartConfig = {
    type: "radar",
    data: {
      labels: labels,
      datasets: data,
    },
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

export function updateChart(dataSets, prevChart) {
    // console.log(prevChart)
    if (prevChart) {
        console.log('IF')
        prevChart.destroy();
    }
    console.log('ELSE')
    prevChart = initializeChart(questions, dataSets, 'radar');
  }

// //////////TABLE

export function createTable(divId, headerArr, questions, dataSets, myChart) {
  // Get the div where the table will be created
  const div = document.getElementById(divId);

  // Create a table element
  const table = document.createElement("table");

  // Create the header row
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerArr.unshift("Questions"); // Add an empty cell for the top-left corner
  headerArr.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the body of the table
  const tbody = document.createElement("tbody");
  questions.forEach((question, qIndex) => {
    const row = document.createElement("tr");
    const firstCell = document.createElement("td");
    firstCell.textContent = question;
    row.appendChild(firstCell);

    dataSets.forEach((dataSet, dataSetIndex) => {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.classList.add("w-16", "text-center", "border");
      input.value = dataSet.data[qIndex];
      input.name = `data-${dataSet.label}-${qIndex}`;
      cell.appendChild(input);
      row.appendChild(cell);
      input.addEventListener("input", (e) =>
        handleInputChange(e.target.value, dataSetIndex, qIndex, dataSets, myChart)
      );
    });

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  // Append the table to the div
  div.innerHTML = ""; // Clear any existing content
  div.appendChild(table);
}

const handleInputChange = (val, dIndex, qIndex, _dataSets, prevChart) => {
  _dataSets[dIndex].data[qIndex] = val;
  console.log(prevChart);
  updateChart(_dataSets, prevChart)
};
