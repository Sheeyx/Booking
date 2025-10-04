import { UniqueConstraintError } from "sequelize";
import Errors, { HttpCode, Message } from "../libs/Errors.js";
import sequelize from "../db/sequelize.js";
import Event from "../schema/Event.model.js";
import Booking from "../schema/Booking.model.js";

class BookingService {
  async reserveSeat(input) {
    const { eventId, userId } = input ?? {};
    if (!Number.isInteger(eventId) || !userId) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.INVALID_INPUT);
    }

    return sequelize.transaction({ isolationLevel: "READ COMMITTED" }, async (t) => {
      // 1) Lock the event row
      const event = await Event.findByPk(eventId, { transaction: t, lock: t.LOCK.UPDATE });
      if (!event) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

      // 2) No double booking
      const existing = await Booking.findOne({ where: { eventId, userId }, transaction: t });
      if (existing) throw new Errors(HttpCode.BAD_REQUEST, Message.ALREADY_EXISTS);
      

      // 3) Check capacity (no lock on aggregate; safe under event row lock)
      const booked = await Booking.count({ where: { eventId }, transaction: t });
      if (booked >= event.totalSeats) throw new Errors(HttpCode.BAD_REQUEST, Message.NO_SEATS_AVAILABLE);

      // 4) Create booking
      try {
        const created = await Booking.create({ eventId, userId }, { transaction: t });
        return created;
      } catch (err) {
        if (err instanceof UniqueConstraintError) {
          throw new Errors(HttpCode.BAD_REQUEST, Message.ALREADY_EXISTS);
        }
        throw err;
      }
    });
  }

  async getBookings() {
    const rows = await Booking.findAll({ include: [{ model: Event }], order: [["id", "ASC"]] });
    if (!rows || rows.length === 0) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return rows;
  }

  async getBooking(id) {
    const bookingId = Number(id);
    if (!Number.isInteger(bookingId)) throw new Errors(HttpCode.BAD_REQUEST, Message.INVALID_INPUT);
    const row = await Booking.findByPk(bookingId, { include: [{ model: Event }] });
    if (!row) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return row;
  }

  async removeBooking(id) {
    const bookingId = Number(id);
    if (!Number.isInteger(bookingId)) throw new Errors(HttpCode.BAD_REQUEST, Message.INVALID_INPUT);
    const row = await Booking.findByPk(bookingId);
    if (!row) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    await row.destroy();
    return row;
  }
}

export default BookingService;
