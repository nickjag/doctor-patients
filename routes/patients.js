const { Router } = require('express');

const {
  requireAuth,
  isOwner,
  isDoctor,
  isDoctorOrOwner,
  setIdByUsername,
} = require('../common/passport');

const getAllPatients = require('../controllers/patients_get_all');
const getByUserId = require('../controllers/patients_get_by_user_id');
const updateByUserId = require('../controllers/patients_update_by_user_id');

const router = Router();

// get all patients

router.get('/', requireAuth, isDoctor, getAllPatients);

// get patient by username

router.get(
  '/:username',
  requireAuth,
  setIdByUsername,
  isDoctorOrOwner,
  getByUserId,
);

// update patient data

router.patch('/:userId', requireAuth, isOwner, updateByUserId);

module.exports = router;
