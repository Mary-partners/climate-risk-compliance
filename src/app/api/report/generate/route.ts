import { NextRequest, NextResponse } from "next/server";
import * as ExcelJS from "exceljs";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COUNTIES = [
  "Baringo",
  "Bomet",
  "Bungoma",
  "Busia",
  "Elgeyo-Marakwet",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kajiado",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kilifi",
  "Kirinyaga",
  "Kisii",
  "Kisumu",
  "Kitui",
  "Kwale",
  "Laikipia",
  "Lamu",
  "Machakos",
  "Makueni",
  "Mandera",
  "Marsabit",
  "Meru",
  "Migori",
  "Mombasa",
  "Murang'a",
  "Nairobi",
  "Nakuru",
  "Nandi",
  "Narok",
  "Nyamira",
  "Nyandarua",
  "Nyeri",
  "Samburu",
  "Siaya",
  "Taita-Taveta",
  "Tana River",
  "Tharaka-Nithi",
  "Trans-Nzoia",
  "Turkana",
  "Uasin Gishu",
  "Vihiga",
  "Wajir",
  "West Pokot",
];

const KESIC_SECTORS: Record<string, string> = {
  A: "Agriculture, Forestry and Fishing",
  B: "Mining and Quarrying",
  C: "Manufacturing",
  D: "Electricity, Gas, Steam and Air Conditioning Supply",
  E: "Water Supply; Sewerage, Waste Management and Remediation Activities",
  F: "Construction",
  G: "Wholesale and Retail Trade; Repair of Motor Vehicles and Motorcycles",
  H: "Transportation and Storage",
  I: "Accommodation and Food Service Activities",
  J: "Information and Communication",
  K: "Financial and Insurance Activities",
  L: "Real Estate Activities",
  M: "Professional, Scientific and Technical Activities",
  N: "Administrative and Support Service Activities",
  O: "Public Administration and Defence; Compulsory Social Security",
  P: "Education",
  Q: "Human Health and Social Work Activities",
  R: "Arts, Entertainment and Recreation",
  S: "Other Service Activities",
  T: "Activities of Households as Employers; Undifferentiated Goods- and Services-Producing Activities of Households for Own Use",
  U: "Activities of Extraterritorial Organizations and Bodies",
};

const SECTOR_KEYS = Object.keys(KESIC_SECTORS);

// ---------------------------------------------------------------------------
// Style helpers
// ---------------------------------------------------------------------------

const DARK_GREEN: Partial<ExcelJS.Fill> = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FF166534" },
};

const LIGHT_GREEN: Partial<ExcelJS.Fill> = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FFDCFCE7" },
};

const WHITE_FONT: Partial<ExcelJS.Font> = {
  name: "Arial",
  size: 10,
  bold: true,
  color: { argb: "FFFFFFFF" },
};

const BOLD_FONT: Partial<ExcelJS.Font> = {
  name: "Arial",
  size: 10,
  bold: true,
};

const NORMAL_FONT: Partial<ExcelJS.Font> = {
  name: "Arial",
  size: 10,
};

const TITLE_FONT: Partial<ExcelJS.Font> = {
  name: "Arial",
  size: 14,
  bold: true,
  color: { argb: "FF166534" },
};

const THIN_BORDER: Partial<ExcelJS.Borders> = {
  top: { style: "thin" },
  left: { style: "thin" },
  bottom: { style: "thin" },
  right: { style: "thin" },
};

const KSH_FORMAT = "#,##0";
const PCT_FORMAT = "0.0%";

function applyHeaderStyle(row: ExcelJS.Row, colCount: number) {
  row.font = WHITE_FONT;
  row.fill = DARK_GREEN as ExcelJS.Fill;
  row.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  for (let c = 1; c <= colCount; c++) {
    row.getCell(c).border = THIN_BORDER;
  }
}

function applySubHeaderStyle(row: ExcelJS.Row, colCount: number) {
  row.font = BOLD_FONT;
  row.fill = LIGHT_GREEN as ExcelJS.Fill;
  row.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  for (let c = 1; c <= colCount; c++) {
    row.getCell(c).border = THIN_BORDER;
  }
}

