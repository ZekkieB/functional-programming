function setTrueDate(string) {
	
	const year = string.slice(0,4);
	const month = string.slice(4,6);
	
	const yearMonth = `${year}  ${month} 01 00:00`
	
	return new Date(yearMonth);
};

function createCoordinatesArray(coordinates) {
	
	const {latitude, longitude} = coordinates;
	
	return [parseFloat(latitude),parseFloat(longitude)];
};

export {setTrueDate, createCoordinatesArray};