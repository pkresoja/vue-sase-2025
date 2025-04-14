<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { AirlineModel } from '@/models/airline.model';
import type { TicketModel } from '@/models/ticket.model';
import { AirlineService } from '@/services/airline.service';
import { TicketService } from '@/services/ticket.service';
import { formatTime } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const logout = useLogout()
const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const ticket = ref<TicketModel>()
const airlines = ref<AirlineModel[]>()

TicketService.getTicketById(id)
    .then(rsp => ticket.value = rsp.data)
    .catch(e => logout(e))

AirlineService.getAirlines()
    .then(rsp => airlines.value = rsp.data)
    .catch(e => logout(e))

function doUpdate() {
    TicketService.updateTicket(id, ticket.value)
        .then(rsp => router.push('/ticket'))
        .catch(e => logout(e))
}
</script>

<template>
    <Navigation />
    <div class="custom-form" v-if="ticket">
        <h1>Edit Ticket</h1>
        <form v-on:submit.prevent="doUpdate">
            <h3>ONLY UPADTE IS DONE, IMPLEMENT CREATE AND MAKE THE EDIT PAGE LOOK BETTER</h3>
            <div class="mb-3">
                <label for="id" class="form-label">ID:</label>
                <input type="number" class="form-control" id="id" :value="ticket.ticketId" disabled>
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Flight:</label>
                <input type="text" class="form-control" id="name" :value="ticket.flight.destination" disabled>
            </div>
            <div class="mb-3" v-if="airlines">
                <label for="airline" class="form-label">Airline:</label>
                <select class="form-select" id="airline" v-model="ticket.airlineId">
                    <option v-for="a of airlines" :key="a.airlineId" :value="a.airlineId">{{ a.name }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="updated" class="form-label">Updated At:</label>
                <input type="text" class="form-control" id="updated"
                    :value="formatTime(ticket.updatedAt ?? ticket.createdAt)" disabled>
            </div>
            <button class="btn btn-primary">
                <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
        </form>
    </div>
</template>