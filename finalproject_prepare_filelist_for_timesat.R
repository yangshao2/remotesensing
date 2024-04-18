install.packages('raster')
install.packages('rgdal')

library(raster)
library(rgdal)
filelist<-Sys.glob('MOD13Q1.A2001*NDVI.tif')
for (i in 1:length(filelist)){
  a<-raster(filelist[i])
  outfile<-paste0('a',i,'.dat')
  writeRaster(a,outfile,format='ENVI',overwrite=T)
}

# Open the files for writing
f1 <- file('filelist.txt', "w")

# Write the initial line; We have a total of 69 MODIS NDVI files. 
writeLines("69", f1)

# Loop to generate file paths and write to the files; Note we
#only use the first year (2021) for this lab; 
for (j in 1:3){
  for (i in 1:23) {
    line <- paste(getwd(),"/a",i,'.envi', sep="")
    print(line)
    writeLines(line, f1)
  }
}

# Close the file connections
close(f1)
