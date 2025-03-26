<script setup lang="ts">
import type { FlightModel } from '@/models/flight.model';
import { FlightService } from '@/services/flight.service';
import { ref } from 'vue';

const flights = ref<FlightModel[]>()
FlightService.getFlights()
    .then(rsp => flights.value = rsp.data)
</script>

<template>
    <div class="wrapper mb-3 mt-3">
        <div class="card" style="width: 18rem;" v-for="f of flights" :key="f.id">
            <img :src="`https://img.pequla.com/destination/${f.destination.toLowerCase().split(' ')[0]}.jpg`"
                class="card-img-top" :alt="f.destination">
            <div class="card-body">
                <h5 class="card-title">{{ f.destination }}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">{{ f.flightNumber }}</h6>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">An item</li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
        </div>
    </div>
</template>

<style>
.wrapper {
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
