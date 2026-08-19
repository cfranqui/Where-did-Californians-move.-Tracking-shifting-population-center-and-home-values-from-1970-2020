# Where Did Californians Move? Tracking Shifting Population Center and Home Values (1970–2020)

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![GIS Projection](https://img.shields.io/badge/Projection-California_Albers_EPSG%3A3310-green.svg)](https://epsg.io/3310)
[![Data Source](https://img.shields.io/badge/Data_Source-IPUMS_NHGIS-orange.svg)](https://www.nhgis.org/)

An interactive spatial analysis and GIS research application exploring California's population distribution shifts, decennial weighted mean centers, and housing affordability dynamics between 1970 and 2020.

**Author:** Christopher Franqui  
**Course:** GEG 230: Spatial Analysis and GIS (Spring 2026)  
**Institution:** Monroe Community College (MCC)  

---

## 🎯 Project Goals & Research Scope

### Primary Research Question
> **"How has California’s population distribution changed between 1970 and 2020, and how have changes in home affordability influenced these shifts?"**

### Background
For over two centuries, the American West has captured the imagination of settlers, adventurers, and scientists, drawing generations across the mighty Mississippi River to build towns, farms, and cities that fundamentally reshaped how cartographers and geographers understood the United States. 

That westward pull hasn’t ended. California, the historic destination of this westward expansion, has seen similar changes reflected in its own internal migration—with population steadily decentralizing away from coastal urban centers toward inland areas, the Central Valley, and the Inland Empire. This project examines the internal pull and the economic forces driving it.

### Core Objectives
1. **Track Decennial Population Mean Centers:** Compute and visualize the geographic center of California's population for each census decade from 1970 to 2020 using the California Albers Equal Area projection (EPSG:3310).
2. **Evaluate Metropolitan Gravitational Pull:** Test the spatial sensitivity of the mean center by recalculating trajectories across three scenarios:
   - **Baseline:** All 58 California counties included.
   - **Scenario 2:** Without Los Angeles County.
   - **Scenario 3:** Without Los Angeles County and the 9-county San Francisco Bay Area.
3. **Map 50-Year County Population Growth:** Classify and analyze percentage population surges across all 58 counties (<50%, 50%–100%, 100%–200%, 200%–300%, >300%).
4. **Analyze Housing Affordability Divergence:** Normalize 1990 median home values to 2020 constant dollars using the U.S. Bureau of Labor Statistics Consumer Price Index (CPI) and compare them with 2016–2020 ACS values to reveal coastal-inland price disparities.
5. **Provide an Open Interactive GIS Platform:** Deliver an interactive, accessible web dashboard featuring digital research posters, choropleth map layers, decade animation scrubbers, and full tabular data export.

---

## 🗺️ Spatial Analysis & GIS Methodology

### 1. Cartographic Projection
* **Coordinate Reference System:** California Albers Equal Area (**EPSG:3310**)
* **Parameters:**
  * Datum: North American Datum 1983 (NAD83)
  * Standard Parallel 1: $34.0^\circ\text{ N}$
  * Standard Parallel 2: $40.5^\circ\text{ N}$
  * Central Meridian: $-120.0^\circ\text{ W}$
  * Latitude of Origin: $0.0^\circ$
  * False Easting: $0.0\text{ m}$
  * False Northing: $-4,000,000.0\text{ m}$
  * Units: Meters

### 2. Weighted Mean Center Calculation
The population-weighted centroid coordinates $(\bar{X}_t, \bar{Y}_t)$ for each decennial census year $t \in \{1970, 1980, 1990, 2000, 2010, 2020\}$ were calculated in **Esri ArcGIS Pro** using the *Mean Center* spatial statistics tool:

$$\bar{X}_t = \frac{\sum_{i=1}^{n} w_{i,t} \cdot x_i}{\sum_{i=1}^{n} w_{i,t}}, \quad \bar{Y}_t = \frac{\sum_{i=1}^{n} w_{i,t} \cdot y_i}{\sum_{i=1}^{n} w_{i,t}}$$

Where:
* $w_{i,t}$ is the decennial census population of county $i$ in year $t$.
* $(x_i, y_i)$ are the projected centroid coordinates of county $i$ in EPSG:3310 meters.
* Trajectory lines connecting the six decennial points were created using the **Points To Line** tool.

### 3. Inflation Adjustment of Home Values
To establish true parity between 1990 and 2020 housing prices, nominal 1990 median home values were adjusted to constant 2020 dollars in ArcGIS using the **Field Calculator** and the **U.S. Bureau of Labor Statistics Consumer Price Index (CPI)**:

$$\text{Home Value}_{\text{Adj } 2020} = \text{Home Value}_{1990} \times \left(\frac{\text{CPI}_{2020}}{\text{CPI}_{1990}}\right) = \text{Home Value}_{1990} \times \left(\frac{258.81}{130.7}\right) \approx \text{Home Value}_{1990} \times 2.023$$

---

## 📊 Key Findings & Results

1. **Southeast Vector Drift:** Over the last 50 years, California's population center has persistently shifted south-southeast through Fresno and Tulare counties.
2. **Impact of Los Angeles County:** When Los Angeles County is remitted, the mean center shifts approximately one county north into Madera County, but the south-southeast trajectory remains completely intact.
3. **Remitting the Bay Area:** Remitting both Los Angeles and the 9 Bay Area counties yields a trajectory nearly identical to the without-LA scenario, demonstrating the overwhelming southward momentum created by inland population growth.
4. **The Inland Empire Surge:** Riverside County experienced a massive **+426.7%** population increase (459,074 to 2,418,185), and San Bernardino County grew by **+218.9%** (684,072 to 2,181,654). Placer County (+421.3%) and Madera County (+276.3%) also recorded extraordinary inland growth.
5. **Coastal Deceleration & Affordability Crisis:** Dense coastal counties experienced the slowest percentage growth in the state (San Francisco at **+22.1%**, Marin at **+27.3%**, and Los Angeles at **+42.2%**). Median home values in the Bay Area surged past **$1,000,000** in 2020 (San Francisco $1.19M, San Mateo $1.22M, Santa Clara $1.25M), whereas Central Valley home values remained relatively affordable between $220k and $360k.
6. **Conclusion:** High housing costs in coastal employment centers have acted as a centrifugal force, pushing middle-income residents toward relatively affordable inland and foothill regions (e.g., Calaveras, Madera, Stanislaus, and Mono).

---

## 🛠️ Installation & Setup Process

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (version **18.0.0** or higher)
* [npm](https://www.npmjs.com/) (version **9.0.0** or higher) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
* [Git](https://git-scm.com/)

### Step 1: Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/california-population-gis-1970-2020.git
cd california-population-gis-1970-2020
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

### Step 4: Build for Production
To generate an optimized, self-contained production build:
```bash
npm run build
```
The compiled static assets will be output to the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## 🚀 How to Add and Push This Project to GitHub

Follow these steps in your terminal to initialize and push this project to your GitHub account:

### 1. Initialize Git Repository
```bash
git init
```

### 2. Stage All Project Files
```bash
git add .
```

### 3. Commit Your Changes
```bash
git commit -m "feat: initial commit for California Population & Home Values GIS Analysis (1970-2020)"
```

### 4. Create a New Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `california-population-gis-1970-2020`).
3. Set the repository to **Public** or **Private**.
4. Leave "Initialize this repository with a README" **unchecked** (we already created one).
5. Click **Create repository**.

### 5. Link and Push to GitHub
```bash
# Rename default branch to main
git branch -M main

# Add your remote origin (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/california-population-gis-1970-2020.git

# Push the codebase to GitHub
git push -u origin main
```

---

## 📁 Repository Structure

```
├── .env.example                     # Environment configuration reference
├── .gitignore                       # Git ignore rules for node_modules and builds
├── index.html                       # HTML5 entry template with viewport settings
├── metadata.json                    # Application metadata and capabilities
├── package.json                     # Node.js dependencies and build scripts
├── tsconfig.json                    # TypeScript compiler configuration
├── vite.config.ts                   # Vite and Tailwind CSS build setup
├── README.md                        # Comprehensive research & setup documentation
└── src/
    ├── App.tsx                      # Main application component & tab coordinator
    ├── main.tsx                     # React DOM root mounting
    ├── index.css                    # Tailwind CSS 4 setup and global styles
    ├── data/
    │   ├── californiaData.ts        # 58 California counties full dataset (1970-2020)
    │   ├── meanCenterData.ts        # EPSG:3310 & WGS84 coordinates for 3 scenarios
    │   └── researchPosterContent.ts # Full text, research questions, and citations
    └── components/
        ├── Navbar.tsx               # Header with navigation tabs & GitHub guide button
        ├── MapViewer.tsx            # Interactive California SVG map with 6 layers
        ├── MeanCenterVisualizer.tsx # Trajectory vector inspector & coordinate matrix
        ├── CountyTable.tsx          # Searchable, filterable 58-county database with CSV export
        ├── ResearchPoster.tsx       # Digital interactive academic conference poster
        ├── MethodologySection.tsx   # Detailed spatial statistics & projection math
        ├── DiscussionInsights.tsx   # Recharts scatter plots, bar rankings, and synthesis
        └── GitHubExportModal.tsx    # Modal guide for Git commands and installation
```

---

## 📚 References & Data Sources

* **Decennial Census Data (1970–2020):** Total population counts for all 58 California counties across 1970, 1980, 1990, 2000, 2010, and 2020. Accessed via **IPUMS NHGIS** (Manson, Schroeder, Van Riper, Kugler, & Ruggles, 2025; [nhgis.org](https://www.nhgis.org)).
* **1990 Median Home Values:** 1990 Decennial Census Summary Tape File 3 (STF3), Table **NH61A** (*Specified Owner-Occupied Nonfarm Housing Units: Median Value*). Accessed via IPUMS NHGIS.
* **2020 Median Home Values:** 2016–2020 American Community Survey (ACS) 5-Year Estimates, Table **B25077** (*Median Value for Owner-Occupied Housing Units*). Accessed via IPUMS NHGIS.
* **Cartographic Boundaries:** U.S. Census Bureau 2020 TIGER/Line Cartographic Boundary Files (`cb_2020_us_county_500k`).
* **Inflation Adjustment Index:** U.S. Bureau of Labor Statistics (BLS) Consumer Price Index for All Urban Consumers (CPI-U).
* **GIS Software:** Esri ArcGIS Pro 3.x (*Spatial Statistics Tools: Mean Center, Points To Line, Project, Field Calculator*).

---

## 🙏 Acknowledgements

* **Stef:** For endless patience, discussing map color schemes in the middle of the night, and listening to talks about California real estate.
* **Professor Pierce:** For always listening, guiding, and challenging students to think outside of the box.
* **Ana & David:** For their unwavering support throughout academic studies.
* **Hoda Mitwally & William T. Flynn:** Queens Legal Services NYC/Queens for their tireless community advocacy.
* **Assemblywoman Stacey Pheffer Amato & Staff:** For their dedicated public service.
* **Monroe Community College (MCC):** GEG 230 Spatial Analysis and GIS Program.

*Disclaimer: Any opinions, findings, conclusions, or recommendations expressed in this material are those of the author and do not necessarily reflect the views of Professor Pierce or Monroe Community College.*

---

## 📄 License
This research project and codebase are released under the [Apache-2.0 License](LICENSE).
