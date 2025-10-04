import Errors, { HttpCode } from "../libs/Errors.js";
import BookingService from "../model/bookingService.js";

const bookingController = {};
const bookingService = new BookingService();

// Reserve bookigng
bookingController.reserve = async (req, res) => {
  try {
    const result = await bookingService.reserveSeat(req.body);
    res.status(HttpCode.CREATED).json(result);
  } catch (err) {
    console.error("Error, reserve:", err);
    if (err instanceof Errors) return res.status(err.code).json(err);
    return res.status(500).json({ code: 500, message: "Server error" });
  }
};

// Get list of booking 
bookingController.list = async (_req, res) => {
  try {
    const rows = await bookingService.getBookings();
    res.status(HttpCode.OK).json(rows);
  } catch (err) {
    console.error("Error, list:", err);
    if (err instanceof Errors) return res.status(err.code).json(err);
    return res.status(500).json({ code: 500, message: "Server error" });
  }
};

// Get one of bookings
bookingController.getOne = async (req, res) => {
  try {
    const row = await bookingService.getBooking(req.params.id);
    res.status(HttpCode.OK).json(row);
  } catch (err) {
    console.error("Error, getOne:", err);
    if (err instanceof Errors) return res.status(err.code).json(err);
    return res.status(500).json({ code: 500, message: "Server error" });
  }
};

// Delete on of bookings
bookingController.remove = async (req, res) => {
  try {
    const deleted = await bookingService.removeBooking(req.params.id);
    res.status(HttpCode.OK).json(deleted);
  } catch (err) {
    console.error("Error, remove:", err);
    if (err instanceof Errors) return res.status(err.code).json(err);
    return res.status(500).json({ code: 500, message: "Server error" });
  }
};

export default bookingController;
