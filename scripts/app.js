// scripts/app.js - Modular JS for 90th Days App

/**
 * Renders multiple future 90th days starting from the selected date.
 * @param {Date} startDate - The date from which to start calculations.
 * @param {number} count - How many future 90th days to show.
 */
function renderDates(startDate, count = 1) {
  let ninetiethDate, before15, after7;
  const datesContainer = document.getElementById('dates');
  datesContainer.innerHTML = '';
  let reportStart = new Date(startDate);
  ninetiethDate = new Date(reportStart);
  ninetiethDate.setDate(reportStart.getDate() + 89);
  before15 = new Date(ninetiethDate);
  before15.setDate(ninetiethDate.getDate() - 15);
  after7 = new Date(ninetiethDate);
  after7.setDate(ninetiethDate.getDate() + 7);
  const card = document.createElement('div');
  card.className = 'date-card';
  card.innerHTML = `
    <div class="day-number">Report Set #1</div>
    <div class="date-string">Start: ${reportStart.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
    <div class="date-string" style="color:#ffe066;font-weight:bold;">15 Days Before 90th: ${before15.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
    <div class="date-string" style="color:#4caf50;font-weight:bold;">90th Day: ${ninetiethDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
    <div class="date-string" style="color:#ff8a80;font-weight:bold;">7 Days After 90th: ${after7.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
    <div class="date-string" style="color:#ff9800;font-size:0.95em;margin-top:8px;">File the report within 15 days before to 7 days after the 90-day deadline (Thai Immigration rule).</div>
  `;
  datesContainer.appendChild(card);

  // Render calendar below the cell
  const calendarContainer = document.getElementById('calendar-container');
  if (calendarContainer) {
    calendarContainer.innerHTML = renderCalendar(ninetiethDate, before15, after7);
  }

// Helper to render a simple calendar for a given date's month, highlighting 90th, 15 days before, and 7 days after
function renderCalendar(ninetiethDate, before15, after7) {
  const year = ninetiethDate.getFullYear();
  const month = ninetiethDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let html = `<div style="margin:24px auto;max-width:340px;background:#232323;border-radius:12px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,0.18);color:#fff;">
    <div style="text-align:center;font-weight:bold;font-size:1.2em;margin-bottom:8px;">${ninetiethDate.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
    <table style="width:100%;border-collapse:collapse;text-align:center;">
      <thead><tr>`;
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  for (let d of days) html += `<th style="padding:4px 0;color:#ffe066;">${d}</th>`;
  html += '</tr></thead><tbody><tr>';
  for (let i = 0; i < firstDay.getDay(); i++) html += '<td></td>';
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const thisDate = new Date(year, month, d);
    let style = 'padding:6px 0;border-radius:6px;';
    // Highlight 90th day (green)
    if (d === ninetiethDate.getDate()) {
      style += 'background:#4caf50;color:#fff;font-weight:bold;';
    // Highlight 15 days before (yellow)
    } else if (
      thisDate >= before15 && thisDate < ninetiethDate
    ) {
      style += 'background:#ffe066;color:#222;font-weight:bold;';
    // Highlight 7 days after (light red)
    } else if (
      thisDate > ninetiethDate && thisDate <= after7
    ) {
      style += 'background:#ff8a80;color:#fff;font-weight:bold;';
    }
    html += `<td style="${style}">${d}</td>`;
    if ((firstDay.getDay() + d) % 7 === 0) html += '</tr><tr>';
  }
  html += '</tr></tbody></table></div>';
  return html;
}
}

// Initialization
function init90thDaysApp() {
  const startDateInput = document.getElementById('startDate');
  const today = new Date();
  startDateInput.valueAsDate = today;
  renderDates(today);
  startDateInput.addEventListener('change', () => {
    const selectedDate = startDateInput.valueAsDate || today;
    renderDates(selectedDate);
  });
}

document.addEventListener('DOMContentLoaded', init90thDaysApp);
