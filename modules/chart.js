function constructChart(data) {
	const height = 400;
	const width = 1500;

	// const scaleY = d3.scaleLinear().range([0, height-20]);
	// const scaleX = d3.scaleTime().domain(d3.extent(data, (d) => {
	// 	return new Date(d.date)
	// })).range([0,width-100]);

	// const axisX = d3.axisBottom(scaleX);
	// const axisY = d3.axisLeft(scaleY);
	
	// scaleY.domain([500,0])

	const svg = d3.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height);


	
	// svg.append("g")
	// 	.attr("class","scale-x")
	// 	.style("transform", `translate(0px,${height - 20}px)`)
	// 	.call(axisX);

	// svg.append("g")
	// 	.attr("class","scale-y")
	// 	.call(axisY);

	// svg.append("path")
	// 	.datum(data)
	// 	.attr("fill", "none")
	// 	.attr("stroke", "steelblue")
	// 	.attr("stroke-width", 1)
	// 	.attr("stroke-linejoin","round")
	// 	.attr("stroke-linecap","round")
	// 	.attr("d",d3.line()
	// 		.x((d) => {

	// 			return scaleX(d.date);
	// 		})
	// 		.y((d => {
	// 			return scaleY(d.amount);
	// 	})));

	data.forEach((item,index) => {
		svg.append("g")
			.attr("class", `group_${index+1}`);
		const group = d3.select(`.group_${index+1}`);
		
		console.log(item)

		for(let i = 0; i < item.amount; i++) {
			group.append("circle")
				.attr("r","10")
				.attr("cx",20+(20*i))
				.attr("cy",10)
		};

	})

	console.log(data);
};

export {constructChart};