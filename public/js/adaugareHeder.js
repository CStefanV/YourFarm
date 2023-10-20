/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const adaugareHeder = async (
  name,
  compatibleWith,
  functioningHours,
  timeSpentInTheFarm,
  workingWidth,
  rented,
  description
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/hedere',
      data: {
        name,
        compatibleWith,
        functioningHours,
        timeSpentInTheFarm,
        workingWidth,
        rented,
        description,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Heder adăugat cu succes');
      window.setTimeout(() => {
        location.assign('/listaHedere');
      }, 1200);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
