# ABS Births, Australia — extraction notes

- **Access date (UTC):** 2026-10-22
- **Release page:** https://www.abs.gov.au/statistics/people/population/births-australia/latest-release
- **Release title on page:** "Births, Australia, 2024"; released 15/10/2025 11:30am AEDT; reference year 2024.
- **Key statistics quoted on page:** "There were 292,318 registered births in 2024, an increase of 1.9% (or 5,320 births) from 2023. The total fertility rate was 1.481 births per woman. Median age was 32.1 years for mothers and 33.9 years for fathers." Sex ratio 105.8; crude birth rate 10.7.

## Important note on what this release contains

The 2024 release page offers **no time-series spreadsheet** in the old ABS "Time Series Workbook" format. Data downloads are datacubes 33010DC01–DC08 (SA4/SA2/LGA/remoteness summaries, country of birth of parent, Aboriginal and Torres Strait Islander births, completed cohort fertility). The official long annual series are published as tables embedded in the release page HTML, which were parsed from the downloaded page. The 2024 release "Downloads" also offers `Download-all.zip` (not fetched).

## Sources (raw/)

| Local file | Source URL | What it is |
|---|---|---|
| `raw/births-page.html` | release page URL above | Contains official tables: "Births registered, 1924 to 2024(a)", "Total fertility rate, 1924 to 2024", "Median age of parents, 1924 to 2024", "Age-specific fertility rates, 1924 to 2024", national "Summary statistics" block, plus state tables |
| `raw/abs-births-33010DC01.xlsx` | https://www.abs.gov.au/statistics/people/population/births-australia/2024/33010DC01.xlsx | "Table 1: Births, summary, Statistical Areas Level 4 of usual residence" (year blocks 2011–2024; Australia aggregate row) — used for cross-checking births counts |
| `raw/abs-births-33010DC06.xlsx` | https://www.abs.gov.au/statistics/people/population/births-australia/2024/33010DC06.xlsx | "Table 6: Births, country of birth of parent, Australia, 2024" — checked for a sex-split time series (not present; 2024 only) |

## Outputs (series/)

1. **abs-tfr-annual.csv** — `year, tfr` — Australia, total fertility rate (babies per woman), **1924–2024** (101 rows). Source: page table "Total fertility rate, 1924 to 2024". First/last: 1924 = 2.972; 2024 = 1.481.
2. **abs-births-annual.csv** — `year, births_registered` — Australia, registered births (number), **1924–2024** (101 rows). First/last: 1924 = 134,927; 2024 = 292,318. `males`/`females` columns are populated **only** for the years where the release publishes a sex split (2014, 2023, 2024, from the national "Summary statistics" block); all other years are blank — no other sex-split annual series exists in this release.

### Cross-checks performed

- Births registered 2011–2024 from the page table vs datacube 33010DC01 "Australia" row: **all 14 years match exactly** (e.g. 2024 = 292,318; 2023 = 286,998; 2011 = 301,617).
- TFR 2014/2023/2024 from the page table vs the page "Summary statistics" block (1.795 / 1.499 / 1.481): **match**.
- Male+female births = total births for 2014, 2023, 2024 ✓.

## Units

- births_registered, males, females: **number of registered births** ("no.").
- tfr: **babies per woman** (sum of age-specific fertility rates, women aged 15–49).

## Anomalies and footnotes observed

- **Datacube TFR discrepancy (important):** in 33010DC01, the "Total fertility rate" column is *not* the headline TFR. It equals 5 × Σ(the seven 5-year-group ASFRs) shown in the same table (verified numerically for every year 2013–2024, e.g. 2024: 6.3+33.4+76.4+108.7+67.1+15.5+1.2 = 308.6 per 1,000 → ×5/1000 = 1.54), i.e. a grouped-age approximation. It differs from the official single-year-based TFR (e.g. 2024: **1.54 in the datacube vs 1.481 headline**; 2013: 1.91 vs 1.881; 2019: 1.73 vs 1.666). Likewise the datacube's "Median age of mother" (2024: 31.9) differs slightly from the headline series (2024: 32.10). **The official series from the page tables was used; the datacube's rate columns were not.**
- **2024 registration-processing effects:** page footnote — "Data for 2024 show an increase of 5,320 births registrations. This increase partly reflects changes in registration processing times in some states and territories." Related state footnotes: NSW births fell 3.4% in 2024 "in part due to an increase in birth registration processing times"; Victoria's 12.9% increase was "due to an improvement in birth registration processing times … following a period of processing delays."
- "Unless otherwise indicated, all data are based on year of registration. These data are final and are not updated." (Occurrence-based data are updated in each annual release and are available in Data downloads.)
- TFR values 2011–2012 in the datacube are marked `np` (not available for publication) at national level; the page table supplies 2011 (1.917) and 2012 (1.929) normally.
- The TFR series on the page shows 2023 = 1.499 and 2022 = 1.631 — a large one-year fall consistent with the registration-timing effects noted above (2023 was a low-registration year).
- Historical peak in the downloaded series: 1961 = 3.548 (baby boom); series begins 1924 = 2.972.
