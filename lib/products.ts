// Popular gels and drink mixes with nutritional data
// This is a brand-neutral reference to help athletes understand how products map to their targets

export type ProductCategory = "gel" | "chew" | "drink_mix" | "hydration_tabs";
export type GutFriendliness = "high" | "medium" | "low"; // high = most gentle on stomach

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  carbsG: number;           // grams of carbs per serving
  sodiumMg: number;         // mg of sodium per serving
  caffeineMg: number;       // mg of caffeine (0 if none)
  servingSize: string;      // e.g., "32g packet", "1 scoop (27g)"
  calories: number;
  gutFriendliness: GutFriendliness;
  hasFructose: boolean;     // contains fructose for dual-transport
  notes: string;            // brief neutral description
}

// Popular gels
export const gels: Product[] = [
  {
    id: "gu-energy",
    name: "Energy Gel",
    brand: "GU",
    category: "gel",
    carbsG: 22,
    sodiumMg: 55,
    caffeineMg: 0,
    servingSize: "32g packet",
    calories: 100,
    gutFriendliness: "medium",
    hasFructose: true,
    notes: "Widely available, maltodextrin + fructose blend"
  },
  {
    id: "gu-roctane",
    name: "Roctane Energy Gel",
    brand: "GU",
    category: "gel",
    carbsG: 21,
    sodiumMg: 125,
    caffeineMg: 0,
    servingSize: "32g packet",
    calories: 100,
    gutFriendliness: "medium",
    hasFructose: true,
    notes: "Higher sodium, includes amino acids"
  },
  {
    id: "maurten-100",
    name: "Gel 100",
    brand: "Maurten",
    category: "gel",
    carbsG: 25,
    sodiumMg: 20,
    caffeineMg: 0,
    servingSize: "40g packet",
    calories: 100,
    gutFriendliness: "high",
    hasFructose: true,
    notes: "Hydrogel technology, very gentle on stomach, low sodium"
  },
  {
    id: "maurten-160",
    name: "Gel 160",
    brand: "Maurten",
    category: "gel",
    carbsG: 40,
    sodiumMg: 30,
    caffeineMg: 0,
    servingSize: "65g packet",
    calories: 160,
    gutFriendliness: "high",
    hasFructose: true,
    notes: "High-carb hydrogel, fewer servings needed"
  },
  {
    id: "sis-go-isotonic",
    name: "GO Isotonic Energy Gel",
    brand: "SiS",
    category: "gel",
    carbsG: 22,
    sodiumMg: 10,
    caffeineMg: 0,
    servingSize: "60ml tube",
    calories: 87,
    gutFriendliness: "high",
    hasFructose: false,
    notes: "Isotonic - no water needed, maltodextrin based"
  },
  {
    id: "sis-beta-fuel",
    name: "Beta Fuel Gel",
    brand: "SiS",
    category: "gel",
    carbsG: 40,
    sodiumMg: 20,
    caffeineMg: 0,
    servingSize: "60ml tube",
    calories: 160,
    gutFriendliness: "medium",
    hasFructose: true,
    notes: "High-carb 1:0.8 maltodextrin:fructose ratio"
  },
  {
    id: "honey-stinger",
    name: "Organic Energy Gel",
    brand: "Honey Stinger",
    category: "gel",
    carbsG: 24,
    sodiumMg: 50,
    caffeineMg: 0,
    servingSize: "32g packet",
    calories: 100,
    gutFriendliness: "medium",
    hasFructose: true,
    notes: "Honey-based, organic ingredients"
  },
  {
    id: "clif-shot",
    name: "Shot Energy Gel",
    brand: "Clif",
    category: "gel",
    carbsG: 24,
    sodiumMg: 60,
    caffeineMg: 0,
    servingSize: "34g packet",
    calories: 100,
    gutFriendliness: "medium",
    hasFructose: true,
    notes: "Organic, 85% from cane sugar"
  },
  {
    id: "spring-energy",
    name: "Canaberry",
    brand: "Spring Energy",
    category: "gel",
    carbsG: 22,
    sodiumMg: 140,
    caffeineMg: 0,
    servingSize: "45g packet",
    calories: 110,
    gutFriendliness: "high",
    hasFructose: true,
    notes: "Real food based, higher sodium, popular for ultras"
  },
  {
    id: "precision-pf30",
    name: "PF 30 Gel",
    brand: "Precision Fuel & Hydration",
    category: "gel",
    carbsG: 30,
    sodiumMg: 250,
    caffeineMg: 0,
    servingSize: "51g packet",
    calories: 120,
    gutFriendliness: "medium",
    hasFructose: true,
    notes: "High sodium formula for heavy sweaters"
  },
  {
    id: "naked-nutrition",
    name: "Energy Gel",
    brand: "Naked Nutrition",
    category: "gel",
    carbsG: 25,
    sodiumMg: 100,
    caffeineMg: 0,
    servingSize: "37g packet",
    calories: 100,
    gutFriendliness: "medium",
    hasFructose: true,
    notes: "Simple ingredients, no artificial additives"
  },
  {
    id: "huma-original",
    name: "Chia Energy Gel",
    brand: "Huma",
    category: "gel",
    carbsG: 21,
    sodiumMg: 35,
    caffeineMg: 0,
    servingSize: "39g packet",
    calories: 100,
    gutFriendliness: "high",
    hasFructose: true,
    notes: "Chia-based, fruit puree, gentle on stomach"
  }
];