function applyDataRow(row: ExcelJS.Row, colCount: number) {
  row.font = NORMAL_FONT;
  for (let c = 1; c <= colCount; c++) {
    const cell = row.getCell(c);
    cell.border = THIN_BORDER;
    if (typeof cell.value === "number") {
      cell.alignment = { horizontal: "right" };
    }
  }
}

function autoFitColumns(sheet: ExcelJS.Worksheet, minWidth = 12, maxWidth = 40) {
  sheet.columns.forEach((col) => {
    let longest = minWidth;
    if (col.eachCell) {
      col.eachCell({ includeEmpty: false }, (cell) => {
        const len = cell.value ? String(cell.value).length + 2 : 0;
        if (len > longest) longest = len;
      });
    }
    col.width = Math.min(longest, maxWidth);
  });
}

// ---------------------------------------------------------------------------
// Sheet builders
// ---------------------------------------------------------------------------

function buildPhysicalRiskSheet(wb: ExcelJS.Workbook, data: ReportData) {
  const ws = wb.addWorksheet("Physical Risk Exposures");

  // Title
  const titleRow = ws.addRow(["Climate physical risk: Exposures subject to physical risk"]);
  titleRow.font = TITLE_FONT;
  ws.mergeCells("A1:F1");

  ws.addRow([]); // row 2 spacer

  // Instructions
  const instrRow = ws.addRow([
    "Report all gross carrying amounts of loans & advances (KSH millions) exposed to physical climate risk, broken down by county of collateral / borrower location.",
  ]);
  instrRow.font = NORMAL_FONT;
  ws.mergeCells("A3:F3");

  const instrRow2 = ws.addRow([
    "Part A shows geographic distribution. Part B shows asset quality breakdown by hazard type.",
  ]);
  instrRow2.font = NORMAL_FONT;
  ws.mergeCells("A4:F4");

  ws.addRow([]); // row 5 spacer

  // --- Sub-header row (row 6) ---
  const partALabel = ["", "PART A: Geographic Distribution of Physical Risk Exposures (KSH millions)"];
  // pad to fill county columns
  const partBStartCol = 2 + COUNTIES.length; // 49
  for (let i = partALabel.length; i < partBStartCol - 1; i++) partALabel.push("");
  partALabel.push("PART B: Asset Quality by Hazard Type (KSH millions)");
  const subHeaderRow = ws.addRow(partALabel);
  subHeaderRow.font = BOLD_FONT;
  subHeaderRow.fill = LIGHT_GREEN as ExcelJS.Fill;
  ws.mergeCells(6, 2, 6, 1 + COUNTIES.length);
  ws.mergeCells(6, partBStartCol, 6, partBStartCol + 4);

  // --- Header row (row 7) ---
  const headers: string[] = ["SECTOR (KeSIC)"];
  COUNTIES.forEach((c) => headers.push(c));
  headers.push("Total");
  // Part B columns
  headers.push("Acute", "Chronic", "Both Acute & Chronic", "Stage 2", "NPL");

  const headerRow = ws.addRow(headers);
  applyHeaderStyle(headerRow, headers.length);
  headerRow.height = 30;

  // --- Data rows (rows 8+) ---
  const physA = data.physicalRisk?.partA ?? {};
  const physB = data.physicalRisk?.partB ?? {};

  for (const key of SECTOR_KEYS) {
    const label = `${key} - ${KESIC_SECTORS[key]}`;
    const sectorA = physA[key] ?? { total: 0, counties: {} };
    const sectorB = physB[key] ?? { acute: 0, chronic: 0, both: 0, stage2: 0, npl: 0 };

    const rowValues: (string | number)[] = [label];
    COUNTIES.forEach((county) => {
      rowValues.push(sectorA.counties?.[county] ?? 0);
    });
    rowValues.push(sectorA.total ?? 0);
    rowValues.push(sectorB.acute ?? 0);
    rowValues.push(sectorB.chronic ?? 0);
    rowValues.push(sectorB.both ?? 0);
    rowValues.push(sectorB.stage2 ?? 0);
    rowValues.push(sectorB.npl ?? 0);

    const dRow = ws.addRow(rowValues);
    applyDataRow(dRow, headers.length);

    // Number format for financial columns
    for (let c = 2; c <= headers.length; c++) {
      dRow.getCell(c).numFmt = KSH_FORMAT;
    }
  }

  // Totals row
  const lastDataRow = 7 + SECTOR_KEYS.length;
  const totals: (string | { formula: string })[] = ["TOTAL"];
  for (let c = 2; c <= headers.length; c++) {
    const colLetter = ws.getColumn(c).letter;
    totals.push({ formula: `SUM(${colLetter}8:${colLetter}${lastDataRow})` });
  }
  const totalRow = ws.addRow(totals);
  totalRow.font = BOLD_FONT;
  totalRow.fill = LIGHT_GREEN as ExcelJS.Fill;
  for (let c = 1; c <= headers.length; c++) {
    totalRow.getCell(c).border = THIN_BORDER;
    if (c >= 2) totalRow.getCell(c).numFmt = KSH_FORMAT;
  }

  // Column widths
  ws.getColumn(1).width = 55;
  for (let c = 2; c <= 1 + COUNTIES.length; c++) {
    ws.getColumn(c).width = 14;
  }
  for (let c = 2 + COUNTIES.length; c <= headers.length; c++) {
    ws.getColumn(c).width = 18;
  }
}

