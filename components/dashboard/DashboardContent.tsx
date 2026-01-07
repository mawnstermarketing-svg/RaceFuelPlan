"use client";

import Link from "next/link";
import {
  Plus,
  Calendar,
  FileText,
  Unlock,
  Lock,
  ArrowRight,
  Sparkles,
  Crown,
  Search,
  LayoutGrid,
  List,
  Zap,
  Clock
} from "lucide-react";
import {
  Button,
  Card,
  Badge,
  StatCard,
  Input,
  Navbar
} from "@/components/ui";
import { useState } from "react";

interface Plan {
  id: string;
  title: string;
  createdAt: Date;
  accessType: string;
}

interface DashboardContentProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  plans: Plan[];
  hasAnnualAccess: boolean;
  onSignOut: () => void;
}

export function DashboardContent({
  user,
  plans,
  hasAnnualAccess,
  onSignOut,
}: DashboardContentProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlans = plans.filter((plan) =>
    plan.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unlockedPlans = plans.filter(
    (p) => p.accessType === "ANNUAL_UNLOCKED" || p.accessType === "ONE_TIME_UNLOCKED"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <Navbar user={user} onSignOut={onSignOut} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {hasAnnualAccess
                ? "You have unlimited access to all plans"
                : "Manage your fueling plans and track your races"}
            </p>
          </div>
          <Link href="/calculator">
            <Button size="lg" leftIcon={<Plus className="w-4 h-4" />}>
              New Plan
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Plans"
            value={plans.length}
            icon={<FileText className="w-5 h-5" />}
            variant="primary"
          />
          <StatCard
            title="Unlocked Plans"
            value={unlockedPlans}
            icon={<Unlock className="w-5 h-5" />}
            variant="success"
          />
          <StatCard
            title="Subscription"
            value={hasAnnualAccess ? "Active" : "Free"}
            icon={hasAnnualAccess ? <Crown className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            variant={hasAnnualAccess ? "accent" : "default"}
          />
          <StatCard
            title="This Month"
            value={plans.filter(p => {
              const planDate = new Date(p.createdAt);
              const now = new Date();
              return planDate.getMonth() === now.getMonth() && planDate.getFullYear() === now.getFullYear();
            }).length}
            subtitle="plans created"
            icon={<Calendar className="w-5 h-5" />}
            variant="warning"
          />
        </div>

        {/* Upgrade Banner */}
        {!hasAnnualAccess && (
          <Card
            variant="default"
            padding="none"
            className="mb-8 overflow-hidden bg-gradient-to-r from-primary-600 via-accent-600 to-primary-700 border-0"
          >
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Upgrade to Unlimited</h3>
                  <p className="text-white/80 mt-1">
                    Get unlimited plans, downloads, and print-ready race cards for just $49/year
                  </p>
                </div>
              </div>
              <Link href="/pricing">
                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="bg-white text-primary-700 hover:bg-slate-100 shadow-soft-lg whitespace-nowrap"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Plans Section */}
        <div className="space-y-6">
          {/* Search and View Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              My Fueling Plans
            </h2>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex-1 sm:flex-initial sm:w-64">
                <Input
                  placeholder="Search plans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                  inputSize="sm"
                />
              </div>
              <div className="flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-slate-700 shadow-soft-sm text-slate-900 dark:text-white"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white dark:bg-slate-700 shadow-soft-sm text-slate-900 dark:text-white"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Plans Grid/List */}
          {filteredPlans.length === 0 ? (
            <Card variant="outlined" padding="lg" className="text-center">
              <div className="py-8">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                {plans.length === 0 ? (
                  <>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      No plans yet
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                      Create your first fueling plan to get started. Our calculator will generate a
                      personalized race-day nutrition strategy.
                    </p>
                    <Link href="/calculator">
                      <Button leftIcon={<Plus className="w-4 h-4" />}>
                        Create Your First Plan
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      No matching plans
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400">
                      Try adjusting your search query
                    </p>
                  </>
                )}
              </div>
            </Card>
          ) : viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPlans.map((plan, idx) => {
                const isUnlocked =
                  plan.accessType === "ANNUAL_UNLOCKED" || plan.accessType === "ONE_TIME_UNLOCKED";
                return (
                  <Link key={plan.id} href={`/app/plans/${plan.id}`}>
                    <Card
                      variant="elevated"
                      hover
                      padding="md"
                      className={`h-full animate-fade-in stagger-${(idx % 5) + 1}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <Badge
                          variant={isUnlocked ? "success" : "default"}
                          size="sm"
                          icon={isUnlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                        >
                          {isUnlocked ? "Unlocked" : "View Only"}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1 line-clamp-2">
                        {plan.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(plan.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <Card variant="elevated" padding="none">
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredPlans.map((plan) => {
                  const isUnlocked =
                    plan.accessType === "ANNUAL_UNLOCKED" || plan.accessType === "ONE_TIME_UNLOCKED";
                  return (
                    <Link
                      key={plan.id}
                      href={`/app/plans/${plan.id}`}
                      className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900 dark:text-white">
                            {plan.title}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {new Date(plan.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={isUnlocked ? "success" : "default"}
                          size="sm"
                        >
                          {isUnlocked ? "Unlocked" : "View Only"}
                        </Badge>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

export default DashboardContent;
