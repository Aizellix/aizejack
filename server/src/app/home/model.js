import { isEmpty } from '../../utility/isEmpty';

const getInitialData = async params => {
  const { lang } = params;

  try {
    const response = {
      status: 200,
      result: { data: 'TEST', lang }
    };
    return isEmpty(response)
      ? response
      : {
          status: 400,
          result: {}
        };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('getContentByCateModel error : ', error);
    return {
      status: 400,
      result: {}
    };
  }
};

export { getInitialData };
