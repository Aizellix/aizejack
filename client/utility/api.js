import { apiCaller } from '@utility/apiCaller';

const getInitialData = async () => {
  try {
    const { data } = await apiCaller.post(`/dealer/setCard`, {
      userId: 1001
    });

    return data.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('getInitialData error : ', error);
    return {};
  }
};

const getCard = async () => {
  try {
    const { data } = await apiCaller.post(`/dealer/getCard`, {
      userId: 1001
    });

    return data.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('getInitialData error : ', error);
    return {};
  }
};

export { getInitialData, getCard };