function buildTransitionRiskSheet(wb: ExcelJS.Workbook, data: ReportData) {
  const ws = wb.addWorksheet("Transition Risk Exposures");

  // Title
  const titleRow = ws.addRow(["Climate transition risk: Exposures subject to transition risk"]);
  titleRow.font = TITLE_FONT;
  ws.mergeCells("A1:F1");
  ws.addRow([]);

  // Sub-header row (row 3)
  const subHeaders = [
    "",
    "PART A: Exposure by Green Taxonomy & Asset Quality (KSH millions)",
    "",
    "",
    "",
    "",
    "PART B: Financed Emissions",
    "",
    "",
    "PART C: Maturity Buckets (KSH millions)",
    "",
    "",
  ];
  const subRow = ws.addRow(subHeaders);
  subRow.font = BOLD_FONT;
  subRow.fill = LIGHT_GREEN as ExcelJS.Fill;
  ws.mergeCells(3, 2, 3, 6);
  ws.mergeCells(3, 7, 3, 9);
  ws.mergeCells(3, 10, 3, 12);

  // Header row (row 4)
  const headers = [
    "SECTOR (KeSIC)",
    "All Exposures",
    "KGFT Aligned",
    "Other Green",
    "Stage 2",
    "NPL",
    "% Measured",
    "Financed Emissions (tCO2e)",
    "Data Quality Score (1-5)",
    "< 1 year",
    "1 - 5 years",
    "> 5 years",
  ];
  const headerRow = ws.addRow(headers);
  applyHeaderStyle(headerRow, headers.length);
  headerRow.height = 30;

  // Data rows
  const trData = data.transitionRisk ?? {};
  for (const key of SECTOR_KEYS) {
    const label = `${key} - ${KESIC_SECTORS[key]}`;
    const s = trData[key] ?? {
      all: 0, kgft: 0, otherGreen: 0, stage2: 0, npl: 0,
      pctMeasured: 0, financedEmissions: 0, dataQuality: 0,
      maturityLt1: 0, maturity1to5: 0, maturityGt5: 0,
    };

    const rowValues: (string | number)[] = [
      label,
      s.all ?? 0,
      s.kgft ?? 0,
      s.otherGreen ?? 0,
      s.stage2 ?? 0,
      s.npl ?? 0,
      s.pctMeasured ?? 0,
      s.financedEmissions ?? 0,
      s.dataQuality ?? 0,
      s.maturityLt1 ?? 0,
      s.maturity1to5 ?? 0,
      s.maturityGt5 ?? 0,
    ];

    const dRow = ws.addRow(rowValues);
    applyDataRow(dRow, headers.length);

    // Number formats
    for (const c of [2, 3, 4, 5, 6, 10, 11, 12]) {
      dRow.getCell(c).numFmt = KSH_FORMAT;
    }
    dRow.getCell(7).numFmt = PCT_FORMAT;
    dRow.getCell(8).numFmt = KSH_FORMAT;
    dRow.getCell(9).numFmt = "0";
  }

  // Totals
  const lastDataRow = 4 + SECTOR_KEYS.length;
  const totals: (string | { formula: string })[] = ["TOTAL"];
  for (let c = 2; c <= headers.length; c++) {
    const colLetter = ws.getColumn(c).letter;
    if (c === 7) {
      // weighted average for % measured doesn't sum; use average
      totals.push({ formula: `AVERAGE(${colLetter}5:${colLetter}${lastDataRow})` });
    } else if (c === 9) {
      totals.push({ formula: `AVERAGE(${colLetter}5:${colLetter}${lastDataRow})` });
    } else {
      totals.push({ formula: `SUM(${colLetter}5:${colLetter}${lastDataRow})` });
    }
  }
  const totalRow = ws.addRow(totals);
  totalRow.font = BOLD_FONT;
  totalRow.fill = LIGHT_GREEN as ExcelJS.Fill;
  for (let c = 1; c <= headers.length; c++) {
    totalRow.getCell(c).border = THIN_BORDER;
  }

  // Column widths
  ws.getColumn(1).width = 55;
  for (let c = 2; c <= headers.length; c++) {
    ws.getColumn(c).width = 22;
  }
}

