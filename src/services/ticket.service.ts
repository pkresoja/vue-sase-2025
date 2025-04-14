import type { TicketModel } from "@/models/ticket.model";
import { MainService } from "./main.service";

export class TicketService {
    static async getTickets() {
        return await MainService.useAxios<TicketModel[]>('/ticket')
    }

    static async getTicketById(id: number) {
        return await MainService.useAxios<TicketModel>(`/ticket/${id}`)
    }

    static async createTicket(model: any) {
        return await MainService.useAxios(`/ticket`, 'post', model)
    }

    static async updateTicket(id: number, model: any) {
        return await MainService.useAxios(`/ticket/${id}`, 'put', model)
    }

    static async deleteTicket(id: number) {
        return await MainService.useAxios(`/ticket/${id}`, 'delete')
    }
}