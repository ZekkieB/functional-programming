import {createPerYearMonthObjectArray, collectAmountPerYearMonth} from "./dataTransform.js";
import Chart from "./chart.js";
import {filter, filterWithinRange} from "./filters.js";
import reverseGeoCode from "./geocoding.js";

let visualisation = null;

async function clickEventHandler(cityField, rangeField, data) {
	const cityCords = await reverseGeoCode(cityField.value);
		const range = parseInt(rangeField.value);
		const inRangeArray = filter(data,filterWithinRange(range,cityCords));

		const yearMonthArray = createPerYearMonthObjectArray(inRangeArray);
		
		const yearMonthAmount = collectAmountPerYearMonth(yearMonthArray, inRangeArray);

		if(!document.querySelector("svg")) {
			visualisation = new Chart(yearMonthAmount, cityField);
		}else {
			visualisation.updateChart(yearMonthAmount, cityField)
		};
		

		console.log(visualisation);
}

export default function (data) {
	const button = document.querySelector("button");
	const cityField = document.querySelector("#city");
	const rangeField = document.querySelector("#range");
	
	button.addEventListener("click", () => {
		clickEventHandler(cityField,rangeField,data);
	}, true);
}