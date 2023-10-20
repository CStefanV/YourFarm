import axios from 'axios';
import { showAlert } from './alerts';

export const sterge = async (tractorId) => {
  // console.log('Deleting tractor:', tractorId);
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api/v1/tractoare/${tractorId}`,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Tractorul a fost șters cu succes!');

      location.assign('/listaTractoare');
    }
  } catch (err) {
    showAlert('error', 'Eroare la stergerea tractorului! Încercați din nou.');
  }
};
