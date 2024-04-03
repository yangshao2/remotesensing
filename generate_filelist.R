#revise the file path 
filepath<-'C:/Users/yshao/Desktop/RS2024/labs/TIMESAT_lab/'

outfile <- paste(filepath, "filelist.txt", sep="")

# Open the files for writing
f1 <- file(outfile, "w")

# Write the initial line; We have a total of 69 MODIS NDVI files. 
writeLines("69", f1)

# Loop to generate file paths and write to the files; Note we
#only use the first year (2021) for this lab; 
for (j in 1:3){
for (i in 1:23) {
  line <- paste(filepath,"enviformat/MODIS",i,'.dat', sep="")
  print(line)
  writeLines(line, f1)
}
}

# Close the file connections
close(f1)