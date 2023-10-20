/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const stergeHeder = async (hederId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api/v1/hedere/${hederId}`,
    });

    if (res.data.status === 'success') {
      alert('Hederul a fost șters cu succes!');
      location.reload(true);
      location.assign('/listaHedere');
    }
  } catch (err) {
    showAlert('error', 'Eroare la stergerea hederului!Încercați din nou.');
  }
};
