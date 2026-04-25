# 90th Day Calculator

A simple web application to calculate and track the 90-day reporting deadline for Thai Immigration compliance.

## Features

- 📅 **Date Calculator** - Calculate the 90th day from any start date
- 🎨 **Visual Calendar** - Interactive calendar showing:
  - The 90th day (green highlight)
  - 15 days before deadline (yellow highlight)
  - 7 days after deadline (red highlight)
- 📱 **Responsive Design** - Works on all device sizes
- 🌙 **Dark Theme** - Easy on the eyes with a modern dark interface

## What It Does

This app helps Thai visa holders track their 90-day reporting requirement by:
1. Selecting a start date
2. Automatically calculating:
   - The 90th day deadline
   - The deadline window (15 days before to 7 days after)
3. Displaying an interactive calendar highlighting key dates

## Thai Immigration Rule

*File the report within 15 days before to 7 days after the 90-day deadline.*

## How to Use

1. Open `index.html` in your web browser
2. Select a start date using the date picker
3. View the calculated dates and interactive calendar
4. The yellow zone shows when you can file early
5. The green day is your official 90-day deadline
6. The red zone shows the grace period after deadline

## File Structure

```
├── index.html          # Main application HTML
├── scripts/
│   └── app.js         # Application logic
├── styles/
│   └── main.css       # Styling and theme
├── README.md          # This file
└── .gitignore         # Git ignore rules
```

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with dark theme
- **JavaScript (Vanilla)** - Functionality

## Getting Started

Simply open the `index.html` file in any modern web browser. No installation or build process required.

## Customization

You can easily customize the app by:
- Modifying colors in `styles/main.css`
- Changing date formats in `scripts/app.js`
- Updating the Thai Immigration rule text in the date card

## License

Open source - Feel free to use and modify

---

**Created for Thai visa holders to track 90-day reporting deadlines**
