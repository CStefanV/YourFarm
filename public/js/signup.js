/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Contul a fost creat cu succes');
      window.setTimeout(() => {
        location.assign('/paginaPrincipala');
      }, 1200);
      // window.location.href = '/paginaPrincipala';
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
