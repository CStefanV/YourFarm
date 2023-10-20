/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const stergeSemanatoarePaioase = async (semanatoarePaioaseId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api/v1/semanatoriPaioase/${semanatoarePaioaseId}`,
    });

    if (res.data.status === 'success') {
      alert('Semanatoarea a fost ștearsa cu succes!');
      location.reload(true);
      location.assign('/listaSemanatoriPaioase');
    }
  } catch (err) {
    showAlert('error', 'Eroare la stergerea semanatorii!Încercați din nou.');
  }
};
