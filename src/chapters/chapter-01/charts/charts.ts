import type { ChartDefinition } from "@/lib/research/types";
import {
  erpAnnual,
  birthsQuarterly,
  deathsQuarterly,
  naturalIncreaseQuarterly,
  netOverseasMigrationQuarterly,
  statesLatest,
  ageStructureMales,
  ageStructureFemales,
  tfrAnnual,
  fertilityComparison2024,
} from "@/chapters/chapter-01/data/generated";

/**
 * Chapter 01 chart definitions.
 *
 * Every chart uses only data extracted from the cited source (see the
 * chapter's provenance records). No demonstration or estimated values appear
 * in these published charts.
 */
export const chapter01Charts: ChartDefinition[] = [
  {
    id: "population-growth",
    title: "Estimated Resident Population, 1981 to 2025",
    question: "How many people live in Australia, and how has that changed?",
    kind: "line",
    measurement: "Estimated Resident Population (ERP) of Australia at 30 June each year",
    unit: "thousands of people",
    referencePeriod: "30 June 1981 to 30 June 2025 (annual)",
    sourceId: "abs-nstp-2026-03",
    sourceLabel: "Australian Bureau of Statistics, National, state and territory population",
    sourceUrl: "https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/latest-release",
    accessibleDescription:
      "Line chart of Australia's Estimated Resident Population at 30 June each year from 1981 to 2025, in thousands of people. The population rose from about 14,923 thousand (14.9 million) in 1981 to about 27,602 thousand (27.6 million) in 2025, with growth continuing throughout the period.",
    interpretation:
      "ERP is the ABS's official population measure — it counts all residents, is adjusted for Census undercount and residents temporarily overseas, and is updated quarterly. This annual series ends at 30 June 2025; the headline estimate published a quarter later stands at 27.9 million at 31 March 2026. The ABS notes all data after 30 June 2021 remain subject to revision.",
    xLabel: "Year (at 30 June)",
    yLabel: "People ('000)",
    csvFilename: "australia-clarity-ch01-population-annual.csv",
    series: [
      {
        id: "erp",
        name: "Estimated Resident Population",
        data: erpAnnual,
      },
    ],
  },
  {
    id: "components-of-change",
    title: "Births, deaths and migration, quarterly",
    question: "Where does population change come from?",
    kind: "line",
    measurement:
      "Births registered, deaths registered, natural increase and net overseas migration, per quarter",
    unit: "thousands of people per quarter",
    referencePeriod: "June quarter 1981 to March quarter 2026 (quarterly)",
    sourceId: "abs-nstp-2026-03",
    sourceLabel: "Australian Bureau of Statistics, National, state and territory population",
    sourceUrl: "https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/latest-release",
    accessibleDescription:
      "Line chart with four quarterly series from June 1981 to March 2026: births, deaths, natural increase (births minus deaths) and net overseas migration, in thousands per quarter. Births fluctuate around 55 to 75 thousand per quarter; deaths rise gradually from about 27 to about 45-47 thousand; natural increase stays positive; net overseas migration is volatile — near zero or negative in some quarters around 2020-21 and reaching unusually high values in subsequent quarters, ending at 101 thousand in the March quarter of 2026.",
    interpretation:
      "Growth has two engines: natural increase (births minus deaths) and net overseas migration (NOM). Natural increase has eased as deaths rise with an ageing population. NOM is far more volatile — the series shows very low quarters around 2020-21 followed by unusually high levels, reflecting the re-opening of international movement and its flow-on. Use the legend to focus on one series at a time; hover or touch any point for its value. NOM here measures duration of stay under the 12/16-month rule, not visa categories.",
    xLabel: "Quarter",
    yLabel: "People ('000)",
    csvFilename: "australia-clarity-ch01-components-quarterly.csv",
    series: [
      { id: "births", name: "Births", data: birthsQuarterly },
      { id: "deaths", name: "Deaths", data: deathsQuarterly },
      { id: "natural-increase", name: "Natural increase", data: naturalIncreaseQuarterly },
      { id: "nom", name: "Net overseas migration", data: netOverseasMigrationQuarterly },
    ],
  },
  {
    id: "age-structure-pyramid",
    title: "Population by age and sex",
    question: "How is Australia's population structured by age?",
    kind: "pyramid",
    measurement: "Resident population by five-year age group and sex",
    unit: "people",
    referencePeriod: "30 June 2025",
    sourceId: "abs-nstp-2026-03",
    sourceLabel: "Australian Bureau of Statistics, National, state and territory population (age and sex data)",
    sourceUrl: "https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/latest-release",
    accessibleDescription:
      "Population pyramid of Australia at 30 June 2025 by five-year age group. Males are shown to the left and females to the right, in numbers of people. The largest groups are the 30-34, 35-39 and 25-29 brackets; the profile narrows progressively above 60-64. The 0-4 group (about 1.5 million) is smaller than the 30-34 group.",
    interpretation:
      "The pyramid's centre of mass sits in the working ages, but the upper bars lengthen as the population ages: 17% of Australians were aged 65 or over in 2022, and ABS projections place that share at 25% to 27% by 2071. Age and sex detail lags the headline population by three quarters — this view is at 30 June 2025 while the headline estimate is at 31 March 2026.",
    xLabel: "Age group",
    yLabel: "People",
    csvFilename: "australia-clarity-ch01-age-structure.csv",
    height: "lg",
    series: [
      { id: "males", name: "Males", data: ageStructureMales },
      { id: "females", name: "Females", data: ageStructureFemales },
    ],
  },
  {
    id: "fertility-trend",
    title: "Total fertility rate, 1924 to 2024",
    question: "How has fertility changed over the long run?",
    kind: "line",
    measurement: "Total fertility rate — babies per woman, based on births registered each calendar year",
    unit: "babies per woman",
    referencePeriod: "Calendar years 1924 to 2024",
    sourceId: "abs-births-2024",
    sourceLabel: "Australian Bureau of Statistics, Births, Australia",
    sourceUrl: "https://www.abs.gov.au/statistics/people/population/births-australia/latest-release",
    accessibleDescription:
      "Line chart of Australia's total fertility rate from 1924 to 2024. The rate begins near 2.97 in 1924, falls during the 1930s, peaks above 3 in the late 1940s to early 1960s baby boom, declines steeply through the 1960s and 1970s, and settles below replacement from the mid-1970s onward, ending at 1.481 babies per woman in 2024. A dashed reference line marks the approximate replacement level of 2.1.",
    interpretation:
      "Australia's fertility rate has been below the replacement level of about 2.1 babies per woman every year since 1976. The 2024 rate of 1.481 is slightly below 2023 (1.499) and well below the 1.795 of 2014. The median age of parents has risen — 32.1 years for mothers and 33.9 for fathers in 2024. The ABS notes 2024 movements partly reflect registry processing changes across states.",
    markLine: { value: 2.1, label: "Replacement (~2.1)" },
    xLabel: "Year",
    yLabel: "Babies per woman",
    csvFilename: "australia-clarity-ch01-fertility-annual.csv",
    series: [
      {
        id: "tfr",
        name: "Total fertility rate",
        data: tfrAnnual,
      },
    ],
  },
  {
    id: "fertility-comparison",
    title: "Fertility in international context, 2024",
    question: "How does Australia's fertility rate compare with similar countries?",
    kind: "comparison-bar",
    measurement: "Total fertility rate, babies per woman, latest available year (2024) for a fixed comparator set",
    unit: "babies per woman",
    referencePeriod: "2024",
    sourceId: "wb-fertility-2024",
    sourceLabel: "World Bank / UN World Population Prospects, indicator SP.DYN.TFRT.IN",
    sourceUrl: "https://data.worldbank.org/indicator/SP.DYN.TFRT.IN",
    accessibleDescription:
      "Bar chart comparing the total fertility rate in 2024 across twelve countries: Australia, Canada, France, Germany, Japan, South Korea, Netherlands, New Zealand, Singapore, Sweden, the United Kingdom and the United States. The United States is highest at about 1.63 and South Korea lowest at about 0.75. Australia, highlighted, is mid-range at 1.481.",
    interpretation:
      "Australia sits in the middle of this comparator set — below France, the United States, New Zealand and the United Kingdom, but well above South Korea, Singapore and Japan. All twelve countries are below the replacement level of about 2.1. Comparator countries are selected for this chapter's question (similar high-income economies across regions); this is not a league table of countries overall, and small differences of one or two hundredths should not be over-interpreted.",
    highlight: "Australia",
    xLabel: "Country",
    yLabel: "Babies per woman",
    csvFilename: "australia-clarity-ch01-fertility-comparison-2024.csv",
    series: [
      {
        id: "tfr-comparison",
        name: "Total fertility rate (2024)",
        data: fertilityComparison2024,
      },
    ],
  },
  {
    id: "states-population",
    title: "Population by state and territory",
    question: "Where do Australians live?",
    kind: "bar",
    measurement: "Estimated Resident Population of each state and territory",
    unit: "people",
    referencePeriod: "31 March 2026",
    sourceId: "abs-nstp-2026-03",
    sourceLabel: "Australian Bureau of Statistics, National, state and territory population",
    sourceUrl: "https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/latest-release",
    accessibleDescription:
      "Bar chart of population by state and territory at 31 March 2026, in people. New South Wales is largest at about 8.67 million, followed by Victoria at about 7.15 million and Queensland at about 5.74 million; Western Australia is about 3.10 million, South Australia about 1.92 million, Tasmania about 581 thousand, the Australian Capital Territory about 490 thousand and the Northern Territory about 269 thousand.",
    interpretation:
      "Australia's population is heavily concentrated in the eastern mainland states. All states and territories grew over the year to March 2026; Western Australia grew fastest (2.1%) and Tasmania slowest (0.6%). These are point-in-time counts — for service planning, age structure and regional detail matter as much as totals.",
    xLabel: "State or territory",
    yLabel: "People",
    csvFilename: "australia-clarity-ch01-states-2026-03.csv",
    series: [
      {
        id: "states",
        name: "Population",
        data: statesLatest,
      },
    ],
  },
];
