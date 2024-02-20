
var county = ee.FeatureCollection("users/yshao/vacounty");

//Access image from July 2 2016
var l2016 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_015033_20160702');
print(l2016)
var ndvi2016 = l2016.normalizedDifference(['B5', 'B4']);
Map.addLayer(ndvi2016,{min:-1,max:1},'ndvi2016')

var l2018 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_015033_20180708');
var ndvi2018 = l2018.normalizedDifference(['B5', 'B4']);
Map.addLayer(ndvi2018,{min:-1,max:1},'ndvi2018')
//Access image from 2018 and generate ndvi image:


//NDVI differencing 
var ndvi_diff = ndvi2018.subtract(ndvi2016)

//Apply threshold to identify change pixels 
var change = ndvi_diff.lt(-0.3)

//Clip change map based on the county boundary
var finalmap = change.clip(county)


Map.addLayer(finalmap,
             {min: 0, max: 1, palette: ['grey', 'red']},
             'change map');    