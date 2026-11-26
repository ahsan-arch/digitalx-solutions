"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Check, Copy, PhoneCall, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MissedCallCalculatorProps {
  className?: string;
  defaultBookingUrl?: string;
  title?: string;
  subtitle?: string;
}

export function MissedCallCalculator({
  className,
  defaultBookingUrl = "/contact",
  title = "Missed-Call Revenue Leak Calculator",
  subtitle = "Quantify how much unearned revenue drops to competitors when calls go unanswered during peak hours, jobsites, or after 5 PM.",
}: MissedCallCalculatorProps) {
  // Inputs state
  const [weeklyCalls, setWeeklyCalls] = useState(65);
  const [missedRate, setMissedRate] = useState(28);
  const [jobValue, setJobValue] = useState(650);
  const [closeRate, setCloseRate] = useState(35);

  // Embed Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customBookingUrl, setCustomBookingUrl] = useState("https://digitalx-solutions.com/contact");
  const [copied, setCopied] = useState(false);

  // Form IDs for accessibility
  const weeklyCallsId = useId();
  const missedRateId = useId();
  const jobValueId = useId();
  const closeRateId = useId();

  // Calculations
  const weeksPerMonth = 52 / 12; // ~4.333
  const monthlyInboundCalls = weeklyCalls * weeksPerMonth;
  const monthlyMissedCalls = Math.round(monthlyInboundCalls * (missedRate / 100));
  const monthlyLostJobs = Math.round(monthlyMissedCalls * (closeRate / 100));
  const monthlyLostRevenue = monthlyLostJobs * jobValue;
  const annualizedLostRevenue = monthlyLostRevenue * 12;

  // Pipeline breakdown
  const totalPotentialJobs = Math.round(monthlyInboundCalls * (closeRate / 100));
  const totalPotentialRevenue = Math.max(totalPotentialJobs * jobValue, monthlyLostRevenue);
  const capturedRevenue = Math.max(0, totalPotentialRevenue - monthlyLostRevenue);

  const recoverableRate = 0.65; // 65% benchmark
  const aiRecoverableRevenue = Math.round(monthlyLostRevenue * recoverableRate);
  const unrecoveredRevenue = Math.max(0, monthlyLostRevenue - aiRecoverableRevenue);

  // Percentages for bar
  const capturedPct = totalPotentialRevenue > 0 ? (capturedRevenue / totalPotentialRevenue) * 100 : 0;
  const recoverablePct = totalPotentialRevenue > 0 ? (aiRecoverableRevenue / totalPotentialRevenue) * 100 : 0;
  const lostPct = totalPotentialRevenue > 0 ? (unrecoveredRevenue / totalPotentialRevenue) * 100 : 0;

  const fmt = (num: number) => "$" + Math.round(num).toLocaleString("en-US");

  const jobValuePills = [
    { label: "$250 (Routine)", val: 250 },
    { label: "$650 (Trade Repair)", val: 650 },
    { label: "$1,500 (Dental / HVAC)", val: 1500 },
    { label: "$3,000 (Commercial)", val: 3000 },
  ];

  const embedSnippet = `<iframe src="https://digitalx-solutions.com/missed-call-calculator.html?booking=${encodeURIComponent(
    customBookingUrl.trim() || "https://digitalx-solutions.com/contact"
  )}" width="100%" height="800" frameborder="0" style="border:none;border-radius:16px;max-width:960px;width:100%;display:block;margin:0 auto;box-shadow:0 4px 20px rgba(0,0,0,0.06);" title="Missed-Call Revenue Leak Calculator" loading="lazy"></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedSnippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={cn(
        "w-full rounded-3xl border border-white/10 bg-[#0d1421]/85 shadow-xs overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-b from-white to-surface-50/70 p-6 sm:p-8">
        <p className="flex items-center gap-2 text-xs font-semibold text-brand">
          <Calculator className="h-3.5 w-3.5" />
          Revenue Leak Benchmark
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/75">
          {subtitle}
        </p>
        <div className="mt-3">
          <span className="inline-flex items-center rounded-md border border-white/10 bg-surface-100 px-2.5 py-1 text-xs font-medium text-foreground/75">
            Default values shown below are an illustrative example. Adjust inputs to reflect your business.
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        {/* Left Inputs Column */}
        <div className="flex flex-col gap-6 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/10">
          {/* Weekly Calls */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <label htmlFor={weeklyCallsId} className="text-xs font-semibold text-foreground">
                Weekly Inbound Calls
              </label>
              <span className="rounded-md bg-brand/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-brand">
                {Math.round(monthlyInboundCalls)} calls per month
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id={weeklyCallsId}
                type="range"
                min="5"
                max="500"
                step="5"
                value={weeklyCalls}
                onChange={(e) => setWeeklyCalls(Number(e.target.value))}
                aria-label="Weekly Inbound Calls slider"
                className="h-2 w-full appearance-none rounded-full bg-surface-200 accent-brand cursor-pointer"
              />
              <input
                id={`${weeklyCallsId}-number`}
                type="number"
                min="5"
                max="500"
                value={weeklyCalls}
                onChange={(e) => setWeeklyCalls(Math.max(5, Math.min(500, Number(e.target.value))))}
                aria-label="Weekly Inbound Calls numeric input"
                className="w-20 rounded-lg border border-white/10 bg-surface-50 px-2.5 py-1.5 text-right font-mono text-sm font-semibold text-foreground focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          {/* Missed Call Rate */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <label htmlFor={missedRateId} className="text-xs font-semibold text-foreground">
                Missed Call Rate
              </label>
              <span className="rounded-md bg-amber-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-amber-300">
                Industry Avg: 28%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id={missedRateId}
                type="range"
                min="5"
                max="85"
                step="1"
                value={missedRate}
                onChange={(e) => setMissedRate(Number(e.target.value))}
                aria-label="Missed Call Rate slider"
                className="h-2 w-full appearance-none rounded-full bg-surface-200 accent-brand cursor-pointer"
              />
              <div className="relative">
                <input
                  id={`${missedRateId}-number`}
                  type="number"
                  min="5"
                  max="85"
                  value={missedRate}
                  onChange={(e) => setMissedRate(Math.max(5, Math.min(85, Number(e.target.value))))}
                  aria-label="Missed Call Rate percentage input"
                  className="w-20 rounded-lg border border-white/10 bg-surface-50 px-2.5 py-1.5 text-right font-mono text-sm font-semibold text-foreground focus:border-brand focus:outline-none pr-6"
                />
                <span className="absolute right-2 top-2 text-xs font-bold text-foreground/40">%</span>
              </div>
            </div>
          </div>

          {/* Average Job Value */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <label htmlFor={jobValueId} className="text-xs font-semibold text-foreground">
                Average Job / Customer Value
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                id={jobValueId}
                type="range"
                min="50"
                max="10000"
                step="50"
                value={jobValue}
                onChange={(e) => setJobValue(Number(e.target.value))}
                aria-label="Average Job Value slider"
                className="h-2 w-full appearance-none rounded-full bg-surface-200 accent-brand cursor-pointer"
              />
              <div className="relative">
                <input
                  id={`${jobValueId}-number`}
                  type="number"
                  min="50"
                  max="50000"
                  value={jobValue}
                  onChange={(e) => setJobValue(Math.max(50, Number(e.target.value)))}
                  aria-label="Average Job Value dollar input"
                  className="w-24 rounded-lg border border-white/10 bg-surface-50 pl-5 pr-2.5 py-1.5 text-right font-mono text-sm font-semibold text-foreground focus:border-brand focus:outline-none"
                />
                <span className="absolute left-2 top-2 text-xs font-bold text-foreground/40">$</span>
              </div>
            </div>
            {/* Quick Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {jobValuePills.map((pill) => (
                <button
                  key={pill.val}
                  type="button"
                  onClick={() => setJobValue(pill.val)}
                  className={cn(
                    "rounded-lg border px-3 py-1 text-xs font-medium transition-all",
                    jobValue === pill.val
                      ? "border-brand bg-brand text-white shadow-xs"
                      : "border-white/10 bg-surface-50 text-foreground/75 hover:bg-[#0d1421]/85 hover:text-foreground"
                  )}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Estimated Close Rate */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <label htmlFor={closeRateId} className="text-xs font-semibold text-foreground">
                Estimated Close / Booking Rate
              </label>
              <span className="font-mono text-[11px] text-foreground/75">
                Qualified Prospects
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id={closeRateId}
                type="range"
                min="10"
                max="80"
                step="1"
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                aria-label="Estimated Close Rate slider"
                className="h-2 w-full appearance-none rounded-full bg-surface-200 accent-brand cursor-pointer"
              />
              <div className="relative">
                <input
                  id={`${closeRateId}-number`}
                  type="number"
                  min="10"
                  max="80"
                  value={closeRate}
                  onChange={(e) => setCloseRate(Math.max(10, Math.min(80, Number(e.target.value))))}
                  aria-label="Estimated Close Rate percentage input"
                  className="w-20 rounded-lg border border-white/10 bg-surface-50 px-2.5 py-1.5 text-right font-mono text-sm font-semibold text-foreground focus:border-brand focus:outline-none pr-6"
                />
                <span className="absolute right-2 top-2 text-xs font-bold text-foreground/40">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Dashboard Column */}
        <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 bg-surface-50/50">
          {/* Main Lost Revenue Card */}
          <div className="rounded-2xl border border-rose-400/25 bg-rose-500/10 p-5 text-center">
            <span className="text-xs font-semibold text-rose-200">
              Estimated Monthly Lost Revenue
            </span>
            <div className="mt-1 font-display text-4xl font-semibold tracking-tight text-rose-200 sm:text-5xl">
              {fmt(monthlyLostRevenue)}
            </div>
            <p className="mt-1 text-xs font-medium text-rose-200">
              That&apos;s <span className="font-bold">{fmt(annualizedLostRevenue)}</span> leaked annually to competing providers
            </p>
          </div>

          {/* 3 Mini Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/10 bg-[#0d1421]/85 p-3.5">
              <span className="block text-[11px] font-medium text-foreground/75 leading-tight">
                Missed Calls
              </span>
              <span className="mt-1 block font-mono text-base font-bold text-foreground">
                {monthlyMissedCalls} / mo
              </span>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0d1421]/85 p-3.5">
              <span className="block text-[11px] font-medium text-foreground/75 leading-tight">
                Lost Bookings
              </span>
              <span className="mt-1 block font-mono text-base font-bold text-foreground">
                {monthlyLostJobs} / mo
              </span>
            </div>
            <div className="rounded-xl border border-brand/30 bg-brand/5 p-3.5">
              <span className="block text-[11px] font-semibold text-brand leading-tight">
                AI Recoverable
              </span>
              <span className="mt-1 block font-mono text-base font-bold text-brand">
                {fmt(aiRecoverableRevenue)}
              </span>
            </div>
          </div>

          {/* Segmented Pipeline Breakdown */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1421]/85 p-4">
            <div className="flex items-center justify-between text-xs mb-2.5">
              <span className="font-medium text-foreground/80">
                Opportunity Distribution
              </span>
              <span className="font-mono text-foreground/75">
                {fmt(totalPotentialRevenue)} potential
              </span>
            </div>

            {/* Horizontal Bar */}
            <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-surface-200">
              <div
                style={{ width: `${capturedPct}%` }}
                className="bg-emerald-600 transition-all duration-300"
                title="Captured Revenue"
              />
              <div
                style={{ width: `${recoverablePct}%` }}
                className="bg-brand transition-all duration-300"
                title="AI Recoverable (65%)"
              />
              <div
                style={{ width: `${lostPct}%` }}
                className="bg-rose-300 transition-all duration-300"
                title="Unrecovered Leak"
              />
            </div>

            {/* Legend */}
            <div className="mt-3.5 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-xs">
              <div>
                <div className="flex items-center gap-1.5 text-foreground/70">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  Captured
                </div>
                <div className="mt-0.5 font-mono font-bold text-foreground">
                  {fmt(capturedRevenue)}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-brand font-medium">
                  <span className="h-2 w-2 rounded-full bg-brand" />
                  Recoverable (65%)
                </div>
                <div className="mt-0.5 font-mono font-bold text-brand">
                  {fmt(aiRecoverableRevenue)}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-foreground/70">
                  <span className="h-2 w-2 rounded-full bg-rose-300" />
                  Unrecovered
                </div>
                <div className="mt-0.5 font-mono font-bold text-foreground">
                  {fmt(unrecoveredRevenue)}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href={defaultBookingUrl}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-brand-deep active:scale-98"
            >
              Book a 15-Minute Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0d1421]/85 px-4 py-3 text-sm font-semibold text-foreground transition-all hover:bg-surface-100"
            >
              <Copy className="h-4 w-4 text-foreground/75" />
              Copy Embed Code
            </button>
          </div>
        </div>
      </div>

      {/* Embed Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d1421]/85 p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display text-base font-bold text-foreground">
                Embed Calculator on Your Website
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-foreground/75 hover:bg-surface-100 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground">
                  Your Booking / Audit URL (GHL or Calendly):
                </label>
                <input
                  type="url"
                  value={customBookingUrl}
                  onChange={(e) => setCustomBookingUrl(e.target.value)}
                  placeholder="https://your-domain.com/booking-page"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-surface-50 px-3 py-2 font-mono text-xs text-foreground focus:border-brand focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground">
                  Responsive iFrame Snippet:
                </label>
                <textarea
                  readOnly
                  rows={4}
                  value={embedSnippet}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-surface-sunken p-2.5 font-mono text-xs text-foreground/90 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-all",
                  copied ? "bg-emerald-600" : "bg-brand hover:bg-brand-deep"
                )}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Embed Code
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
