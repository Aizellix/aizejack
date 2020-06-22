const Spades = [
  { point: 1, name: 'A', type: 'S' },
  { point: 2, name: '2', type: 'S' },
  { point: 3, name: '3', type: 'S' },
  { point: 4, name: '4', type: 'S' },
  { point: 5, name: '5', type: 'S' },
  { point: 6, name: '6', type: 'S' },
  { point: 7, name: '7', type: 'S' },
  { point: 8, name: '8', type: 'S' },
  { point: 9, name: '9', type: 'S' },
  { point: 10, name: '10', type: 'S' },
  { point: 10, name: 'J', type: 'S' },
  { point: 10, name: 'Q', type: 'S' },
  { point: 10, name: 'K', type: 'S' }
];
const Hearts = [
  { point: 1, name: 'A', type: 'H' },
  { point: 2, name: '2', type: 'H' },
  { point: 3, name: '3', type: 'H' },
  { point: 4, name: '4', type: 'H' },
  { point: 5, name: '5', type: 'H' },
  { point: 6, name: '6', type: 'H' },
  { point: 7, name: '7', type: 'H' },
  { point: 8, name: '8', type: 'H' },
  { point: 9, name: '9', type: 'H' },
  { point: 10, name: '10', type: 'H' },
  { point: 10, name: 'J', type: 'H' },
  { point: 10, name: 'Q', type: 'H' },
  { point: 10, name: 'K', type: 'H' }
];
const Diamonds = [
  { point: 1, name: 'A', type: 'D' },
  { point: 2, name: '2', type: 'D' },
  { point: 3, name: '3', type: 'D' },
  { point: 4, name: '4', type: 'D' },
  { point: 5, name: '5', type: 'D' },
  { point: 6, name: '6', type: 'D' },
  { point: 7, name: '7', type: 'D' },
  { point: 8, name: '8', type: 'D' },
  { point: 9, name: '9', type: 'D' },
  { point: 10, name: '10', type: 'D' },
  { point: 10, name: 'J', type: 'D' },
  { point: 10, name: 'Q', type: 'D' },
  { point: 10, name: 'K', type: 'D' }
];
const Clubs = [
  { point: 1, name: 'A', type: 'C' },
  { point: 2, name: '2', type: 'C' },
  { point: 3, name: '3', type: 'C' },
  { point: 4, name: '4', type: 'C' },
  { point: 5, name: '5', type: 'C' },
  { point: 6, name: '6', type: 'C' },
  { point: 7, name: '7', type: 'C' },
  { point: 8, name: '8', type: 'C' },
  { point: 9, name: '9', type: 'C' },
  { point: 10, name: '10', type: 'C' },
  { point: 10, name: 'J', type: 'C' },
  { point: 10, name: 'Q', type: 'C' },
  { point: 10, name: 'K', type: 'C' }
];

export const CardDeck = [...Spades, ...Hearts, ...Diamonds, ...Clubs];
