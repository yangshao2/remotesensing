// Define the area of interest as a Geometry or Feature.
var geometry = ee.Geometry.Point([-122.438005, 37.729844]); // Example: San Francisco

// Set the time range for the year of interest.
var year = 2020;
var startDate = ee.Date.fromYMD(year, 6, 1);
var endDate = ee.Date.fromYMD(year, 7, 31);

// Load the Landsat 8 Surface Reflectance data for the specified time range and area.
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                    .filterDate(startDate, endDate)
                    .filterBounds(geometry)
                    .sort('DATE_ACQUIRED');

// Define visualization parameters.
var visParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4
};

// Function to add an image to the map.
var addImageToMap = function(image, index) {
  var date = image.date().format('YYYY-MM-dd').getInfo();
  var layerName = 'Image ' + index + ' (' + date + ')';
  Map.addLayer(image, visParams, layerName);
};

// Convert the image collection to a list and iterate over it.
var listOfImages = collection.toList(collection.size());
var numberOfImages = listOfImages.size().getInfo(); // Get the number of images.

for (var i = 0; i < numberOfImages; i++) {
  var image = ee.Image(listOfImages.get(i));
  addImageToMap(image, i + 1);
}

// Center the map.
Map.centerObject(geometry, 8);
