async function fetchCardsData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
}

function createCard(title, description, imageUrl) {
    const card = document.createElement('div');
    card.classList.add('card'); // Добавлен класс 'card'
    card.innerHTML = `
    <img src="https://kalix.club/uploads/posts/2022-12/1671476238_kalix-club-p-kapibara-oboi-na-telefon-instagram-1.jpg" alt="${title}" />
    <h2>${title}</h2>
    <p>${description}</p>
  `;
    return card;
}

async function displayCards() {
    const cardsContainer = document.getElementById('cards-container');

    try {
        const cardsData = await fetchCardsData();

        cardsData.forEach(cardData => {
            const card = createCard(cardData.title, cardData.body);
            cardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', displayCards);
