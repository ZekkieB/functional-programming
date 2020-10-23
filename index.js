const getHomePosition = function() {
	return new Promise(function(resolve , reject) { 
		navigator.geolocation.getCurrentPosition(function(currentPosition) {
			const cords = [currentPosition.coords.latitude, currentPosition.coords.longitude];
			resolve(cords);
		})
	});
};


const makeLowerCase = function(string) {
	return string.toLowerCase();
};

const removeSpace = function(string) {
	return string.replace(" ", "")
}


const createListFromString = function(string) {
	
	let commafiedString = makeLowerCase(string).toLowerCase().split(/(\. |, |,| , |,|\.)/g);
	const filteredList = commafiedString.filter((item) => {
		if(item.indexOf(".") < 0 && item.indexOf(",") && item.length > 0) {
			return item.indexOf(".");
		}
	})
	
	return filteredList;
}; 





const fixHex = function(string) {
	const dict = {
		bruin: "#864313",
		blauw: "#0000ff",
		lichtblauw: "#79bcec",
		groen: "#00ff00"
	};

	const keys = Object.keys(dict);

	if(!string.includes("#") && !string.includes(".") && !keys.includes(string)){
		return `#${string}`;
	}else if(string.includes("#") && string.includes(" ")){
		return removeSpace(string)
	};
};



const str = "rgb(139.69,19)";

//rgb to hex conversion
const createHexFromRgb = function(rgb) {
	

	const extractValuesFromString = function(string) {
		return string.replace(/[rgb()]/g,"").split(/[.,]/);
	};

	const values = extractValuesFromString(rgb);
	const intifyValues = function(values) {
		return values.map(function(val) {
			return parseInt(val)
		});
	};

	const rbgInt = intifyValues(values);

	const constructHex = function(rgbInt) {
		let hex = "#";
		rgbInt.forEach(function(int) {
			hex = hex + int.toString(16);
		});
		return hex;
	};

	return constructHex(rbgInt);
}



const coordsToDecimalDegress = function(coordinates) {
	//cleans and splits coordinates into seperate degree/minute/seconds
	const cleanCoordinates = function(dirtyCoordinates) {
		return dirtyCoordinates.replace(/[/"]/g,"").replace(/[EN]/g,"").replace(" ","-").replace(/[°']/g," ").split("-");
	};

	const clean = cleanCoordinates(coordinates);
	//creates objects that contains floats from the number strings
	const createFloatObject = function(coordinatesArray) {
		const splitArray = coordinatesArray.map(function(coords){
			return coords.split(" ")
		});

		const floatArray = splitArray.map(function(digitsArray) {
			const floats = digitsArray.map(function(digits) {
				return parseFloat(digits);
			});
			return floats;
		});

		return {
			north: floatArray[0],
			east: floatArray[1]
		}

	};

	const floatObject = createFloatObject(clean);


	//converts the coordinates into decimal degree's
	const createDecimalDegrees = function(floatObject) {
		const {north,east} = floatObject;

		const northDecimalDegree = north[0]+(north[1]/60)+(north[2]/3600);

		const eastDecimalDegree = east[0]+(east[1]/60)+(east[2]/3600);

		return [northDecimalDegree,eastDecimalDegree];
	}

	return createDecimalDegrees(floatObject);
};


coordsToDecimalDegress(`"52°17'39.2""N 4°57'30.3""E"`);





const changeToListArray = function(array) {
	array.forEach(function(item) {
		item.welkeSocialMediaGebruikt = createListFromString(item.welkeSocialMediaGebruikt),
		item.hobbies = createListFromString(item.hobbies),
		item.gesprokenTalen = createListFromString(item.gesprokenTalen);
		if(item.geboorteplaats.includes("°")) {
			item.geboorteplaats = coordsToDecimalDegress(item.geboorteplaats);
		}
	});

	return array;
};




(async function() {
	

	



	// const fetchingData = await fetch("https://opendata.rdw.nl/resource/9c54-cmfx.json");

	// const homePos = await getHomePosition();

	// const data = await fetchingData.json();

	// const yeet = data.map((data) => {
	// 	return {
	// 		naam:data.areadesc,
	// 		laadPunten: parseInt(data.aantal_laad_punten),
	// 		parkeerplaatsen: parseInt(data.aantal_parkeer_plaatsen),
	// 		coordinaten:[parseFloat(data.location.latitude), parseFloat(data.location.longitude)],
	// 		afstand_km: haversineDistance(homePos,[parseFloat(data.location.latitude),parseFloat(data.location.longitude)])
	// 	}		
	// })

	// console.log(yeet)


	const fetchedData = await fetch("http://localhost:4000/api");
	const data = await fetchedData.json();


	


	//console.log(data[0])


	// const eyes = data.map(item => {
	// 	//console.log(item.oogKleur);
	// 	fixHex(makeLowerCase(item.oogKleur));
	// })

	console.log(changeToListArray(data));



})();

