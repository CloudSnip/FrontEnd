export function calculateHeatIndex(temp, humidity) {
  // Temp + 0.55 * (1 - Humidity) * (Temp - 14.5)
  const heatIndex = temp + 0.55 * (1 - humidity / 100) * (temp - 14.5);
  return Math.round(heatIndex * 10) / 10;
}

export function calculateDewPoint(temp, humidity) {
  // Temp - ((100 - Humidity) / 5)
  const dewPoint = temp - (100 - humidity) / 5;
  return Math.round(dewPoint * 10) / 10;
}

export function calculateAbsoluteHumidity(temp, humidity) {
  // (6.112 * e^((17.67 * Temp) / (Temp + 243.5)) * Humidity * 2.1674) / (Temp + 273.15)
  const absoluteHumidity =
    (6.112 * Math.exp((17.67 * temp) / (temp + 243.5)) * humidity * 2.1674) /
    (temp + 273.15);
  return Math.round(absoluteHumidity * 100) / 100;
}

export function calculateFeelsLike(temp, humidity) {
  // Custom calculation for "feels like" temperature
  // This is a simplified version of the heat index calculation
  let feelsLike = temp;

  if (temp > 20) {
    // When warm, high humidity makes it feel warmer
    feelsLike = temp + ((0.3 * humidity) / 100) * (temp - 20);
  } else if (temp < 15) {
    // When cool, high humidity makes it feel cooler
    feelsLike = temp - ((0.2 * humidity) / 100) * (15 - temp);
  }

  return Math.round(feelsLike * 10) / 10;
}

export function classificationRules(temp, humidity) {
  const dewPoint = calculateDewPoint(temp, humidity);
  const tempDewPointSpread = temp - dewPoint;

  if (humidity < 50 && tempDewPointSpread > 10) {
    return "Clear Sky";
  } else if (
    humidity >= 50 &&
    humidity <= 80 &&
    tempDewPointSpread > 5 &&
    tempDewPointSpread <= 10
  ) {
    return "Partly Cloudy";
  } else if (
    humidity > 80 &&
    humidity <= 95 &&
    tempDewPointSpread > 2 &&
    tempDewPointSpread <= 5
  ) {
    return "Mostly Cloudy";
  } else if (humidity > 95 && tempDewPointSpread <= 2) {
    return "Fog/Heavy Overcast";
  } else {
    return "Unclassified";
  }
}
