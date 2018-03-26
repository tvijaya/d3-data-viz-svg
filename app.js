// Step 0: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 80, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Append an SVG group
var chart = svg.append("g");

// Append a div to the bodyj to create tooltips, assign it a class
d3.select(".chart").append("div").attr("class", "tooltip").style("opacity", 0);

// Retrieve data from the CSV file and execute everything below
d3.csv("data/data.csv", function(err, jrnlsmData) {
  if (err) throw err;

  jrnlsmData.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
  });

  // Create scale functions
  var yLinearScale = d3.scaleLinear().range([height, 0]);

  var xLinearScale = d3.scaleLinear().range([0, width]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // These variables store the minimum and maximum values in a column in data.csv
  var xMin;
  var xMax;
  var yMax;

  // This function identifies the minimum and maximum values in a column in data.csv
  // and assign them to xMin and xMax variables, which will define the axis domain
  function findMinAndMax(dataColumnX) {
    xMin = d3.min(jrnlsmData, function(data) {
      return +data[dataColumnX] * 0.8;
    });

    xMax = d3.max(jrnlsmData, function(data) {
      return +data[dataColumnX] * 1.1;
    });

    yMax = d3.max(jrnlsmData, function(data) {
      return +data.healthcare * 1.1;
    });
  }

  // The  x-axis is 'poverty'
  var currentAxisLabelX = "poverty";

  // Call findMinAndMax()
  findMinAndMax(currentAxisLabelX);

  // Set the domain of an axis to extend from the min to the max value of the data column
  xLinearScale.domain([xMin, xMax]);
  yLinearScale.domain([0, yMax]);

  // Initialize tooltip
  var toolTip = d3
    .tip()
    .attr("class", "tooltip")
    // Define position
    .offset([80, -80])
    // The html() method allows us to mix JavaScript with HTML in the callback function
    .html(function(data) {
      //var bandName = data.rockband;
      var numHits = +data.healthcare;
      var bandInfo = +data[currentAxisLabelX];
      var bandString;
      // Tooltip text depends on which axis is active/has been clicked
      
      return data.state +
        "<br> Poverty :" +
        data.poverty +
        "% <br> Lacks Healthcare: " +
        data.healthcare +
        "%";

    });

  // Create tooltip
  chart.call(toolTip);

  chart
    .selectAll("circle")
    .data(jrnlsmData)
    .enter()
    .append("circle")
    .attr("cx", function(data, index) {
      return xLinearScale(+data[currentAxisLabelX]);
    })
    .attr("cy", function(data, index) {
      return yLinearScale(data.healthcare);
    })
    .attr("r", "12")
    .attr("fill", "#4bcce3")
    .style("opacity", 0.8)
    // display tooltip on click
    .on("mouseenter", function(data) {
      toolTip.show(data);
    })
    // hide tooltip on mouseout
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  chart.append("text")
    .style("text-anchor", "middle")
    .attr("class", "state-names")    
    .selectAll("tspan")
    .data(jrnlsmData)
    .enter()
    .append("tspan")
    .attr("x", function(data) { return xLinearScale(+data[currentAxisLabelX]); })
    .attr("y", function(data) { return yLinearScale(+data.healthcare - 0.2); })
    .text(function(data) { return data.abbr });
  // Append an SVG group for the x-axis, then display the x-axis
  chart
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    // The class name assigned here will be used for transition effects
    .attr("class", "x-axis")
    .call(bottomAxis);

  // Append a group for y-axis, then display it
  chart.append("g").call(leftAxis);

  // Append y-axis label
  chart
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("class", "axis-text")
    .attr("data-axis-name", "healthcare")
    .text("Lacks Healthcare (%)");

  // Append x-axis labels
  chart
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
    )
    // This axis label is active by default
    .attr("class", "axis-text active")
    .attr("data-axis-name", "poverty")
    .text("In Poverty (%)");

});