// Energy chews
export const chews: Product[] = [
  {
    id: "clif-bloks",
    name: "Bloks Energy Chews",
    brand: "Clif",
    category: "chew",
    carbsG: 24,
    sodiumMg: 70,
    caffeineMg: 0,
    servingSize: "3 chews (33g)",
    calories: 100,
    gutFriendliness: "medium",
    hasFructose: true,
    notes: "Easy to portion, good alternative to gels"
  },
  {
    id: "gu-chews",
    name: "Energy Chews",
    brand: "GU",
    category: "chew",
    carbsG: 23,
    sodiumMg: 40,
    caffeineMg: 0,
    servingSize: "4 chews (34g)",
    calories: 90,
    gutFriendliness: "medium",
    hasFructose: true,
    notes: "Soft texture, easy to chew while running"
  },
  {
    id: "skratch-chews",
    name: "Energy Chews",
    brand: "Skratch Labs",
    category: "chew",
    carbsG: 17,
    sodiumMg: 80,
    caffeineMg: 0,
    servingSize: "5 chews (50g)",
    calories: 80,
    gutFriendliness: "high",
    hasFructose: true,
    notes: "Real fruit, no artificial colors/flavors"
  }
];

// Drink mixes (carbohydrate + hydration)
export const drinkMixes: Product[] = [
  {
    id: "tailwind-endurance",
    name: "Endurance Fuel",
    brand: "Tailwind",
    category: "drink_mix",
    carbsG: 25,
    sodiumMg: 303,
    caffeineMg: 0,
    servingSize: "1 scoop (27g) per 24oz",
    calories: 100,
    gutFriendliness: "high",
    hasFructose: true,
    notes: "Complete fuel - carbs, sodium, no separate gels needed"
  },
  {
    id: "skratch-hydration",
    name: "Sport Hydration Mix",
    brand: "Skratch Labs",
    category: "drink_mix",
    carbsG: 19,
    sodiumMg: 380,
    caffeineMg: 0,
    servingSize: "1 scoop (22g) per 16oz",
    calories: 80,
    gutFriendliness: "high",
    hasFructose: true,
    notes: "Real fruit flavor, optimized electrolyte ratio"
  },
  {
    id: "skratch-superfuel",
    name: "Superfuel",
    brand: "Skratch Labs",
    category: "drink_mix",
    carbsG: 100,
    sodiumMg: 800,
    caffeineMg: 0,
    servingSize: "1 packet (85g) per 16-24oz",
    calories: 400,
    gutFriendliness: "medium",
    hasFructose: true,
    notes: "Ultra-high carb for 100g/hr fueling"
  },
  {
    id: "maurten-320",
    name: "Drink Mix 320",
    brand: "Maurten",
    category: "drink_mix",
    carbsG: 80,
    sodiumMg: 220,
    caffeineMg: 0,
    servingSize: "1 packet (83g) per 500ml",
    calories: 320,
    gutFriendliness: "high",
    hasFructose: true,
    notes: "Hydrogel technology, high carb, elite athlete favorite"
  },
  {
    id: "maurten-160",
    name: "Drink Mix 160",
    brand: "Maurten",
    category: "drink_mix",
    carbsG: 40,
    sodiumMg: 110,
    caffeineMg: 0,
    servingSize: "1 packet (40g) per 500ml",
    calories: 160,
    gutFriendliness: "high",
    hasFructose: true,
    notes: "Lower intensity option, gentle on stomach"
  },
  {
    id: "sis-go-electrolyte",
    name: "GO Electrolyte",
    brand: "SiS",
    category: "drink_mix",
    carbsG: 36,
    sodiumMg: 345,
    caffeineMg: 0,
    servingSize: "40g per 500ml",
    calories: 144,
    gutFriendliness: "medium",
    hasFructose: false,
    notes: "Maltodextrin based, good electrolyte balance"
  },
  {
    id: "sis-beta-fuel-drink",
    name: "Beta Fuel Drink Mix",
    brand: "SiS",
    category: "drink_mix",
    carbsG: 80,
    sodiumMg: 250,
    caffeineMg: 0,
    servingSize: "84g per 500ml",
    calories: 320,
    gutFriendliness: "medium",
    hasFructose: true,
    notes: "1:0.8 ratio for high carb intake"
  },
  {
    id: "precision-pf90",
    name: "PF 90 Drink Mix",
    brand: "Precision Fuel & Hydration",
    category: "drink_mix",
    carbsG: 90,
    sodiumMg: 500,
    caffeineMg: 0,
    servingSize: "1 packet per 500ml",
    calories: 360,
    gutFriendliness: "medium",
    hasFructose: true,
    notes: "Very high carb and sodium for demanding conditions"
  },
  {
    id: "gatorade-endurance",
    name: "Endurance Formula",
    brand: "Gatorade",
    category: "drink_mix",
    carbsG: 24,
    sodiumMg: 200,
    caffeineMg: 0,
    servingSize: "1 scoop (35g) per 16oz",
    calories: 90,
    gutFriendliness: "medium",
    hasFructose: true,
    notes: "Widely available, on-course at many races"
  },
  {
    id: "nunrg",
    name: "Nuun Energy",
    brand: "Nuun",
    category: "drink_mix",
    carbsG: 15,
    sodiumMg: 300,
    caffeineMg: 40,
    servingSize: "1 tab per 16oz",
    calories: 60,
    gutFriendliness: "medium",
    hasFructose: false,
    notes: "Lower carb option with caffeine"
  }
];

