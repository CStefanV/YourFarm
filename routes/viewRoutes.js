const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(authController.isLoggedIn);

router.get('/', viewsController.getGeneral);
router.get(
  '/paginaPrincipala',
  authController.protect,
  viewsController.getPaginaPrincipala
);
router.get(
  '/echipamenteleMele',
  authController.protect,
  viewsController.getEchipamenteleMele
);
//ACTIVITATI:

router.get(
  '/utilajePentruArat',
  authController.protect,
  viewsController.getUtilajePentruArat
);

router.get(
  '/utilajePentruCultivat',
  authController.protect,
  viewsController.getUtilajePentruCultivat
);

router.get(
  '/utilajePentruSemanat',
  authController.protect,
  viewsController.getUtilajePentruSemanat
);

router.get(
  '/utilajePentruFertilizat',
  authController.protect,
  viewsController.getUtilajePentruFertilizat
);

router.get(
  '/utilajePentruRecoltat',
  authController.protect,
  viewsController.getUtilajePentruRecoltat
);

//---------------------------
router.get(
  '/listaTractoare',
  authController.protect,
  viewsController.getTractoare
);
router.get(
  '/tractor/:slug',
  authController.protect,
  viewsController.getTractor
);
router.get('/listaCombine', authController.protect, viewsController.getCombine);
router.get(
  '/combina/:slug',
  authController.protect,
  viewsController.getCombina
);

router.get('/listaHedere', authController.protect, viewsController.getHedere);
router.get('/heder/:slug', authController.protect, viewsController.getHeder);

router.get('/listaPluguri', authController.protect, viewsController.getPluguri);
router.get('/plug/:slug', authController.protect, viewsController.getPlug);

router.get(
  '/listaCultivatoare',
  authController.protect,
  viewsController.getCultivatoare
);
router.get(
  '/cultivator/:slug',
  authController.protect,
  viewsController.getCultivator
);

router.get(
  '/listaSemanatoriPaioase',
  authController.protect,
  viewsController.getSemanatoriPaioase
);
router.get(
  '/semanatoarePaioase/:slug',
  authController.protect,
  viewsController.getSemanatoarePaioase
);

router.get(
  '/listaSemanatoriPlantatoare',
  authController.protect,
  viewsController.getSemanatoriPlantatoare
);
router.get(
  '/semanatoarePlantatoare/:slug',
  authController.protect,
  viewsController.getSemanatoarePlantatoare
);

router.get(
  '/listaPulverizatoare',
  authController.protect,
  viewsController.getPulverizatoare
);
router.get(
  '/pulverizator/:slug',
  authController.protect,
  viewsController.getPulverizator
);

router.get('/harta', authController.protect, viewsController.getHarta);

router.get('/signup', viewsController.getSignupForm);
router.get('/login', viewsController.getLoginForm);

router.get('/cont', authController.protect, viewsController.getContUtilizator);

router.post(
  '/trimite-date-utilizator',
  authController.protect,
  viewsController.updateUserData
);

router.get(
  '/tractoare',
  authController.protect,
  viewsController.adaugareTractor
);

router.get('/combine', authController.protect, viewsController.adaugareCombina);

router.get('/hedere', authController.protect, viewsController.adaugareHeder);

router.get('/pluguri', authController.protect, viewsController.adaugarePlug);

router.get(
  '/cultivatoare',
  authController.protect,
  viewsController.adaugareCultivator
);

router.get(
  '/semanatoriPaioase',
  authController.protect,
  viewsController.adaugareSemanatoarePaioase
);

router.get(
  '/semanatoriPlanters',
  authController.protect,
  viewsController.adaugareSemanatoarePlantatoare
);

router.get(
  '/pulverizatoare',
  authController.protect,
  viewsController.adaugarePulverizator
);

router.get(
  '/actualizareTractor/:slug',
  authController.protect,
  viewsController.updateTractor
);

module.exports = router;
