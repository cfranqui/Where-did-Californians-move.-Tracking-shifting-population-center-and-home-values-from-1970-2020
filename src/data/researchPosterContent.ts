export interface PosterSection {
  id: string;
  title: string;
  badge?: string;
  content: string;
  keyPoints?: string[];
}

export const RESEARCH_METADATA = {
  title: "Where did Californians move? Tracking shifting population center and home values from 1970-2020",
  shortTitle: "Tracking California Population Center & Home Values (1970–2020)",
  author: "Christopher Franqui",
  course: "GEG 230, Spatial Analysis and GIS",
  term: "Spring 2026",
  institution: "Monroe Community College (MCC)",
  researchQuestion: "How has California’s population distribution changed between 1970 and 2020, and how have changes in home affordability influenced these shifts?",
  keywords: ["Spatial Analysis", "GIS", "Population Mean Center", "ArcGIS Pro", "IPUMS NHGIS", "California Albers EPSG:3310", "Home Affordability", "Internal Migration", "Inland Empire", "Central Valley"],
};

export const POSTER_SECTIONS: PosterSection[] = [
  {
    id: "background",
    title: "Background",
    badge: "Context & Motivation",
    content: `For over two centuries, the American West has captured the imagination of settlers, adventurers, and scientists, drawing generations across the mighty Mississippi River to build towns, farms, and cities that fundamentally reshaped how cartographers and geographers understood the United States. 

That westward pull hasn’t ended. California, the destination of this westward expansion, has seen similar changes reflected in its own internal migration. With the population steadily moving away from coastal urban centers toward inland areas and the Central Valley. This project examines the internal pull and the forces driving it.`,
    keyPoints: [
      "Centuries of westward expansion culminated in California's rise as the nation's most populous state.",
      "A secondary internal migration is actively redistributing residents away from coastal hubs toward the Central Valley and Inland Empire.",
      "This study examines spatial population mean centers and home affordability as primary explanatory forces."
    ]
  },
  {
    id: "methods",
    title: "Methods",
    badge: "Spatial Analysis & GIS",
    content: `To collect my data, I used county population data (1970-2020) and median home values (1990, 2016-2020 ACS) from IPUMS NHGIS. This data was placed into ArcGIS, where it was joined to the 2020 TIGER/Line county boundaries. 

To calculate the median home value, I obtained home value data from 1990 and 2020. The 2020 data was sourced from the American Community Survey. Similar to what I did with the population data I joined the data together to my county shapefile. In order to calculate the changes, I used Field calculator to obtain values that could be adjusted to the cost in 2020 using the U.S. Bureau of Labor Statistics Consumer Price Index (CPI).

The map used the following projection: California Albers (EPSG 3310) to calculate the population weight center for each decade. The mean center tool was used. The point to line tool was used to connect the six points from the years 1970, 1980, 1990, 2000, 2010, 2020. 

I repeated these steps two more times:
1. The second time I remitted LA County from the mean.
2. The third time I remitted both LA County and counties in the Bay Area.
3. I took data that was used to look at home values from 1990-2020. The same price range and colors were used for both maps.`,
    keyPoints: [
      "Data Sources: Decennial Census (1970-2020), 1990 STF3 Table NH61A, 2016-2020 ACS Table B25077 via IPUMS NHGIS.",
      "Coordinate System: California Albers (EPSG:3310) projected coordinate system.",
      "Spatial Tools: Mean Center (weighted by population) & Points To Line across 6 decennial intervals.",
      "Comparative Scenarios: Baseline (All 58 counties), Remitting LA County, Remitting LA + 9 Bay Area Counties.",
      "Inflation Adjustment: 1990 home values converted to constant 2020 dollars via BLS CPI."
    ]
  },
  {
    id: "results",
    title: "Results",
    badge: "Empirical Findings",
    content: `My data shows that in the last fifty years California has seen its population move southeast between the decades, 1970-2020.

• When LA County is remitted as part of the mean, the mean center moves up a county north. However it continues to gradually move south.
• When both LA County and Counties in The Bay Area are remitted, the mean center looks similar to how the mean would without LA County included.
• Riverside and San Bernardino counties saw the largest percent of population growth (over 426% and 218% respectively).
• In comparison, counties located along the coast, such as Los Angeles and San Francisco, saw the slowest amount of growth (42.2% and 22.1%).
• Home values in the Bay Area grew substantially, reaching past 1 million dollars in 2020 (San Francisco $1.19M, San Mateo $1.22M, Santa Clara $1.25M).
• Home values in the Central Valley and inland California remained in comparison relatively low, even after the prices were adjusted.`,
    keyPoints: [
      "Population Mean Center drifted steadily South-Southeast from 1970 to 2020.",
      "Inland Empire exploded: Riverside (+426.7%), Placer (+421.3%), Nevada (+287.5%), Madera (+276.3%).",
      "Coastal megacities experienced growth stagnation: San Francisco (+22.1%), Marin (+27.3%), Los Angeles (+42.2%).",
      "Severe housing price divergence: Bay Area surged past $1,000,000 median, while Central Valley counties maintained median prices between $220k–$360k."
    ]
  },
  {
    id: "discussion",
    title: "Discussion",
    badge: "Analysis & Synthesis",
    content: `California’s changes regarding its population and home value in many respects are reflective of what is being seen across the country. Larger cities have an impact on the population mean center as shown when we include LA County as part of the mean center. 

When LA County is not included in our analysis, the population mean center moves up by one county north. However it still projects movement which points south. The same movement is projected when both LA County and several counties that consist of the Bay Area are remitted from the mean center. A further review concerning if southern California experienced an increase in population growth in comparison to northern California as a result of high birth rates and net migration would compliment information obtained from the population mean center analysis.

When the price of a home grew in value, population growth slowed. Where home prices remained relatively affordable, the population grew. We can therefore conclude that as long as the economic gap between rich and poor grows, California will continue to see a shift in its population. In the case of California, this will mean further population growth inland in places like Calaveras, Madera, and Mono.`,
    keyPoints: [
      "Economic sorting mechanism: inverse relationship between home price escalation and population growth rates.",
      "Affordable inland foothill & valley regions (Calaveras, Madera, Mono, Stanislaus) provide relief valves for cost-burdened households.",
      "Suburban/exurban decentralization will persist as long as coastal housing supply remains constrained."
    ]
  },
  {
    id: "references",
    title: "References & Data Sources",
    badge: "Citations",
    content: `• Data: Decennial Census Population (1970–2020) and Median Home Values (1990 STF3 Table NH61A; 2016–2020 ACS Table B25077), accessed via IPUMS NHGIS (Manson et al., 2025; nhgis.org).
• County boundaries: U.S. Census Bureau TIGER/Line Cartographic Boundary Files, 2020.
• Inflation adjustment: U.S. Bureau of Labor Statistics (BLS) Consumer Price Index (CPI).
• Software: Esri ArcGIS Pro 3.x; ArcGIS Spatial Statistics Toolbox (Mean Center, Point To Line, Field Calculator).`,
  },
  {
    id: "acknowledgements",
    title: "Acknowledgements",
    badge: "Gratitude & Notes",
    content: `Acknowledgements: I want to thank Stef for everything she has contributed as part of this project. Whether it was hearing me wake up in the middle of the night to ask about a color for the map or whether it was listening to me talk about home values in California. She has been there. 

I also want to thank Professor Pierce for her part in this project as well. Thank you so much for always listening, helping and challenging me to always think outside of the box. Thank you for being such an amazing Professor. 

Thank you to my parents, Ana and David for everything that they have done for me regarding my classes and the support they have provided. 

I also want to give an acknowledgement to Hoda Mitwally and William T Flynn from the Queens Legal Services NYC/Queens. The work you do is so amazing and I cannot thank you enough for your work. 

Also a large shout out to Stacey Pheffer Amato and the work her staff has done. 

Any opinions, findings, conclusions, or recommendations expressed in this material are those of the author and do not necessarily reflect the views of Professor Pierce or Monroe Community College. Identification of specific products and manufacturers in the text does not imply endorsement by Monroe Community College.`,
  }
];
