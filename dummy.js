require('dotenv').config();

const Routine = require('./models/routine');
const Workout = require('./models/workout');
const Exercise = require('./models/exercise');
const Routine_exercise = require('./models/routine_exercise');
const Actual = require('./models/actual');
const User = require('./models/user');
const User_routine = require('./models/user_routine');

// Routine.sync();
// Exercise.sync();
// Routine_exercise.sync();
// Workout.sync({force: true});
// Actual.sync({force: true});
// User.sync({force: true});
// User_routine.sync({force: true});
