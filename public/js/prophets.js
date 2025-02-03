
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetsData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data.prophets);
        displayProphets(data.prophets);
    } catch (error) {
        console.error(error);
    }

}

getProphetsData();

function displayProphets(prophets) {
    prophets.forEach(prophet => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let birthDate = document.createElement('p');
        let birthPlace = document.createElement('p');

        // Build the h2 our to show the full name of the prophet
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        // Build the img tag for the prophet's portrait
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
        // Build the p tag for the prophet's birth date
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        // Build the p tag for the prophet's birth place
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Append the sections to the card
        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
}