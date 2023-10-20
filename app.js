/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tractorRouter = require('./routes/tractorRoutes');
const userRouter = require('./routes/userRoutes');
const combineRouter = require('./routes/combineRoutes');
const cultivatorRouter = require('./routes/cultivatorRoutes');
const headerRouter = require('./routes/headerRoutes');
const seederRouter = require('./routes/seederRoutes');
const planterRouter = require('./routes/planterRoutes');
const sprayerRouter = require('./routes/sprayerRoutes');
const plowRouter = require('./routes/plowRoutes');

const { protect } = require('./controllers/authController');

const viewRouter = require('./routes/viewRoutes');

const app = express();

const cspOptions = {
  directives: {
    scriptSrc: [
      'self',
      'unsafe-inline',
      'https://unpkg.com',
      'https://api.mapbox.com',
    ],
  },
};

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message:
    'Prea multe cereri de la această adresă IP, vă rugăm să încercați din nou peste o oră.',
});

app.use('/api', limiter);

app.use(
  express.json({
    limit: '100kb',
  })
);
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(hpp());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', viewRouter);
app.use('/api/v1/tractoare', tractorRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/combine', combineRouter);
app.use('/api/v1/cultivatoare', cultivatorRouter);
app.use('/api/v1/hedere', headerRouter);
app.use('/api/v1/semanatoriPaioase', seederRouter);
app.use('/api/v1/semanatoriPlanters', planterRouter);
app.use('/api/v1/pulverizatoare', sprayerRouter);
app.use('/api/v1/pluguri', plowRouter);

const Marker = require('./models/markerModel');

app.post('/api/markers', protect, (req, res) => {
  const { name, lat, lng } = req.body;
  // eslint-disable-next-line prefer-destructuring

  const marker = new Marker({
    name: name,
    lat: lat,
    lng: lng,
    user: req.user._id,
  });

  marker
    .save()
    .then(() => {
      res.status(201).json({ message: 'Pin salvat cu succes' });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get('/api/markers', protect, (req, res) => {
  Marker.find({ user: req.user._id })
    .then((markers) => res.json(markers))
    .catch((err) => res.status(500).json({ error: err.message }));
});
//-----------------------------------
app.all('*', (req, res, next) => {
  next(
    new AppError(`Nu se poate găsi ${req.originalUrl} pe acest server`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
