// scripts/app.js - 90th Days Calculator

// Helper function to format dates
function formatDate(date, format = 'short') {
  const options = format === 'long' 
    ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

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

// Render the date information card
function renderDates(startDate) {
  const { ninetiethDate, before15, after7 } = calculateDates(startDate);
  const datesContainer = document.getElementById('dates');
  
  const HTML = `
    <div class="date-card">
      <div class="day-number">Report Set #1</div>
      <div class="date-string">Start: ${formatDate(startDate)}</div>
      <div class="date-string" style="color:#ffe066;font-weight:bold;">15 Days Before: ${formatDate(before15)}</div>
      <div class="date-string" style="color:#4caf50;font-weight:bold;">90th Day: ${formatDate(ninetiethDate, 'long')}</div>
      <div class="date-string" style="color:#ff8a80;font-weight:bold;">7 Days After: ${formatDate(after7)}</div>
      <div class="date-string" style="color:#ff9800;font-size:0.95em;margin-top:8px;">File within 15 days before to 7 days after the 90-day deadline.</div>
    </div>
  `;
  
  datesContainer.innerHTML = HTML;
}

// Initialize the app
function init90thDaysApp() {
  const startDateInput = document.getElementById('startDate');
  const today = new Date();
  
  startDateInput.valueAsDate = today;
  renderDates(today);
  
  startDateInput.addEventListener('change', (e) => {
    renderDates(e.target.valueAsDate || today);
  });
}

document.addEventListener('DOMContentLoaded', init90thDaysApp);
