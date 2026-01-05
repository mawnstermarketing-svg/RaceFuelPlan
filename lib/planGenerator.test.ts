import { generateFuelingPlan } from "./planGenerator";
import { PlanInput } from "./types";

// Simple test runner
function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(error);
    process.exit(1);
  }
}

function assertEquals(actual: any, expected: any, message?: string) {
  if (actual !== expected) {
    throw new Error(
      message || `Expected ${expected} but got ${actual}`
    );
  }
}

function assertRange(actual: number, min: number, max: number, message?: string) {
  if (actual < min || actual > max) {
    throw new Error(
      message || `Expected ${actual} to be between ${min} and ${max}`
    );
  }
}

// Test cases
const baseInput: PlanInput = {
  distance: 26.2,
  goalTimeMinutes: 240,
  bodyWeightLb: 150,
  temperatureF: 60,
  fuelType: "gels",
  gelCarbsG: 25,
  drinkCarbsG: 40,
  sodiumPreference: "medium",
  stomachTolerance: "medium",
};

test("generates plan for marathon", () => {
  const result = generateFuelingPlan(baseInput);

  assertEquals(result.raceDurationMinutes, 240, "Duration should be 240 minutes");
  assertRange(result.chosenCarbsPerHourTarget, 30, 100, "Carb target should be reasonable");
  assertEquals(result.fuelingSchedule.length > 0, true, "Should have fueling schedule");
});

test("carb target increases for heavier athletes", () => {
  const lightInput = { ...baseInput, bodyWeightLb: 120 };
  const heavyInput = { ...baseInput, bodyWeightLb: 200 };

  const lightResult = generateFuelingPlan(lightInput);
  const heavyResult = generateFuelingPlan(heavyInput);

  assertEquals(
    heavyResult.chosenCarbsPerHourTarget >= lightResult.chosenCarbsPerHourTarget,
    true,
    "Heavier athletes should have higher or equal carb target"
  );
});

test("sodium increases with temperature", () => {
  const coldInput = { ...baseInput, temperatureF: 40 };
  const hotInput = { ...baseInput, temperatureF: 90 };

  const coldResult = generateFuelingPlan(coldInput);
  const hotResult = generateFuelingPlan(hotInput);

  assertEquals(
    hotResult.sodiumPerHourRange.max > coldResult.sodiumPerHourRange.max,
    true,
    "Hot weather should increase sodium recommendation"
  );
});

test("carb target respects stomach tolerance", () => {
  const lowToleranceInput = { ...baseInput, stomachTolerance: "low" as const };
  const highToleranceInput = { ...baseInput, stomachTolerance: "high" as const };

  const lowResult = generateFuelingPlan(lowToleranceInput);
  const highResult = generateFuelingPlan(highToleranceInput);

  assertEquals(
    lowResult.chosenCarbsPerHourTarget <= highResult.chosenCarbsPerHourTarget,
    true,
    "Low stomach tolerance should not increase carb target"
  );
});

test("generates fueling schedule with correct timing", () => {
  const result = generateFuelingPlan(baseInput);

  assertEquals(result.fuelingSchedule[0].timeStamp, "0:20", "First fuel should be at 20 minutes");
  assertEquals(result.fuelingSchedule.length > 5, true, "Marathon should have multiple fuel points");
});

test("shorter races have lower carb targets", () => {
  const halfMarathonInput = { ...baseInput, distance: 13.1, goalTimeMinutes: 105 };
  const marathonInput = baseInput;

  const halfResult = generateFuelingPlan(halfMarathonInput);
  const marathonResult = generateFuelingPlan(marathonInput);

  assertEquals(
    halfResult.chosenCarbsPerHourTarget <= marathonResult.chosenCarbsPerHourTarget,
    true,
    "Half marathon should have lower or equal carb target than marathon"
  );
});

test("carb target never exceeds 100g/hr", () => {
  const extremeInput = {
    ...baseInput,
    bodyWeightLb: 250,
    goalTimeMinutes: 360,
    stomachTolerance: "high" as const
  };

  const result = generateFuelingPlan(extremeInput);

  assertEquals(
    result.chosenCarbsPerHourTarget <= 100,
    true,
    "Carb target should never exceed 100g/hr"
  );
});

console.log("\nRunning plan generator tests...\n");

// Run all tests
test("generates plan for marathon", () => {
  const result = generateFuelingPlan(baseInput);
  assertEquals(result.raceDurationMinutes, 240);
  assertRange(result.chosenCarbsPerHourTarget, 30, 100);
});

test("carb target increases for heavier athletes", () => {
  const lightInput = { ...baseInput, bodyWeightLb: 120 };
  const heavyInput = { ...baseInput, bodyWeightLb: 200 };
  const lightResult = generateFuelingPlan(lightInput);
  const heavyResult = generateFuelingPlan(heavyInput);
  assertEquals(heavyResult.chosenCarbsPerHourTarget >= lightResult.chosenCarbsPerHourTarget, true);
});

test("sodium increases with temperature", () => {
  const coldInput = { ...baseInput, temperatureF: 40 };
  const hotInput = { ...baseInput, temperatureF: 90 };
  const coldResult = generateFuelingPlan(coldInput);
  const hotResult = generateFuelingPlan(hotInput);
  assertEquals(hotResult.sodiumPerHourRange.max > coldResult.sodiumPerHourRange.max, true);
});

test("carb target never exceeds 100g/hr", () => {
  const extremeInput = { ...baseInput, bodyWeightLb: 250, goalTimeMinutes: 360, stomachTolerance: "high" as const };
  const result = generateFuelingPlan(extremeInput);
  assertEquals(result.chosenCarbsPerHourTarget <= 100, true);
});

console.log("\n✅ All tests passed!\n");
