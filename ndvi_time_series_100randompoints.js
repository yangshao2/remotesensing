var points = ee.FeatureCollection("users/yangshaovt2024/rp100");

Map.addLayer(points,{},'random samples')
//Map.centerObject(points, 3);

//Access NDVI data
var modisNDVI = ee.ImageCollection('MODIS/061/MOD13Q1')
                  .select('NDVI');
print(modisNDVI)


//display the first NDVI image
var firstNDVI = modisNDVI.first()
print(firstNDVI)
Map.addLayer(firstNDVI, {}, 'NDVI image (first one only');

var startDate = ee.Date('2021-01-01'); // Start date of your choice
var endDate = ee.Date('2023-12-31'); // End date of your choice
modisNDVI = modisNDVI.filterDate(startDate, endDate);
print(modisNDVI)

var extractNDVI = function(image) {
  return image.reduceRegions({
    collection: points,
    reducer: ee.Reducer.first().setOutputs(['NDVI']), // Use .mean() if points are areas
    scale: 250 // MODIS resolution in meters
  }).map(function(feature) {
    return feature.set('date', image.date().format('YYYY-MM-dd'));
  });
};


var timeseriesData = modisNDVI.map(extractNDVI).flatten();

Export.table.toDrive({
  collection: timeseriesData,
  description: 'MODIS_NDVI_TimeSeries2021_2023',
  fileFormat: 'CSV'
});



