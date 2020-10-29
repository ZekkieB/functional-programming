const geoVerkoopPuntApi = "https://opendata.rdw.nl/resource/cgqw-pfbp.json?$limit=30000"

async function getData(url) {
	const result = await fetch(url);
	
	const data = await result.json();
	
	return data; 
};

function setTrueDate(string) {
	const year = string.slice(0,4);
	const month = string.slice(4,6);
	const yearMonth = `${year}  ${month}`

	return new Date(yearMonth);

};

function filterDataWithStartYear(dataArray) {

	return dataArray.filter(datum => {
		return typeof datum.startdatesellingpoint === 'string' && datum.enddatesellingpoint === undefined;
	});
};

function filterDataWithEndYear(dataArray) {
	return dataArray.filter(datum => {
		return typeof datum.enddatesellingpoint === "string";
	});
};

function createCoordinatesArray(coordinates) {
	const {latitude, longitude} = coordinates;
	return [parseFloat(latitude),parseFloat(longitude)];
};

function cleanData(dataArray) {
	return dataArray.map(datum => {
		return {
			sellingPointStartDate: setTrueDate(datum.startdatesellingpoint),
			coordinates: createCoordinatesArray(datum.location)
		};
	});
};

function createPerYearMonthObjectArray(dataArray) {
	const objectArray = [];

	dataArray.forEach((datum, index, self) => {

		const aDate = new Date(datum.sellingPointStartDate);

		const unique = index === self.findIndex((i) => {
			const bDate = new Date(i.sellingPointStartDate);
			return bDate.getYear() === aDate.getYear() && bDate.getMonth() === aDate.getMonth();
		});

		if(unique) {

			objectArray.push({
				date:aDate,
				amount:0
			});
		}
	});

	objectArray.sort((a,b) => {
		return new Date(a.date).getTime() - new Date(b.date).getTime();
	})

	return(objectArray);
}

function collectAmountPerYearMonth(collectorArray, dataArray) {
	
	dataArray.forEach((datum) => {
		const index = collectorArray.findIndex((i) => {
		
			return new Date(i.date).getTime() === new Date(datum.sellingPointStartDate).getTime();
		});
		collectorArray[index].amount = collectorArray[index].amount + 1;
	});
	return collectorArray;
};

getData(geoVerkoopPuntApi).then(data => {
	return filterDataWithStartYear(data);
})
.then(data => {
	return cleanData(data);
}).then(data => {
	const yearMonthArray = createPerYearMonthObjectArray(data);
	return collectAmountPerYearMonth(yearMonthArray, data);
}).then(constructChart)



function constructChart(data) {
	const height = 400;
	const width = 1500;

	const scaleY = d3.scaleLinear().range([0, height-20]);
	const scaleX = d3.scaleTime().domain(d3.extent(data, (d) => {
		return new Date(d.date)
	})).range([0,width-100]);

	const axisX = d3.axisBottom(scaleX);
	const axisY = d3.axisLeft(scaleY);
	
	scaleY.domain([500,0])

	const svg = d3.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height);


	
	svg.append("g")
		.attr("class","scale-x")
		.style("transform", `translate(0px,${height - 20}px)`)
		.call(axisX);

	svg.append("g")
		.attr("class","scale-y")
		.call(axisY);

	svg.append("path")
		.datum(data)
		.attr("fill", "none")
		.attr("stroke", "steelblue")
		.attr("stroke-width", 1)
		.attr("stroke-linejoin","round")
		.attr("stroke-linecap","round")
		.attr("d",d3.line()
			.x((d) => {

				return scaleX(d.date);
			})
			.y((d => {
				return scaleY(d.amount);
			})));

};