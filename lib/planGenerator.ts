import type { PlanInput, PlanOutput, FuelingAction } from "./types";
import { formatTime, formatPace, lbToKg, minutesToHours } from "./format";

export function generateFuelingPlan(input: PlanInput): PlanOutput {
  const raceDurationMinutes = input.goalTimeMinutes;
  const raceDurationHours = minutesToHours(raceDurationMinutes);
  const bodyWeightKg = lbToKg(input.bodyWeightLb);
  const pacePerMileMinutes = raceDurationMinutes / input.distance;

  // Calculate base carb range and target based on race duration
  let carbRangeMin: number;
  let carbRangeMax: number;
  let baseTarget: number;

  if (raceDurationHours < 1.5) {
    carbRangeMin = 30;
    carbRangeMax = 60;
    baseTarget = 45;
  } else if (raceDurationHours < 3.0) {
    carbRangeMin = 45;
    carbRangeMax = 75;
    baseTarget = 60;
  } else if (raceDurationHours < 5.0) {
    carbRangeMin = 60;
    carbRangeMax = 90;
    baseTarget = 75;
  } else {
    carbRangeMin = 70;
    carbRangeMax = 100;
    baseTarget = 85;
  }

  // Adjust target based on body weight
  let carbTarget = baseTarget;
  if (bodyWeightKg > 82) {
    carbTarget += 5;
  }
  if (bodyWeightKg < 60) {
    carbTarget -= 5;
  }

  // Adjust based on stomach tolerance
  if (input.stomachTolerance === "low") {
    carbTarget -= 5;
  }

  // Cap at 100 g/hr
  carbTarget = Math.min(100, Math.max(30, carbTarget));

  // Calculate total carbs needed
  const totalCarbsNeeded = Math.round(carbTarget * raceDurationHours);

  // Calculate sodium range
  let sodiumMin = 300;
  let sodiumMax = 600;

  if (input.temperatureF >= 85) {
    sodiumMin += 400;
    sodiumMax += 400;
  } else if (input.temperatureF >= 70) {
    sodiumMin += 200;
    sodiumMax += 200;
  }

  if (input.sodiumPreference === "high") {
    sodiumMin += 200;
    sodiumMax += 200;
  } else if (input.sodiumPreference === "low") {
    sodiumMin -= 100;
    sodiumMax -= 100;
  }

  // Cap sodium at 1200 mg/hr
  sodiumMax = Math.min(1200, sodiumMax);
  sodiumMin = Math.min(sodiumMax, sodiumMin);

  // Generate fueling schedule
  const fuelingSchedule = generateFuelingSchedule(
    input,
    raceDurationMinutes,
    carbTarget,
    pacePerMileMinutes
  );

  return {
    recommendedCarbsPerHourRange: { min: carbRangeMin, max: carbRangeMax },
    chosenCarbsPerHourTarget: carbTarget,
    totalCarbsNeeded,
    sodiumPerHourRange: { min: sodiumMin, max: sodiumMax },
    fuelingSchedule,
    raceDurationMinutes,
    pacePerMile: formatPace(pacePerMileMinutes),
  };
}

function generateFuelingSchedule(
  input: PlanInput,
  raceDurationMinutes: number,
  carbTargetPerHour: number,
  pacePerMileMinutes: number
): FuelingAction[] {
  const actions: FuelingAction[] = [];
  const intervalMinutes = 25;
  let currentMinute = 20; // Start at 20 minutes

  // Calculate carbs per interval
  const carbsPerInterval = (carbTargetPerHour / 60) * intervalMinutes;

  let isGelTurn = true; // For hybrid mode

  while (currentMinute < raceDurationMinutes) {
    const mileMarker = currentMinute / pacePerMileMinutes;
    const timeStamp = formatTime(currentMinute);

    let actionText = "";

    if (input.fuelType === "gels") {
      actionText = `1 gel (${input.gelCarbsG}g) + water`;
    } else if (input.fuelType === "drink") {
      const ozPerHour = 20;
      const ozThisInterval = Math.round((ozPerHour / 60) * intervalMinutes);
      actionText = `Sip drink mix (~${ozThisInterval}oz, ${Math.round(carbsPerInterval)}g carbs)`;
    } else {
      // Hybrid: alternate
      if (isGelTurn) {
        actionText = `1 gel (${input.gelCarbsG}g) + water`;
      } else {
        const ozPerHour = 20;
        const ozThisInterval = Math.round((ozPerHour / 60) * intervalMinutes);
        actionText = `Sip drink mix (~${ozThisInterval}oz, ${input.drinkCarbsG}g carbs)`;
      }
      isGelTurn = !isGelTurn;
    }

    actions.push({
      timeStamp,
      mileMarker: parseFloat(mileMarker.toFixed(2)),
      actionText,
    });

    currentMinute += intervalMinutes;
  }

  return actions;
}
