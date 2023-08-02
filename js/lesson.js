const phoneInput = document.querySelector('#phone_input')
const phoneCheck = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/

phoneInput.value = '+996 '

phoneCheck.addEventListener('click', () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = ' NOT OK'
        phoneResult.style.color = 'red'
    }
})

// TAB SLIDER

const tabContent = document.querySelectorAll('.tab_content_block');
const tabsParent = document.querySelector('.tab_content_items');
const tabs = document.querySelectorAll('.tab_content_item');
let currentTab = 0;
let intervalId;

const hideTabContent = () => {
    tabContent.forEach((element) => {
        element.style.display = 'none';
    });
    tabs.forEach((element) => {
        element.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (index = 0) => {
    tabContent[index].style.display = 'block';
    tabs[index].classList.add('tab_content_item_active');
};

const startSlider = () => {
    intervalId = setInterval(() => {
        hideTabContent();
        currentTab = (currentTab + 1) % tabs.length;
        showTabContent(currentTab);
    }, 3000);
};

hideTabContent();
showTabContent();

tabsParent.onclick = (event) => {
    const targetElement = event.target;
    if (targetElement.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (targetElement === tab) {
                hideTabContent();
                currentTab = tabIndex;
                showTabContent(tabIndex);
            }
        });
    }
};

startSlider();

// CONVERTER

const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const fetchData = async () => {
    try {
        const response = await fetch("../data/convert.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const convert = async (element, target1, target2, isTrue) => {
    element.oninput = async () => {
        try {
            const data = await fetchData();

            if (isTrue) {
                target1.value = (element.value / data.usd).toFixed(2);
                target2.value = (element.value / data.eur).toFixed(2);
            } else {
                target1.value = (element.value * data.usd).toFixed(2);
                target2.value = (element.value * data.eur).toFixed(2);
            }

            element.value === '' && (target1.value = '') && (target2.value = '');
        } catch (error) {
            console.error("Error converting data:", error);
        }
    };
};

convert(som, usd, eur, true);
convert(usd, som, eur, false);
convert(eur, som, usd, false);


// CARD SWITCHER
const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');
let count = 1;

const updateCard = async (count) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`);
        const data = await response.json();
        card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
            <span>${data.id}</span>
        `;
    } catch (error) {
        console.error("Error updating card:", error);
    }
};

const fetchToConsole = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data to console:", error);
    }
};

updateCard(count);

btnNext.onclick = async () => {
    count = count === 200 ? 1 : count + 1;
    await updateCard(count);
};

btnPrev.onclick = async () => {
    count = count === 1 ? 200 : count - 1;
    await updateCard(count);
};

fetchToConsole();

// WEATHER API

const cityNameInput = document.querySelector(".cityName");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'e417df62e04d3b1b111abeab19cea714';

const getWeatherData = async (cityName) => {
    try {
        const response = await fetch(`${BASE_URL}?q=${cityName}&appid=${apiKey}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

const citySearch = () => {
    cityNameInput.oninput = async (event) => {
        const cityName = event.target.value;
        try {
            const data = await getWeatherData(cityName);
            city.innerHTML = data?.name || 'Город не найден :(';
            temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + '&deg;C' : '...';
        } catch (error) {
            city.innerHTML = 'Город не найден :(';
            temp.innerHTML = '...';
        }
    };
};

citySearch();
