import { ReactNode } from "react";
import {
  Moon,
  Sun,
  CloudMoon,
  CloudSun,
  Hurricane,
  CloudFog,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudRainHeavy,
  CloudSleet,
  CloudHail,
  CloudSnow,
  CloudLightningRain,
  CloudHaze,
  Lightning,
} from "react-bootstrap-icons";

export function WeatherIcon({
  weatherType,
  fallback,
}: {
  weatherType: number;
  fallback: ReactNode;
}) {
  switch (weatherType) {
    case 0: // Clear sky
      return <Moon />;
    case 1: // Sunny
      return <Sun />;
    case 2: // Partly cloudy (night)
      return <CloudMoon />;
    case 3: // Sunny intervals
      return <CloudSun />;
    case 4: // Sand storm
      return <Hurricane />;
    case 5: // Mist
    case 6: // Fog
      return <CloudFog />;
    case 7: // Light cloud
    case 8: // Thick cloud
      return <Cloud />;
    case 9: // Light Rain Showers (night)
    case 10: // Light Rain Showers (day)
      return <CloudRain />; // Bootstrap icons doesn't have an icon for cloud + rain + sun/moon
    case 11: // Drizzle
    case 12: // Light rain
      return <CloudDrizzle />;
    case 13: // Heavy rain showers (night)
    case 14: // Heavy rain showers (day)
      return <CloudRain />;
    case 15: // Heavy rain
      return <CloudRainHeavy />;
    case 39: // Light rain
      return <CloudDrizzle />;
    case 16: // Sleet showers (night)
    case 17: // Sleet showers (day)
    case 18: // Sleet
      return <CloudSleet />;
    case 19: // Hail showers (night)
    case 20: // Hail showers (day)
    case 21: // Hail
      return <CloudHail />;
    case 22: // Light snowy showers (night)
    case 23: // Light snowy showers (day)
    case 24: // Light snow
    case 25: // Heavy snow showers (night)
    case 26: // Heavy snow showers (day)
    case 27: // Heavy snow
      return <CloudSnow />;
    case 28: // Thundery showers (night)
    case 29: // Thundery showers (day)
    case 30: // Lightning
      return <CloudLightningRain />;
    case 31: // Hurricane/tornado
      return <Hurricane />;
    case 32: // Hazy
      return <CloudHaze />;
    case 33: // Sand storm
      return <Hurricane />;
    case 34: // Mist
    case 35: // Fog
      return <CloudFog />;
    case 36: // Light cloud
    case 37: // Thick cloud
      return <Cloud />;
    case 38: // Drizzle
      return <CloudDrizzle />;
    case 40: // Heavy rain
      return <CloudRainHeavy />;
    case 41: // Sleet
      return <CloudSleet />;
    case 42: // Hail
      return <CloudHail />;
    case 43: // Light snow
    case 44: // Heavy snow
      return <CloudSnow />;
    case 45: // Lightning
      return <Lightning />;
    case 46: // Hurricane/tornado
      return <Hurricane />;
    case 47: // Hazy
      return <CloudHaze />;
  }

  return fallback;
}
