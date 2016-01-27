// Calling the file my.js.
// Make sure you have already loaded the 
// d3 file and html elements 
// if you want to reference it here.


// set dimensions of the canvas / graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
var y = d3.scale.linear().range([height, 0]);

// define the axes
var xAxis = d3.svg.axis()
        .scale(x)
          .orient("bottom");
var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(10);

// add the svg canvas to the div with id = barchart
var svg = d3.select("#barchart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "barchart_svg")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// this div is used for the tooltip
var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

// Load the data, process it, and display it with a bar chart.
// You can't load the fullsize file, so you'll need to do some
// preprocessing to break the data up or aggregate it
d3.csv("data/parsedDataPak.csv", function(error, data) {
// d3.csv("data/VE_datapak_small.csv", function(error, data) {

  if (error) throw error;

  // get the total time spent on each key
  // var times = calc_time_per_key(data);
  var count = calc_count_per_meta(data);

  // scale the data ranges
  // the x domain goes over the set of meta
  x.domain(data.map(function(d) { return d.meta; }));
  // y goes from 0 to the max value in count
  y.domain([0, d3.max(count, function(d) { return d.total_count; })]);

  // add the axes
  svg.append("g")
      .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  svg.append("g")
      .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Time (m)");

  // add the bars
  svg.selectAll(".bar")
    .data(count)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.meta); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.total_count); })
      .attr("height", function(d) { return height - y(d.total_count); })
      .on("mouseover", function(d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html(d.meta + " = " + d.total_count)
          .style("left", (x(d.meta) + x.rangeBand() + x.rangeBand()/2) + "px")
                  .style("top", (d3.event.pageY - 28) + "px")
        })
      .on("mouseout", function(d) {
        div.transition()    
                  .duration(500)    
                  .style("opacity", 0); 
        });
  console.log("done");
});

// this gets the total time spent on each key 
// from on the loaded file and adds
// it to a javascript object called count_per_meta.
function calc_count_per_meta(data) {
  var count_per_meta = {};
  for(var i = 0; i < data.length; i+=1)
  {
    var row = data[i];
    if(row.meta in count_per_meta)
    {
      count_per_meta[row.meta] += 1;
    }
    else
    {
      count_per_meta[row.meta] = 1;
    }
  }
  
  //convert to array form
  var count_per_meta_array = Object.keys(count_per_meta).map(function (meta) {
    return {
      "meta": meta, 
        "total_count": count_per_meta[meta]
    };
  });
  
  return count_per_meta_array;
}