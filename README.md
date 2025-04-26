# Weather App

##  Description

The **Weather App** is a **Progressive Web App (PWA)** that allows users to check the current weather conditions anywhere in the world. Whether you want to see the weather in your own city or get real-time updates from a different location, this app makes it easy and intuitive. With offline support and a mobile-friendly interface, the app feels like a native mobile app. 

## **Key Features**:
-  **Location-based weather**: Shows weather based on your current location.
-  **City-based weather**: Search for weather in any city worldwide.
-  **Offline Support**: The app works even when you are offline (thanks to PWA functionality).
-  **Mobile-friendly**: The app works seamlessly across devices (desktop, tablet, mobile).
-  **Real-time data**: Fetches data from the **OpenWeatherMap API**.

##  Technologies Used

- **HTML5** - Structure and layout of the app.
- **CSS3** - Styling, including responsive design for various screen sizes.
- **JavaScript** - App logic, fetching weather data, and handling interactions.
- **OpenWeatherMap API** - For retrieving real-time weather data.
- **Service Workers** - For offline functionality and PWA features.
- **PWA** (Progressive Web App) - Installable and works offline.

##  Installation

Follow these steps to set up the app locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-app.git
```

### 2. Open the project folder

```bash
cd weather-app
```

### 3. Add your OpenWeatherMap API key

To make the app work with real-time weather data, you need to replace the default API key with your own.

#### Steps to get an API key:
1. Visit the [OpenWeatherMap API website](https://openweathermap.org/api).
2. Sign up or log in.
3. Go to your **API keys** section and create a new key.
4. Copy the API key.

#### Steps to add your API key:
1. Open the `script.js` file.
2. Find the line where the API key is being used (it should look something like this):

```javascript
const apiKey = 'your-api-key-here';  // Replace with your own API key
```

3. Replace `'your-api-key-here'` with your copied API key from OpenWeatherMap.

```javascript
const apiKey = 'your-actual-api-key';  // Your new API key
```

4. Save the changes.

### 4. Launch the app

Open the `index.html` file in your browser. For mobile use, it can also be installed as a PWA by selecting **Add to Home Screen**.

##  How to Use

1. **Search for a City**: Type the name of any city in the search bar to get weather details.
2. **Use Your Location**: The app can automatically detect your location and show the weather in your area.
3. **Offline Mode**: The app works offline once loaded. So, there will still be access to the last fetched weather data without an internet connection.

##  How to Build & Deploy

### 1. Build the app:

- The app is ready to be deployed as a **PWA** and can be hosted on any static file server.

### 2. Deploy to GitHub Pages:

- Push your changes to GitHub.
- Go to the **Settings** tab of the repository.
- In the **GitHub Pages** section, select the branch to deploy (usually `main`).
- The app will be live at `https://your-username.github.io/weather-app`.

##  Troubleshooting

- **No weather data**: Check if the OpenWeatherMap API key is valid.
- **Offline data**: If the app shows cached data, ensure you're connected to the internet for real-time updates.
- **PWA issues**: Make sure the browser supports **service workers** and **PWAs**.

##  Contributing

1. **Fork** the repository.
2. Create a new branch:  
   `git checkout -b feature-name`
3. **Commit** your changes:  
   `git commit -am 'Add new feature'`
4. **Push** to your branch:  
   `git push origin feature-name`
5. Create a **Pull Request**!

