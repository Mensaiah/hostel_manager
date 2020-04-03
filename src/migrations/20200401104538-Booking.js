'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('Bookings', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      roomId: {
        type: Sequelize.UUID,
        references: {
          model: 'RoomTypes',
          key: 'id'
        }
      },

      NumberOfGuests: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      checkIn: {
        type: Sequelize.DATE,

        allowNull: false
      },
      checkOut: {
        type: Sequelize.DATE,

        allowNull: false
      },
      dateBooked: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      totalAmount: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('Bookings');
  }
};
