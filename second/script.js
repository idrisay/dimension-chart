import {
    createTable,
  generateChartData,
  generateInitialDataArrays,
  initializeChart,
} from "./utils.js";
import { dataSetArray, questions } from "./variables.js";

let myChart = null;

let dataArrays = generateInitialDataArrays(dataSetArray);

let dataSets = generateChartData(dataSetArray, dataArrays)


myChart = initializeChart(questions, dataSets)

createTable("table-container", dataSetArray, questions, dataSets, myChart)