/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const stergePulverizator = async (pulverizatorId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api/v1/pulverizatoare/${pulverizatorId}`,
    });

    if (res.data.status === 'success') {
      alert('Pulverizatorul a fost șters cu succes!');
      location.reload(true);
      location.assign('/listaPulverizatoare');
    }
  } catch (err) {
    showAlert(
      'error',
      'Eroare la stergerea pulverizatorului!Încercați din nou.'
    );
  }
};
