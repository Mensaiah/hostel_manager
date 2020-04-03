import { RoomType } from '../models';
import { validationResult } from 'express-validator';
const today = new Date();

const RoomTypeController = {
  createRoomType: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, number_of_beds, price, description } = req.body;
      const roomType = await RoomType.findOne({
        where: {
          name
        }
      });
      if (roomType) {
        return res
          .status(400)
          .json({ error: 'Room type with that name already exist' });
      }
      const newRoomType = await RoomType.create({
        name,
        number_of_beds,
        price,
        description
      });

      return res.status(200).json(newRoomType);
    } catch (error) {
      console.log(error);

      res.status(500).json('Server Error! Something is Wrong From Our Side');
    }
  },

  viewAllRoomTypes: async (req, res) => {
    try {
      const allRoomTypes = await RoomType.findAll();

      return res.status(200).json(allRoomTypes);
    } catch (error) {
      console.log(error);

      res.status(500).json('Server Error! Something is Wrong From Our Side');
    }
  },
  viewRoomTypeById: async (req, res) => {
    try {
      const {
        params: { id }
      } = req;
      const roomType = await RoomType.findOne({
        where: {
          id
        }
      });
      if (!roomType) {
        return res.status(404).json({ msg: 'Room Type not found ' });
      }

      return res.status(200).json(roomType);
    } catch (error) {
      if (error.original.code === '22P02') {
        return res.status(404).json({ msg: 'Room Type Not Found' });
      }

      res.status(500).json('Server Error! Something is Wrong From Our Side');
    }
  },
  editRoomType: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, number_of_beds, price, description } = req.body;

      const {
        params: { id }
      } = req;

      const checkRoomType = await RoomType.findOne({
        where: {
          id
        }
      });
      if (!checkRoomType) {
        return res.status(404).json({ msg: 'Room Type not found ' });
      }

      const roomType = await RoomType.findOne({
        where: {
          name
        }
      });
      if (roomType) {
        return res
          .status(400)
          .json({ error: 'Room type with that name already exist' });
      }

      const newRoomType = await RoomType.update(
        { name, number_of_beds, price, description, updatedAt: today },
        {
          where: {
            id
          }
        }
      );

      return res.status(200).json(newRoomType);
    } catch (error) {
      if (error.original.code === '22P02') {
        return res.status(404).json({ msg: 'Room Type Not Found' });
      }

      console.log(error);

      res.status(500).json('Server Error! Something is Wrong From Our Side');
    }
  },

  deleteRoomType: async (req, res) => {
    try {
      const {
        params: { id }
      } = req;

      const checkRoomType = await RoomType.findOne({
        where: {
          id
        }
      });
      if (!checkRoomType) {
        return res.status(400).json({ msg: 'Room Type not found ' });
      }

      await RoomType.destroy({
        where: {
          id
        }
      });
      res.status(200).json({ msg: 'Room Type Has Been Deleted ' });
    } catch (error) {
      console.log(error);
      res.status(500).json('Server Error! Something is Wrong From Our Side');
    }
  }
};

export default RoomTypeController;
