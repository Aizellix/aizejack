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

    const { _id } = await Score.create({ userId, point: 0, user: userId });

    response = {
      success: true,
      code: 200,
      result: { userName, userId, coins, score: 0, createdTime, _id }
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

    const { point: playerPoint } = calCardPoint(playerCards);
    await User.findByIdAndUpdate(userId, { deck: newDeck, coins, dealerCards, playerCards });
    response = {
      success: true,
      code: 200,
      result: { coins, playerPoint, playerCards, dealerCards: [dealerCards[1]], totalCard: newDeck.length }
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
    let { deck, playerCards } = await User.findById(userId);

    const { cards: cardList, deck: newDeck } = drawCardFromDeck(deck, 1);
    const cards = getCardInfo(cardList);
    playerCards = playerCards.concat(cards);
    await User.findByIdAndUpdate(userId, { deck: newDeck, playerCards });
    const { point: playerPoint } = calCardPoint(playerCards);
    response = {
      success: true,
      code: 200,
      result: { cards, playerPoint, playerCards, totalCard: newDeck.length }
    };
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('callHitCard error : ', error);
    return response;
  }
};

const standCard = async params => {
  const { userId, bets } = params;
  let response = {
    success: false,
    code: 400,
    result: {}
  };
  try {
    let { deck, coins, dealerCards, playerCards } = await User.findById(userId);
    const { winner, dealerPoint, playerPoint, currentDeck, isBlackjack, dealerCards: allDealerCards } = dealerTurn(deck, dealerCards, playerCards);
    let { point: userScore } = await Score.findOne({ userId });
    if (winner === 'player') {
      coins += bets * 2;
      userScore += bets;
      await Score.findOneAndUpdate({ userId }, { point: userScore });
    } else if (winner === 'push') {
      coins += bets;
    }

    await User.findByIdAndUpdate(userId, { coins, deck: currentDeck, dealerCards: [], playerCards: [] });
    response = {
      success: true,
      code: 200,
      result: { winner, coins, score: userScore, dealerPoint, playerPoint, isBlackjack, dealerCards: allDealerCards }
    };
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('standCard error : ', error);
    return response;
  }
};

const getScoreTable = async () => {
  let response = {
    success: false,
    code: 400,
    result: {}
  };
  try {
    const query = await Score.find().sort({ point: -1 }).limit(10).populate('user', 'name createdTime');
    let result = [];
    for (let i = 0; i < query.length; i++) {
      const data = {
        point: query[i].point,
        name: query[i].user.name,
        createdTime: query[i].user.createdTime
      };
      result.push(data);
    }
    response = {
      success: true,
      code: 200,
      result
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

const dealerTurn = (deck, dealerCards, playerCards) => {
  let currentDeck = deck;
  let isEndRound = false;
  let isBlackjack = false;
  let winner = '';

  let { point: dealerPoint, isBlackjack: dealerIsBlackjack } = calCardPoint(dealerCards);
  let { point: playerPoint, isBlackjack: playerIsBlackjack } = calCardPoint(playerCards);

  if (playerPoint === 21 && playerIsBlackjack) {
    isEndRound = true;
    isBlackjack = true;
    winner = 'player';
  } else if (dealerPoint === 21 && dealerIsBlackjack) {
    isEndRound = true;
    isBlackjack = true;
    winner = 'dealer';
  } else if (playerPoint === 21 && dealerPoint === 21) {
    isEndRound = true;
    winner = 'push';
  } else if (playerPoint === 21) {
    isEndRound = true;
    winner = 'player';
  } else if (playerPoint > 21) {
    isEndRound = true;
    winner = 'dealer';
  }

  if (!isEndRound) {
    while (dealerPoint < playerPoint) {
      const { cards: cardList, deck: newDeck } = drawCardFromDeck(currentDeck, 1);
      currentDeck = newDeck;
      const cards = getCardInfo(cardList);
      dealerCards = dealerCards.concat(cards);
      ({ point: dealerPoint } = calCardPoint(dealerCards));
    }
    if (dealerPoint === 21) {
      isEndRound = true;
      winner = 'dealer';
    } else if (dealerPoint > 21) {
      isEndRound = true;
      winner = 'player';
    } else if (dealerPoint === playerPoint) {
      isEndRound = true;
      winner = 'push';
    } else if (dealerPoint > playerPoint) {
      isEndRound = true;
      winner = 'dealer';
    } else if (dealerPoint > playerPoint) {
      isEndRound = true;
      winner = 'dealer';
    }
  }
  return { winner, isBlackjack, dealerPoint, playerPoint, currentDeck, dealerCards };
};

const calCardPoint = cardList => {
  let A_card = 0;
  let point = 0;
  let isBlackjack = false;
  for (let i = 0; i < cardList.length; i++) {
    const card = cardList[i];
    if (card.name !== 'A') {
      point += card.point;
    } else {
      A_card++;
    }
  }
  for (let i = 0; i < A_card; i++) {
    if (point + 11 > 21) {
      point += 1;
    } else {
      point += 11;
    }
  }

  if (cardList.length === 2 && point === 21) {
    isBlackjack = true;
  }

  return { point, isBlackjack };
};

export default { getInitialGame, callNewRound, callHitCard, standCard, getScoreTable };
