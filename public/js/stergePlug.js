/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const stergePlug = async (plugId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api/v1/pluguri/${plugId}`,
    });

    if (res.data.status === 'success') {
      alert('Plugul a fost șters cu succes!');
      location.reload(true);
      location.assign('/listaPluguri');
    }
  } catch (err) {
    showAlert('error', 'Eroare la stergerea plugului!Încercați din nou.');
  }
};
