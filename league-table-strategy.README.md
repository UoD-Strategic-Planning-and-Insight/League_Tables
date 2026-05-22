# `league-table-strategy.jsx` README

## Purpose
This file contains the UK league-table strategic planning app. It helps teams identify where performance gaps are likely to affect rankings most, then prioritize interventions based on controllability and cross-table impact.

## Strategic model (what matters most)
- Defines UK metrics (NSS, continuation, outcomes, research, spend, etc.) with:
  - sector benchmark thresholds (`benchmarkLow`, `benchmarkMid`, `benchmarkTop`)
  - institutional controllability scores
  - per-table weighting exposure (Guardian, Times, CUG, Daily Mail)
- Computes a **priority score** by combining:
  - cross-table influence (how many/which tables weight the metric)
  - controllability (how much the institution can realistically move it)

## Gap analysis logic
- User/institution values are normalized to a common 0–100 basis for cross-metric comparability.
- Each metric is classified relative to sector thresholds:
  - Top quartile
  - Above median
  - Below median
  - Bottom quartile
- The gap view then highlights:
  - table-level simulated standing vs median benchmark
  - metrics below median, sorted by strategic priority
  - distance to median and top-quartile targets

## Strategic recommendation engine
The guidance in this file is rule-based and tied to two dimensions:
1. **Ranking influence breadth** (number of tables using the metric)
2. **Institutional controllability** (high/medium/low)

This creates recommendation types such as:
- high-priority lever (broad impact + high control)
- monitor/invest strategically (broad impact + medium control)
- structural challenge (broad impact + low control)
- targeted quick win (narrower impact + high control)
- table-specific lever (single-table importance)

It then adds urgency language based on current gap position (e.g., bottom quartile = urgent attention).

## Decision use
Use outputs from this file to:
- rank intervention portfolios by expected ranking effect
- separate short-cycle operational wins from multi-year structural programmes
- align messaging (e.g., protect top-quartile metrics; recover bottom-quartile drag factors)

## Notes
- Most rendering/styling code is presentational.
- Strategic value is concentrated in the metric definitions, weighting model, normalization, gap classification, and recommendation rules.
