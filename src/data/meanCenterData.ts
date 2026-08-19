import { MeanCenterScenario, MeanCenterPoint } from './californiaData';

export type { MeanCenterScenario, MeanCenterPoint };

export const MEAN_CENTER_SCENARIOS: MeanCenterScenario[] = [
  {
    id: 'baseline',
    title: 'Baseline (All 58 Counties)',
    description: 'Includes all California counties. The immense population weight of Los Angeles and Southern California anchors the mean center further south in Fresno/Madera, pulling steadily southeastward across 1970–2020.',
    color: '#f43f5e', // Rose
    points: [
      { year: 1970, lat: 36.65, lng: -119.72, county: 'Fresno', albersX: 28410, albersY: -58400, mapX: 47.6, mapY: 58.2 },
      { year: 1980, lat: 36.56, lng: -119.64, county: 'Fresno', albersX: 35800, albersY: -68100, mapX: 48.2, mapY: 59.4 },
      { year: 1990, lat: 36.45, lng: -119.52, county: 'Fresno', albersX: 46700, albersY: -80200, mapX: 49.0, mapY: 60.8 },
      { year: 2000, lat: 36.35, lng: -119.41, county: 'Tulare/Fresno', albersX: 56800, albersY: -91100, mapX: 49.8, mapY: 62.1 },
      { year: 2010, lat: 36.26, lng: -119.32, county: 'Tulare', albersX: 65100, albersY: -101000, mapX: 50.5, mapY: 63.3 },
      { year: 2020, lat: 36.19, lng: -119.25, county: 'Tulare', albersX: 71400, albersY: -108600, mapX: 51.1, mapY: 64.2 },
    ]
  },
  {
    id: 'without_la',
    title: 'Without Los Angeles County',
    description: 'When LA County is remitted as part of the mean, the mean center shifts approximately one county north into Madera/Mariposa, yet still continues its persistent southeastward trajectory toward the inland valleys.',
    color: '#f59e0b', // Amber
    points: [
      { year: 1970, lat: 37.42, lng: -120.25, county: 'Madera', albersX: -22100, albersY: 26800, mapX: 44.5, mapY: 50.8 },
      { year: 1980, lat: 37.33, lng: -120.15, county: 'Madera', albersX: -13400, albersY: 16900, mapX: 45.3, mapY: 52.0 },
      { year: 1990, lat: 37.21, lng: -120.02, county: 'Madera', albersX: -2100, albersY: 3700, mapX: 46.2, mapY: 53.4 },
      { year: 2000, lat: 37.10, lng: -119.90, county: 'Madera', albersX: 8400, albersY: -8500, mapX: 47.1, mapY: 54.8 },
      { year: 2010, lat: 36.99, lng: -119.79, county: 'Madera/Fresno', albersX: 18100, albersY: -20700, mapX: 47.9, mapY: 56.1 },
      { year: 2020, lat: 36.90, lng: -119.70, county: 'Fresno', albersX: 26000, albersY: -30600, mapX: 48.6, mapY: 57.2 },
    ]
  },
  {
    id: 'without_la_and_bay',
    title: 'Without Los Angeles & Bay Area',
    description: 'When both LA County and the 9 Bay Area counties are remitted, the mean center trajectory tracks similarly to the without-LA scenario, demonstrating how Inland Empire and Central Valley growth pulls the inland population southward.',
    color: '#0284c7', // Sky blue
    points: [
      { year: 1970, lat: 37.30, lng: -119.98, county: 'Madera', albersX: 1500, albersY: 13800, mapX: 46.5, mapY: 52.4 },
      { year: 1980, lat: 37.19, lng: -119.86, county: 'Madera', albersX: 11900, albersY: 1700, mapX: 47.4, mapY: 53.8 },
      { year: 1990, lat: 37.06, lng: -119.72, county: 'Madera', albersX: 24200, albersY: -12800, mapX: 48.4, mapY: 55.3 },
      { year: 2000, lat: 36.94, lng: -119.59, county: 'Fresno', albersX: 35600, albersY: -26100, mapX: 49.3, mapY: 56.7 },
      { year: 2010, lat: 36.82, lng: -119.47, county: 'Fresno', albersX: 46100, albersY: -39400, mapX: 50.2, mapY: 58.1 },
      { year: 2020, lat: 36.72, lng: -119.37, county: 'Fresno', albersX: 54800, albersY: -50500, mapX: 50.9, mapY: 59.3 },
    ]
  }
];
