// Popular US road races with location and typical weather data

export interface Race {
  id: string;
  name: string;
  distance: number; // in miles
  city: string;
  state: string;
  month: number; // 1-12
  day: number; // typical race day
  typicalWeather: {
    lowF: number;
    highF: number;
    avgF: number;
    humidity: number; // percentage
    description: string;
  };
  website?: string;
}

export const popularRaces: Race[] = [
  // Major Marathons
  {
    id: "boston",
    name: "Boston Marathon",
    distance: 26.2,
    city: "Boston",
    state: "MA",
    month: 4,
    day: 15,
    typicalWeather: {
      lowF: 45,
      highF: 58,
      avgF: 52,
      humidity: 55,
      description: "Cool and variable, can range from 36°F to 86°F historically"
    },
    website: "https://www.baa.org/races/boston-marathon"
  },
  {
    id: "chicago",
    name: "Chicago Marathon",
    distance: 26.2,
    city: "Chicago",
    state: "IL",
    month: 10,
    day: 8,
    typicalWeather: {
      lowF: 48,
      highF: 62,
      avgF: 55,
      humidity: 60,
      description: "Cool fall weather, usually ideal running conditions"
    },
    website: "https://www.chicagomarathon.com"
  },
  {
    id: "nyc",
    name: "New York City Marathon",
    distance: 26.2,
    city: "New York",
    state: "NY",
    month: 11,
    day: 3,
    typicalWeather: {
      lowF: 42,
      highF: 54,
      avgF: 48,
      humidity: 55,
      description: "Cool to cold, excellent racing weather"
    },
    website: "https://www.nyrr.org/tcsnycmarathon"
  },
  {
    id: "la",
    name: "Los Angeles Marathon",
    distance: 26.2,
    city: "Los Angeles",
    state: "CA",
    month: 3,
    day: 17,
    typicalWeather: {
      lowF: 52,
      highF: 68,
      avgF: 60,
      humidity: 45,
      description: "Mild and sunny, can warm up quickly"
    },
    website: "https://www.lamarathon.com"
  },
  {
    id: "marine-corps",
    name: "Marine Corps Marathon",
    distance: 26.2,
    city: "Washington",
    state: "DC",
    month: 10,
    day: 27,
    typicalWeather: {
      lowF: 45,
      highF: 62,
      avgF: 54,
      humidity: 58,
      description: "Cool fall weather with occasional rain"
    },
    website: "https://www.marinemarathon.com"
  },
  {
    id: "twin-cities",
    name: "Twin Cities Marathon",
    distance: 26.2,
    city: "Minneapolis",
    state: "MN",
    month: 10,
    day: 6,
    typicalWeather: {
      lowF: 42,
      highF: 58,
      avgF: 50,
      humidity: 60,
      description: "Cool fall weather, often ideal for PRs"
    },
    website: "https://www.tcmevents.org"
  },
  {
    id: "houston",
    name: "Houston Marathon",
    distance: 26.2,
    city: "Houston",
    state: "TX",
    month: 1,
    day: 19,
    typicalWeather: {
      lowF: 48,
      highF: 62,
      avgF: 55,
      humidity: 70,
      description: "Cool and humid, great winter marathon"
    },
    website: "https://www.chevronhoustonmarathon.com"
  },
  {
    id: "disney",
    name: "Walt Disney World Marathon",
    distance: 26.2,
    city: "Orlando",
    state: "FL",
    month: 1,
    day: 12,
    typicalWeather: {
      lowF: 52,
      highF: 72,
      avgF: 62,
      humidity: 75,
      description: "Mild but humid, can be warm by finish"
    },
    website: "https://www.rundisney.com"
  },
  {
    id: "grandmas",
    name: "Grandma's Marathon",
    distance: 26.2,
    city: "Duluth",
    state: "MN",
    month: 6,
    day: 21,
    typicalWeather: {
      lowF: 52,
      highF: 70,
      avgF: 61,
      humidity: 65,
      description: "Pleasant summer weather along Lake Superior"
    },
    website: "https://grandmasmarathon.com"
  },
  {
    id: "cim",
    name: "California International Marathon",
    distance: 26.2,
    city: "Sacramento",
    state: "CA",
    month: 12,
    day: 1,
    typicalWeather: {
      lowF: 38,
      highF: 55,
      avgF: 47,
      humidity: 70,
      description: "Cool and fast, net downhill course"
    },
    website: "https://runsra.org/california-international-marathon"
  },
  {
    id: "philly",
    name: "Philadelphia Marathon",
    distance: 26.2,
    city: "Philadelphia",
    state: "PA",
    month: 11,
    day: 24,
    typicalWeather: {
      lowF: 35,
      highF: 50,
      avgF: 43,
      humidity: 55,
      description: "Cold late fall weather"
    },
    website: "https://www.philadelphiamarathon.com"
  },
  {
    id: "st-george",
    name: "St. George Marathon",
    distance: 26.2,
    city: "St. George",
    state: "UT",
    month: 10,
    day: 5,
    typicalWeather: {
      lowF: 48,
      highF: 75,
      avgF: 62,
      humidity: 25,
      description: "Dry desert air, starts cold, warms quickly"
    },
    website: "https://www.stgeorgemarathon.com"
  },

  // Half Marathons
  {
    id: "brooklyn-half",
    name: "Brooklyn Half Marathon",
    distance: 13.1,
    city: "Brooklyn",
    state: "NY",
    month: 5,
    day: 18,
    typicalWeather: {
      lowF: 55,
      highF: 72,
      avgF: 64,
      humidity: 55,
      description: "Late spring, warming up"
    },
    website: "https://www.nyrr.org/races/popularbklyn-halfmarathon"
  },
  {
    id: "rock-n-roll-vegas",
    name: "Rock 'n' Roll Las Vegas",
    distance: 13.1,
    city: "Las Vegas",
    state: "NV",
    month: 2,
    day: 23,
    typicalWeather: {
      lowF: 42,
      highF: 62,
      avgF: 52,
      humidity: 30,
      description: "Cool desert evening, runs at night on the Strip"
    },
    website: "https://www.runrocknroll.com/las-vegas"
  },
  {
    id: "disney-half",
    name: "Walt Disney World Half Marathon",
    distance: 13.1,
    city: "Orlando",
    state: "FL",
    month: 1,
    day: 11,
    typicalWeather: {
      lowF: 52,
      highF: 72,
      avgF: 62,
      humidity: 75,
      description: "Mild and humid early morning"
    },
    website: "https://www.rundisney.com"
  },
  {
    id: "hot-chocolate-chicago",
    name: "Hot Chocolate 15K/5K Chicago",
    distance: 9.3,
    city: "Chicago",
    state: "IL",
    month: 11,
    day: 10,
    typicalWeather: {
      lowF: 35,
      highF: 48,
      avgF: 42,
      humidity: 60,
      description: "Cold fall running, hot chocolate at finish!"
    },
    website: "https://www.hotchocolate15k.com/chicago"
  },
  {
    id: "big-sur",
    name: "Big Sur International Marathon",
    distance: 26.2,
    city: "Carmel",
    state: "CA",
    month: 4,
    day: 28,
    typicalWeather: {
      lowF: 48,
      highF: 62,
      avgF: 55,
      humidity: 75,
      description: "Coastal cool, often foggy with ocean views"
    },
    website: "https://www.bigsurmarathon.org"
  },

  // Ultra Marathons
  {
    id: "comrades",
    name: "JFK 50 Mile",
    distance: 50,
    city: "Boonsboro",
    state: "MD",
    month: 11,
    day: 23,
    typicalWeather: {
      lowF: 32,
      highF: 48,
      avgF: 40,
      humidity: 60,
      description: "Cold late November, dress in layers"
    },
    website: "https://jfk50mile.org"
  },
  {
    id: "western-states",
    name: "Western States 100",
    distance: 100,
    city: "Auburn",
    state: "CA",
    month: 6,
    day: 29,
    typicalWeather: {
      lowF: 50,
      highF: 100,
      avgF: 75,
      humidity: 25,
      description: "Extreme heat in canyons, cold at night"
    },
    website: "https://www.wser.org"
  },
  {
    id: "leadville",
    name: "Leadville Trail 100",
    distance: 100,
    city: "Leadville",
    state: "CO",
    month: 8,
    day: 17,
    typicalWeather: {
      lowF: 35,
      highF: 70,
      avgF: 52,
      humidity: 35,
      description: "High altitude (10,000ft+), cold nights, afternoon storms"
    },
    website: "https://www.leadvilleraceseries.com"
  },
  {
    id: "javelina",
    name: "Javelina Jundred",
    distance: 100,
    city: "Fountain Hills",
    state: "AZ",
    month: 10,
    day: 28,
    typicalWeather: {
      lowF: 55,
      highF: 85,
      avgF: 70,
      humidity: 20,
      description: "Desert running, hot days, cool nights"
    },
    website: "https://www.javelinajundred.com"
  },

  // More Popular Marathons
  {
    id: "seattle",
    name: "Seattle Marathon",
    distance: 26.2,
    city: "Seattle",
    state: "WA",
    month: 11,
    day: 24,
    typicalWeather: {
      lowF: 38,
      highF: 48,
      avgF: 43,
      humidity: 75,
      description: "Cool and often rainy, typical PNW weather"
    },
    website: "https://www.seattlemarathon.org"
  },
  {
    id: "san-francisco",
    name: "San Francisco Marathon",
    distance: 26.2,
    city: "San Francisco",
    state: "CA",
    month: 7,
    day: 21,
    typicalWeather: {
      lowF: 54,
      highF: 65,
      avgF: 60,
      humidity: 80,
      description: "Cool and foggy, SF summer weather"
    },
    website: "https://www.thesfmarathon.com"
  },
  {
    id: "denver",
    name: "Colfax Marathon",
    distance: 26.2,
    city: "Denver",
    state: "CO",
    month: 5,
    day: 18,
    typicalWeather: {
      lowF: 48,
      highF: 72,
      avgF: 60,
      humidity: 35,
      description: "Mile high altitude, dry spring weather"
    },
    website: "https://www.runcolfax.org"
  },
  {
    id: "austin",
    name: "Austin Marathon",
    distance: 26.2,
    city: "Austin",
    state: "TX",
    month: 2,
    day: 16,
    typicalWeather: {
      lowF: 45,
      highF: 65,
      avgF: 55,
      humidity: 60,
      description: "Mild Texas winter, can be unpredictable"
    },
    website: "https://youraustinmarathon.com"
  },
  {
    id: "san-diego",
    name: "San Diego Rock 'n' Roll Marathon",
    distance: 26.2,
    city: "San Diego",
    state: "CA",
    month: 6,
    day: 1,
    typicalWeather: {
      lowF: 62,
      highF: 72,
      avgF: 67,
      humidity: 70,
      description: "Perfect coastal weather, June gloom possible"
    },
    website: "https://www.runrocknroll.com/san-diego"
  },
  {
    id: "mesa-marathon",
    name: "Mesa Marathon",
    distance: 26.2,
    city: "Mesa",
    state: "AZ",
    month: 2,
    day: 8,
    typicalWeather: {
      lowF: 45,
      highF: 70,
      avgF: 58,
      humidity: 25,
      description: "Perfect desert winter weather, fast course"
    },
    website: "https://www.mesamarathon.com"
  },
  {
    id: "eugene",
    name: "Eugene Marathon",
    distance: 26.2,
    city: "Eugene",
    state: "OR",
    month: 4,
    day: 27,
    typicalWeather: {
      lowF: 42,
      highF: 60,
      avgF: 51,
      humidity: 65,
      description: "Tracktown USA, spring weather, possible rain"
    },
    website: "https://www.eugenemarathon.com"
  },
  {
    id: "revel-big-cottonwood",
    name: "REVEL Big Cottonwood",
    distance: 26.2,
    city: "Salt Lake City",
    state: "UT",
    month: 9,
    day: 14,
    typicalWeather: {
      lowF: 45,
      highF: 75,
      avgF: 60,
      humidity: 30,
      description: "Net downhill, starts cool in mountains"
    },
    website: "https://www.runrevel.com/rbc"
  },

  // Popular 50Ks
  {
    id: "north-face-50",
    name: "The North Face Endurance Challenge 50K",
    distance: 31,
    city: "Marin",
    state: "CA",
    month: 12,
    day: 7,
    typicalWeather: {
      lowF: 42,
      highF: 58,
      avgF: 50,
      humidity: 70,
      description: "Cool and possibly wet, Bay Area winter"
    },
    website: "https://www.thenorthface.com/en-us/explore/endurance-challenge"
  },
  {
    id: "bandera-50k",
    name: "Bandera 50K",
    distance: 31,
    city: "Bandera",
    state: "TX",
    month: 1,
    day: 11,
    typicalWeather: {
      lowF: 35,
      highF: 55,
      avgF: 45,
      humidity: 55,
      description: "Cool Texas Hill Country, technical terrain"
    },
    website: "https://www.tejastrails.com/bandera"
  }
];

