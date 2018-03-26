# d3-data-viz-svg
Aim:

To find a correlation between two data variables, each measured state by state and taken from different data sources. Then visualize the correlation with a scatter plot and embed the graphic into an .html file. 

#### 1. Find the Data

Look for demographic information using the 2014 one-year estimates from the U.S. Census Bureau's American Community Survey. You can specify your information using the [American FactFinder](http://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml) tool. When searching through the data, be sure to select these options in the left sidebar:

* Topics -> Dataset -> 2014 ACS 1-year estimates

* Geographies -> Select a geographic type -> State - 040 -> All States within United States and Puerto Rico

When you select those filters, use the search bar to chose the demographic of your choice, or browse through the entries already shown. Click the data that interests you and then download the .csv file.

Next, you'll search for data on health risks using 2014 survey data from the [Behavioral Risk Factor Surveillance System](https://chronicdata.cdc.gov/Behavioral-Risk-Factors/BRFSS-2014-Overall/5ra3-ixqq). Note that we already filtered the data by year and break-out—you just need to find the behavioral risk you want to use. Filter the `Question` data on the site before downloading a specified .csv, or simply download the whole .csv file and use Excel's filtering tools.

#### 2. Format and Test the Data

Let's format data for D3. Grab the value columns from each and paste them into a new Excel document.

To make sure they have a solid trend, test for correlation with Excel's `=CORREL()` function. Aim for a value either less than -0.5 or more than 0.5—these values would indicate a moderate correlation and a story that might be worth pursuing.


#### 3. Using the D3 techniques, created a scatter plot that represents each state with circle elements. 

* The x-values of the circles represents the Poverty, while the y-values  represents the persons lacking healthcare data in percentages.

* Included state abbreviations in the circles.

* Created and situated the axes and labels to the left and bottom of the chart.

* Generate this chart in the `d3.html` file in your assignment directory.

* Note: I have used `http-server` to display the graphic since I am pulling data in from a source outside of your app.js file.

#### 4. Embed into an iframe

The `d3.html` displays the graphic which is then, embedded into `index.html` with an iframe. Finally added a quick written analysis of my data below the graphic.
