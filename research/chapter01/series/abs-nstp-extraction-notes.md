# ABS National, state and territory population — extraction notes

- **Access date (UTC):** 2026-10-22
- **Release page:** https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/latest-release
- **Release title on page:** "National, state and territory population, March 2026"
- **Reference period shown on page:** March 2026 (quarterly release)
- **Released:** 17/09/2026 11:30am AEST (per page); the 31010do001/002 workbooks state "Released at 11:30 am (Canberra time) Thu 17 Sep 2026"
- **Key statistics quoted on page:** "Australia's population was 27,921,150 people at 31 March 2026. The quarterly growth was 130,887 people (0.5%). The annual growth was 392,700 people (1.4%). Annual natural increase was 100,600 and net overseas migration was 292,100."

## Source files downloaded (raw/)

| Local file | Source URL | What it is |
|---|---|---|
| `raw/nstp-page.html` | latest-release page URL above | HTML used to locate downloads and capture release text |
| `raw/abs-nstp-310101.xlsx` | https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/mar-2026/310101.xlsx | "Population and components of change – national" — Time Series Workbook, TABLE 1. Population Change, Summary - Australia ('000) |
| `raw/abs-nstp-310104.xlsx` | https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/mar-2026/310104.xlsx | "Population – states and territories" — TABLE 4. Estimated Resident Population, States and Territories (Persons) |
| `raw/abs-nstp-31010do001.xlsx` | https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/mar-2026/31010do001_202603.xlsx | "National, state and territory population tables" (summary tables incl. Table 1 components of change, Table 3 ERP comparison years) |
| `raw/abs-nstp-agesex.xlsx` | https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/mar-2026/31010do002_202603.xlsx | "Population by age and sex – national" (Tables 1–8; Table 8 = ERP by age and sex at 30 June 2025) |

Other .xlsx downloads listed on the page (NOT downloaded; noted for completeness):
310102.xlsx (components of change – states), 3101016A/B.xlsx (interstate migration arrivals/departures),
3101051–3101059.xlsx (population by state detail workbooks), 31010DO003_200106.xlsx (standard population),
"Regional internal migration estimates, provisional.xlsx".

## Sheet layouts

### abs-nstp-310101.xlsx — sheet `Data1`
- Rows 1–10: metadata. Row 1 = series descriptions; row 2 = **Unit**; row 3 = Series Type (all "Original"); row 4 = Data Type; row 5 = Frequency (Quarter); row 6 = Collection Month (3); rows 7–9 = Series Start / End / No. Obs; row 10 = Series ID.
- Data: rows 11–190 (180 quarterly observations), date in column A (quarter labelled by its first month, e.g. `1981-06-01` = June quarter 1981), series in columns B–N.
- Exact series descriptions / units / IDs (as printed in the workbook):

| Series (row 1 text) | Unit (row 2) | Data Type | Series ID | Range |
|---|---|---|---|---|
| `Births ;  Australia ;` | `000` | FLOW | A2133244X | 1981-Q3(Jun qtr)–2026 Q1(Mar qtr) |
| `Deaths ;  Australia ;` | `000` | FLOW | A2133245A | 1981 Jun–2026 Mar |
| `Natural Increase ;  Australia ;` | `000` | FLOW | A2133252X | 1981 Jun–2026 Mar |
| `Net Overseas Migration ;  Australia ;` | `000` | FLOW | A2133254C | 1981 Jun–2026 Mar |
| `Estimated Resident Population (ERP) ;  Australia ;` | `000` | STOCK_CLOSE | A2133251W | 1981 Jun–2026 Mar |
| `ERP Change Over Previous Year ;  Australia ;` | `000` | FLOW | A2133255F | (first value 1982 Jun) |
| `Percentage ERP Change Over Previous Year ;  Australia ;` | `Percent` | PERCENT | A2133256J | (first value 1982 Jun) |

(Also present but not exported: Interstate Arrivals/Departures, Overseas Arrivals/Departures, Net Permanent and Long Term Movement, Migration Adjustment — all `'000`, quarterly.)

- **Unit string "000" = thousands** (the Index sheet title reads "TABLE 1. Population Change, Summary - Australia ('000)"). ERP is a **stock at end of quarter**; flows are per quarter.

### abs-nstp-310104.xlsx — sheet `Data1`
- Same layout (rows 1–10 metadata, rows 11–190 data). 27 series = ERP × {Male, Female, Persons} × {NSW, Vic., Qld, SA, WA, Tas., NT, ACT, Australia}.
- **Unit = `Persons`** (whole numbers, not thousands). Data Type STOCK_CLOSE, Frequency Quarter.
- Persons Series IDs: NSW A2060843J, Vic A2060844K, Qld A2060845L, SA A2060846R, WA A2060847T, Tas A2060848V, NT A2060849W, ACT A2060850F, Australia A2060842F.

### abs-nstp-agesex.xlsx (31010do002_202603) — sheet `Table_8`
- "Table 8 Estimated resident population, by age and sex–at 30 June 2025". Rows: 1–4 titles; row 5 headers (Age (years) + NSW…ACT, Australia in column J); section markers `MALES` (r6), `FEMALES` (r114), `PERSONS` (r222). Single year of age rows with 5-year group subtotal rows (e.g. `0-4` at r228, `5-9` at r234 … `100 and over` r328, `All ages` r329). Units: persons.

## Outputs produced (series/)

1. **abs-erp-annual.csv** — `year, erp_thousands` (1981–2025, 45 rows).
   Derived by **selecting the June-quarter values** of the quarterly ERP stock series A2133251W (i.e. ERP at 30 June — a selection of observed stock values, *not* an aggregation). The workbook contains **no separate annual series**; June-quarter stock = "at 30 June" figure. Latest June value: 2025 (27,601.7 thousand).
2. **abs-erp-quarterly.csv** — `quarter, erp_thousands` (1981-06 … 2026-03, 180 rows). `quarter` uses the ABS label (first month of quarter); value is the stock at end of that quarter. Latest: 27,921.2 thousand at Mar-2026 quarter (page: 27,921,150 people at 31 March 2026 — consistent).
3. **abs-components-quarterly.csv** — `quarter, births, deaths, natural_increase, net_overseas_migration, erp_change_over_previous_year` ('000 persons per quarter) and `growth_rate_pct` (Percent). 180 rows, 1981-06…2026-03.
   **Annual aggregation was NOT done** — the file contains quarterly series only (no annual series). The only annual (year-ended) figures in this release are for the single latest period, in 31010do001 Table 1 "YEAR ENDED MARCH 2026" (Australia: births 292,493; deaths 191,902; natural increase 100,591; net overseas migration 292,137; ERP 27,921,150) — recorded here for reference, not exported as a series.
4. **abs-states-latest.csv** — `state_territory, population, unit, reference_date` (9 rows incl. Australia; unit "Persons"; reference date 2026-03-31 = end of the ABS "March 2026" quarter).
5. **abs-age-structure-latest.csv** — `age_group, males, females, persons` for Australia at **30 June 2025** (22 rows = 21 age groups + All ages; 5-year groups 0-4 … 95-99, 100 and over). Sums: 13,701,729 M + 13,900,010 F = 27,601,739 persons — matches the "All ages" row exactly and matches ERP at 30 June 2025 (27,601.7 thousand) in the same release.

## Anomalies, breaks and footnotes observed

- **Revisions:** the release page states (under the annual growth chart): "All data after 30 June 2021 are subject to revision." The page also links "Rebasing of Australia's population estimates using the 2021 Census" and "Methodology used in final rebased population estimates, June 2021" — i.e. the ERP series was rebased to the 2021 Census; pre-rebase and post-rebase components are on consistent published series in this workbook but historical revisions are routine.
- **12/16-month rule:** NOT mentioned on the release page nor inside any of the four workbooks downloaded. No footnote about the 12/16-month rule for net overseas migration was found in these files (it exists only in ABS methodology pages, which were not downloaded). Recorded as absent, per instruction not to use memory as a source.
- **Provisional data:** the page notes datacube 4 (regional internal migration) contains provisional estimates; not used here.
- The NSTP quarterly ERP for Mar-2026 (27,921.2 thousand, rounded to 0.1) vs the page's exact count (27,921,150) is consistent.
- 31010do001 Table 3 is a snapshot comparison (2006, 2016, 2025, 2026 at 31 March) — not a time series; not used for series output.
- The age/sex workbook's latest age data are at **30 June 2025** (Tables 7 = 2024, 8 = 2025; Table 6 "Age distribution, by sex, preliminary–30 June 2025") even though the release reference period is March 2026 — age detail lags the headline ERP by three quarters.
- No footnotes are embedded below the data in Data1 sheets (data ends at row 190; workbook © Commonwealth of Australia 2026; Enquiries sheet contains only contact info).
