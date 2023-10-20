/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const stergeSemanatoarePlantatoare = async (
  semanatoarePlantatoareId
) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api/v1/semanatoriPlanters/${semanatoarePlantatoareId}`,
    });

    if (res.data.status === 'success') {
      alert('Semanatoarea a fost ștearsa cu succes!');
      location.reload(true);
      location.assign('/listaSemanatoriPlantatoare');
    }
  } catch (err) {
    showAlert('error', 'Eroare la stergerea semanatorii!Încercați din nou.');
  }
};
