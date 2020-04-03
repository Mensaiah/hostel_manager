import express from 'express';
import { check } from 'express-validator';
import RoomController from '../controllers/rooms';
const router = express.Router();

router.post(
  '/',
  [
    check('room_number', 'Room Number is required').not().isEmpty().isNumeric(),
    check('room_type', 'Room Type is required').not().isEmpty()
  ],
  RoomController.createRoom
);
router.get('/', RoomController.getAllRooms);
router.get('/:id', RoomController.getRoomById);
router.put(
  '/:id',
  [
    check('room_number', 'Room Number is required').not().isEmpty().isNumeric(),
    check('room_type', 'Room Type is required').not().isEmpty()
  ],
  RoomController.editRoomById
);
router.delete('/:id', RoomController.deleteRoomById);

export default router;
