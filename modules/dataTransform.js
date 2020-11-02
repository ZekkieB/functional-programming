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
