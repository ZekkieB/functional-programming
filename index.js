const geoVerkoopPuntApi = "https://opendata.rdw.nl/resource/cgqw-pfbp.json?$limit=30000"

import getData from "./modules/getData.js";
import {filter,filterWithStartingDate, filterWithinRange} from "./modules/filters.js";
import {createCoordinatesArray} from "./modules/cleaning.js";

import * as d3 from "d3";

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
		console.log(range)
		const inRangeArray = filter(data,filterWithinRange(range,cityCords));

		console.log(inRangeArray);
	}
}


async function main() {

	const data = await getData(geoVerkoopPuntApi);

	const filteredWithYear = filter(data,filterWithStartingDate);


	const cleanArray = [...filteredWithYear];

	cleanArray.forEach((item) => {
		item.location = createCoordinatesArray(item.location);
	});

	clickHandler(cleanArray);

	return 0;
};


main();