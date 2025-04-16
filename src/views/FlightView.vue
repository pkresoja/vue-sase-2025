<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { FlightModel } from '@/models/flight.model';
import { FlightService } from '@/services/flight.service';
import { destinationImage, formatTime } from '@/utils';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const logout = useLogout()
const route = useRoute()
const id = Number(route.params.id)
const flight = ref<FlightModel>()

FlightService.getFlightById(id)
    .then(rsp => flight.value = rsp.data)
    .catch(e => logout(e))
</script>

<template>
    <Navigation />
    <div v-if="flight">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">{{ flight.destination }}</li>
            </ol>
        </nav>
        <div class="row mb-3">
            <div class="col-6">
                <img :src="destinationImage(flight)" :alt="flight.destination" class="img-fluid">
            </div>
            <div class="col-6">
                <div class="card">
                    <div class="card-header">
                        <h3>{{ flight.destination }}</h3>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <i class="fa-solid fa-hashtag"></i> Number: {{ flight.flightNumber }}
                        </li>
                        <li class="list-group-item">
                            <i class="fa-solid fa-clock-rotate-left"></i> {{ formatTime(flight.estimatedAt ??
                                flight.scheduledAt) }}
                        </li>
                        <li class="list-group-item">
                            <i class="fa-solid fa-plane"></i> Plane: {{ flight.plane }}
                        </li>
                        <li class="list-group-item" v-if="flight.gate">
                            <i class="fa-solid fa-circle-info"></i> Gate: {{ flight.gate }}
                        </li>
                        <li class="list-group-item">
                            <i class="fa-solid fa-circle-info"></i> Terminal: {{ flight.terminal }}
                        </li>
                        <li class="list-group-item" v-if="flight.connectedType === '1'">
                            <i class="fa-solid fa-link"></i> Connected: {{ flight.connectedFlight }}
                        </li>
                    </ul>
                    <div class="card-body">
                        <div class="btn-group">
                            <RouterLink :to="`/flight/${flight.id}/book`" class="btn btn-sm btn-success">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i> Book Now
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <iframe class="mx-auto" height="400"
                :src="`https://www.google.com/maps?output=embed&q=${flight.destination}`" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade" id="gmaps"></iframe>
        </div>
    </div>
</template>