const geoVerkoopPuntApi = "https://opendata.rdw.nl/resource/cgqw-pfbp.json?$limit=30000"

import getData from "./modules/getData.js";
import {filter,filterWithStartingDate, filterWithinRange} from "./modules/filters.js";
import {createCoordinatesArray, setTrueDate} from "./modules/cleaning.js";
import {createPerYearMonthObjectArray,collectAmountPerYearMonth} from "./modules/dataTransform.js";
import {constructChart} from "./modules/chart.js";





function reverseGeoCode(city) {
	const geocoder =  new google.maps.Geocoder();
	return new Promise((resolve, reject) => {
		geocoder.geocode({"address" : `${city},nl`}, (result,status) => {
			const lat = result[0].geometry.location.lat();
			const lng = result[0].geometry.location.lng();
			resolve([lat,lng]);
		});
	});
};


function clickHandler(data) {
	const button = document.querySelector("button");
	const cityField = document.querySelector("#city");
	const rangeField = document.querySelector("#range");
	button.onclick = async function() {
		const cityCords = await reverseGeoCode(cityField.value);
		const range = parseInt(rangeField.value);
		const inRangeArray = filter(data,filterWithinRange(range,cityCords));

		const yearMonthArray = createPerYearMonthObjectArray(inRangeArray);
		
		const yearMonthAmount = collectAmountPerYearMonth(yearMonthArray, inRangeArray);

		

		constructChart(yearMonthAmount);
	}
}


async function main() {

	const data = await getData(geoVerkoopPuntApi);

	const filteredWithYear = filter(data,filterWithStartingDate);



	const cleanArray = [...filteredWithYear];

	cleanArray.forEach((item) => {
		if(!item.enddatesellingpoint) {
			item.enddatesellingpoint = "20990101";
		};
	});

	cleanArray.forEach((item) => {
		item.location = createCoordinatesArray(item.location)
		item.sellingPointStartDate = setTrueDate(item.startdatesellingpoint)
		item.sellingPointEndDate = setTrueDate(item.enddatesellingpoint)
	});


	clickHandler(cleanArray);

	return 0;
};


main();