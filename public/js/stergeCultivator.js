/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const stergeCultivator = async (cultivatorId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api/v1/cultivatoare/${cultivatorId}`,
    });

    if (res.data.status === 'success') {
      alert('Cultivatorul a fost șters cu succes!');
      location.reload(true);
      location.assign('/listaCultivatoare');
    }
  } catch (err) {
    showAlert('error', 'Eroare la stergerea cultivatorului!Încercați din nou.');
  }
};