function buildMaterialitySheet(wb: ExcelJS.Workbook, data: ReportData) {
  const ws = wb.addWorksheet("Climate Risk Materiality");

  // Title
  const titleRow = ws.addRow(["Climate Risk Materiality Assessment"]);
  titleRow.font = TITLE_FONT;
  ws.mergeCells("A1:G1");
  ws.addRow([]);

  // Headers
  const headers = [
    "Climate Risk Type",
    "Sub-Type",
    "Climate-related risks",
    "Impact description",
    "Short-term (0-1yr)",
    "Medium-term (1-5yr)",
    "Long-term (5yr+)",
  ];
  const headerRow = ws.addRow(headers);
  applyHeaderStyle(headerRow, headers.length);
  headerRow.height = 25;

  // Data rows
  const matData = data.materiality ?? [];
  for (const item of matData) {
    const dRow = ws.addRow([
      item.riskType ?? "",
      item.subType ?? "",
      item.risk ?? "",
      item.impact ?? "",
      item.shortTerm ?? "",
      item.mediumTerm ?? "",
      item.longTerm ?? "",
    ]);
    applyDataRow(dRow, headers.length);
    dRow.alignment = { vertical: "top", wrapText: true };
  }

  // Column widths
  ws.getColumn(1).width = 20;
  ws.getColumn(2).width = 20;
  ws.getColumn(3).width = 40;
  ws.getColumn(4).width = 40;
  ws.getColumn(5).width = 18;
  ws.getColumn(6).width = 18;
  ws.getColumn(7).width = 18;
}

