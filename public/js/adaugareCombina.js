/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const adaugareCombina = async (
  name,
  power,
  functioningHours,
  timeSpentInTheFarm,
  maxSpeed,
  tank,
  rented,
  description
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/combine',
      data: {
        name,
        power,
        functioningHours,
        timeSpentInTheFarm,
        maxSpeed,
        tank,
        rented,
        description,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Combină creată cu succes');
      window.setTimeout(() => {
        location.assign('/listaCombine');
      }, 1200);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
