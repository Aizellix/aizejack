export const getNewDeck = () => {
  let deck = Array.from(Array(104).keys());
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const card = deck[i];
    deck[i] = deck[j];
    deck[j] = card;
  }
  return deck;
};
