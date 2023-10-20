/* eslint-disable*/

import '@babel/polyfill';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';

//Adaugare echipamente:
import { adaugareTractor } from './adaugareTractor';
import { adaugareCombina } from './adaugareCombina';
import { adaugareHeder } from './adaugareHeder';
import { adaugarePlug } from './adaugarePlug';
import { adaugareCultivator } from './adaugareCultivator';
import { adaugareSemanatoarePaioase } from './adaugareSemanatoarePaioase';
import { adaugareSemanatoarePlantatoare } from './adaugareSemanatoarePlantatoare';
import { adaugarePulverizator } from './adaugarePulverizator';

//Actualizare date echipamente:
import { actualizareTractor } from './actualizareTractor';

//DOM ELEMENTS
const signupForm = document.querySelector('.form--signup');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.logoutBtn');

const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

//////////////////////////////////////////////////////////
//FORM-URI ADAUGARE ECHIPAMENTE
/////////////////////////////////////////////////////////
const adaugareTractorForm = document.querySelector('.form-adaugareTractor');
const adaugareCombinaForm = document.querySelector('.form-adaugareCombina');
const adaugareHederForm = document.querySelector('.form-adaugareHeder');
const adaugarePlugForm = document.querySelector('.form-adaugarePlug');
const adaugareCultivatorForm = document.querySelector(
  '.form-adaugareCultivator'
);
const adaugareSemanatoarePaioaseForm = document.querySelector(
  '.form-adaugareSemanatoarePaioase'
);
const adaugareSemanatoarePlantatoareForm = document.querySelector(
  '.form-adaugareSemanatoarePlantatoare'
);
const adaugarePulverizatorForm = document.querySelector(
  '.form-adaugarePulverizator'
);

//////////////////////////////////////////////////////////
//FORM-URI AUTENTIFICARE
/////////////////////////////////////////////////////////
if (signupForm)
  signupForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    e.preventDefault();
    signup(name, email, password, passwordConfirm);
  });

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    e.preventDefault();
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);
// console.log('Buton logout: ', logOutBtn);

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent =
      'Actualizare...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent =
      'Salvare parola';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

//////////////////////////////////////////////////////////
//FORM-URI ACTUALIZARE DATE ECHIPAMENTE
/////////////////////////////////////////////////////////

if (adaugareTractorForm)
  adaugareTractorForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value;
    const power = document.getElementById('power').value;
    const functioningHours = document.getElementById('functioningHours').value;
    const timeSpentInTheFarm =
      document.getElementById('timeSpentInTheFarm').value;
    const usedAt = document.getElementById('usedAt').value;
    const maxSpeed = document.getElementById('maxSpeed').value;
    const category = document.getElementById('category').value;
    const maxRPM = document.getElementById('maxRPM').value;
    const rented = document.getElementById('rented').value;
    const description = document.getElementById('description').value;
    e.preventDefault();
    adaugareTractor(
      name,
      power,
      functioningHours,
      timeSpentInTheFarm,
      usedAt,
      maxSpeed,
      category,
      maxRPM,
      rented,
      description
    );
  });

if (adaugareCombinaForm)
  adaugareCombinaForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value;
    const power = document.getElementById('power').value;
    const functioningHours = document.getElementById('functioningHours').value;
    const timeSpentInTheFarm =
      document.getElementById('timeSpentInTheFarm').value;
    const maxSpeed = document.getElementById('maxSpeed').value;
    const tank = document.getElementById('tank').value;
    const rented = document.getElementById('rented').value;
    const description = document.getElementById('description').value;
    e.preventDefault();
    adaugareCombina(
      name,
      power,
      functioningHours,
      timeSpentInTheFarm,
      maxSpeed,
      tank,
      rented,
      description
    );
  });

if (adaugareHederForm)
  adaugareHederForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value;
    const compatibleWith = document.getElementById('compatibleWith').value;
    const functioningHours = document.getElementById('functioningHours').value;
    const timeSpentInTheFarm =
      document.getElementById('timeSpentInTheFarm').value;
    const workingWidth = document.getElementById('workingWidth').value;
    const rented = document.getElementById('rented').value;
    const description = document.getElementById('description').value;
    e.preventDefault();
    adaugareHeder(
      name,
      compatibleWith,
      functioningHours,
      timeSpentInTheFarm,
      workingWidth,
      rented,
      description
    );
  });

