/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Autentificat cu succes');
      window.setTimeout(() => {
        location.assign('/paginaPrincipala');
      }, 1200);
      // window.location.href = '/paginaPrincipala';
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/v1/users/logout',
    });

    if (res.data.status === 'success') {
      location.reload(true);
      location.assign('/');
    }
  } catch (err) {
    showAlert('error', 'Eroare la deconectare!Încercați din nou.');
  }
};
