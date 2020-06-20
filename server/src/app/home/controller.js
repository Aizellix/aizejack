import { isEmpty } from '../../utility/isEmpty';
import { getInitialData } from './model';

const initialData = async ({ body }, res) => {
  const { lang = 'th' } = body;
  try {
    const { status, result } = await getInitialData({ lang });
    const response = {
      status,
      data: isEmpty(result) ? result : {}
    };
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default { initialData };
