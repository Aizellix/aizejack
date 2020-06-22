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
    const { success, code, result } = await model.standCard({ userId, bets });
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
  let response = {
    success: false,
    code: 400,
    data: {}
  };
  try {
    const { success, code, result } = await model.getScoreTable();
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

export default { startGame, callCard, hitCard, standCard, scoreTable };
