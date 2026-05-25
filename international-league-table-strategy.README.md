# `international-league-table-strategy.jsx` README

## Purpose
This file contains the international rankings strategic planning app focused on **QS** and **THE** methodologies. It translates institutional performance into gap signals and strategic priorities for ranking improvement.

## Strategic model (what matters most)
- Encodes international metrics across reputation, research, internationalization, income, innovation, and outcomes.
- Assigns each metric:
  - benchmark thresholds (low / median / top quartile)
  - controllability score
  - explicit weight exposure in QS and/or THE
- Builds a priority score from:
  - cross-ranking influence (QS + THE weights)
  - controllability

## Gap analysis logic
- Converts raw metric values to a common normalized scale for comparability.
- Classifies each metric into quartile-position labels against sector benchmarks.
- Produces two strategic views:
  - ranking score simulation vs benchmark median
  - below-median priority list ordered by strategic impact
- Quantifies movement needed to reach median and top quartile.

## Strategic recommendation engine
Recommendations are generated from metric profile, especially:
1. **How many rankings use the metric** (both QS and THE vs one vs none)
2. **How controllable the metric is**

This yields categories such as:
- high-priority lever
- monitor and invest strategically
- structural challenge
- targeted single-ranking lever
- ranking-specific longer-horizon lever

Position-sensitive advice is then appended (urgent for bottom quartile, momentum/maintenance messaging for above median/top quartile).

## Decision use
Use this file’s outputs to:
- prioritize cross-ranking initiatives over ranking-specific projects
- phase interventions by time horizon and expected controllability
- focus executive attention on below-median, high-impact metrics first

## Notes
- UI/styling logic is extensive but secondary.
- The core strategic capability is in metric definitions, weighting exposure, gap classification, and rule-based guidance.
