/**
 * CANCHAS DE FÚTBOL 7 - INTERACTIVE CALCULATORS SUITE
 * 1. Surface & Safety Area Calculator
 * 2. Construction Budget Estimator with Multi-Currency
 * 3. Business Profitability & ROI Estimator
 */

document.addEventListener('DOMContentLoaded', () => {
  initCalculatorTabs();
  initSurfaceCalculator();
  initBudgetCalculator();
  initRoiCalculator();
});

/* Tabs Switching */
function initCalculatorTabs() {
  const tabButtons = document.querySelectorAll('.calc-nav-btn');
  const panels = document.querySelectorAll('.calc-tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      tabButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

/* ==========================================================================
   1. SURFACE CALCULATOR
   ========================================================================== */
function initSurfaceCalculator() {
  const lengthInput = document.getElementById('surf-length');
  const widthInput = document.getElementById('surf-width');
  const marginInput = document.getElementById('surf-margin');

  const lengthVal = document.getElementById('surf-length-val');
  const widthVal = document.getElementById('surf-width-val');
  const marginVal = document.getElementById('surf-margin-val');

  const playAreaDisplay = document.getElementById('surf-play-area');
  const totalAreaDisplay = document.getElementById('surf-total-area');
  const perimeterDisplay = document.getElementById('surf-perimeter');
  const nideStatusDisplay = document.getElementById('surf-nide-status');

  function calculateSurface() {
    const l = parseFloat(lengthInput.value) || 55;
    const w = parseFloat(widthInput.value) || 35;
    const m = parseFloat(marginInput.value) || 1.5;

    if (lengthVal) lengthVal.textContent = `${l} m`;
    if (widthVal) widthVal.textContent = `${w} m`;
    if (marginVal) marginVal.textContent = `${m} m`;

    const playArea = Math.round(l * w);
    const totalLength = l + (2 * m);
    const totalWidth = w + (2 * m);
    const totalArea = Math.round(totalLength * totalWidth);
    const perimeter = Math.round(2 * (totalLength + totalWidth));

    if (playAreaDisplay) playAreaDisplay.textContent = `${playArea.toLocaleString()} m²`;
    if (totalAreaDisplay) totalAreaDisplay.textContent = `${totalArea.toLocaleString()} m²`;
    if (perimeterDisplay) perimeterDisplay.textContent = `${perimeter.toLocaleString()} m`;

    // Check NIDE Compliance (Spain CSD: 50-65m length, 30-45m width)
    if (nideStatusDisplay) {
      if (l >= 50 && l <= 65 && w >= 30 && w <= 45) {
        nideStatusDisplay.innerHTML = `<span class="badge-pill success">✓ Cumple normativa NIDE CSD (Oficial)</span>`;
      } else {
        nideStatusDisplay.innerHTML = `<span class="badge-pill warning">⚠ Medida no reglamentaria (Solo recreativo)</span>`;
      }
    }
  }

  [lengthInput, widthInput, marginInput].forEach(el => {
    if (el) el.addEventListener('input', calculateSurface);
  });

  // Calculate initially if inputs exist
  if (lengthInput) calculateSurface();
}

/* ==========================================================================
   2. CONSTRUCTION BUDGET ESTIMATOR
   ========================================================================== */
function initBudgetCalculator() {
  const areaInput = document.getElementById('budget-area');
  const areaVal = document.getElementById('budget-area-val');
  const turfSelect = document.getElementById('budget-turf');
  const earthworkSelect = document.getElementById('budget-earthwork');
  const lightingSelect = document.getElementById('budget-lighting');
  const fencingSelect = document.getElementById('budget-fencing');
  const currencySelect = document.getElementById('budget-currency');

  const totalDisplay = document.getElementById('budget-total-price');
  const m2RateDisplay = document.getElementById('budget-m2-rate');

  const costEarthworkDisplay = document.getElementById('cost-earthwork');
  const costTurfDisplay = document.getElementById('cost-turf');
  const costLightingDisplay = document.getElementById('cost-lighting');
  const costFencingDisplay = document.getElementById('cost-fencing');
  const costEquipDisplay = document.getElementById('cost-equip');

  // Rates in EUR
  const currencyRates = {
    EUR: { symbol: '€', rate: 1.0, locale: 'es-ES' },
    USD: { symbol: '$', rate: 1.08, locale: 'en-US' },
    MXN: { symbol: '$', rate: 21.5, locale: 'es-MX' },
    ARS: { symbol: '$', rate: 1350.0, locale: 'es-AR' }
  };

  function calculateBudget() {
    const area = parseFloat(areaInput.value) || 1925;
    if (areaVal) areaVal.textContent = `${area.toLocaleString()} m²`;

    const turfCostPerM2 = parseFloat(turfSelect.value) || 24; // EUR per m²
    const earthworkCostPerM2 = parseFloat(earthworkSelect.value) || 12; // EUR per m²
    const lightingCostBase = parseFloat(lightingSelect.value) || 9500; // EUR lump sum
    const fencingCostBase = parseFloat(fencingSelect.value) || 6800; // EUR lump sum
    const equipCostBase = 2600; // Goals 6x2m, corner flags, player benches in EUR

    const totalTurf = area * turfCostPerM2;
    const totalEarthwork = area * earthworkCostPerM2;
    const totalLighting = lightingCostBase;
    const totalFencing = fencingCostBase;
    const totalEquip = equipCostBase;

    const totalEUR = totalTurf + totalEarthwork + totalLighting + totalFencing + totalEquip;
    const ratePerM2EUR = totalEUR / area;

    const currKey = currencySelect ? currencySelect.value : 'EUR';
    const curr = currencyRates[currKey] || currencyRates.EUR;

    function formatVal(valEUR) {
      const converted = Math.round(valEUR * curr.rate);
      return `${curr.symbol} ${converted.toLocaleString(curr.locale)}`;
    }

    if (totalDisplay) totalDisplay.textContent = formatVal(totalEUR);
    if (m2RateDisplay) m2RateDisplay.textContent = `${formatVal(ratePerM2EUR)} / m²`;

    if (costEarthworkDisplay) costEarthworkDisplay.textContent = formatVal(totalEarthwork);
    if (costTurfDisplay) costTurfDisplay.textContent = formatVal(totalTurf);
    if (costLightingDisplay) costLightingDisplay.textContent = formatVal(totalLighting);
    if (costFencingDisplay) costFencingDisplay.textContent = formatVal(totalFencing);
    if (costEquipDisplay) costEquipDisplay.textContent = formatVal(totalEquip);
  }

  [areaInput, turfSelect, earthworkSelect, lightingSelect, fencingSelect, currencySelect].forEach(el => {
    if (el) el.addEventListener('input', calculateBudget);
  });

  if (areaInput) calculateBudget();
}

/* ==========================================================================
   3. PROFITABILITY & ROI ESTIMATOR
   ========================================================================== */
function initRoiCalculator() {
  const priceInput = document.getElementById('roi-price');
  const priceVal = document.getElementById('roi-price-val');
  const hoursInput = document.getElementById('roi-hours');
  const hoursVal = document.getElementById('roi-hours-val');
  const daysInput = document.getElementById('roi-days');
  const extraRevenueInput = document.getElementById('roi-extra-revenue');
  const expensesInput = document.getElementById('roi-expenses');
  const totalInvestmentInput = document.getElementById('roi-investment');

  const grossMonthlyDisplay = document.getElementById('roi-gross-monthly');
  const netMonthlyDisplay = document.getElementById('roi-net-monthly');
  const grossAnnualDisplay = document.getElementById('roi-gross-annual');
  const netAnnualDisplay = document.getElementById('roi-net-annual');
  const paybackDisplay = document.getElementById('roi-payback-months');

  function calculateRoi() {
    const pricePerHour = parseFloat(priceInput.value) || 40;
    const hoursPerDay = parseFloat(hoursInput.value) || 5;
    const daysPerMonth = parseFloat(daysInput.value) || 30;
    const extraRevenue = parseFloat(extraRevenueInput.value) || 800; // bar, torneos, clases
    const monthlyExpenses = parseFloat(expensesInput.value) || 1600; // luz, mantenimiento, seguros
    const totalInvestment = parseFloat(totalInvestmentInput.value) || 75000;

    if (priceVal) priceVal.textContent = `${pricePerHour} €`;
    if (hoursVal) hoursVal.textContent = `${hoursPerDay} h/día`;

    const monthlyRentalGross = pricePerHour * hoursPerDay * daysPerMonth;
    const totalMonthlyGross = monthlyRentalGross + extraRevenue;
    const totalMonthlyNet = Math.max(0, totalMonthlyGross - monthlyExpenses);

    const annualGross = totalMonthlyGross * 12;
    const annualNet = totalMonthlyNet * 12;

    const paybackMonths = totalMonthlyNet > 0 ? (totalInvestment / totalMonthlyNet).toFixed(1) : '∞';

    if (grossMonthlyDisplay) grossMonthlyDisplay.textContent = `€ ${Math.round(totalMonthlyGross).toLocaleString()}`;
    if (netMonthlyDisplay) netMonthlyDisplay.textContent = `€ ${Math.round(totalMonthlyNet).toLocaleString()}`;
    if (grossAnnualDisplay) grossAnnualDisplay.textContent = `€ ${Math.round(annualGross).toLocaleString()}`;
    if (netAnnualDisplay) netAnnualDisplay.textContent = `€ ${Math.round(annualNet).toLocaleString()}`;
    if (paybackDisplay) paybackDisplay.textContent = `${paybackMonths} meses`;
  }

  [priceInput, hoursInput, daysInput, extraRevenueInput, expensesInput, totalInvestmentInput].forEach(el => {
    if (el) el.addEventListener('input', calculateRoi);
  });

  if (priceInput) calculateRoi();
}
