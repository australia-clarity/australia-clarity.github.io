#!/usr/bin/env python3
"""T1: Extract National, state and territory population (NSTP) time series.
Sources: raw/abs-nstp-310101.xlsx (Table 1, quarterly, '000),
         raw/abs-nstp-310104.xlsx (Table 4, quarterly, Persons),
         raw/abs-nstp-agesex.xlsx (31010do002, Table 8, age x sex at 30 June 2025).
Outputs into series/.
"""
import csv, datetime, os, re
import openpyxl

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW, SER = os.path.join(BASE, 'raw'), os.path.join(BASE, 'series')

def load_data_sheet(path):
    """Return (header_rows, data_rows) for an ABS time-series Data1 sheet.
    header_rows: list of rows 1..10 (metadata). data_rows: list of (date, [values...])."""
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    ws = wb['Data1']
    rows = list(ws.iter_rows(values_only=True))
    wb.close()
    hdr = rows[:10]                      # rows 1-10 are metadata
    data = []
    for r in rows[10:]:
        if r[0] is None:
            continue
        d = r[0]
        if isinstance(d, str):
            d = datetime.datetime.strptime(d[:10], '%Y-%m-%d')
        data.append((d, r[1:]))
    return hdr, data

def clean(v):
    if v is None or v == '':
        return ''
    if isinstance(v, float) and v == int(v):
        return str(int(v))
    return str(v)

# ---------------- 310101: national components (quarterly, '000) ----------------
hdr, data = load_data_sheet(os.path.join(RAW, 'abs-nstp-310101.xlsx'))
labels = [str(c) for c in hdr[0] if c is not None]        # row 1: series descriptions
units  = [str(c) for c in hdr[1] if c is not None]        # row 2: units
print('310101 series labels:', labels)
print('310101 units        :', units)

def col(sub):
    for i, lab in enumerate(labels):
        if sub in lab:
            return i
    raise KeyError(sub)

i_b, i_d, i_ni, i_nom = col('Births'), col('Deaths'), col('Natural Increase'), col('Net Overseas Migration')
i_erp, i_chg, i_pct = col('Estimated Resident Population (ERP)'), col('ERP Change Over Previous Year'), col('Percentage ERP Change')

# --- abs-erp-quarterly.csv ---
with open(os.path.join(SER, 'abs-erp-quarterly.csv'), 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['quarter', 'erp_thousands'])
    n = 0
    for d, vals in data:
        w.writerow([d.strftime('%Y-%m'), clean(vals[i_erp])]); n += 1
    print(f'abs-erp-quarterly.csv rows={n}')

# --- abs-erp-annual.csv : ERP stock at 30 June = June-quarter values (selection, NOT aggregation) ---
with open(os.path.join(SER, 'abs-erp-annual.csv'), 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['year', 'erp_thousands'])
    n = 0
    for d, vals in data:
        if d.month == 6:
            w.writerow([d.year, clean(vals[i_erp])]); n += 1
    print(f'abs-erp-annual.csv rows={n} (June-quarter values of quarterly ERP stock = ERP at 30 June)')

# --- abs-components-quarterly.csv (NO annual aggregation done; file has only quarterly series) ---
with open(os.path.join(SER, 'abs-components-quarterly.csv'), 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['quarter', 'births', 'deaths', 'natural_increase', 'net_overseas_migration',
                'erp_change_over_previous_year', 'growth_rate_pct'])
    n = 0
    for d, vals in data:
        w.writerow([d.strftime('%Y-%m'), clean(vals[i_b]), clean(vals[i_d]), clean(vals[i_ni]),
                    clean(vals[i_nom]), clean(vals[i_chg]), clean(vals[i_pct])]); n += 1
    print(f'abs-components-quarterly.csv rows={n}')

# ---------------- 310104: ERP by state/territory (quarterly, Persons) ----------------
hdr4, data4 = load_data_sheet(os.path.join(RAW, 'abs-nstp-310104.xlsx'))
labels4 = [str(c) for c in hdr4[0] if c is not None]
pcols = []
for i, lab in enumerate(labels4):
    m = re.match(r'Estimated Resident Population ;  Persons ;  (.*?) ;', lab)
    if m:
        pcols.append((m.group(1).strip(), i))
last_date, last_vals = data4[-1][0], data4[-1][1]
# ABS labels a quarter by its first month; the ERP stock is at end of that quarter:
qend = (last_date.replace(day=28) + datetime.timedelta(days=4)).replace(day=1) - datetime.timedelta(days=1)
print('310104 latest quarter:', last_date.strftime('%Y-%m'), ' n persons series:', len(pcols))
with open(os.path.join(SER, 'abs-states-latest.csv'), 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['state_territory', 'population', 'unit', 'reference_date'])
    for name, i in pcols:
        w.writerow([name, clean(last_vals[i]), 'Persons', qend.strftime('%Y-%m-%d')])
    print(f'abs-states-latest.csv rows={len(pcols)} at {qend.date()} (end of ABS quarter labelled {last_date.date()})')

# ---------------- 31010do002 Table 8: age x sex at 30 June 2025 (Persons) ----------------
wb = openpyxl.load_workbook(os.path.join(RAW, 'abs-nstp-agesex.xlsx'), read_only=True, data_only=True)
ws = wb['Table_8']
rows8 = list(ws.iter_rows(values_only=True))
wb.close()
sections = {}
cur = None
for r in rows8:
    a = str(r[0]).strip() if r[0] is not None else ''
    if a in ('MALES', 'FEMALES', 'PERSONS'):
        cur = a; sections[cur] = {}
    elif cur and (re.fullmatch(r'\d+-\d+', a) or a in ('100 and over', 'All ages')):
        sections[cur][a] = r[9]  # col 10 (index 9) = Australia
aus_hdr = [str(r[5]) if r[5] is not None else '' for r in rows8[4:5]]
print('Table_8 Australia column check -> header col10:', aus_hdr)
with open(os.path.join(SER, 'abs-age-structure-latest.csv'), 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['age_group', 'males', 'females', 'persons'])
    groups = list(sections['PERSONS'].keys())
    for g in groups:
        w.writerow([g, clean(sections['MALES'].get(g)), clean(sections['FEMALES'].get(g)),
                    clean(sections['PERSONS'].get(g))])
    print(f'abs-age-structure-latest.csv rows={len(groups)}')
    tot = sections['PERSONS'].get('All ages')
    print('All-ages total (persons, Australia, 30 Jun 2025):', tot)
