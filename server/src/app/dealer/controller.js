import model from './model';
import isEmpty from '../../utility/isEmpty';

const startGame = async ({ body }, res) => {
  const { name = 'anonymous' } = body;
  let response = {
    success: false,
    code: 400,
    data: {}
  };
  try {
    const { success, code, result } = await model.getInitialGame({ name });
    if (success) {
      response = {
        success,
        code,
        data: !isEmpty(result) ? result : {}
      };
    }
    return res.status(response.code).json(response);
  } catch (error) {
    response.result = error;
    return res.status(response.code).json(response);
  }
};

const callCard = async ({ body }, res) => {
  let response = {
    success: false,
    code: 400,
    data: {}
  };
  const { userId, bets } = body;
  try {
    console.log('*--- userId', userId);
    console.log('*--- bets', bets);
    const { success, code, result } = await model.callNewRound({ userId, bets });
    if (success) {
      response = {
        success,
        code,
        data: !isEmpty(result) ? result : {}
      };
    }
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(response.code).json(response);
  }
};

const hitCard = async ({ body }, res) => {
  let response = {
    success: false,
    code: 400,
    data: {}
  };
  const { userId } = body;
  try {
    console.log('*--- userId', userId);
    const { success, code, result } = await model.callHitCard({ userId });
    if (success) {
      response = {
        success,
        code,
        data: !isEmpty(result) ? result : {}
      };
    }
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(response.code).json(response);
  }
};

const standCard = async ({ body }, res) => {
  let response = {
    success: false,
    code: 400,
    data: {}
  };
  const { userId, bets } = body;
  try {
    console.log('*--- userId', userId);
    console.log('*--- bets', bets);
    const { success, code, result } = await model.callHitCard({ userId, bets });
    if (success) {
      response = {
        success,
        code,
        data: !isEmpty(result) ? result : {}
      };
    }
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(response.code).json(response);
  }
};

const scoreTable = async (req, res) => {
  try {
    const { status, result } = await model.getScoreTable();
    const response = {
      status,
      data: !isEmpty(result) ? result : {}
    };
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default { startGame, callCard, hitCard, standCard, scoreTable };
