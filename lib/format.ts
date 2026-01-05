export function formatPace(paceMinutesPerMile: number): string {
  const minutes = Math.floor(paceMinutesPerMile);
  const seconds = Math.round((paceMinutesPerMile - minutes) * 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  return hours > 0 ? `${hours}:${minutes.toString().padStart(2, "0")}` : `0:${minutes.toString().padStart(2, "0")}`;
}

export function lbToKg(lb: number): number {
  return lb * 0.453592;
}

export function minutesToHours(minutes: number): number {
  return minutes / 60;
}

export function generatePlanTitle(distance: number, goalTimeMinutes: number, temperatureF: number): string {
  const raceType =
    Math.abs(distance - 13.1) < 0.5 ? "Half Marathon" : Math.abs(distance - 26.2) < 0.5 ? "Marathon" : `${distance.toFixed(1)} miles`;
  const timeFormatted = formatTime(goalTimeMinutes);
  return `${raceType} – ${timeFormatted} – ${temperatureF}°F`;
}