if (adaugarePlugForm)
  adaugarePlugForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value;
    const workingSpeed = document.getElementById('workingSpeed').value;
    const functioningHours = document.getElementById('functioningHours').value;
    const timeSpentInTheFarm =
      document.getElementById('timeSpentInTheFarm').value;
    const workingWidth = document.getElementById('workingWidth').value;
    const requiredTractorPower = document.getElementById(
      'requiredTractorPower'
    ).value;
    const rented = document.getElementById('rented').value;
    const description = document.getElementById('description').value;
    e.preventDefault();
    adaugarePlug(
      name,
      workingSpeed,
      functioningHours,
      timeSpentInTheFarm,
      workingWidth,
      requiredTractorPower,
      rented,
      description
    );
  });

if (adaugareCultivatorForm)
  adaugareCultivatorForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value;
    const workingSpeed = document.getElementById('workingSpeed').value;
    const functioningHours = document.getElementById('functioningHours').value;
    const timeSpentInTheFarm =
      document.getElementById('timeSpentInTheFarm').value;
    const workingWidth = document.getElementById('workingWidth').value;
    const requiredTractorPower = document.getElementById(
      'requiredTractorPower'
    ).value;
    const rented = document.getElementById('rented').value;
    const description = document.getElementById('description').value;
    e.preventDefault();
    adaugareCultivator(
      name,
      workingSpeed,
      functioningHours,
      timeSpentInTheFarm,
      workingWidth,
      requiredTractorPower,
      rented,
      description
    );
  });

if (adaugareSemanatoarePaioaseForm)
  adaugareSemanatoarePaioaseForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value;
    const workingSpeed = document.getElementById('workingSpeed').value;
    const functioningHours = document.getElementById('functioningHours').value;
    const timeSpentInTheFarm =
      document.getElementById('timeSpentInTheFarm').value;
    const workingWidth = document.getElementById('workingWidth').value;
    const requiredTractorPower = document.getElementById(
      'requiredTractorPower'
    ).value;
    const rented = document.getElementById('rented').value;
    const description = document.getElementById('description').value;
    e.preventDefault();
    adaugareSemanatoarePaioase(
      name,
      workingSpeed,
      functioningHours,
      timeSpentInTheFarm,
      workingWidth,
      requiredTractorPower,
      rented,
      description
    );
  });

if (adaugareSemanatoarePlantatoareForm)
  adaugareSemanatoarePlantatoareForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value;
    const workingSpeed = document.getElementById('workingSpeed').value;
    const functioningHours = document.getElementById('functioningHours').value;
    const timeSpentInTheFarm =
      document.getElementById('timeSpentInTheFarm').value;
    const numberOfRows = document.getElementById('numberOfRows').value;
    const requiredTractorPower = document.getElementById(
      'requiredTractorPower'
    ).value;
    const rented = document.getElementById('rented').value;
    const description = document.getElementById('description').value;
    e.preventDefault();
    adaugareSemanatoarePlantatoare(
      name,
      workingSpeed,
      functioningHours,
      timeSpentInTheFarm,
      numberOfRows,
      requiredTractorPower,
      rented,
      description
    );
  });

if (adaugarePulverizatorForm)
  adaugarePulverizatorForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value;
    const workingSpeed = document.getElementById('workingSpeed').value;
    const functioningHours = document.getElementById('functioningHours').value;
    const timeSpentInTheFarm =
      document.getElementById('timeSpentInTheFarm').value;
    const spreadingWidth = document.getElementById('spreadingWidth').value;
    const tankCapacity = document.getElementById('tankCapacity').value;
    const rented = document.getElementById('rented').value;
    const description = document.getElementById('description').value;
    e.preventDefault();
    adaugarePulverizator(
      name,
      workingSpeed,
      functioningHours,
      timeSpentInTheFarm,
      spreadingWidth,
      tankCapacity,
      rented,
      description
    );
  });

import { sterge } from './stergeTractor';

document.addEventListener('DOMContentLoaded', () => {
  const deleteBtn = document.querySelector('.deleteBtn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', function () {
      const tractorId = this.getAttribute('data-tractor-id');
      // console.log(tractorId);
      sterge(tractorId);
    });
  } else {
    // console.warn('No element with class .deleteBtn found.');
  }
});

import { stergeCombina } from './stergeCombina';

