var extractNDVI = function(image) {
    return image.reduceRegions({
      collection: points,
      reducer: ee.Reducer.first().setOutputs(['NDVI']), // Use .mean() if points are areas
      scale: 250 // MODIS resolution in meters
    }).map(function(feature) {
      return feature.set('date', image.date().format('YYYY-MM-dd'));
    });
  };