import type { FlightModel } from "./flight.model"

export interface TicketModel {
    ticketId: number
    flightId: number
    airlineId: number
    paidAt: string | null
    createdAt: string
    updatedAt: string | null
    flight: FlightModel
    airline: {
        airlineId: number,
        name: string
    }
}