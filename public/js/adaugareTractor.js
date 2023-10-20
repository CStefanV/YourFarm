/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const adaugareTractor = async (
  name,
  power,
  functioningHours,
  timeSpentInTheFarm,
  usedAt,
  maxSpeed,
  category,
  maxRPM,
  rented,
  description
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/tractoare',
      data: {
        name,
        power,
        functioningHours,
        timeSpentInTheFarm,
        usedAt,
        maxSpeed,
        category,
        maxRPM,
        rented,
        description,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Tractor creat cu succes');
      window.setTimeout(() => {
        location.assign('/listaTractoare');
      }, 1200);
      // window.location.href = '/paginaPrincipala';
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
