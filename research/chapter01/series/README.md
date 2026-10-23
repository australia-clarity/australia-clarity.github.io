# Chapter 01 — Population & Family: data series

All files in this directory were produced on **2026-10-22 (UTC)** by `scripts/extract_t1.py`, `scripts/extract_t2.py`, `scripts/extract_t3.py` from raw downloads in `../raw/`. Extraction details, source URLs, row ranges and caveats: `abs-nstp-extraction-notes.md`, `abs-births-extraction-notes.md`, `wb-oecd-extraction-notes.md`. Only data actually downloaded and observed is included; nothing is estimated or filled in.

## Australian Bureau of Statistics (ABS) series

| File | Columns | Coverage / rows | Source & units |
|---|---|---|---|
| `abs-erp-annual.csv` | `year`, `erp_thousands` | 1981–2025 (45 rows) | ABS 3101.0 *National, state and territory population, March 2026*, time-series workbook 310101.xlsx, series `Estimated Resident Population (ERP) ; Australia ;` (Series ID A2133251W, unit `'000` = thousands, STOCK_CLOSE). Annual value = the **June-quarter** observation of the quarterly stock series, i.e. **ERP at 30 June** (selection, not aggregation). Latest: 27,601.7 thousand at 30 June 2025. |
| `abs-erp-quarterly.csv` | `quarter`, `erp_thousands` | 1981-06 … 2026-03 (180 rows) | Same series as above. `quarter` uses the ABS label (first month of the quarter); the value is the ERP stock at the **end** of that quarter. Latest: 27,921.2 thousand at end of March 2026 quarter. |
| `abs-components-quarterly.csv` | `quarter`, `births`, `deaths`, `natural_increase`, `net_overseas_migration`, `erp_change_over_previous_year`, `growth_rate_pct` | 1981-06 … 2026-03 (180 rows) | ABS 310101.xlsx, series A2133244X (Births), A2133245A (Deaths), A2133252X (Natural Increase), A2133254C (Net Overseas Migration), A2133255F (ERP Change Over Previous Year) — all unit `'000` persons per quarter; `growth_rate_pct` = A2133256J (unit Percent, year-ended change). **No annual aggregation was performed** (the file has quarterly series only); `erp_change_over_previous_year`/`growth_rate_pct` start 1982-06. |
| `abs-states-latest.csv` | `state_territory`, `population`, `unit`, `reference_date` | 8 states/territories + Australia (9 rows) | ABS 310104.xlsx (Table 4 ERP, states/territories), "Persons" unit; latest quarter in file. Reference date **2026-03-31** (end of the ABS March-2026 quarter). Australia: 27,921,150 persons. |
| `abs-age-structure-latest.csv` | `age_group`, `males`, `females`, `persons` | 21 age groups (0-4 … 95-99, 100 and over) + `All ages` (22 rows) | ABS 31010do002_202603.xlsx Table 8 "Estimated resident population, by age and sex – at 30 June 2025", Australia column, PERSONS section (with MALES/FEMALES sections for the sex columns). Unit: persons. Total: 27,601,739 (13,701,729 M; 13,900,010 F). |
| `abs-tfr-annual.csv` | `year`, `tfr` | 1924–2024 (101 rows) | ABS 3301.0 *Births, Australia, 2024* (released 15/10/2025), official table "Total fertility rate, 1924 to 2024" from the release page. Unit: babies per woman. Latest: 1.481 (2024). |
| `abs-births-annual.csv` | `year`, `births_registered`, `males`, `females` | 1924–2024 (101 rows) | Same release, official table "Births registered, 1924 to 2024(a)" (year of registration; counts, "no."). Cross-checked against datacube 33010DC01.xlsx for 2011–2024 (exact match). `males`/`females` populated only for 2014, 2023, 2024 (the only years with a published sex split in this release); blank otherwise. |

## International comparison series

| File | Columns | Coverage / rows | Source & units |
|---|---|---|---|
| `wb-fertility-comparison.csv` | `country_name`, `country_code`, `latest_year_with_value`, `latest_value` | 12 countries (AUS, NZL, CAN, GBR, DEU, NLD, SWE, FRA, USA, JPN, KOR, SGP), latest year 2024 for all | World Bank API `SP.DYN.TFRT.IN` (total fertility rate, babies per woman), fetched 2026-10-22, API `lastupdated` 2026-10-08. Raw: `../raw/wb-fertility.json`. Range 0.748 (Kor.) – 1.61 (Fra.). |
| `wb-fertility-australia.csv` | `year`, `value` | 1990–2024 with values (2025 blank); 36 rows | Same source, Australia only. |
| `wb-lifeexpectancy-comparison.csv` | `country_name`, `country_code`, `latest_year_with_value`, `latest_value` | 12 countries, latest year 2024 for all | World Bank API `SP.DYN.LE00.IN` (life expectancy at birth, total, years). Raw: `../raw/wb-lifeexpectancy.json`. Range 78.89 (USA) – 84.06 (Swe.). |
| `wb-lifeexpectancy-australia.csv` | `year`, `value` | 1990–2024 with values (2025 blank); 36 rows | Same source, Australia only. Note: 2023 and 2024 are identical (83.0512…) in the source. |

**Comparability:** World Bank fertility/life-expectancy series are compiled from UN World Population Prospects and can differ slightly from ABS national series (e.g. WB AUS TFR 2019 = 1.657 vs ABS 1.666; 2023–2024 match exactly). The OECD SDMX API was attempted first — the old national fertility dataset (`OECD.DEMO.DSD.FERTILITY_DF`) no longer exists (HTTP 404); OECD TFR is therefore **NOT VERIFIED**. A supplementary OECD country-level life-expectancy extract for 2022–2024 (11 of 12 countries, no Singapore) is kept at `../raw/oecd-lifeexp-ctry-2022.csv`. See `wb-oecd-extraction-notes.md` for the full attempt log.

## Key caveats when using these files

1. ERP "annual" values are the 30-June observations of ABS's quarterly stock series (the workbook has no separate annual series).
2. Components of change (births/deaths/NI/NOM) are available here **quarterly only**; annual totals were **not** computed. The release's only year-ended figures (year ended 31 March 2026: births 292,493; deaths 191,902; NI 100,591; NOM 292,137) are single-period numbers recorded in the notes file.
3. ABS page note: "All data after 30 June 2021 are subject to revision" (2021 Census rebasing). The 12/16-month NOM rule is *not* footnoted in any downloaded file.
4. 2024 births/TFR are affected by state registry processing-time changes (NSW −3.4%, Vic +12.9% in 2024); ABS registration data are final and not revised.
5. The datacube 33010DC01's "Total fertility rate" column is a 5-year-group approximation (2024: 1.54) and does **not** equal the official TFR (1.481); the official series is used here.
