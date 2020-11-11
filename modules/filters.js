import {haversineDistance} from "./haversine.js";

function filter(dataArray,condition) {
	return dataArray.filter(condition);
};


//condition returns a list of objects that have selling point startdates available
function filterWithStartingDate(item) {
	return !!item.startdatesellingpoint;
}; 

//condition returns points within a radius in x km's
function filterWithinRange(radialDistance,searchLocation) {
	return function(item) {
		const distance = haversineDistance(item.location,searchLocation);
		return distance <= radialDistance;
	};
};

export {filter, filterWithStartingDate, filterWithinRange};