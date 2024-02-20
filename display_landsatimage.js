var geometry = ee.Geometry.Point([-77.57, 39.11]); // Example: San Francisco

// Set the time range for the year 2020.
var startDate = '2016-06-01';
var endDate = '2016-07-31';

// Load the Landsat 8 Surface Reflectance data for the specified time range and area.
var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate(startDate, endDate)
                  .filterBounds(geometry)
                  .sort('CLOUD_COVER')
                  .first(); // Select the first image with the least cloud cover.
print(dataset)
// Select the bands to visualize. For example, Red (B4), Green (B3), and Blue (B2) for true color.
var visualizationParameters = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4
};

// Add the image to the map.
Map.centerObject(geometry, 10); // Adjust the zoom level accordingly.
Map.addLayer(dataset, visualizationParameters, 'Landsat 8 Image');
