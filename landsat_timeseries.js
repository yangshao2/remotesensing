var roi = ee.Geometry.Point([-97.85708919280819, 41.97032455823904]);

var landsat8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2").filterBounds(roi)
                      .filterDate('2013-01-01', '2023-02-27')
print(landsat8)  

var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
  return image.addBands(ndvi);
};


var landsat8_ndvi = landsat8.map(addNDVI);

Map.centerObject(roi, 17);
Map.addLayer(roi,{palette:['red']},'apoint');

// Plot a time series of NIR at a single location.
var l8Chart = ui.Chart.image.series(landsat8_ndvi.select('NDVI'), roi)
  .setChartType('ScatterChart')
  .setOptions({
   title: 'Landsat 8 NIR at ROI',
   trendlines: {0: {
                color: 'CC0000'
   }},
   lineWidth: 1,
   pointSize: 3,
  });
print(l8Chart);


//var greenest = landsat8_ndvi.qualityMosaic('NDVI');
//var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
//Map.addLayer(greenest.select('NDVI'), ndviParams, 'NDVI image');