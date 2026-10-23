#!/usr/bin/env python3
"""T2: Births, Australia 2024 -> TFR + births registered annual series.
Sources (all actually downloaded):
  raw/births-page.html          - Births, Australia 2024 release page HTML (contains official
                                   tables 'Births registered, 1924 to 2024(a)' and
                                   'Total fertility rate, 1924 to 2024', plus Summary statistics)
  raw/abs-births-33010DC01.xlsx  - datacube Table 1 (SA4 summary), used to cross-check births
                                   counts 2011-2024 and to document the group-based TFR column.
Outputs: series/abs-tfr-annual.csv, series/abs-births-annual.csv
"""
import csv, html, os, re
import openpyxl

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW, SER = os.path.join(BASE, 'raw'), os.path.join(BASE, 'series')
src = open(os.path.join(RAW, 'births-page.html'), encoding='utf-8', errors='replace').read()

def parse_table(caption):
    m = re.search(r'<table[^>]*>\s*<caption>' + re.escape(caption) + r'</caption>(.*?)</table>', src, re.S)
    rows = []
    for tr in re.findall(r'<tr[^>]*>(.*?)</tr>', m.group(1), re.S):
        cells = re.findall(r'<t[hd][^>]*>(.*?)</t[hd]>', tr, re.S)
        rows.append([html.unescape(re.sub(r'<[^>]+>', '', c)).strip() for c in cells])
    return rows

births_tbl = parse_table('Births registered, 1924 to 2024(a)')
tfr_tbl = parse_table('Total fertility rate, 1924 to 2024')
assert births_tbl[0] == ['Year', 'Births registered'], births_tbl[0]
assert tfr_tbl[0] == ['Year', 'Total fertility rate'], tfr_tbl[0]
births = {r[0]: int(r[1].replace(',', '')) for r in births_tbl[1:]}
tfr = {r[0]: float(r[1]) for r in tfr_tbl[1:]}
print('births series:', min(births), '-', max(births), 'n =', len(births))
print('tfr series   :', min(tfr), '-', max(tfr), 'n =', len(tfr))

# National 'Summary statistics' block (uncaptioned table near top of page; the captioned
# 'Summary statistics' table belongs to the Aboriginal and Torres Strait Islander section).
i = src.find('153,592')                     # Male births 2014 value, unique to national table
t0 = src.rfind('<table', 0, i); t1 = src.find('</table>', i)
summ = []
for tr in re.findall(r'<tr[^>]*>(.*?)</tr>', src[t0:t1+8], re.S):
    cells = re.findall(r'<t[hd][^>]*>(.*?)</t[hd]>', tr, re.S)
    summ.append([html.unescape(re.sub(r'<[^>]+>', '', c)).strip() for c in cells])
hdr = summ[0]                      # ['Statistics', '2014', '2023', '2024']
years_sex = hdr[1:]
males = females = None
for r in summ[1:]:
    if r[0].startswith('Male births'):
        males = dict(zip(years_sex, r[1:]))
    if r[0].startswith('Female births'):
        females = dict(zip(years_sex, r[1:]))
print('sex split years:', years_sex)
print('males  :', males)
print('females:', females)

# --- cross-check births against DC01 datacube (2011-2024) ---
wb = openpyxl.load_workbook(os.path.join(RAW, 'abs-births-33010DC01.xlsx'), read_only=True, data_only=True)
ws = wb['Table 1']
rows = list(ws.iter_rows(values_only=True))
wb.close()
aus_row = rows[126]                                  # 'Australia' aggregate row (verified)
assert str(aus_row[1]).strip() == 'Australia'
year_cols = {int(str(v)): i for i, v in enumerate(rows[5]) if v is not None and str(v).isdigit()}
mismatch = []
for y, i in sorted(year_cols.items()):
    if births.get(str(y)) != int(aus_row[i + 1]):
        mismatch.append((y, births.get(str(y)), aus_row[i + 1]))
print('DC01 vs page births cross-check mismatches:', mismatch if mismatch else 'NONE (all 14 years match)')

# --- write CSVs ---
with open(os.path.join(SER, 'abs-tfr-annual.csv'), 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['year', 'tfr'])
    for y in sorted(tfr):
        w.writerow([y, f"{tfr[y]:.3f}"])
with open(os.path.join(SER, 'abs-births-annual.csv'), 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['year', 'births_registered', 'males', 'females'])
    for y in sorted(births):
        m = males.get(y, '').replace(',', '') if males else ''
        fe = females.get(y, '').replace(',', '') if females else ''
        w.writerow([y, births[y], m, fe])
print('wrote abs-tfr-annual.csv and abs-births-annual.csv')

# sanity
recent = [births[str(y)] for y in range(2014, 2025)]
print('sanity: births 2014-2024 range', min(recent), '-', max(recent))
print('sanity: TFR range', min(tfr.values()), '-', max(tfr.values()))
