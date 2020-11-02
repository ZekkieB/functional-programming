import {haversineDistance} from "./haversine.js";

function filter(dataArray,condition) {
	return dataArray.filter(condition);
};

function filterWithStartingDate(item) {
	return !!item.startdatesellingpoint;
}; 

function filterWithinRange(radialDistance,searchLocation) {
	return function(item) {
		const distance = haversineDistance(item.location,searchLocation);
		return distance <= radialDistance;
	};
};

export {filter, filterWithStartingDate, filterWithinRange};