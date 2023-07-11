import express from 'express'
import { createFlight, getFlights, getSeveralLowPriceFlights } from '../controllers/flight.js'

const router = express.Router()


router.get("/several", getSeveralLowPriceFlights)
router.get("/", getFlights)
router.post("/", createFlight)


export default router;