<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { TicketModel } from '@/models/ticket.model';
import { TicketService } from '@/services/ticket.service';
import { formatTime } from '@/utils';
import { ref } from 'vue';

const logout = useLogout()
const tickets = ref<TicketModel[]>()
TicketService.getTickets()
    .then(rsp => tickets.value = rsp.data)
    .catch(e => logout(e))

function doDelete(t: TicketModel) {
    TicketService.deleteTicket(t.ticketId)
        .then(rsp => tickets.value = tickets.value?.filter(ticket => ticket.ticketId !== t.ticketId))
        .catch(e => logout(e))
}

function makePaid(t: TicketModel) {
    TicketService.payTicket(t.ticketId)
        .then(rsp => tickets.value!.forEach(ticket => {
            if (ticket.ticketId == t.ticketId)
                ticket.paidAt = new Date().toISOString()
        }))
}
</script>

<template>
    <Navigation />
    <h3>Tickets</h3>
    <table class="table table-striped table-hover" v-if="tickets">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Destination</th>
                <th scope="col">Flight Number</th>
                <th scope="col">Airline</th>
                <th scope="col">Scheduled At</th>
                <th scope="col">Paid At</th>
                <th scope="col">Updated At</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="t of tickets" :key="t.ticketId">
                <th scope="row">{{ t.ticketId }}</th>
                <td>{{ t.flight.destination }}</td>
                <td>{{ t.flight.flightNumber }}</td>
                <td>{{ t.airline.name }}</td>
                <td>{{ formatTime(t.flight.estimatedAt ?? t.flight.scheduledAt) }}</td>
                <td>
                    <template v-if="t.paidAt">
                        <span class="fw-bold text-success">{{ formatTime(t.paidAt) }}</span>
                    </template>
                    <template v-else>
                        <span class="fw-bold text-danger">Not yet!</span>
                    </template>
                </td>
                <td>{{ formatTime(t.updatedAt ?? t.createdAt) }}</td>
                <td>
                    <div class="btn-group" v-if="!t.paidAt">
                        <button class="btn btn-sm btn-light" @click="makePaid(t)">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                        <RouterLink :to="`/ticket/${t.ticketId}`" class="btn btn-sm btn-success">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </RouterLink>
                        <button class="btn btn-sm btn-danger" @click="doDelete(t)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                    <div class="btn-group" v-else>
                        <RouterLink :to="`/ticket/${t.ticketId}/qrcode`" class="btn btn-sm btn-primary">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </RouterLink>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <Loading v-else />
</template>