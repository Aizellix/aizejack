// import isEmpty from '../../utility/isEmpty';
import { getNewDeck } from '../../utility/getNewDeck';
const User = require('../../emun/user');
const Score = require('../../emun/score');
const { CardDeck } = require('../../emun/cards');

const getInitialGame = async params => {
  const { name } = params;
  let response = {
    success: false,
    code: 400,
    result: {}
  };
  try {
    // get new shuffled card deck.
    const deck = getNewDeck();
    const coins = 1000;
    const { _id: userId, name: userName, createdTime } = await User.create({ name, coins, deck });
    await Score.create({ userId, point: 0, deck });

    response = {
      success: true,
      code: 200,
      result: { userName, userId, coins, createdTime }
    };
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('getInitialGame error : ', error);
    return response;
  }
};

const callNewRound = async params => {
  const { userId, bets } = params;
  let response = {
    success: false,
    code: 400,
    result: {}
  };
  try {
    let { deck, coins } = await User.findById(userId);

    // If card total is less than 52 dealer will shuffling new card deck.
    deck = deck.length <= 52 ? getNewDeck() : deck;
    coins = coins - bets;

    // calling will start with 2 cards always and dealer will get 2 cards as well.
    const { cards: cardList, deck: newDeck } = drawCardFromDeck(deck, 4);
    const cards = getCardInfo(cardList);
    const playerCards = [cards[0], cards[1]];
    const dealerCards = [cards[2], cards[3]];
    console.log('*--- cards', cards);
    console.log('*--- playerCards', playerCards);
    console.log('*--- dealerCards', dealerCards);
    await User.findByIdAndUpdate(userId, { deck: newDeck, coins, dealerCards });
    response = {
      success: true,
      code: 200,
      result: { coins, playerCards, dealerCards: [dealerCards[1]], totalCard: newDeck.length }
    };
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('callNewRound error : ', error);
    return response;
  }
};

const callHitCard = async params => {
  const { userId } = params;
  let response = {
    success: false,
    code: 400,
    result: {}
  };
  try {
    let { deck } = await User.findById(userId);

    const { cards: cardList, deck: newDeck } = drawCardFromDeck(deck, 1);
    const cards = getCardInfo(cardList);
    await User.findByIdAndUpdate(userId, { deck: newDeck });
    response = {
      success: true,
      code: 200,
      result: { cards, totalCard: newDeck.length }
    };
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('callNewRound error : ', error);
    return response;
  }
};

const standCard = async params => {
  const { userId } = params;
  let response = {
    success: false,
    code: 400,
    result: {}
  };
  try {
    let { deck } = await User.findById(userId);

    const { cards: cardList, deck: newDeck } = drawCardFromDeck(deck, 1);
    const cards = getCardInfo(cardList);
    await User.findByIdAndUpdate(userId, { deck: newDeck });
    response = {
      success: true,
      code: 200,
      result: { cards, totalCard: newDeck.length }
    };
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('callNewRound error : ', error);
    return response;
  }
};
const getScoreTable = async params => {
  const { name } = params;
  let response = {
    success: false,
    code: 400,
    result: {}
  };
  try {
    const { _id: userId, name: userName, createdTime } = await User.create({ name });
    await Score.create({ userId, point: 0 });

    response = {
      success: true,
      code: 200,
      result: { userName, userId, coins: 1000, createdTime }
    };
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('getScoreTable error : ', error);
    return response;
  }
};

const drawCardFromDeck = (deck, amount = 1) => {
  let cards = [];
  let totalCard = deck.length;
  for (let i = 0; i < amount; i++) {
    const cardNumber = Math.floor(Math.random() * totalCard);
    const card = deck[cardNumber];
    deck.splice(cardNumber, 1);
    totalCard = deck.length;
    cards.push(card);
  }
  return { cards, deck };
};

const getCardInfo = cardList => {
  let cards = [];
  const totalCard = cardList.length;
  for (let i = 0; i < totalCard; i++) {
    const cardNumber = cardList[i];
    const card = CardDeck[cardNumber % 52];
    cards.push(card);
  }
  return cards;
};

export default { getInitialGame, callNewRound, callHitCard, standCard, getScoreTable };
