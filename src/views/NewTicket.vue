<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { AirlineModel } from '@/models/airline.model';
import type { FlightModel } from '@/models/flight.model';
import { AirlineService } from '@/services/airline.service';
import { FlightService } from '@/services/flight.service';
import { TicketService } from '@/services/ticket.service';
import { destinationImage } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const logout = useLogout()
const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const flight = ref<FlightModel>()
const airlines = ref<AirlineModel[]>()
const ticket = ref({
    flightId: id,
    airlineId: 0,
})

FlightService.getFlightById(id)
    .then(rsp => flight.value = rsp.data)

AirlineService.getAirlines()
    .then(rsp => {
        ticket.value.airlineId = rsp.data[0].airlineId
        airlines.value = rsp.data
    })
    .catch(e => logout(e))

function doCreate() {
    TicketService.createTicket(ticket.value)
        .then(rsp => router.push('/ticket'))
        .catch(e => logout(e))
}
</script>

<template>
    <Navigation />
    <div class="custom-form" v-if="flight">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="`/flight/${flight.id}`">{{ flight.destination }}</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Book Now</li>
            </ol>
        </nav>
        <h3>Create Ticket</h3>
        <div class="card">
            <img :src="destinationImage(flight)" class="card-img-top" :alt="flight.destination">
            <div class="card-body">
                <form v-on:submit.prevent="doCreate">
                    <div class="mb-3">
                        <label for="num" class="form-label">Flight Number:</label>
                        <input type="text" class="form-control" id="num" :value="flight.flightNumber" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="dest" class="form-label">Destination:</label>
                        <input type="text" class="form-control" id="dest" :value="flight.destination" disabled>
                    </div>
                    <div class="mb-3" v-if="airlines">
                        <label for="airline" class="form-label">Airline:</label>
                        <select class="form-select" id="airline" v-model="ticket.airlineId">
                            <option v-for="a of airlines" :key="a.airlineId" :value="a.airlineId">{{ a.name }}</option>
                        </select>
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