// Hydration/electrolyte tabs (low/no carb)
export const hydrationTabs: Product[] = [
  {
    id: "nuun-sport",
    name: "Sport",
    brand: "Nuun",
    category: "hydration_tabs",
    carbsG: 1,
    sodiumMg: 300,
    caffeineMg: 0,
    servingSize: "1 tab per 16oz",
    calories: 10,
    gutFriendliness: "high",
    hasFructose: false,
    notes: "Electrolytes only, pair with gels for carbs"
  },
  {
    id: "lmnt-raw",
    name: "Electrolyte Drink Mix",
    brand: "LMNT",
    category: "hydration_tabs",
    carbsG: 0,
    sodiumMg: 1000,
    caffeineMg: 0,
    servingSize: "1 stick pack per 16-32oz",
    calories: 0,
    gutFriendliness: "high",
    hasFructose: false,
    notes: "Very high sodium, zero carb, keto-friendly"
  },
  {
    id: "precision-1000",
    name: "PH 1000",
    brand: "Precision Fuel & Hydration",
    category: "hydration_tabs",
    carbsG: 0,
    sodiumMg: 1000,
    caffeineMg: 0,
    servingSize: "1 tab per 500ml",
    calories: 0,
    gutFriendliness: "high",
    hasFructose: false,
    notes: "Highest sodium option for heavy sweaters"
  },
  {
    id: "precision-500",
    name: "PH 500",
    brand: "Precision Fuel & Hydration",
    category: "hydration_tabs",
    carbsG: 0,
    sodiumMg: 500,
    caffeineMg: 0,
    servingSize: "1 tab per 500ml",
    calories: 0,
    gutFriendliness: "high",
    hasFructose: false,
    notes: "Medium sodium option"
  },
  {
    id: "sis-go-hydro",
    name: "GO Hydro",
    brand: "SiS",
    category: "hydration_tabs",
    carbsG: 0,
    sodiumMg: 345,
    caffeineMg: 0,
    servingSize: "1 tab per 500ml",
    calories: 5,
    gutFriendliness: "high",
    hasFructose: false,
    notes: "Effervescent tab, electrolytes only"
  },
  {
    id: "drip-drop",
    name: "Hydration Powder",
    brand: "DripDrop",
    category: "hydration_tabs",
    carbsG: 11,
    sodiumMg: 330,
    caffeineMg: 0,
    servingSize: "1 stick per 8oz",
    calories: 45,
    gutFriendliness: "high",
    hasFructose: true,
    notes: "Medical-grade ORS formula"
  }
];

