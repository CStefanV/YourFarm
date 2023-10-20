/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const stergeCombina = async (combinaId) => {
  console.log('Deleting combine:', combinaId);
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api/v1/combine/${combinaId}`,
    });

    if (res.data.status === 'success') {
      alert('success', 'Combina a fost ștearsa cu succes!');
      location.reload(true);
      location.assign('/listaCombine');
    }
  } catch (err) {
    showAlert('error', 'Eroare la stergerea combinei!Încercați din nou.');
  }
};
