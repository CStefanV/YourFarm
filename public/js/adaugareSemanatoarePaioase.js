/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const adaugareSemanatoarePaioase = async (
  name,
  workingSpeed,
  functioningHours,
  timeSpentInTheFarm,
  workingWidth,
  requiredTractorPower,
  rented,
  description
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/semanatoriPaioase',
      data: {
        name,
        workingSpeed,
        functioningHours,
        timeSpentInTheFarm,
        workingWidth,
        requiredTractorPower,
        rented,
        description,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Semănătoare adăugată cu succes');
      window.setTimeout(() => {
        location.assign('/listaSemanatoriPaioase');
      }, 1200);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