// All products combined
export const allProducts: Product[] = [...gels, ...chews, ...drinkMixes, ...hydrationTabs];

// Get products by category
export function getProductsByCategory(category: ProductCategory): Product[] {
  return allProducts.filter(p => p.category === category);
}

// Recommendation interfaces
export interface ProductRecommendation {
  product: Product;
  servingsNeeded: number;
  totalCarbsG: number;
  totalSodiumMg: number;
  reasoning: string;
}

export interface RecommendationProfile {
  sweatRate: "low" | "medium" | "high";
  gutSensitivity: "low" | "medium" | "high"; // low = sensitive stomach
  carbTargetPerHour: number;
  sodiumTargetPerHour: number;
  raceDurationHours: number;
  preferredFuelType: "gels" | "drink" | "hybrid";
}

// Generate product recommendations based on user profile
export function getProductRecommendations(profile: RecommendationProfile): {
  primaryFuel: ProductRecommendation[];
  hydration: ProductRecommendation[];
  notes: string[];
} {
  const notes: string[] = [];
  const primaryFuel: ProductRecommendation[] = [];
  const hydration: ProductRecommendation[] = [];

  // Determine gut-friendliness filter based on sensitivity
  const minGutFriendliness: GutFriendliness =
    profile.gutSensitivity === "low" ? "high" : // sensitive = needs high friendliness
    profile.gutSensitivity === "medium" ? "medium" : "low";

  const filterByGut = (p: Product) => {
    if (minGutFriendliness === "high") return p.gutFriendliness === "high";
    if (minGutFriendliness === "medium") return p.gutFriendliness !== "low";
    return true;
  };

  // For high carb targets (80g+), prioritize dual-transport carbs
  const needsHighCarb = profile.carbTargetPerHour >= 80;
  const needsHighSodium = profile.sweatRate === "high" || profile.sodiumTargetPerHour >= 700;

  if (profile.preferredFuelType === "gels" || profile.preferredFuelType === "hybrid") {
    // Recommend gels
    let gelOptions = gels.filter(filterByGut);

    // For high carb, prefer high-carb gels
    if (needsHighCarb) {
      const highCarbGels = gelOptions.filter(g => g.carbsG >= 30);
      if (highCarbGels.length > 0) {
        gelOptions = highCarbGels;
        notes.push("High-carb gels recommended for your 80g+/hr target");
      }
    }

    // For sensitive stomachs, highlight gentle options
    if (profile.gutSensitivity === "low") {
      notes.push("Showing gut-friendly options for sensitive stomachs");
    }

    // Calculate servings needed
    const servingsPerHour = Math.ceil(profile.carbTargetPerHour / 25); // avg gel is ~25g
    const totalServings = Math.ceil(servingsPerHour * profile.raceDurationHours);

    // Pick top 3 gel options
    gelOptions.slice(0, 3).forEach(gel => {
      const servingsNeeded = Math.ceil((profile.carbTargetPerHour * profile.raceDurationHours) / gel.carbsG);
      primaryFuel.push({
        product: gel,
        servingsNeeded,
        totalCarbsG: servingsNeeded * gel.carbsG,
        totalSodiumMg: servingsNeeded * gel.sodiumMg,
        reasoning: gel.gutFriendliness === "high"
          ? "Gentle on stomach"
          : gel.carbsG >= 30
          ? "High carb per serving"
          : "Balanced option"
      });
    });
  }

  if (profile.preferredFuelType === "drink" || profile.preferredFuelType === "hybrid") {
    // Recommend drink mixes
    let drinkOptions = drinkMixes.filter(filterByGut);

    // For high carb needs, prioritize high-carb drinks
    if (needsHighCarb) {
      const highCarbDrinks = drinkOptions.filter(d => d.carbsG >= 40);
      if (highCarbDrinks.length > 0) {
        drinkOptions = highCarbDrinks;
      }
    }

    // For high sodium needs, prioritize high-sodium drinks
    if (needsHighSodium) {
      drinkOptions.sort((a, b) => b.sodiumMg - a.sodiumMg);
      notes.push("Higher sodium options prioritized for heavy sweating");
    }

    // Pick top 3 drink options
    drinkOptions.slice(0, 3).forEach(drink => {
      const servingsPerHour = profile.carbTargetPerHour / drink.carbsG;
      const servingsNeeded = Math.ceil(servingsPerHour * profile.raceDurationHours);
      primaryFuel.push({
        product: drink,
        servingsNeeded,
        totalCarbsG: servingsNeeded * drink.carbsG,
        totalSodiumMg: servingsNeeded * drink.sodiumMg,
        reasoning: drink.sodiumMg >= 300
          ? "Good sodium content"
          : drink.carbsG >= 40
          ? "High carb per serving"
          : "Balanced formula"
      });
    });
  }

  // Hydration recommendations
  if (needsHighSodium || profile.preferredFuelType === "gels") {
    // If using gels, may need separate hydration for sodium
    let hydrationOptions = hydrationTabs.filter(filterByGut);

    // Sort by sodium for high sweat rate
    if (needsHighSodium) {
      hydrationOptions.sort((a, b) => b.sodiumMg - a.sodiumMg);
    }

    // Calculate additional sodium needed
    const sodiumFromFuel = primaryFuel.reduce((sum, pf) =>
      sum + (pf.product.sodiumMg * pf.servingsNeeded / profile.raceDurationHours), 0
    );
    const additionalSodiumNeeded = Math.max(0, profile.sodiumTargetPerHour - sodiumFromFuel);

    if (additionalSodiumNeeded > 100) {
      notes.push(`Consider supplemental electrolytes: ~${Math.round(additionalSodiumNeeded)}mg sodium/hr beyond fuel`);

      hydrationOptions.slice(0, 2).forEach(tab => {
        const tabsPerHour = additionalSodiumNeeded / tab.sodiumMg;
        const totalTabs = Math.ceil(tabsPerHour * profile.raceDurationHours);
        hydration.push({
          product: tab,
          servingsNeeded: totalTabs,
          totalCarbsG: totalTabs * tab.carbsG,
          totalSodiumMg: totalTabs * tab.sodiumMg,
          reasoning: tab.sodiumMg >= 500
            ? "High sodium for heavy sweaters"
            : "Balanced electrolyte option"
        });
      });
    }
  }

  // Add general notes
  if (profile.raceDurationHours > 4) {
    notes.push("For ultras, consider real food options alongside gels");
  }

  if (needsHighCarb && !primaryFuel.some(pf => pf.product.hasFructose)) {
    notes.push("For 80g+/hr, look for products with fructose for better absorption");
  }

  return { primaryFuel, hydration, notes };
}

// Calculate how many servings of a product to meet a target
export function calculateServingsForTarget(
  product: Product,
  carbTargetG: number
): { servings: number; actualCarbs: number; actualSodium: number } {
  const servings = Math.ceil(carbTargetG / product.carbsG);
  return {
    servings,
    actualCarbs: servings * product.carbsG,
    actualSodium: servings * product.sodiumMg
  };
}
