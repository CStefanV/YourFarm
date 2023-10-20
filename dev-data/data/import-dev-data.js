const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tractor = require('../../models/tractorModel');
const Combine = require('../../models/combineModel');
const Cultivator = require('../../models/cultivatorModel');
const Header = require('../../models/headerModel');
const Planter = require('../../models/planterModel');
const Plow = require('../../models/plowModel');
const Seeder = require('../../models/seederModel');
const Sprayer = require('../../models/sprayerModel');
const User = require('../../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true, 
  })
  .then(() => console.log('DB connection successful'));

const tractoare = JSON.parse(
  fs.readFileSync(`${__dirname}/tractoare.json`, 'utf-8')
);
const combine = JSON.parse(
  fs.readFileSync(`${__dirname}/combine.json`, 'utf-8')
);
const cultivatoare = JSON.parse(
  fs.readFileSync(`${__dirname}/cultivatoare.json`, 'utf-8')
);
const hedere = JSON.parse(fs.readFileSync(`${__dirname}/hedere.json`, 'utf-8'));
const pluguri = JSON.parse(
  fs.readFileSync(`${__dirname}/pluguri.json`, 'utf-8')
);
const semanatoriPaioase = JSON.parse(
  fs.readFileSync(`${__dirname}/semanatoriPaioase.json`, 'utf-8')
);
const semanatoriPlanters = JSON.parse(
  fs.readFileSync(`${__dirname}/semanatoriPlanters.json`, 'utf-8')
);
const stropitori = JSON.parse(
  fs.readFileSync(`${__dirname}/stropitori.json`, 'utf-8')
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

const importData = async () => {
  try {
    await Tractor.create(tractoare);
    await Combine.create(combine);
    await Cultivator.create(cultivatoare);
    await Header.create(hedere);
    await Planter.create(semanatoriPlanters);
    await Seeder.create(semanatoriPaioase);
    await Plow.create(pluguri);
    await Sprayer.create(stropitori);
    await User.create(users, { validateBeforeSave: false });
    console.log('Data succsessfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tractor.deleteMany();
    await Combine.deleteMany();
    await Cultivator.deleteMany();
    await Seeder.deleteMany();
    await Header.deleteMany();
    await Planter.deleteMany();
    await Plow.deleteMany();
    await Sprayer.deleteMany();
    await User.deleteMany();
    console.log('Data succsessfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
