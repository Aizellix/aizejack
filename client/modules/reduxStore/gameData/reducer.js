import { SET_GAMEDATA, CALL_CARD, HIT_CARD, STAND_CARD, RESTART_ROUND, END_GAME, NEW_GAME } from './actions';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_GAMEDATA:
      return { ...state, gameData: action.payload };
    case CALL_CARD:
      state.gameData.userData = { ...state.gameData.userData, ...action.payload };
      return state;
    case HIT_CARD:
      state.gameData.userData.playerCards = action.payload.playerCards;
      state.gameData.userData.playerPoint = action.payload.playerPoint;
      return state;
    case STAND_CARD:
      state.gameData.userData.playerPoint = action.payload.playerPoint;
      state.gameData.userData.dealerPoint = action.payload.dealerPoint;
      return state;
    case RESTART_ROUND:
      state.gameData.userData = { ...state.gameData.userData, ...action.payload };
      return state;
    case END_GAME:
      return { ...state, gameData: action.payload };
    case NEW_GAME:
      return { ...state, gameData: action.payload };
    default:
      return state;
  }
}