function buildQualitativeSheet(wb: ExcelJS.Workbook, data: ReportData) {
  const ws = wb.addWorksheet("Qualitative Questionnaire");

  // Title
  const titleRow = ws.addRow(["CBK Climate Risk Qualitative Questionnaire"]);
  titleRow.font = TITLE_FONT;
  ws.mergeCells("A1:C1");
  ws.addRow([]);

  const qual = data.qualitative ?? {
    businessStrategy: [],
    governance: [],
    riskManagement: [],
    climateScenarios: [],
  };

  const totalCols = 3;

  // --- Section 1: Business Strategy ---
  const s1Header = ws.addRow(["Section 1: Business Strategy & Climate Risk Integration"]);
  applySubHeaderStyle(s1Header, totalCols);
  ws.mergeCells(s1Header.number, 1, s1Header.number, totalCols);

  const s1ColHeader = ws.addRow(["#", "Question / Topic", "Response"]);
  applyHeaderStyle(s1ColHeader, totalCols);

  (qual.businessStrategy ?? []).forEach((answer: string, i: number) => {
    const dRow = ws.addRow([i + 1, `Business Strategy Question ${i + 1}`, answer]);
    applyDataRow(dRow, totalCols);
    dRow.alignment = { vertical: "top", wrapText: true };
  });

  ws.addRow([]);

  // --- Section 2: Governance ---
  const s2Header = ws.addRow(["Section 2: Governance"]);
  applySubHeaderStyle(s2Header, totalCols);
  ws.mergeCells(s2Header.number, 1, s2Header.number, totalCols);

  const s2ColHeader = ws.addRow(["Question", "Answer", "Explanation"]);
  applyHeaderStyle(s2ColHeader, totalCols);

  (qual.governance ?? []).forEach((item: { question: string; answer: string; explanation: string }) => {
    const dRow = ws.addRow([item.question ?? "", item.answer ?? "", item.explanation ?? ""]);
    applyDataRow(dRow, totalCols);
    dRow.alignment = { vertical: "top", wrapText: true };
  });

  ws.addRow([]);

  // --- Section 3: Risk Management ---
  const s3Header = ws.addRow(["Section 3: Risk Management"]);
  applySubHeaderStyle(s3Header, totalCols);
  ws.mergeCells(s3Header.number, 1, s3Header.number, totalCols);

  const s3ColHeader = ws.addRow(["#", "Question / Topic", "Response"]);
  applyHeaderStyle(s3ColHeader, totalCols);

  (qual.riskManagement ?? []).forEach((answer: string, i: number) => {
    const dRow = ws.addRow([i + 1, `Risk Management Question ${i + 1}`, answer]);
    applyDataRow(dRow, totalCols);
    dRow.alignment = { vertical: "top", wrapText: true };
  });

  ws.addRow([]);

  // --- Section 4: Climate Scenarios ---
  const s4Header = ws.addRow(["Section 4: Climate Scenario Analysis"]);
  applySubHeaderStyle(s4Header, totalCols);
  ws.mergeCells(s4Header.number, 1, s4Header.number, totalCols);

  const s4ColHeader = ws.addRow(["#", "Question / Topic", "Response"]);
  applyHeaderStyle(s4ColHeader, totalCols);

  (qual.climateScenarios ?? []).forEach((answer: string, i: number) => {
    const dRow = ws.addRow([i + 1, `Climate Scenario Question ${i + 1}`, answer]);
    applyDataRow(dRow, totalCols);
    dRow.alignment = { vertical: "top", wrapText: true };
  });

  // Column widths
  ws.getColumn(1).width = 35;
  ws.getColumn(2).width = 45;
  ws.getColumn(3).width = 60;
}

function buildGovernanceTablesSheet(wb: ExcelJS.Workbook, data: ReportData) {
  const ws = wb.addWorksheet("Climate Governance - Tables");

  // Title
  const titleRow = ws.addRow(["Climate Governance Structure"]);
  titleRow.font = TITLE_FONT;
  ws.mergeCells("A1:C1");
  ws.addRow([]);

  const gov = data.governanceTables ?? { boardLevel: "", managementLevel: "", responsibilities: [] };

  // Board-level description
  const boardHeader = ws.addRow(["Board-Level Climate Governance"]);
  applySubHeaderStyle(boardHeader, 3);
  ws.mergeCells(boardHeader.number, 1, boardHeader.number, 3);

  const boardRow = ws.addRow([gov.boardLevel ?? ""]);
  boardRow.font = NORMAL_FONT;
  boardRow.alignment = { wrapText: true, vertical: "top" };
  ws.mergeCells(boardRow.number, 1, boardRow.number, 3);

  ws.addRow([]);

  // Management-level description
  const mgmtHeader = ws.addRow(["Management-Level Climate Governance"]);
  applySubHeaderStyle(mgmtHeader, 3);
  ws.mergeCells(mgmtHeader.number, 1, mgmtHeader.number, 3);

  const mgmtRow = ws.addRow([gov.managementLevel ?? ""]);
  mgmtRow.font = NORMAL_FONT;
  mgmtRow.alignment = { wrapText: true, vertical: "top" };
  ws.mergeCells(mgmtRow.number, 1, mgmtRow.number, 3);

  ws.addRow([]);

  // Responsibilities table
  const respHeader = ws.addRow(["Climate Risk Roles and Responsibilities"]);
  applySubHeaderStyle(respHeader, 3);
  ws.mergeCells(respHeader.number, 1, respHeader.number, 3);

  const colHeader = ws.addRow(["Role / Committee", "Name / Title", "Climate-Related Responsibilities"]);
  applyHeaderStyle(colHeader, 3);

  (gov.responsibilities ?? []).forEach((item: { role: string; name: string; responsibilities: string }) => {
    const dRow = ws.addRow([item.role ?? "", item.name ?? "", item.responsibilities ?? ""]);
    applyDataRow(dRow, 3);
    dRow.alignment = { vertical: "top", wrapText: true };
  });

  // Column widths
  ws.getColumn(1).width = 30;
  ws.getColumn(2).width = 30;
  ws.getColumn(3).width = 60;
}

