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
			return bDate.getTime() === aDate.getTime() && aDate.getTime() < new Date().getTime();
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



	// dataArray.forEach((datum, index, self) => {

	// 	const startDate = new Date(datum.sellingPointStartDate);
	// 	const endDate = new Date(datum.sellingPointEndDate);

	// 	const uniqueStart = index === self.findIndex((i) => {
	// 		const bDate = new Date(i.sellingPointStartDate);
	// 		return bDate.getYear() === startDate.getYear() && bDate.getMonth() === startDate.getMonth();
	// 	});

	// 	const uniqueEnd = index === self.findIndex((i) => {
	// 		const bDate = new Date(i.sellingPointEndDate);
	// 		return bDate.getYear() === endDate.getYear() && bDate.getMonth() === endDate.getMonth() && endDate.getTime() < new Date().getTime();
	// 	})

	// 	if(uniqueStart) {
	// 		objectArray.push({
	// 			date: datum.sellingPointStartDate,
	// 			amountIncrease: 0,
	// 			amountDecrease: 0,
	// 			total: 0
	// 		});
	// 	}else if(uniqueEnd) {
	// 		objectArray.push({
	// 			date: datum.sellingPointEndDate,
	// 			amountIncrease: 0,
	// 			amountDecrease: 0,
	// 			total: 0
	// 		});
	// 	}
	// });

	objectArray.sort((a,b) => {
		return new Date(a.date).getTime() - new Date(b.date).getTime();
	})


	return objectArray;
}


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

function collectAmountPerYearMonth(collectorArray, dataArray) {
	dataArray.forEach((datum,i) => {
		const indexIncrease = collectorArray.findIndex((i) => {
			return new Date(i.date).getTime() === new Date(datum.sellingPointStartDate).getTime();
		});

		const indexDecrease = collectorArray.findIndex((i) => {

			
			return new Date(i.date).getTime() === new Date(datum.sellingPointEndDate).getTime();
		});
		collectorArray[indexIncrease].amountIncrease = collectorArray[indexIncrease].amountIncrease + 1;
		if(indexDecrease > -1) collectorArray[indexDecrease].amountDecrease = collectorArray[indexDecrease].amountDecrease + 1;
	});
	console.log(collectorArray);
	return countTotal(collectorArray);
};


export {createPerYearMonthObjectArray, collectAmountPerYearMonth};