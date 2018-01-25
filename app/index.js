require('./index.css')

import * as d3 from "d3";
// import { selectAll } from 'd3-selection'


var svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);

var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });

var parseTime = d3.timeParse("%Y%m%d");

var cities = [
  {
    id: 'Cedar City',
    values: [
      {
        date: parseTime(20111001),
        temperature: 20
      },
      {
        date: parseTime(20111002),
        temperature: 10
      },
      {
        date: parseTime(20111003),
        temperature: 40
      },
      {
        date: parseTime(20111004),
        temperature: 20
      }
    ]
  },
  {
    id: 'Cedar Key',
    values: [
      {
        date: parseTime(20111001),
        temperature: 40
      },
      {
        date: parseTime(20111002),
        temperature: 40
      },
      {
        date: parseTime(20111003),
        temperature: 10
      },
      {
        date: parseTime(20111004),
        temperature: 30
      }
    ]
  }
]

var dates = [20111001, 20111002, 20111003, 20111004]

var dates2 =[];
dates.forEach(function(d){
  dates2.push(parseTime(d));
});


x.domain(d3.extent(dates2));

y.domain([
  d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
  d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
]);

z.domain(cities.map(function(c) { return c.id; }));

g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y))
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("fill", "#000")
    .text("Temperature, ºC");

var city = g.selectAll(".city")
  .data(cities)
  .enter().append("g")
    .attr("class", "city");

city.append("path")
    .attr("class", "line")
    .attr("d", function(d) { return line(d.values); })
    .style("stroke", function(d) { return z(d.id); });

city.append("text")
    .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
    .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
    .attr("x", 3)
    .attr("dy", "0.35em")
    .style("font", "10px sans-serif")
    .text(function(d) { return d.id; });