// Group races by month for seasonal display
export function getRacesByMonth(month: number): Race[] {
  return popularRaces.filter(race => race.month === month);
}

// Get races by distance
export function getRacesByDistance(distance: number): Race[] {
  return popularRaces.filter(race => Math.abs(race.distance - distance) < 0.5);
}

// Search races by name or location
export function searchRaces(query: string): Race[] {
  const lowerQuery = query.toLowerCase();
  return popularRaces.filter(race =>
    race.name.toLowerCase().includes(lowerQuery) ||
    race.city.toLowerCase().includes(lowerQuery) ||
    race.state.toLowerCase().includes(lowerQuery)
  );
}

// Get upcoming races from current date
export function getUpcomingRaces(currentMonth: number = new Date().getMonth() + 1): Race[] {
  // Return races in the next 6 months
  const races: Race[] = [];
  for (let i = 0; i < 6; i++) {
    const month = ((currentMonth - 1 + i) % 12) + 1;
    races.push(...getRacesByMonth(month));
  }
  return races;
}

// Get state abbreviation to full name mapping
export const stateNames: Record<string, string> = {
  "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas",
  "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware",
  "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho",
  "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas",
  "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland",
  "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi",
  "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada",
  "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York",
  "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma",
  "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina",
  "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah",
  "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia",
  "WI": "Wisconsin", "WY": "Wyoming", "DC": "District of Columbia"
};

// Month names for display
export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
