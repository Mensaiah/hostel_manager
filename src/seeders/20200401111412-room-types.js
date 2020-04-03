'use strict';
const today = new Date();
const uuidv4 = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert(
      'RoomTypes',
      [
        {
          id: uuidv4(),
          name: 'Mixed Dorm Room Small',
          number_of_beds: 5,
          price: 5000,
          description: ' Men of Honor',
          createdAt: today
        },

        {
          id: uuidv4(),
          name: 'Female Dorm Room',
          number_of_beds: 4,
          price: 12000,
          description: 'This is a female',
          createdAt: today
        },

        {
          id: uuidv4(),
          name: 'Mixed Dorm Room Large',
          number_of_beds: 8,
          price: 1200,
          description: 'This is a mixed Room',
          createdAt: today
        },
        {
          id: uuidv4(),

          name: 'Deluxe Room',
          number_of_beds: 2,
          price: 12000,
          description: 'This is a Deluxe Room',
          createdAt: today
        },
        {
          id: uuidv4(),

          name: 'Standard Room',
          number_of_beds: 2,
          price: 12000,
          description: 'This is a Standard Room',
          createdAt: today
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('RoomTypes', null, {});
  }
};
