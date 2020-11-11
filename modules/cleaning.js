//transforms the date inside the data from the dataset into a true date
function setTrueDate(string) {
	
	const year = string.slice(0,4);
	const month = string.slice(4,6);
	
	const yearMonth = `${year}  ${month} 01 00:00`
	
	return new Date(yearMonth);
};

/*transfroms the coordinates from the dataset into an array with floats instead of strings.
To be used to calculate the distance between two coords.*/
function createCoordinatesArray(coordinates) {
	
	const {latitude, longitude} = coordinates;
	
	return [parseFloat(latitude),parseFloat(longitude)];
};

export {setTrueDate, createCoordinatesArray};