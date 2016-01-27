*** AUTHORS *** 
JAMES TAM 998233811

*** REFERENCED LIBRARIES / DATA *** 
- d3js
- crossfilter by Square- **not used in milestone, but I have potential ideas for it
- Chris Bryan's boiler plate handout

*** SYSTEM DESCRIPTION / INSTRUCTIONS *** 
Utilizing much of Chris Bryan's example, this visualizaiton is a bar chart that shows the total count of ALL the items crafted (i.e. all the meta while key="CraftedItem"). The VE datapack was parsed to only contain rows with key="CraftedItem". Right now, the many items render the x-axis messy, but the bars are big enough to be moused over for a tooltip to appear, showing the count of the specific item (e.g. CHEST = 14548).