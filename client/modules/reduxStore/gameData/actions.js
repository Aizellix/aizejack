export const SET_GAMEDATA = 'SET_GAMEDATA';
export const CALL_CARD = 'CALL_CARD';
export const HIT_CARD = 'HIT_CARD';
export const STAND_CARD = 'STAND_CARD';
export const RESTART_ROUND = 'RESTART_ROUND';
export const END_GAME = 'END_GAME';
export const NEW_GAME = 'NEW_GAME';

const setGameData = data => {
  return {
    type: SET_GAMEDATA,
    payload: data
  };
};
const callCard = data => {
  return {
    type: CALL_CARD,
    payload: data
  };
};
const hitCard = data => {
  return {
    type: HIT_CARD,
    payload: data
  };
};
const standCard = data => {
  return {
    type: STAND_CARD,
    payload: data
  };
};
const restartRound = data => {
  return {
    type: RESTART_ROUND,
    payload: data
  };
};

const endGame = data => {
  return {
    type: END_GAME,
    payload: data
  };
};

const newGame = data => {
  return {
    type: NEW_GAME,
    payload: data
  };
};

export { setGameData, callCard, hitCard, standCard, restartRound, endGame, newGame };
