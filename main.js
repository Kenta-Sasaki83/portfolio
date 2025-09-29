// スキルバーアニメーション
window.addEventListener("load", () => {
  document.querySelectorAll(".skills-bar span").forEach(bar => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => { bar.style.width = width; }, 200);
  });
});

// ----------------------
// じゃんけんゲーム
// ----------------------
const rpsButtons = document.querySelectorAll('#rock-paper-scissors button');
const rpsResult = document.getElementById('rps-result');

rpsButtons.forEach(button => {
  button.addEventListener('click', () => {
    const userChoice = button.getAttribute('data-choice');
    const choices = ['グー', 'チョキ', 'パー'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = '';
    if (userChoice === computerChoice) result = 'あいこ！';
    else if (
      (userChoice === 'グー' && computerChoice === 'チョキ') ||
      (userChoice === 'チョキ' && computerChoice === 'パー') ||
      (userChoice === 'パー' && computerChoice === 'グー')
    ) result = 'あなたの勝ち！';
    else result = 'コンピュータの勝ち！';
    rpsResult.textContent = `あなた: ${userChoice} / コンピュータ: ${computerChoice} → ${result}`;
  });
});

// ----------------------
// ToDoアプリ
// ----------------------
const addButton = document.getElementById('add-todo');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

addButton.addEventListener('click', () => {
  const task = input.value.trim();
  if (!task) return;
  const li = document.createElement('li');
  li.textContent = task;
  const delButton = document.createElement('button');
  delButton.textContent = '削除';
  delButton.addEventListener('click', () => todoList.removeChild(li));
  li.appendChild(delButton);
  todoList.appendChild(li);
  input.value = '';
  input.focus();
});

input.addEventListener('keydown', (e) => { if (e.key === 'Enter') addButton.click(); });

// ----------------------
// お天気アプリ（Geocoding API 日本語対応版）
// ----------------------
const apiKey = "3c1e8e1f5d44eaa94325f5a56e0ea47a"; // 制限付きの無料APIキー
const cityInputWeather = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather');
const weatherResult = document.getElementById('weather-result');

getWeatherBtn.addEventListener('click', () => {
  const city = cityInputWeather.value.trim();
  if (!city) return;

  // Geocoding APIで緯度・経度を取得
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (!data[0]) throw new Error("都市が見つかりません");
      const { lat, lon } = data[0];
      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=ja&units=metric`);
    })
    .then(res => res.json())
    .then(weatherData => {
      weatherResult.textContent = `${weatherData.name}の天気: ${weatherData.weather[0].description} / 気温: ${weatherData.main.temp}℃`;
    })
    .catch(err => { weatherResult.textContent = `エラー: ${err.message}`; });
});

cityInputWeather.addEventListener('keydown', (e) => { if (e.key === 'Enter') getWeatherBtn.click(); });
