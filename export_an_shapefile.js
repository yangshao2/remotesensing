var points = ee.FeatureCollection("users/yangshaovt2024/rp100");

Export.table.toDrive({
  collection: points,
  description: 'exportToDriveExample',
  folder: 'GEEExports',
  fileNamePrefix: 'random_points100',
  fileFormat: 'SHP'
});