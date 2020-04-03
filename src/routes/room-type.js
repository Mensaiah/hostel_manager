import express from 'express';
import { check } from 'express-validator';
import RoomTypeController from '../controllers/roomtypes';
const router = express.Router();

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('number_of_beds', 'Number of Beds is required').not().isEmpty(),
    check('price', 'Price for this room is required').not().isEmpty(),
    check('description', 'Description for this room is required')
      .not()
      .isEmpty()
  ],
  RoomTypeController.createRoomType
);

router.get('/', RoomTypeController.viewAllRoomTypes);
router.get('/:id', RoomTypeController.viewRoomTypeById);
router.put(
  '/:id',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('number_of_beds', 'Number of Beds is required').not().isEmpty(),
    check('price', 'Price for this room is required').not().isEmpty(),
    check('description', 'Description for this room is required')
      .not()
      .isEmpty()
  ],
  RoomTypeController.editRoomType
);
router.delete('/:id', RoomTypeController.deleteRoomType);

export default router;
