import express from 'express';
import { check } from 'express-validator';
import BookingsController from '../controllers/booking';
const router = express.Router();

router.get(
  '/checkrooms/:guests/:checkin/:checkout',
  BookingsController.checkRooms
);

router.post('/create', BookingsController.createRoom);

export default router;
