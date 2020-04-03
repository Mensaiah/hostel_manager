import { Bookings, Room, RoomType } from '../models';
import { validationResult } from 'express-validator';
import Sequelize, { QueryTypes } from 'sequelize';

const BookingsController = {
  checkRooms: async (req, res) => {
    const { checkin, checkout, guests } = req.params;
    console.log(req.params);
    try {
      const emptyRooms = await Sequelize.query(
        `SELECT r.room_number, price , price * ${guests} AS "totalAmount",name AS 'roomName,  (rt.number_of_beds - subquery."activeBookings") AS available_rooms

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
      
      WHERE (rt.number_of_beds - subquery."activeBookings") >= 3
      
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
  }
};

export default BookingsController;
