import { useState } from 'react'
import './App.css'

function buildShoe() {
  const suits = ["h", "d", "c", "s"];
  const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  let deck = [];

  for (let suit in suits) {
    for (let value in values) {
      var count;
      if (value <= 4) 
        count = 1;
      else if (value >= 8) 
        count = -1;
      else
        count = 0;
      deck.push({ suit: suits[suit], rank: values[value], count: count });
    }
  }

  let shoe = deck;
  for (let i=0; i<5; i++) {
      shoe = shoe.concat(deck);
  }

  return shoe;
}

function shuffle(shoe) {
  let currentIndex = shoe.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = shoe[currentIndex];
    shoe[currentIndex] = shoe[randomIndex];
    shoe[randomIndex] = temporaryValue;
  }

  return shoe;
}

function dealCard(shoe) {
  return shoe.pop();
}

const Card = ({card}) => {
  console.log(card);
  return (
    <div>{card.rank}{card.suit}:  {card.count}</div>
    );
}


function App() {

  const [count, setCount] = useState(0);

  let shoe = [];
  shoe = shuffle(buildShoe());
  
  let newCard;
  newCard = dealCard(shoe);
  const [card, setCard] = useState(null);


  const handleDealCard = () => {
    let newCard;
    newCard = dealCard(shoe);
    setCount(count + newCard.count);
    setCard(newCard)
  };

  return (
    <div className="App">
      <button type="button" onClick={handleDealCard}>Deal Card</button>
      <div>
        {card && <Card card={card} />}
        Running Count: {count}
      </div> 
    </div>
  )
}

export default App
