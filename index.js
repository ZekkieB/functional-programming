const geoVerkoopPuntApi = "https://opendata.rdw.nl/resource/cgqw-pfbp.json?$limit=30000"

import getData from "./modules/getData.js";
import {filter,filterWithStartingDate} from "./modules/filters.js";
import {createCoordinatesArray, setTrueDate} from "./modules/cleaning.js";
import clickHandler from "./modules/clickHandler.js"


main();

async function main() {

	const data = await getData(geoVerkoopPuntApi);

	const filteredWithYear = filter(data,filterWithStartingDate);

	//clone filtered array into a new array
	const cleanArray = [...filteredWithYear];

	cleanArray.forEach((item) => {
		if(!item.enddatesellingpoint) {
			item.enddatesellingpoint = "20990101";
		};
	});


	//clean the data 
	cleanArray.forEach((item) => {
		item.location = createCoordinatesArray(item.location)
		item.sellingPointStartDate = setTrueDate(item.startdatesellingpoint)
		item.sellingPointEndDate = setTrueDate(item.enddatesellingpoint)
	});


	clickHandler(cleanArray);

	return 0;
};


