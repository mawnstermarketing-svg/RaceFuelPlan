"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, MapPin, Calendar, Thermometer, ChevronDown, X, Trophy, Cloud } from "lucide-react";
import { popularRaces, Race, monthNames, getUpcomingRaces } from "@/lib/races";

interface RaceSelectorProps {
  onSelect: (race: Race | null) => void;
  selectedRace: Race | null;
  className?: string;
}

export function RaceSelector({ onSelect, selectedRace, className = "" }: RaceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedDistance, setSelectedDistance] = useState<string>("all");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const distanceFilters = [
    { value: "all", label: "All Distances" },
    { value: "13.1", label: "Half Marathon" },
    { value: "26.2", label: "Marathon" },
    { value: "50", label: "Ultra (50K+)" },
  ];

  const filteredRaces = useMemo(() => {
    let races = popularRaces;

    // Filter by search
    if (search) {
      const lowerSearch = search.toLowerCase();
      races = races.filter(
        (race) =>
          race.name.toLowerCase().includes(lowerSearch) ||
          race.city.toLowerCase().includes(lowerSearch) ||
          race.state.toLowerCase().includes(lowerSearch)
      );
    }

    // Filter by distance
    if (selectedDistance !== "all") {
      const dist = parseFloat(selectedDistance);
      if (dist === 50) {
        races = races.filter((race) => race.distance >= 31);
      } else {
        races = races.filter((race) => Math.abs(race.distance - dist) < 1);
      }
    }

    // Sort by month (upcoming first)
    const currentMonth = new Date().getMonth() + 1;
    return races.sort((a, b) => {
      const aMonth = a.month >= currentMonth ? a.month : a.month + 12;
      const bMonth = b.month >= currentMonth ? b.month : b.month + 12;
      return aMonth - bMonth;
    });
  }, [search, selectedDistance]);

  const upcomingRaces = useMemo(() => getUpcomingRaces(), []);

  const handleSelect = (race: Race) => {
    onSelect(race);
    setIsOpen(false);
    setSearch("");
  };

  const handleClear = () => {
    onSelect(null);
    setSearch("");
  };

  const getDistanceLabel = (distance: number) => {
    if (distance === 13.1) return "Half Marathon";
    if (distance === 26.2) return "Marathon";
    if (distance === 31) return "50K";
    if (distance === 50) return "50 Mile";
    if (distance === 62) return "100K";
    if (distance === 100) return "100 Mile";
    return `${distance} miles`;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        Select Your Race (Optional)
      </label>

      {/* Selected Race Display or Trigger Button */}
      {selectedRace ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left px-4 py-3 rounded-xl border border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <span className="font-semibold text-slate-900 dark:text-white truncate">
                    {selectedRace.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {selectedRace.city}, {selectedRace.state}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {monthNames[selectedRace.month - 1]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Thermometer className="w-3 h-3" />
                    {selectedRace.typicalWeather.avgF}°F
                  </span>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
            </div>
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-12 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
            aria-label="Clear selection"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Trophy className="w-4 h-4" />
              <span>Choose a race to auto-fill weather data...</span>
            </div>
            <ChevronDown className="w-5 h-5 text-slate-400" />
          </div>
        </button>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-soft-xl overflow-hidden animate-scale-in">
          {/* Search and Filters */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-700 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search races by name, city, or state..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {distanceFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setSelectedDistance(filter.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedDistance === filter.value
                      ? "bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Race List */}
          <div className="max-h-80 overflow-y-auto">
            {filteredRaces.length === 0 ? (
              <div className="p-6 text-center text-slate-500 dark:text-slate-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No races found matching your search.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {filteredRaces.map((race) => (
                  <button
                    key={race.id}
                    type="button"
                    onClick={() => handleSelect(race)}
                    className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-900 dark:text-white truncate">
                          {race.name}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {race.city}, {race.state}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {monthNames[race.month - 1]}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded-full">
                          {getDistanceLabel(race.distance)}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Cloud className="w-3 h-3" />
                          {race.typicalWeather.lowF}°-{race.typicalWeather.highF}°F
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Weather data is based on historical averages for race day
            </p>
          </div>
        </div>
      )}

      {/* Weather Preview when race selected */}
      {selectedRace && (
        <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border border-sky-200 dark:border-sky-800">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-900/50">
              <Cloud className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                Typical Race Day Weather
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {selectedRace.typicalWeather.description}
              </p>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {selectedRace.typicalWeather.lowF}°F - {selectedRace.typicalWeather.highF}°F
                  </span>
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  Humidity:{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {selectedRace.typicalWeather.humidity}%
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
