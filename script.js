let selectedUnit = localStorage.getItem('unit') || 'metric';
document.getElementById('unitSelect').value = selectedUnit;

let selectedLanguage = localStorage.getItem('lang') || 'en';
document.getElementById('languageSelect').value = selectedLanguage;

const apiKey = '5565261cab45b630d9d2483a30097e76'; // ⚡ put your real API key here
const getWeatherBtn = document.getElementById('getWeatherBtn');
const getLocationBtn = document.getElementById('getLocationBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) return alert('Please enter a city name.');
  fetchWeatherByCity(city);
});

getLocationBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
    },
    () => alert('Unable to get your location.')
  );
});

async function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${selectedUnit}&lang=${selectedLanguage}`;
  fetchAndDisplay(url);
}

async function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${selectedUnit}&lang=${selectedLanguage}`;
  fetchAndDisplay(url);
}

async function fetchAndDisplay(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'City not found');

    const { name, main, weather, sys } = data;
    const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const flag = `https://flagsapi.com/${sys.country}/flat/24.png`;
    const now = new Date();
    const unitSymbol = selectedUnit === 'metric' ? '°C' : '°F';

    weatherResult.innerHTML = `
      <h2>${name}, ${sys.country} <img src="${flag}" alt="${sys.country}"/></h2>
      <p>${now.toDateString()} - ${now.toLocaleTimeString()}</p>
      <img src="${icon}" alt="Weather Icon" />
      <p><strong>${weather[0].main}</strong> - ${weather[0].description}</p>
      <p>🌡️ Temp: ${main.temp}${unitSymbol} (feels like ${main.feels_like}${unitSymbol})</p>
      <p>🔻 Min: ${main.temp_min}${unitSymbol} | 🔺 Max: ${main.temp_max}${unitSymbol}</p>
      <p>💧 Humidity: ${main.humidity}%</p>
      <p>🌅 Sunrise: ${new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
      <p>🌇 Sunset: ${new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
    `;

    speakWeatherData(data);
  } catch (err) {
    weatherResult.innerHTML = `<p style="color:red;">❌ ${err.message}</p>`;
  }
}

function applyTranslations() {
  const t = translations[selectedLanguage];
  getWeatherBtn.textContent = t.getWeather;
  getLocationBtn.textContent = t.myLocation;
  cityInput.placeholder = t.placeholder;
  themeLabel.textContent = document.body.classList.contains('dark') ? t.themeDark : t.themeLight;
}

