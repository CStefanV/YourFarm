///////////////////////////////////////////////////////////
//MODELE
///////////////////////////////////////////////////////////
const Tractor = require('../models/tractorModel');
const Combina = require('../models/combineModel');
const Heder = require('../models/headerModel');
const Plug = require('../models/plowModel');
const Cultivator = require('../models/cultivatorModel');
const SemanatoarePaioase = require('../models/seederModel');
const SemanatoarePlantatoare = require('../models/planterModel');
const Pulverizator = require('../models/sprayerModel');

const User = require('../models/userModel');

///////////////////////////////////////////////////////////
//FUNCTII UTILE
///////////////////////////////////////////////////////////
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getGeneral = (req, res) => {
  res.status(200).render('general', {
    title: 'Ferma ta',
  });
};

exports.getPaginaPrincipala = (req, res) => {
  res.status(200).render('paginaPrincipala', {
    title: 'Ferma ta',
  });
};

exports.getEchipamenteleMele = (req, res) => {
  res.status(200).render('echipamenteleMele', {
    title: 'Echipamente agricole',
  });
};

///////////////////////////////////////////////////////////
//ACTIVITATI:
///////////////////////////////////////////////////////////

exports.getUtilajePentruArat = (req, res) => {
  res.status(200).render('arat', {
    title: 'Utilaje pentru arat',
  });
};

exports.getUtilajePentruCultivat = (req, res) => {
  res.status(200).render('cultivat', {
    title: 'Utilaje pentru cultivat',
  });
};

exports.getUtilajePentruSemanat = (req, res) => {
  res.status(200).render('semanat', {
    title: 'Utilaje pentru semanat',
  });
};

exports.getUtilajePentruFertilizat = (req, res) => {
  res.status(200).render('fertilizat', {
    title: 'Utilaje pentru fertilizat',
  });
};

exports.getUtilajePentruRecoltat = (req, res) => {
  res.status(200).render('recoltat', {
    title: 'Utilaje pentru recoltat',
  });
};

///////////////////////////////////////////////////////////
//TRACTOARE
///////////////////////////////////////////////////////////
exports.getTractoare = catchAsync(async (req, res) => {
  const tractoare = await Tractor.find({ user: req.user._id });

  res.status(200).render('tractoare', {
    title: 'Tractoare',
    tractoare,
  });
});

exports.getTractor = catchAsync(async (req, res, next) => {
  const tractor = await Tractor.findOne({ slug: req.params.slug });

  if (!tractor) {
    return next(new AppError('Nu exista vreun tractor cu acest nume', 404));
  }

  res.status(200).render('tractor', {
    title: `${tractor.name}`,
    tractor,
  });
});

exports.adaugareTractor = (req, res) => {
  res.status(200).render('adaugareTractor', {
    title: 'Adăugare tractor',
  });
};

