// d3.select('h3').style('color', 'darkblue');
// d3.select('h3').style('font-size', '24px');

// var svg1 = d3.select("#area");
// svg1.append("circle").attr("cx",100).attr("cy",200).attr("r",20).style("fill",blue);

var margin_top = 50, margin_bottom = 50, margin_left = 40, margin_right = 40;
var width = 450;
var height = 450;

var svg = d3.select("#area")
.append("svg")
  .attr("width", width)
  .attr("height", height)
.append("g")
  .attr("transform", "translate(" + margin_left + "," + margin_top + ")" );


d3.csv("dataset.csv", function(data){ 
  console.log(data);
})

// dataset = d3.csvParse(
//   await FileAttachment("dataset.csv").text(),
//   d3.autoType
// )

// console.log(dataset);


// d3.csv("dataset.csv", function(data){
d3.csv("https://raw.githubusercontent.com/Munir-Ahamed/HeatMap/main/dataset.csv", function(data){

var dom = d3.map(data, function(d){return d.group;}).keys();
// var dom = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
var ran = d3.map(data, function(d){return d.variable;}).keys();
// var ran = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

// console.log(dom)
// console.log(ran)

var x = d3.scaleBand()
.range([0, width-margin_left-margin_right])
.domain(dom)
.padding(0.05);
svg.append("g")
.style("font-size", "20")
.style("opacity", 0.9)
.attr("transform", "translate(0," + (height-margin_bottom-margin_top) + ")")
.call(d3.axisBottom(x).tickSize(0))
.select(".domain").remove()

var y = d3.scaleBand()
.range([height-margin_bottom-margin_top, 0])
.domain(ran)
.padding(0.05);
svg.append("g")
.style("font-size", 20)
.style("opacity", 0.9)
.call(d3.axisLeft(y).tickSize(0))
.select(".domain").remove()

var myColor = d3.scaleSequential()
.interpolator(d3.interpolateInferno)
.domain([1,100]);

// var myColor = d3.scaleSequential([1, 100], d3.interpolateInferno);

var Tooltip = d3.select("#area")
.append("div")
.attr("class", "tooltip")
.style("opacity", 0)
.style("background-color", "#ccffff")
.style("border", "solid")
.style("border-width", "2px")
.style("border-radius", "5px")

var mouseover = function(d) {
 
  Tooltip.style("opacity", 1)
  .style("left", (d3.mouse(this)[0]+70) + "px")
  .style("top", (d3.mouse(this)[1]) + "px")
  d3.select(this)
    .style("opacity", 1)
    .style("stroke-width", "4px")
    .style("stroke", "#809fff")

}

var mousemove = function(d) {
 
  Tooltip
    .html("The exact value of<br>this cell is: " + d.value)
    .style("left", (d3.mouse(this)[0]+70) + "px")
    .style("top", (d3.mouse(this)[1]) + "px")
}

var mouseleave = function(d) {
 
  Tooltip
      .style("opacity", 0)
  d3.select(this)
    .style("stroke", "none")
    .style("opacity", 0.6)
}

// //doubts: using ' in L54, using ; in L57


svg.selectAll()
.data(data, function(d) {return d.group + ':' + d.variable;})
.enter()
.append("rect")
  .attr("x", function(d) {return x(d.group)})
  .attr("y", function(d) {return y(d.variable)})
  .attr("width", x.bandwidth())
  .attr("height", y.bandwidth())
  .style("fill", function(d) { return myColor(d.value)})
  .style("opacity", 0.6)
  .style("rx", 5)
  .style("ry", 5)
.on("mouseover", mouseover)
.on("mousemove", mousemove)
.on("mouseleave", mouseleave)

})
