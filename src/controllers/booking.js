import { Booking, Room, RoomType } from '../models';
import { validationResult } from 'express-validator';
import { QueryTypes } from 'sequelize';
import db from '../models';

const BookingsController = {
  checkRooms: async (req, res) => {
    const { checkin, checkout, guests } = req.params;
    console.log(req.params);
    try {
      const emptyRooms = await db.sequelize.query(
        `SELECT r.id as room_id , r.room_number, price , price * ${guests} AS "totalAmount",name AS roomName,  (rt.number_of_beds - subquery."activeBookings") AS available_rooms

      FROM "Rooms" as r
      JOIN "RoomTypes" as rt
      ON r."typeId" = rt.id
      join
      (
        
        select r.id as room_id,  COUNT(b.id) as "activeBookings" from  "Rooms" as r
      
      left JOIN  "Bookings" AS b
      on b."roomId" = r.id
      -- where b."checkIn" < ${checkout} AND b."checkOut" > ${checkin}
      GROUP BY r.id
      ) AS subquery
      on subquery.room_id = r.id
      
      WHERE (rt.number_of_beds - subquery."activeBookings") >= ${guests}
      
      ;`,
        {
          type: QueryTypes.SELECT
        }
      );
      console.log(checkin);

      return res.status(200).json(emptyRooms);
    } catch (error) {
      console.log(error);
      res.status(500).json('sever error');
    }
  },

  createRoom: async (req, res) => {
    try {
      const {
        id,

        NumberOfGuests,
        totalAmount,
        checkIn,
        checkOut
      } = req.body;
      const booking = await Booking.create({
        roomId: id,
        NumberOfGuests,
        totalAmount,
        checkIn,
        checkOut,
        dateBooked: Date.now()
      });
      return res.status(200).json(booking);
    } catch (error) {
      console.log(error);

      res.status(500).json('Server Error');
    }
  }
};

export default BookingsController;
