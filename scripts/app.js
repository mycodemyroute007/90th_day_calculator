// scripts/app.js - 90th Days App

// Calculate key dates from start date
function calculateDates(startDate) {
  const ninetiethDate = new Date(startDate);
  ninetiethDate.setDate(startDate.getDate() + 89);
  
  const before15 = new Date(ninetiethDate);
  before15.setDate(ninetiethDate.getDate() - 15);
  
  const after7 = new Date(ninetiethDate);
  after7.setDate(ninetiethDate.getDate() + 7);
  
  return { startDate, ninetiethDate, before15, after7 };
}

// Format dates for display
function formatDateCompact(date) {
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatDateLong(date) {
  return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Create date information card
function createDateCard(dates) {
  const { startDate, ninetiethDate, before15, after7 } = dates;
  const card = document.createElement('div');
  card.className = 'date-card';
  card.innerHTML = `
    <div class="day-number">Report Set #1</div>
    <div class="date-string">Start: ${formatDateCompact(startDate)}</div>
    <div class="date-string" style="color:#ffe066;font-weight:bold;">15 Days Before 90th: ${formatDateCompact(before15)}</div>
    <div class="date-string" style="color:#4caf50;font-weight:bold;">90th Day: ${formatDateLong(ninetiethDate)}</div>
    <div class="date-string" style="color:#ff8a80;font-weight:bold;">7 Days After 90th: ${formatDateCompact(after7)}</div>
    <div class="date-string" style="color:#ff9800;font-size:0.95em;margin-top:8px;">File the report within 15 days before to 7 days after the 90-day deadline (Thai Immigration rule).</div>
  `;
  return card;
}

// Render calendar for the month with highlights
function renderCalendar(ninetiethDate, before15, after7) {
  const year = ninetiethDate.getFullYear();
  const month = ninetiethDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  let html = `<div style="margin:24px auto;max-width:340px;background:#232323;border-radius:12px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,0.18);color:#fff;">
    <div style="text-align:center;font-weight:bold;font-size:1.2em;margin-bottom:8px;">${ninetiethDate.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
    <table style="width:100%;border-collapse:collapse;text-align:center;">
      <thead><tr>`;
  
  dayNames.forEach(day => {
    html += `<th style="padding:4px 0;color:#ffe066;">${day}</th>`;
  });
  
  html += '</tr></thead><tbody><tr>';
  
  // Empty cells for days before month starts
  for (let i = 0; i < firstDay.getDay(); i++) {
    html += '<td></td>';
  }
  
  // Calendar days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const thisDate = new Date(year, month, d);
    let style = 'padding:6px 0;border-radius:6px;';
    
    if (d === ninetiethDate.getDate()) {
      style += 'background:#4caf50;color:#fff;font-weight:bold;';
    } else if (thisDate >= before15 && thisDate < ninetiethDate) {
      style += 'background:#ffe066;color:#222;font-weight:bold;';
    } else if (thisDate > ninetiethDate && thisDate <= after7) {
      style += 'background:#ff8a80;color:#fff;font-weight:bold;';
    }
    
    html += `<td style="${style}">${d}</td>`;
    
    if ((firstDay.getDay() + d) % 7 === 0) {
      html += '</tr><tr>';
    }
  }
  
  html += '</tr></tbody></table></div>';
  return html;
}

// Render dates and calendar
function renderDates(startDate) {
  const dates = calculateDates(startDate);
  const datesContainer = document.getElementById('dates');
  datesContainer.innerHTML = '';
  datesContainer.appendChild(createDateCard(dates));
  
  const calendarContainer = document.getElementById('calendar-container');
  if (calendarContainer) {
    calendarContainer.innerHTML = renderCalendar(dates.ninetiethDate, dates.before15, dates.after7);
  }
}

// Initialize app
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