function buildMetricsTargetsSheet(wb: ExcelJS.Workbook, data: ReportData) {
  const ws = wb.addWorksheet("Metrics & Targets");

  // Title
  const titleRow = ws.addRow(["Climate Risk Metrics and Targets"]);
  titleRow.font = TITLE_FONT;
  ws.mergeCells("A1:E1");
  ws.addRow([]);

  // Headers
  const headers = ["KPI", "Unit", "Note", "Answer", "Comment"];
  const headerRow = ws.addRow(headers);
  applyHeaderStyle(headerRow, headers.length);
  headerRow.height = 25;

  // Data rows
  const metrics = data.metricsTargets ?? [];
  metrics.forEach((item: { kpi: string; unit: string; answer: string; comment: string }, idx: number) => {
    const dRow = ws.addRow([
      item.kpi ?? "",
      item.unit ?? "",
      idx + 1,
      item.answer ?? "",
      item.comment ?? "",
    ]);
    applyDataRow(dRow, headers.length);
    dRow.alignment = { vertical: "top", wrapText: true };
  });

  // Column widths
  ws.getColumn(1).width = 40;
  ws.getColumn(2).width = 18;
  ws.getColumn(3).width = 10;
  ws.getColumn(4).width = 30;
  ws.getColumn(5).width = 40;
}

function buildAlignmentMetricsSheet(wb: ExcelJS.Workbook, data: ReportData) {
  const ws = wb.addWorksheet("Alignment Metrics");

  // Title
  const titleRow = ws.addRow(["Portfolio Alignment Metrics"]);
  titleRow.font = TITLE_FONT;
  ws.mergeCells("A1:F1");
  ws.addRow([]);

  // Headers
  const headers = [
    "Sector",
    "KeSIC Sectors",
    "Portfolio amount (KSH millions)",
    "Alignment metric",
    "Year",
    "2030 Target",
  ];
  const headerRow = ws.addRow(headers);
  applyHeaderStyle(headerRow, headers.length);
  headerRow.height = 25;

  // Data rows
  const alignment = data.alignmentMetrics ?? [];
  for (const item of alignment) {
    const sectorLabel = KESIC_SECTORS[item.sector] ? `${item.sector} - ${KESIC_SECTORS[item.sector]}` : item.sector;
    const dRow = ws.addRow([
      item.sector ?? "",
      sectorLabel,
      item.amount ?? 0,
      item.metric ?? "",
      item.year ?? "",
      item.target ?? "",
    ]);
    applyDataRow(dRow, headers.length);
    dRow.getCell(3).numFmt = KSH_FORMAT;
  }

  // Column widths
  ws.getColumn(1).width = 10;
  ws.getColumn(2).width = 55;
  ws.getColumn(3).width = 25;
  ws.getColumn(4).width = 25;
  ws.getColumn(5).width = 12;
  ws.getColumn(6).width = 20;
}

// ---------------------------------------------------------------------------
// Cover sheet helper (bonus: adds institution info as first sheet)
// ---------------------------------------------------------------------------

