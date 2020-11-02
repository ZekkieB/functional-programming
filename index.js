const geoVerkoopPuntApi = "https://opendata.rdw.nl/resource/cgqw-pfbp.json?$limit=30000"

import getData from "./modules/getData.js";
import {filter,filterWithStartingDate, filterWithinRange} from "./modules/filters.js";
import {createCoordinatesArray} from "./modules/cleaning.js";


const testCoords = [52.092876,5.104480];

function clickHandler() {
	const button = document.querySelector("button");
	const cityField = document.querySelector("input");

	button.onclick = function() {
		console.log(cityField.value)
	}
}


async function main() {

	const data = await getData(geoVerkoopPuntApi);

	const filteredWithYear = filter(data,filterWithStartingDate);


	const cleanArray = [...filteredWithYear];

	cleanArray.forEach((item) => {
		item.location = createCoordinatesArray(item.location);
	});





	const inRange = filter(cleanArray,filterWithinRange(10,testCoords))


	clickHandler();

	return 0;
};


main();











