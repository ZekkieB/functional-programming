import * as d3 from "d3";

export default class{
	constructor(data,city) {
		this.width = 1000;
		this.height = 400;
		this.margin = 40;
		this.data = [];
			
		this.duration = 200

		this.data.push({
			city: city.value,
			values: data
		})

		this.svg = d3.select("div#chart")
			.append("svg")
				.attr("width",this.width + this.margin)
				.attr("height",this.height + this.margin)
			.append("g")
				.attr("transform", `translate(${40},${40})`);

		this.scaleX = d3.scaleTime().domain(d3.extent(this.data[0].values, (d) => {
				return new Date(d.date)
		})).range([0,this.width-100]);
		
		

		this.scaleY = d3.scaleLinear().range([0, this.height-20]);
		
		this.scaleY.domain([200,0])

		this.axisX = d3.axisBottom(this.scaleX);
		this.axisY = d3.axisLeft(this.scaleY);


		this.line = d3.line()
		.curve(d3.curveCatmullRomOpen)
		.x((d) => {
			return this.scaleX(d.date);
 		})
 		.y((d) =>{
 			return this.scaleY(d.total);
 		})

 		this.constructChart();
 		
	}

	constructChart() {

		const flatData = this.flattenDataArray();

		const max = d3.max(flatData.map((d) => {
					return d.total;
				}));


		this.scaleY.domain([max,0]);


		this.svg.append("g")
			.attr("class","scale-x")
			.style("transform", `translate(0px,${this.height - 20}px)`)
			.call(this.axisX);

		this.svg.append("g")
			.attr("class","scale-y")
			.call(this.axisY);

		this.svg.append("text")
			.attr("class","label-meters")
			.text("Parkeermeters")

		this.svg.selectAll(".line-group")
			.data(this.data)
			.enter()
			.append("path")
			.attr("class", "line")
			.attr("fill","none")
			.attr("stroke-width",2)
			.attr("stroke","steelblue")
			.attr("d", (d) => {
				return this.line(d.values)
			})


	};

	flattenDataArray() {
		return  this.data.map((datum) => {
			return datum.values.map((datumInner) => {
				return datumInner
			});
		}).flat();
	}

	updateChart(data, city) {

		this.data.push({
			city: city.value,
			values: data
		})

		

		const flatData = this.flattenDataArray();

		const max = d3.max(flatData.map((d) => {
					return d.total;
				}));

		this.scaleY.domain([max,0]);

		this.scaleX = d3.scaleTime().domain(d3.extent(flatData, (d) => {
				return new Date(d.date)
		})).range([0,this.width-100]);

		this.axisX = d3.axisBottom(this.scaleX);

		this.svg.select(".scale-y")
			.transition()
			.duration(this.duration)
			.call(this.axisY)

		this.svg.select(".scale-x")
			.transition()
			.duration(this.duration)
			.call(this.axisX)

		const lines = this.svg.selectAll(".line").data(this.data);
		lines.transition()
			.duration(this.duration)
			.attr("d", (d) => {
				return this.line(d.values);
			})
			

		lines.enter()
			.append("path")
			.transition().duration(this.duration)
			.attr("class","line")
			.attr("fill","none")
			.attr("stroke-width",2)
			.attr("stroke","green")

			.attr("d", (d) => {
				return this.line(d.values)
			})
	}
};