<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { AirlineModel } from '@/models/airline.model';
import type { TicketModel } from '@/models/ticket.model';
import { AirlineService } from '@/services/airline.service';
import { TicketService } from '@/services/ticket.service';
import { destinationImage, formatTime } from '@/utils';
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
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/ticket">Tickets</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">{{ ticket.flight.destination }}</li>
            </ol>
        </nav>
        <h3>Edit Ticket</h3>
        <div class="card">
            <img :src="destinationImage(ticket.flight)" class="card-img-top" :alt="ticket.flight.destination">
            <div class="card-body">
                <form v-on:submit.prevent="doUpdate">
                    <div class="mb-3">
                        <label for="id" class="form-label">ID:</label>
                        <input type="number" class="form-control" id="id" :value="ticket.ticketId" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="dest" class="form-label">Destination:</label>
                        <input type="text" class="form-control" id="dest" :value="ticket.flight.destination" disabled>
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
        </div>
    </div>
    <Loading v-else />
</template>