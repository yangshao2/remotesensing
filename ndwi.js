// Specify the region of interest as a point and buffer it to create an area (change coordinates as needed).
var point = ee.Geometry.Point([-77.54, 39.08]).buffer(10000);

// Load Landsat 8 image collection and filter by date and region.
var startDate = '2020-05-01'; // Start date of the time range
var endDate = '2020-09-30'; // End date of the time range
var imageCollection = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
    .filterDate(startDate, endDate)
    .filterBounds(point)
    .sort('CLOUD_COVER')
    .first();

print(imageCollection)
// Calculate NDWI using the formula (Green - SWIR) / (Green + SWIR).
// Note: Landsat 8 band names for Green and SWIR might differ, commonly Green is band 3 (B3), and SWIR is band 6 (B6).
var ndwi = imageCollection.normalizedDifference(['B3', 'B6']).rename('NDWI');

// Display the results.
var visualizationParams = {
    bands: ['NDWI'],
    min: -1,
    max: 1,
    palette: ['00FFFF', '0000FF'] // Custom palette for visualization: Cyan to Blue
};

// Add NDWI layer to the map.
Map.centerObject(point, 10); // Center the map on the region of interest with a zoom level of 10.
Map.addLayer(ndwi, visualizationParams, 'NDWI');

// Optionally, add the original image to compare.
var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3}; // RGB visualization parameters for Landsat 8

Map.addLayer(imageCollection, visParams, 'Landsat 8 image');

//Apply the threshold of 0.5; Adjust value as needed
var water = ndwi.gt(0.5)

Map.addLayer(water,
             {min: 0, max: 1, palette: ['grey', 'blue']},
             'water map');    