function speakWeatherData(data) {
  const unitSymbol = selectedUnit === 'metric' ? 'degrees Celsius' : 'degrees Fahrenheit';
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const sentence = `
    The weather in ${data.name}, ${data.sys.country} is currently ${data.weather[0].main},
    with a temperature of ${data.main.temp} ${unitSymbol},
    feels like ${data.main.feels_like} ${unitSymbol}.
    The humidity is ${data.main.humidity}%.
    Sunrise at ${sunrise}, sunset at ${sunset}.
  `;

  const cleanedSentence = sentence.replace(/[^\p{L}\p{N}\s.,'-]/gu, '');
  const utterance = new SpeechSynthesisUtterance(cleanedSentence);
  utterance.lang = selectedLanguage;
  speechSynthesis.speak(utterance);
}

document.getElementById('unitSelect').addEventListener('change', (e) => {
  selectedUnit = e.target.value;
  localStorage.setItem('unit', selectedUnit);
  const city = cityInput.value.trim();
  if (city) fetchWeatherByCity(city);
});

document.getElementById('languageSelect').addEventListener('change', (e) => {
  selectedLanguage = e.target.value;
  localStorage.setItem('lang', selectedLanguage);
  applyTranslations();
  const city = cityInput.value.trim();
  if (city) fetchWeatherByCity(city);
});

const themeSwitcher = document.getElementById('themeSwitcher');
const themeLabel = document.getElementById('themeLabel');

const translations = {
  en: { getWeather: 'Get Weather', myLocation: 'My Location', placeholder: 'Enter city name', themeLight: 'Light', themeDark: 'Dark' },
  hi: { getWeather: 'मौसम देखें', myLocation: 'मेरा स्थान', placeholder: 'शहर का नाम दर्ज करें', themeLight: 'प्रकाश', themeDark: 'अंधेरा' },
  ta: { getWeather: 'வானிலை பெறுக', myLocation: 'எனது இடம்', placeholder: 'நகரம் பெயரை உள்ளிடவும்', themeLight: 'ஒளி', themeDark: 'இருள்' },
  es: { getWeather: 'Obtener clima', myLocation: 'Mi ubicación', placeholder: 'Ingrese el nombre de la ciudad', themeLight: 'Claro', themeDark: 'Oscuro' },
  ko: { getWeather: '날씨 보기', myLocation: '내 위치', placeholder: '도시 이름을 입력하세요', themeLight: '라이트', themeDark: '다크' },
  ja: { getWeather: '天気を取得', myLocation: '現在地', placeholder: '都市名を入力してください', themeLight: 'ライト', themeDark: 'ダーク' },
  zh: { getWeather: '获取天气', myLocation: '我的位置', placeholder: '输入城市名称', themeLight: '浅色', themeDark: '深色' },
  th: { getWeather: 'รับสภาพอากาศ', myLocation: 'ตำแหน่งของฉัน', placeholder: 'ป้อนชื่อเมือง', themeLight: 'สว่าง', themeDark: 'มืด' },
  de: { getWeather: 'Wetter abrufen', myLocation: 'Mein Standort', placeholder: 'Stadtname eingeben', themeLight: 'Hell', themeDark: 'Dunkel' },
  yue: { getWeather: '攞天氣', myLocation: '我嘅位置', placeholder: '輸入城市名稱', themeLight: '光', themeDark: '暗' },
  ru: { getWeather: 'Получить погоду', myLocation: 'Моё местоположение', placeholder: 'Введите название города', themeLight: 'Светлая', themeDark: 'Тёмная' },
  nl: { getWeather: 'Weer ophalen', myLocation: 'Mijn locatie', placeholder: 'Voer stadsnaam in', themeLight: 'Licht', themeDark: 'Donker' },
};

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeSwitcher.checked = true;
  themeLabel.textContent = 'Dark';
}

themeSwitcher.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  const t = translations[selectedLanguage];
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    themeLabel.textContent = t.themeDark;
  } else {
    localStorage.setItem('theme', 'light');
    themeLabel.textContent = t.themeLight;
  }
});

const voiceInputBtn = document.getElementById('voiceInputBtn');
if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = selectedLanguage === 'en' ? 'en-US' : selectedLanguage;
  recognition.interimResults = false;
  recognition.continuous = false;
  recognition.maxAlternatives = 1;

  voiceInputBtn.addEventListener('click', () => {
    voiceInputBtn.textContent = '🎤 Listening...';
    recognition.start();
  });

  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript;
    const cleanTranscript = transcript.replace(/[^\p{L}\p{N} ]+/gu, '');
    cityInput.value = cleanTranscript;
    fetchWeatherByCity(cleanTranscript);
  });

  recognition.addEventListener('end', () => {
    voiceInputBtn.textContent = '🎙️ Speak';
  });
} else {
  voiceInputBtn.disabled = true;
  voiceInputBtn.textContent = '🎙️ Not supported';
}

const speakWeatherBtn = document.getElementById('speakWeatherBtn');
speakWeatherBtn.addEventListener('click', () => {
  const rawText = weatherResult.textContent;
  const cleanedText = rawText.replace(/[^\p{L}\p{N}\s.,'-]/gu, '');
  const utterance = new SpeechSynthesisUtterance(cleanedText);
  utterance.lang = selectedLanguage || 'en-US';
  speechSynthesis.speak(utterance);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}