exports.updateTractor = catchAsync(async (req, res, next) => {
  try {
    const tractor = await Tractor.findOne({ slug: req.params.slug });

    if (!tractor) {
      console.log('Tractor not found.');
      return next(new AppError('Nu exista vreun tractor cu acest ID', 404));
    }

    // console.log('Tractor found:', tractor);

    res.status(200).render('updateTractor', {
      title: 'Actualizare date tractor',
      tractor,
    });
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
});

///////////////////////////////////////////////////////////
//COMBINE
///////////////////////////////////////////////////////////
exports.getCombine = catchAsync(async (req, res) => {
  const combine = await Combina.find({ user: req.user._id });
  res.status(200).render('combine', {
    title: 'Combine',
    combine,
  });
});

exports.getCombina = catchAsync(async (req, res, next) => {
  const combina = await Combina.findOne({ slug: req.params.slug });

  if (!combina) {
    return next(new AppError('Nu exista vreo combina cu acest nume', 404));
  }

  res.status(200).render('combina', {
    title: `${combina.name}`,
    combina,
  });
});

exports.adaugareCombina = (req, res) => {
  res.status(200).render('adaugareCombina', {
    title: 'Adăugare combină',
  });
};

///////////////////////////////////////////////////////////
//HEDERE
///////////////////////////////////////////////////////////
exports.getHedere = catchAsync(async (req, res) => {
  const hedere = await Heder.find({ user: req.user._id });
  res.status(200).render('hedere', {
    title: 'Hedere',
    hedere,
  });
});

exports.getHeder = catchAsync(async (req, res, next) => {
  const heder = await Heder.findOne({ slug: req.params.slug });
  if (!heder) {
    return next(new AppError('Nu exista vreun heder cu acest nume', 404));
  }

  res.status(200).render('heder', {
    title: `${heder.name}`,
    heder,
  });
});

exports.adaugareHeder = (req, res) => {
  res.status(200).render('adaugareHeder', {
    title: 'Adăugare heder',
  });
};

///////////////////////////////////////////////////////////
//PLUGURI
///////////////////////////////////////////////////////////

exports.getPluguri = catchAsync(async (req, res) => {
  const pluguri = await Plug.find({ user: req.user._id });
  res.status(200).render('pluguri', {
    title: 'Pluguri',
    pluguri,
  });
});

exports.getPlug = catchAsync(async (req, res, next) => {
  const plug = await Plug.findOne({ slug: req.params.slug });
  if (!plug) {
    return next(new AppError('Nu exista vreun plug cu acest nume', 404));
  }

  res.status(200).render('plug', {
    title: `${plug.name}`,
    plug,
  });
});

exports.adaugarePlug = (req, res) => {
  res.status(200).render('adaugarePlug', {
    title: 'Adăugare plug',
  });
};

///////////////////////////////////////////////////////////
//CULTIVATOARE
///////////////////////////////////////////////////////////
exports.getCultivatoare = catchAsync(async (req, res) => {
  const cultivatoare = await Cultivator.find({ user: req.user._id });

  res.status(200).render('cultivatoare', {
    title: 'Cultivatoare',
    cultivatoare,
  });
});

exports.getCultivator = catchAsync(async (req, res, next) => {
  const cultivator = await Cultivator.findOne({ slug: req.params.slug });
  if (!cultivator) {
    return next(new AppError('Nu exista vreun cultivator cu acest nume', 404));
  }

  res.status(200).render('cultivator', {
    title: `${cultivator.name}`,
    cultivator,
  });
});

exports.adaugareCultivator = (req, res) => {
  res.status(200).render('adaugareCultivator', {
    title: 'Adăugare cultivator',
  });
};

///////////////////////////////////////////////////////////
//SEMANATORI PAIOASE
///////////////////////////////////////////////////////////
exports.getSemanatoriPaioase = catchAsync(async (req, res) => {
  const semanatoriPaioase = await SemanatoarePaioase.find({
    user: req.user._id,
  });

  res.status(200).render('semanatoriPaioase', {
    title: 'Semanatori Paioase',
    semanatoriPaioase,
  });
});

exports.getSemanatoarePaioase = catchAsync(async (req, res, next) => {
  const semanatoarePaioase = await SemanatoarePaioase.findOne({
    slug: req.params.slug,
  });
  if (!semanatoarePaioase) {
    return next(
      new AppError('Nu exista vreo semanatoare de paioase cu acest nume', 404)
    );
  }

  res.status(200).render('semanatoarePaioase', {
    title: `${semanatoarePaioase.name}`,
    semanatoarePaioase,
  });
});

exports.adaugareSemanatoarePaioase = (req, res) => {
  res.status(200).render('adaugareSemanatoarePaioase', {
    title: 'Adăugare semănătoare',
  });
};

///////////////////////////////////////////////////////////
//SEMANATOARE PLANTAT
///////////////////////////////////////////////////////////
exports.getSemanatoriPlantatoare = catchAsync(async (req, res) => {
  const semanatoriPlantatoare = await SemanatoarePlantatoare.find({
    user: req.user._id,
  });

  res.status(200).render('semanatoriPlantatoare', {
    title: 'Semanatori Plantatoare',
    semanatoriPlantatoare,
  });
});

exports.getSemanatoarePlantatoare = catchAsync(async (req, res, next) => {
  const semanatoarePlantatoare = await SemanatoarePlantatoare.findOne({
    slug: req.params.slug,
  });
  if (!semanatoarePlantatoare) {
    return next(
      new AppError(
        'Nu exista vreo semanatoare care planteaza cu acest nume',
        404
      )
    );
  }

  res.status(200).render('semanatoarePlantatoare', {
    title: `${semanatoarePlantatoare.name}`,
    semanatoarePlantatoare,
  });
});

exports.adaugareSemanatoarePlantatoare = (req, res) => {
  res.status(200).render('adaugareSemanatoarePlantatoare', {
    title: 'Adăugare semănătoare',
  });
};

///////////////////////////////////////////////////////////
//PULVERIZATOARE
///////////////////////////////////////////////////////////
exports.getPulverizatoare = catchAsync(async (req, res) => {
  const pulverizatoare = await Pulverizator.find({ user: req.user._id });

  res.status(200).render('pulverizatoare', {
    title: 'Pulverizatoare',
    pulverizatoare,
  });
});

exports.getPulverizator = catchAsync(async (req, res, next) => {
  const pulverizator = await Pulverizator.findOne({
    slug: req.params.slug,
  });
  if (!pulverizator) {
    return next(
      new AppError('Nu exista vreun pulverizator cu acest nume', 404)
    );
  }

  res.status(200).render('pulverizator', {
    title: `${pulverizator.name}`,
    pulverizator,
  });
});

exports.adaugarePulverizator = (req, res) => {
  res.status(200).render('adaugarePulverizator', {
    title: 'Adăugare pulverizator',
  });
};

///////////////////////////////////////////////////////////
//HARTA
///////////////////////////////////////////////////////////
exports.getHarta = (req, res) => {
  res.status(200).render('harta', {
    title: 'Harta',
  });
};

///////////////////////////////////////////////////////////
//SIGN UP SI LOG IN
///////////////////////////////////////////////////////////

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Creare cont',
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Autentificare',
  });
};

///////////////////////////////////////////////////////////
//CONT UTILIZATOR
///////////////////////////////////////////////////////////

exports.getContUtilizator = (req, res) => {
  res.status(200).render('cont', {
    title: 'Cont utilizator',
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('cont', {
    title: 'Cont utilizator',
    user: updatedUser,
  });
});
