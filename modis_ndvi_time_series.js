var roi = ee.Geometry.Point([-80.47716948894428, 37.182984164131554]);

var dataset = ee.ImageCollection("MODIS/061/MOD13Q1")
                  .filterBounds(roi)     
                  .filter(ee.Filter.date('2001-01-01', '2023-12-31'));
                  
var NDVIs = dataset.select('NDVI');
print(NDVIs)


//Map.addLayer(NDVIs, colorizedVis, 'NDVI');
Map.addLayer(roi, {}, 'a_point');

//extract NDVI values (2001-2021) for this point location
var ndvi_timeseries = ui.Chart.image.series(NDVIs, roi)
  .setChartType('ScatterChart')
  .setOptions({
   title: 'MODIS NDVI Time Series at ROI',
   trendlines: {0: {
                color: 'CC0000'
   }},
   lineWidth: 1,
   pointSize: 3,
  });
print(ndvi_timeseries);