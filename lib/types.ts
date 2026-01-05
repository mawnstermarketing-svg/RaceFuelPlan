import { z } from "zod";

export const PlanInputSchema = z.object({
  distance: z.number().min(1).max(200),
  goalTimeMinutes: z.number().min(1),
  bodyWeightLb: z.number().min(50).max(400),
  temperatureF: z.number().min(-20).max(130),
  fuelType: z.enum(["gels", "drink", "hybrid"]),
  gelCarbsG: z.number().min(10).max(50).default(25),
  drinkCarbsG: z.number().min(10).max(80).default(40),
  sodiumPreference: z.enum(["low", "medium", "high"]).default("medium"),
  stomachTolerance: z.enum(["low", "medium", "high"]).default("medium"),
});

export type PlanInput = z.infer<typeof PlanInputSchema>;

export interface FuelingAction {
  timeStamp: string; // e.g., "0:20"
  mileMarker: number;
  actionText: string;
}

export interface PlanOutput {
  recommendedCarbsPerHourRange: { min: number; max: number };
  chosenCarbsPerHourTarget: number;
  totalCarbsNeeded: number;
  sodiumPerHourRange: { min: number; max: number };
  fuelingSchedule: FuelingAction[];
  raceDurationMinutes: number;
  pacePerMile: string;
}

export interface CompletePlan {
  inputs: PlanInput;
  outputs: PlanOutput;
  title: string;
}
