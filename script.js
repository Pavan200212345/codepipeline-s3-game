document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    const cardArray = [
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card5', img: 'images/success.png' },
        { name: 'card5', img: 'images/success.png' }
    ];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];
        cardsChosen = [];
        cardsChosenId = [];

        cardArray.forEach((cardObj, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', index);

            const front = document.createElement('div');
            front.classList.add('card-face', 'card-front');
            front.textContent = '?';

            const back = document.createElement('div');
            back.classList.add('card-face', 'card-back');
            const img = document.createElement('img');
            img.src = cardObj.img;
            back.appendChild(img);

            card.appendChild(front);
            card.appendChild(back);
            grid.appendChild(card);

            card.addEventListener('click', flipCard);
        });
    }

    function flipCard() {
        const card = this;
        const cardId = card.getAttribute('data-id');

        if (cardsChosenId.includes(cardId) || card.classList.contains('flipped') || card.classList.contains('matched')) return;

        card.classList.add('flipped');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 800);
        }
    }

    function checkForMatch() {
        const allCards = document.querySelectorAll('.card');
        const [firstId, secondId] = cardsChosenId;

        if (cardsChosen[0] === cardsChosen[1] && firstId !== secondId) {
            allCards[firstId].classList.add('matched');
            allCards[secondId].classList.add('matched');
            allCards[firstId].style.pointerEvents = 'none';
            allCards[secondId].style.pointerEvents = 'none';
            cardsWon.push(cardsChosen[0]);
        } else {
            allCards[firstId].classList.remove('flipped');
            allCards[secondId].classList.remove('flipped');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            setTimeout(() => alert('🎉 Congratulations! You matched them all!'), 300);
        }
    }

    startButton.addEventListener('click', createBoard);
});