document.addEventListener('DOMContentLoaded', (event) => {
  const deleteBtnCombina = document.querySelector('.deleteBtnCombina');

  if (deleteBtnCombina)
    deleteBtnCombina.addEventListener('click', function () {
      const combinaId = this.getAttribute('data-combina-id');
      // console.log(combinaId);
      stergeCombina(combinaId);
    });
});

import { stergeHeder } from './stergeHeder';

document.addEventListener('DOMContentLoaded', (event) => {
  const deleteBtnHeder = document.querySelector('.deleteBtnHeder');

  if (deleteBtnHeder)
    deleteBtnHeder.addEventListener('click', function () {
      const hederId = this.getAttribute('data-heder-id');
      // console.log(hederId);
      stergeHeder(hederId);
    });
});

import { stergePlug } from './stergePlug';

document.addEventListener('DOMContentLoaded', () => {
  const deleteBtnPlug = document.querySelector('.deleteBtnPlug');

  if (deleteBtnPlug)
    deleteBtnPlug.addEventListener('click', function () {
      const plugId = this.getAttribute('data-plug-id');
      // console.log(plugId);
      stergePlug(plugId);
    });
});

import { stergeCultivator } from './stergeCultivator';

document.addEventListener('DOMContentLoaded', () => {
  const deleteBtnCultivator = document.querySelector('.deleteBtnCultivator');

  if (deleteBtnCultivator)
    deleteBtnCultivator.addEventListener('click', function () {
      const cultivatorId = this.getAttribute('data-cultivator-id');
      // console.log(cultivatorId);
      stergeCultivator(cultivatorId);
    });
});

import { stergeSemanatoarePaioase } from './stergeSemanatoarePaioase';

document.addEventListener('DOMContentLoaded', () => {
  const deleteBtnSemanatoarePaioase = document.querySelector(
    '.deleteBtnSemanatoarePaioase'
  );

  if (deleteBtnSemanatoarePaioase)
    deleteBtnSemanatoarePaioase.addEventListener('click', function () {
      const semanatoareId = this.getAttribute('data-semanatoarePaioase-id');
      // console.log(semanatoareId);
      stergeSemanatoarePaioase(semanatoareId);
    });
});

import { stergeSemanatoarePlantatoare } from './stergeSemanatoarePlantatoare';

document.addEventListener('DOMContentLoaded', () => {
  const deleteBtnSemanatoarePlantatoare = document.querySelector(
    '.deleteBtnSemanatoarePlantatoare'
  );

  if (deleteBtnSemanatoarePlantatoare)
    deleteBtnSemanatoarePlantatoare.addEventListener('click', function () {
      const semanatoareId = this.getAttribute('data-semanatoarePlantatoare-id');
      // console.log(semanatoareId);
      stergeSemanatoarePlantatoare(semanatoareId);
    });
});

import { stergePulverizator } from './stergePulverizator';

document.addEventListener('DOMContentLoaded', () => {
  const deleteBtnPulverizator = document.querySelector(
    '.deleteBtnPulverizator'
  );

  if (deleteBtnPulverizator)
    deleteBtnPulverizator.addEventListener('click', function () {
      const pulverizatorId = this.getAttribute('data-pulverizator-id');
      // console.log(pulverizatorId);
      stergePulverizator(pulverizatorId);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const actualizareTractorForm = document.querySelector(
    '.form-actualizareTractor'
  );

  if (actualizareTractorForm) {
    console.log('Form found');
    actualizareTractorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Form submitted');

      // Get the slug from the URL
      const urlParts = window.location.pathname.split('/');
      const slug = urlParts.pop();

      // Send the slug along with the other form data to your PATCH function
      const name = document.getElementById('name').value;
      const power = document.getElementById('power').value;
      const functioningHours =
        document.getElementById('functioningHours').value;
      const timeSpentInTheFarm =
        document.getElementById('timeSpentInTheFarm').value;
      const usedAt = document.getElementById('usedAt').value;
      const maxSpeed = document.getElementById('maxSpeed').value;
      const category = document.getElementById('category').value;
      const maxRPM = document.getElementById('maxRPM').value;
      const rented = document.getElementById('rented').value;
      const description = document.getElementById('description').value;

      // Now you can call your PATCH function with the slug
      actualizareTractor(
        slug,
        name,
        power,
        functioningHours,
        timeSpentInTheFarm,
        usedAt,
        maxSpeed,
        category,
        maxRPM,
        rented,
        description
      );
    });
  }
});
