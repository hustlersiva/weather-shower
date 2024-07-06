

The project structure is organized as follows:

```
weather-app/
│
├── public/
│   └── index.html
│
├── src/
│   ├── Components/
│   │   ├── CurrentData.js
│   │   ├── RenderForecast.js
│   │   └── VisualData.js
│   ├── assets/
│   │   ├── assest.js
│   │   └── util.js
│   ├── index.css
│   ├── index.js
│   └── App.js
│
└── README.md
```

- **`public/`**: Contains the `index.html` file.
- **`src/`**: Contains all the source code for the application.
  - **`Components/`**: Contains React components (`CurrentData.js`, `RenderForecast.js`, `VisualData.js`).
  - **`assets/`**: Contains utility functions (`util.js`) and assets (`assest.js`) like images.
  - **`index.css`**: CSS file for styling the application.
  - **`index.js`**: Entry point for rendering the React app.
  - **`App.js`**: Main component that fetches weather data and renders UI.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **API Key Setup:**

   - Obtain an API key from [OpenWeatherMap](https://openweathermap.org/).
   - Replace `apiKey` in `App.js` with your API key.

## Running the Application

To run the application locally:

```bash
npm start
```

The app will start running at `http://localhost:3000`.

## Usage

1. Enter a city name in the input field.
2. Press Enter or click the search button.
3. View the current weather data, weekly forecast, and visual forecast.

---
Features

Responsiveness: The app is designed to be responsive and adapts well to different screen sizes.
Charismatic Visual Dashboard: The UI includes a visually appealing dashboard that presents weather data in a user-friendly manner.

