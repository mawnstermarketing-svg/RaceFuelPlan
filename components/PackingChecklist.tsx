'use client';

import { useState } from 'react';
import {
  CheckSquare,
  Square,
  Package,
  Shirt,
  Watch,
  Droplets,
  Zap,
  Sun,
  Cloud,
  Thermometer,
  Printer,
  Share2,
  Download,
  Coffee,
  Car,
  Camera
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { PlanOutput } from '@/lib/types';

interface PackingChecklistProps {
  plan: PlanOutput;
  raceDistance: number;
  temperatureF: number;
  fuelType: 'gels' | 'drink' | 'hybrid';
  raceName?: string;
  onClose: () => void;
}

interface ChecklistItem {
  id: string;
  label: string;
  quantity?: number;
  note?: string;
  essential: boolean;
}

interface ChecklistCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: ChecklistItem[];
}

export function PackingChecklist({
  plan,
  raceDistance,
  temperatureF,
  fuelType,
  raceName,
  onClose
}: PackingChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  // Calculate fuel needs based on plan
  const gelCount = plan.fuelingSchedule.filter(a =>
    a.actionText.toLowerCase().includes('gel')
  ).length;

  const totalCarbsNeeded = plan.totalCarbsNeeded;
  const raceDurationHours = plan.raceDurationMinutes / 60;

  // Estimate salt tabs needed (1 per 45-60 min for high sodium needs)
  const sodiumMgPerHour = (plan.sodiumPerHourRange.min + plan.sodiumPerHourRange.max) / 2;
  const saltTabsNeeded = sodiumMgPerHour > 600 ? Math.ceil(raceDurationHours * 1.5) : Math.ceil(raceDurationHours);

  // Weather-based clothing
  const isHot = temperatureF > 70;
  const isCold = temperatureF < 50;
  const isMild = !isHot && !isCold;

  // Generate checklist categories
  const generateChecklist = (): ChecklistCategory[] => {
    const categories: ChecklistCategory[] = [];

    // Race Essentials
    categories.push({
      id: 'essentials',
      title: 'Race Essentials',
      icon: <Package className="w-5 h-5" />,
      items: [
        { id: 'bib', label: 'Race bib', essential: true },
        { id: 'timing-chip', label: 'Timing chip (if separate)', essential: true },
        { id: 'safety-pins', label: 'Safety pins', quantity: 8, essential: true },
        { id: 'race-belt', label: 'Race belt / bib clips', essential: false },
        { id: 'id', label: 'Photo ID', essential: true },
        { id: 'confirmation', label: 'Race confirmation email', essential: false }
      ]
    });

    // Nutrition & Hydration
    const nutritionItems: ChecklistItem[] = [];

    if (fuelType === 'gels' || fuelType === 'hybrid') {
      nutritionItems.push({
        id: 'gels',
        label: 'Energy gels',
        quantity: gelCount + 2, // +2 extra for backup
        note: `${gelCount} planned + 2 backup`,
        essential: true
      });
    }

    if (fuelType === 'drink' || fuelType === 'hybrid') {
      nutritionItems.push({
        id: 'drink-mix',
        label: 'Drink mix packets',
        quantity: Math.ceil(raceDurationHours) + 1,
        essential: true
      });
    }

    nutritionItems.push(
      {
        id: 'salt-tabs',
        label: 'Salt / electrolyte tablets',
        quantity: saltTabsNeeded + 2,
        note: `${saltTabsNeeded} planned + 2 backup`,
        essential: sodiumMgPerHour > 500
      },
      {
        id: 'water-bottle',
        label: 'Handheld bottle or hydration vest',
        essential: raceDistance > 13.1
      },
      {
        id: 'pre-race-snack',
        label: 'Pre-race breakfast/snack',
        note: 'Bagel, banana, energy bar',
        essential: true
      },
      {
        id: 'post-race-snack',
        label: 'Post-race recovery food',
        note: 'Protein bar, chocolate milk',
        essential: false
      }
    );

    categories.push({
      id: 'nutrition',
      title: 'Nutrition & Hydration',
      icon: <Zap className="w-5 h-5" />,
      items: nutritionItems
    });

    // Clothing & Gear
    const clothingItems: ChecklistItem[] = [
      { id: 'running-shoes', label: 'Race shoes (broken in!)', essential: true },
      { id: 'running-socks', label: 'Running socks', essential: true },
      { id: 'shorts', label: isHot ? 'Racing shorts/briefs' : 'Running shorts', essential: true },
      { id: 'sports-bra', label: 'Sports bra (if applicable)', essential: true }
    ];

    if (isHot) {
      clothingItems.push(
        { id: 'singlet', label: 'Light singlet or crop top', essential: true },
        { id: 'hat-visor', label: 'Hat or visor (light colored)', essential: true },
        { id: 'sunglasses', label: 'Sunglasses', essential: false },
        { id: 'sunscreen', label: 'Sunscreen (apply before race)', essential: true },
        { id: 'arm-coolers', label: 'Arm coolers', essential: false }
      );
    } else if (isCold) {
      clothingItems.push(
        { id: 'long-sleeve', label: 'Long sleeve base layer', essential: true },
        { id: 'arm-warmers', label: 'Arm warmers', essential: true },
        { id: 'gloves', label: 'Lightweight gloves', essential: true },
        { id: 'headband', label: 'Ear-covering headband', essential: true },
        { id: 'throwaway-layer', label: 'Throwaway layer for start', essential: true, note: 'Old shirt or trash bag' }
      );
    } else {
      clothingItems.push(
        { id: 'tshirt', label: 'Running shirt/singlet', essential: true },
        { id: 'arm-warmers-opt', label: 'Arm warmers (optional)', essential: false, note: 'Can remove mid-race' },
        { id: 'light-gloves', label: 'Light gloves for start', essential: false }
      );
    }

    clothingItems.push(
      { id: 'body-glide', label: 'Body Glide / anti-chafe', essential: true },
      { id: 'nipple-guards', label: 'Nipple guards/tape', essential: false }
    );

    categories.push({
      id: 'clothing',
      title: 'Clothing & Gear',
      icon: <Shirt className="w-5 h-5" />,
      items: clothingItems
    });

    // Electronics
    categories.push({
      id: 'electronics',
      title: 'Electronics',
      icon: <Watch className="w-5 h-5" />,
      items: [
        { id: 'gps-watch', label: 'GPS watch (charged!)', essential: true },
        { id: 'hr-strap', label: 'Heart rate strap', essential: false },
        { id: 'phone', label: 'Phone (for photos/tracking)', essential: false },
        { id: 'headphones', label: 'Headphones (if allowed)', essential: false },
        { id: 'charger', label: 'Watch charger', essential: false, note: 'Charge night before' }
      ]
    });

    // Race Morning
    categories.push({
      id: 'morning',
      title: 'Race Morning',
      icon: <Coffee className="w-5 h-5" />,
      items: [
        { id: 'race-plan', label: 'Printed fueling plan / race card', essential: true },
        { id: 'cash', label: 'Cash / cards', essential: false },
        { id: 'flip-flops', label: 'Flip flops for after', essential: false },
        { id: 'change-clothes', label: 'Dry clothes for after', essential: true },
        { id: 'towel', label: 'Small towel', essential: false },
        { id: 'bag', label: 'Gear check bag', essential: true },
        { id: 'toilet-paper', label: 'Toilet paper / tissues', essential: false, note: 'Porta potty backup' }
      ]
    });

    // Travel/Logistics (if applicable)
    if (raceDistance >= 26.2) {
      categories.push({
        id: 'logistics',
        title: 'Travel & Logistics',
        icon: <Car className="w-5 h-5" />,
        items: [
          { id: 'directions', label: 'Directions to start/parking', essential: true },
          { id: 'spectator-plan', label: 'Spectator meeting plan', essential: false },
          { id: 'parking-pass', label: 'Parking pass', essential: false },
          { id: 'hotel-key', label: 'Hotel key', essential: false },
          { id: 'post-race-meal', label: 'Post-race meal reservation', essential: false }
        ]
      });
    }

    return categories;
  };

  const checklist = generateChecklist();

  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const totalItems = checklist.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedCount = checkedItems.size;
  const progress = Math.round((checkedCount / totalItems) * 100);

  const essentialItems = checklist.flatMap(cat => cat.items.filter(item => item.essential));
  const essentialChecked = essentialItems.filter(item => checkedItems.has(item.id)).length;
  const allEssentialsChecked = essentialChecked === essentialItems.length;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const text = checklist.map(cat =>
      `${cat.title}:\n${cat.items.map(item =>
        `${checkedItems.has(item.id) ? '✓' : '○'} ${item.label}${item.quantity ? ` (${item.quantity})` : ''}`
      ).join('\n')}`
    ).join('\n\n');

    if (navigator.share) {
      await navigator.share({
        title: `Race Packing Checklist${raceName ? ` - ${raceName}` : ''}`,
        text
      });
    } else {
      await navigator.clipboard.writeText(text);
      alert('Checklist copied to clipboard!');
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto max-h-[85vh] overflow-y-auto print:max-h-none print:overflow-visible">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 print:mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-primary-500" />
            Race Day Packing List
          </h2>
          {raceName && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{raceName}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors print:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 print:hidden">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-600 dark:text-slate-400">
            {checkedCount} of {totalItems} items packed
          </span>
          <span className={`font-medium ${allEssentialsChecked ? 'text-success-600 dark:text-success-400' : 'text-warning-600 dark:text-warning-400'}`}>
            {allEssentialsChecked ? '✓ All essentials ready!' : `${essentialItems.length - essentialChecked} essentials remaining`}
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              progress === 100 ? 'bg-success-500' : 'bg-primary-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Weather Reminder */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 mb-6 print:bg-gray-100">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isHot ? 'bg-orange-100 dark:bg-orange-900/50' :
          isCold ? 'bg-blue-100 dark:bg-blue-900/50' :
          'bg-green-100 dark:bg-green-900/50'
        }`}>
          {isHot ? <Sun className="w-5 h-5 text-orange-600 dark:text-orange-400" /> :
           isCold ? <Cloud className="w-5 h-5 text-blue-600 dark:text-blue-400" /> :
           <Thermometer className="w-5 h-5 text-green-600 dark:text-green-400" />}
        </div>
        <div>
          <div className="font-medium text-slate-900 dark:text-white">
            Expected: {temperatureF}°F
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {isHot ? 'Hot conditions - pack light, bring sunscreen' :
             isCold ? 'Cold conditions - layer up, bring throwaways' :
             'Mild conditions - consider arm warmers for start'}
          </div>
        </div>
      </div>

      {/* Fuel Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {gelCount + 2}
          </div>
          <div className="text-xs text-primary-700 dark:text-primary-300">Gels</div>
        </div>
        <div className="bg-warning-50 dark:bg-warning-900/30 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-warning-600 dark:text-warning-400">
            {saltTabsNeeded + 2}
          </div>
          <div className="text-xs text-warning-700 dark:text-warning-300">Salt Tabs</div>
        </div>
        <div className="bg-accent-50 dark:bg-accent-900/30 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">
            {plan.raceDurationMinutes}
          </div>
          <div className="text-xs text-accent-700 dark:text-accent-300">Min Race</div>
        </div>
      </div>

      {/* Checklist Categories */}
      <div className="space-y-6">
        {checklist.map((category) => (
          <div key={category.id}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-primary-500">{category.icon}</span>
              <h3 className="font-semibold text-slate-900 dark:text-white">{category.title}</h3>
              <Badge variant="outline" size="sm">
                {category.items.filter(item => checkedItems.has(item.id)).length}/{category.items.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {category.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                    checkedItems.has(item.id)
                      ? 'bg-success-50 dark:bg-success-900/20'
                      : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {checkedItems.has(item.id) ? (
                    <CheckSquare className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${
                      checkedItems.has(item.id)
                        ? 'text-success-700 dark:text-success-300 line-through'
                        : 'text-slate-900 dark:text-white'
                    }`}>
                      {item.label}
                      {item.quantity && (
                        <span className="ml-2 text-sm font-normal text-slate-500 dark:text-slate-400">
                          × {item.quantity}
                        </span>
                      )}
                    </div>
                    {item.note && (
                      <div className="text-sm text-slate-500 dark:text-slate-400">{item.note}</div>
                    )}
                  </div>
                  {item.essential && !checkedItems.has(item.id) && (
                    <Badge variant="error" size="sm">Essential</Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 print:hidden">
        <div className="flex gap-3">
          <Button variant="outline" onClick={handlePrint} leftIcon={<Printer className="w-4 h-4" />} className="flex-1">
            Print
          </Button>
          <Button variant="outline" onClick={handleShare} leftIcon={<Share2 className="w-4 h-4" />} className="flex-1">
            Share
          </Button>
        </div>
        <Button onClick={onClose} fullWidth variant="primary" className="mt-3">
          Done
        </Button>
      </div>

      {/* Print Footer */}
      <div className="hidden print:block mt-8 pt-4 border-t text-center text-sm text-gray-500">
        Generated by RaceFuelPlan • racefuelplan.com
      </div>
    </Card>
  );
}