function buildCoverSheet(wb: ExcelJS.Workbook, data: ReportData) {
  const ws = wb.addWorksheet("Cover Page", {
    properties: { tabColor: { argb: "FF166534" } },
  });

  // Move to first position
  wb.removeWorksheet(ws.id);
  // Re-add at the beginning by inserting before building other sheets
  // (we call this first so it's naturally the first sheet)

  const inst = data.institution ?? {
    bankName: "",
    licenseNumber: "",
    reportingPeriod: "",
    preparedBy: "",
    contactEmail: "",
    totalLoanBook: 0,
    borrowerCount: 0,
  };

  // Title
  ws.addRow([]);
  const t1 = ws.addRow(["CENTRAL BANK OF KENYA"]);
  t1.font = { name: "Arial", size: 16, bold: true, color: { argb: "FF166534" } };
  ws.mergeCells("A2:D2");
  t1.alignment = { horizontal: "center" };

  const t2 = ws.addRow(["Climate Risk Disclosure Framework (CRDF)"]);
  t2.font = { name: "Arial", size: 14, bold: true, color: { argb: "FF166534" } };
  ws.mergeCells("A3:D3");
  t2.alignment = { horizontal: "center" };

  const t3 = ws.addRow(["Regulatory Reporting Template"]);
  t3.font = { name: "Arial", size: 12, bold: true };
  ws.mergeCells("A4:D4");
  t3.alignment = { horizontal: "center" };

  ws.addRow([]);
  ws.addRow([]);

  // Institution details
  const fields: [string, string | number][] = [
    ["Institution Name", inst.bankName],
    ["CBK License Number", inst.licenseNumber],
    ["Reporting Period", inst.reportingPeriod],
    ["Prepared By", inst.preparedBy],
    ["Contact Email", inst.contactEmail],
    ["Total Loan Book (KSH millions)", inst.totalLoanBook],
    ["Total Borrower Count", inst.borrowerCount],
  ];

  for (const [label, value] of fields) {
    const r = ws.addRow([label, value]);
    r.getCell(1).font = BOLD_FONT;
    r.getCell(1).fill = LIGHT_GREEN as ExcelJS.Fill;
    r.getCell(1).border = THIN_BORDER;
    r.getCell(2).font = NORMAL_FONT;
    r.getCell(2).border = THIN_BORDER;
    if (typeof value === "number") {
      r.getCell(2).numFmt = KSH_FORMAT;
    }
  }

  ws.getColumn(1).width = 35;
  ws.getColumn(2).width = 45;
  ws.getColumn(3).width = 20;
  ws.getColumn(4).width = 20;
}

// ---------------------------------------------------------------------------
// Types (inline for the route)
// ---------------------------------------------------------------------------

interface ReportData {
  institution: {
    bankName: string;
    licenseNumber: string;
    reportingPeriod: string;
    preparedBy: string;
    contactEmail: string;
    totalLoanBook: number;
    borrowerCount: number;
  };
  physicalRisk: {
    partA: Record<string, { total: number; counties: Record<string, number> }>;
    partB: Record<string, { acute: number; chronic: number; both: number; stage2: number; npl: number }>;
  };
  transitionRisk: Record<string, {
    all: number; kgft: number; otherGreen: number; stage2: number; npl: number;
    pctMeasured: number; financedEmissions: number; dataQuality: number;
    maturityLt1: number; maturity1to5: number; maturityGt5: number;
  }>;
  materiality: Array<{
    riskType: string; subType: string; risk: string; impact: string;
    shortTerm: string; mediumTerm: string; longTerm: string;
  }>;
  qualitative: {
    businessStrategy: string[];
    governance: Array<{ question: string; answer: string; explanation: string }>;
    riskManagement: string[];
    climateScenarios: string[];
  };
  governanceTables: {
    boardLevel: string;
    managementLevel: string;
    responsibilities: Array<{ role: string; name: string; responsibilities: string }>;
  };
  metricsTargets: Array<{ kpi: string; unit: string; answer: string; comment: string }>;
  alignmentMetrics: Array<{ sector: string; amount: number; metric: string; year: string; target: string }>;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const body: ReportData = await req.json();

    const wb = new ExcelJS.Workbook();
    wb.creator = "CBK CRDF Reporting System";
    wb.created = new Date();

    // Build all sheets in order
    buildCoverSheet(wb, body);
    buildPhysicalRiskSheet(wb, body);
    buildTransitionRiskSheet(wb, body);
    buildMaterialitySheet(wb, body);
    buildQualitativeSheet(wb, body);
    buildGovernanceTablesSheet(wb, body);
    buildMetricsTargetsSheet(wb, body);
    buildAlignmentMetricsSheet(wb, body);

    // Generate buffer
    const buffer = await wb.xlsx.writeBuffer();

    // Sanitise filename parts
    const bankName = (body.institution?.bankName ?? "Unknown")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 50);
    const period = (body.institution?.reportingPeriod ?? "Period")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 30);

    const filename = `CBK_CRDF_Report_${bankName}_${period}.xlsx`;

    return new NextResponse(buffer as ArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=${filename}`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("CRDF report generation failed:", error);
    return NextResponse.json(
      {
        error: "Failed to generate report",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
