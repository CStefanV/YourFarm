const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// eslint-disable-next-line import/no-useless-path-segments
const Cultivator = require('./../../models/cultivatorModel');

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

//READ JSON FILE
const cultivators = JSON.parse(
  fs.readFileSync(`${__dirname}/cultivatoare.json`, 'utf-8')
);

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Cultivator.create(cultivators);
    console.log('Data succsessfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Cultivator.deleteMany();
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
