import { apiCaller } from '@utility/apiCaller';

const setGameInit = async name => {
  try {
    const { data } = await apiCaller.post(`/dealer/start`, { name });

    return data.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('setGameInit error : ', error);
    return {};
  }
};

const getCallingCard = async (userId, bets) => {
  try {
    const { data } = await apiCaller.post(`/dealer/call`, {
      userId,
      bets
    });

    return data.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('getInitialData error : ', error);
    return {};
  }
};

const getHittingCard = async userId => {
  try {
    const { data } = await apiCaller.post(`/dealer/hit`, {
      userId
    });

    return data.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('getHittingCard error : ', error);
    return {};
  }
};

const getStandingCard = async (userId, bets) => {
  try {
    const { data } = await apiCaller.post(`/dealer/stand`, {
      userId,
      bets
    });

    return data.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('getStandingCard error : ', error);
    return {};
  }
};

const getScoreTable = async () => {
  try {
    const { data } = await apiCaller.post(`/dealer/score`);

    return data.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('getScoreTable error : ', error);
    return {};
  }
};

export { setGameInit, getScoreTable, getCallingCard, getHittingCard, getStandingCard };
