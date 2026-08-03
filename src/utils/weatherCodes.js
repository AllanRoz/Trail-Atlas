import { Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning } from 'lucide-react'

// WMO weather interpretation codes, as returned by Open-Meteo.
// https://open-meteo.com/en/docs — condensed to what we display.
const codeMap = {
  0: { label: 'Clear', icon: Sun },
  1: { label: 'Mostly Clear', icon: CloudSun },
  2: { label: 'Partly Cloudy', icon: CloudSun },
  3: { label: 'Overcast', icon: Cloud },
  45: { label: 'Fog', icon: CloudFog },
  48: { label: 'Fog', icon: CloudFog },
  51: { label: 'Light Drizzle', icon: CloudDrizzle },
  53: { label: 'Drizzle', icon: CloudDrizzle },
  55: { label: 'Heavy Drizzle', icon: CloudDrizzle },
  61: { label: 'Light Rain', icon: CloudRain },
  63: { label: 'Rain', icon: CloudRain },
  65: { label: 'Heavy Rain', icon: CloudRain },
  71: { label: 'Light Snow', icon: CloudSnow },
  73: { label: 'Snow', icon: CloudSnow },
  75: { label: 'Heavy Snow', icon: CloudSnow },
  80: { label: 'Rain Showers', icon: CloudRain },
  81: { label: 'Rain Showers', icon: CloudRain },
  82: { label: 'Violent Showers', icon: CloudRain },
  95: { label: 'Thunderstorm', icon: CloudLightning },
  96: { label: 'Thunderstorm', icon: CloudLightning },
  99: { label: 'Thunderstorm', icon: CloudLightning },
}

export function weatherFromCode(code) {
  return codeMap[code] ?? { label: 'Unknown', icon: Cloud }
}
