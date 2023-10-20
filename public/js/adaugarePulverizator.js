/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const adaugarePulverizator = async (
  name,
  workingSpeed,
  functioningHours,
  timeSpentInTheFarm,
  spreadingWidth,
  tankCapacity,
  rented,
  description
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/pulverizatoare',
      data: {
        name,
        workingSpeed,
        functioningHours,
        timeSpentInTheFarm,
        spreadingWidth,
        tankCapacity,
        rented,
        description,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Pulverizator adăugat cu succes');
      window.setTimeout(() => {
        location.assign('/listaPulverizatoare');
      }, 1200);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
