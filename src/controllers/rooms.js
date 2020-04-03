//

import { Room, RoomType } from '../models';
import { validationResult } from 'express-validator';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

const RoomController = {
  createRoom: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { room_number, room_type } = req.body;

      const room = await Room.findOne({
        where: {
          room_number
        }
      });
      if (room) {
        return res.status(400).json({ msg: 'Room Number Already Exist' });
      }

      const roomType = await RoomType.findOne({
        where: {
          name: {
            [Op.iLike]: `${room_type}`
          }
        }
      });
      if (!roomType) {
        return res.status(400).json({ msg: 'Room type does not exists' });
      }

      const newRoom = await Room.create({
        room_number,
        typeId: roomType.id
      });
      return res.status(200).json(newRoom);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error! Don't worry we are on it");
    }
  },
  getAllRooms: async (req, res) => {
    try {
      const rooms = await Room.findAll({
        include: [
          {
            attributes: ['name', 'price', 'number_of_beds'],
            model: RoomType,
            as: 'roomType'
          }
        ]
      });

      res.status(200).json(rooms);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error! Don't worry we are on it");
    }
  },
  getRoomById: async (req, res) => {
    try {
      const {
        params: { id }
      } = req;
      const room = await Room.findOne({
        where: {
          id
        },
        include: [
          {
            attributes: ['name', 'price', 'number_of_beds'],
            model: RoomType,
            as: 'roomType'
          }
        ]
      });

      if (!room) {
        return res.status(400).json('Room Not Found');
      }

      return res.status(200).json(room);
    } catch (error) {
      if (error.original.code === '22P02') {
        return res.status(404).json({ msg: 'Room Type Not Found' });
      }
      console.log(error);
      res.status(500).json("Server Error! Don't worry we are on it");
    }
  },
  editRoomById: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { room_number, room_type } = req.body;

      const room = await Room.findOne({
        where: {
          room_number
        }
      });
      if (!room) {
        return res.status(400).json({ msg: 'Room does not exist' });
      }

      const roomType = await RoomType.findOne({
        where: {
          name: {
            [Op.iLike]: `${room_type}`
          }
        }
      });
      if (!roomType) {
        return res.status(400).json({ msg: 'Room type does not exists' });
      }

      const newRoom = await Room.update(
        {
          room_number,
          typeId: roomType.id
        },
        {
          where: {
            id: room.id
          }
        }
      );
      return res.status(200).json(newRoom);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error! Don't worry we are on it");
    }
  },
  deleteRoomById: async (req, res) => {
    try {
      const {
        params: { id }
      } = req;

      const checkRoom = await Room.findOne({
        where: {
          id
        }
      });
      if (!checkRoom) {
        return res.status(400).json({ msg: 'Room Type not found ' });
      }

      await Room.destroy({
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

export default RoomController;
