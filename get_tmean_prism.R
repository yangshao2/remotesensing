installed.packages('raster')
install.packages("prism")
install.packages("sp")

library(prism)
library(raster)
library(sp)

prism_set_dl_dir('.')
# For daily data
daily_data <- prism::get_prism_dailys(type = "tmean", minDate = "2024-01-01", maxDate = "2024-03-10")

filelist <-  prism_archive_ls()
data_stack <- prism_stack(filelist)

# "path/to/your/prism_data" should be replaced with the actual path to the folder containing your PRISM data files

# Replace -123.25 and 42.25 with your longitude and latitude
location <- SpatialPoints(data.frame(lon = -80.4139, lat = 37.2296), 
                          proj4string = CRS(proj4string(data_stack)))

tmean<-extract(data_stack,location)
write.csv(t(tmean),'tmean.csv')