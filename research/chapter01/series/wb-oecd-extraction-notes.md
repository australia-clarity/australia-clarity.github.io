# International comparison data — OECD and World Bank extraction notes

- **Access date (UTC):** 2026-10-22

## Part 1: OECD SDMX API — NOT VERIFIED for national fertility (old dataset removed)

Attempts (all with `curl -sL`, CSV output requested via `format=csvfilewithlabels`):

1. `https://sdmx.oecd.org/public/rest/data/OECD.DEMO.DSD.FERTILITY_DF/D.FERT.AUS+NZL+CAN+GBR+DEU+NLD+SWE+FRA+USA+JPN+KOR+SGP..?startPeriod=2022&format=csvfilewithlabels`
   → **HTTP 404** "Could not find Dataflow and/or DSD related with this data request".
2. Dataflow listing `https://sdmx.oecd.org/public/rest/dataflow/all/all/latest?format=structure` (saved: `raw/oecd-flows-all.json`, 8.9 MB SDMX-ML) shows the old `OECD.DEMO` agency dataflows **no longer exist**. The only fertility flow is `OECD.CFE.EDS,DSD_REG_DEMO@DF_FERTILITY` (v2.4, "Fertility - Regions"). Querying it (`raw/oecd-fertility-attempt2.csv`, HTTP 200, 9.05 MB) shows it contains **subnational** TL2/TL3 measures only: live births (counts) and "Fertility rate – live births per woman" (a *general* fertility rate, not the total fertility rate). At country (CTRY) level it carries **live-birth counts only — no TFR**. A filtered national TFR query was structurally impossible (403: wrong number of keys; no TFR measure exists in the flow).
3. Life expectancy: old flow `OECD.DEMO.DSD.LIFEEXP_DF/D.LIFEEXP...` → **HTTP 404**. The regional flow `OECD.CFE.EDS,DSD_REG_DEMO@DF_LIFE_EXP` (saved: `raw/oecd-lifeexp-attempt2.csv`, 2.2 MB, HTTP 200) **does** contain country-level life expectancy at birth (MEASURE=LFEXP, AGE=Y0) for 2022–2024, covering 11 of the 12 requested countries (**Singapore absent** — not an OECD member; Japan absent at `_T` level for 2022–2024 in this extract).

**Conclusion:** OECD national TFR = **NOT VERIFIED / NOT AVAILABLE** on the current OECD SDMX API (dataset restructure; the pre-2024 `OECD.DEMO.DSD.FERTILITY_DF` endpoint is gone). Supplementary file kept: `raw/oecd-lifeexp-ctry-2022.csv` (country-level life expectancy at birth, both sexes + M/F, from the regional demography flow; values as published, mixed precision e.g. AUS 2022 = 83, CAN 2022 = 81.34). World Bank used as the primary international source.

## Part 2: World Bank API — SUCCESS (primary international source)

- URLs fetched (saved verbatim):
  - `https://api.worldbank.org/v2/country/AUS;NZL;CAN;GBR;DEU;NLD;SWE;FRA;USA;JPN;KOR;SGP/indicator/SP.DYN.TFRT.IN?format=json&date=1990:2025&per_page=500` → `raw/wb-fertility.json` (HTTP 200)
  - `https://api.worldbank.org/v2/country/AUS;NZL;CAN;GBR;DEU;NLD;SWE;FRA;USA;JPN;KOR;SGP/indicator/SP.DYN.LE00.IN?format=json&date=1990:2025&per_page=500` → `raw/wb-lifeexpectancy.json` (HTTP 200)
- **API `lastupdated` field (from the JSON metadata): `2026-10-08`** for both indicators.
- 432 records each = 12 countries × 36 years (1990–2025). **2025 values are null for every country** in both indicators; 2024 is the latest year with values for all 12 countries.

### Outputs (series/)

- `wb-fertility-comparison.csv` — `country_name, country_code, latest_year_with_value, latest_value` — 12 countries, all 2024. Range: 0.748 (Korea, Rep.) … 1.61 (France).
- `wb-fertility-australia.csv` — `year, value` — Australia TFR 1990–2024 with values (2025 blank), 35 values + 1 blank.
- `wb-lifeexpectancy-comparison.csv` — same shape; 12 countries, all 2024. Range: 78.89 (USA) … 84.06 (Sweden).
- `wb-lifeexpectancy-australia.csv` — `year, value` — Australia life expectancy at birth (both sexes), 1990–2024 with values (2025 blank).

### Sanity checks

- TFR values all within 0.75–1.91 (1961-style peaks absent — window starts 1990) ✓ plausible.
- Life expectancy all within 78.9–84.1 ✓ plausible.
- WB Australia TFR 2024 = **1.481 — identical to the ABS published TFR for 2024** (see abs-births-extraction-notes.md) ✓.

## Comparability caveats (important)

1. **World Bank fertility and life-expectancy series are compiled from the UN World Population Prospects (WPP)** and are smoothed/interpolated; they **may differ slightly from ABS national series**. Observed example: WB Australia TFR 2019 = 1.657 vs ABS 1.666; WB 2020 = 1.581 vs ABS 1.593; 2023–2024 match exactly (1.499, 1.481); other recent years differ by ≤0.012. Life expectancy is also defined slightly differently across sources (period life expectancy at birth; WB/WPP vs ABS life tables).
2. **Identical consecutive values:** the WB life-expectancy series for Australia returns exactly 83.0512195121951 for **both 2023 and 2024** (verified in the raw JSON) — an artefact of the WPP-compiled series (carry-forward/interpolation), not a genuine estimate to more precision.
3. OECD country-level life expectancy (supplementary `raw/oecd-lifeexp-ctry-2022.csv`, AUS 2022 = 83) is broadly consistent with the WB value for 2022 (83.2) but is published with coarser rounding.
4. Singapore appears in the World Bank data but not in OECD data; Korea's TFR (0.748 in 2024) is the lowest in the comparison set.
