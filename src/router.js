import express from "express";
import eventController from "./controller/eventController.js";
import bookingController from "./controller/bookingController.js";

const router = express.Router();

// Event Routes

router.post("/event/create", eventController.createEvent);
router.put("/event/update/:id", eventController.updateEvent);
router.get("/event/get", eventController.getEvents);
router.get("/event/:id", eventController.getEvent);
router.delete("/event/remove/:id", eventController.removeEvent);

// Booking Routes

router.post("/booking/reserve", bookingController.reserve);
router.get("/booking", bookingController.list);
router.get("/booking/:id", bookingController.getOne);
router.delete("/booking/:id", bookingController.remove);

// Simple test route

router.get("/event/say", (req, res) => {
  res.send("hello");
});

export default router;
