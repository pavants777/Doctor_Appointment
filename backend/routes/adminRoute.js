const express = require('express');
const { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard } = require('../controllers/adminController');
const { changeAvailablity } = require('../controllers/doctorController');
const upload = require('../middlewares/multer');
const authAdmin = require('../middlewares/authAdmin');

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailablity);
adminRouter.get('/appointments', authAdmin, appointmentsAdmin);
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel);
adminRouter.get('/dashboard', authAdmin, adminDashboard);

module.exports = adminRouter;
