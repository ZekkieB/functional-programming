//get time in ms with a default time of now
function getTime(date=new Date()) {
	return new Date(date).getTime();
};

//returns an array of objects that has each month of each year from the data
function createPerYearMonthObjectArray(dataArray) {
	const objectArray = [];

	const dates = [];

	dataArray.forEach((datum) => {
		dates.push(datum.sellingPointEndDate,datum.sellingPointStartDate);
	});


	dates.forEach((date, index, self) => {
		const aDate = new Date(date)
		const unique = index === self.findIndex((i) => {
			const bDate = new Date(i);
			return getTime(bDate) === getTime(aDate) && getTime(aDate) < getTime();
		});

		if(unique) {
			objectArray.push({
				date:date,
				amountIncrease: 0,
				amountDecrease: 0,
				total: 0,
			})
		}
	});

	objectArray.sort((a,b) => {
		return getTime(a.date) - getTime(b.date);
	})

	return objectArray;
}

//counts the total increase and decrease per month of each year
function countTotal(dataArray) {
	const rollingTotalArray = [...dataArray];

	rollingTotalArray.forEach((datum, index) => {
		const {amountIncrease, amountDecrease} = datum;		
		datum.total = amountIncrease - amountDecrease;
	});

	return rollingTotalArray.map((datum, index, self) => {
	
		if(!!self[index-1]) {
			return {
				date: datum.date,
				amountIncrease: datum.amountIncrease,
				amountDecrease: datum.amountDecrease,
				total: datum.total += self[index-1].total,
			}
		};
		return datum;
	})
}

//collects all the increased and decreased amounts of selling points per month of each year  
function collectAmountPerYearMonth(collectorArray, dataArray) {
	dataArray.forEach((datum,i) => {

		const indexIncrease = collectorArray.findIndex((i) => {
			return getTime(i.date) === getTime(datum.sellingPointStartDate);
		});

		const indexDecrease = collectorArray.findIndex((i) => {
			return getTime(i.date) === getTime(datum.sellingPointEndDate);
		});

		collectorArray[indexIncrease].amountIncrease = collectorArray[indexIncrease].amountIncrease + 1;
		
		if(indexDecrease > -1) {
			collectorArray[indexDecrease].amountDecrease = collectorArray[indexDecrease].amountDecrease + 1;
		}; 

	});
	return countTotal(collectorArray);
};


export {createPerYearMonthObjectArray, collectAmountPerYearMonth};