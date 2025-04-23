<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { TicketModel } from '@/models/ticket.model';
import { TicketService } from '@/services/ticket.service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import QRCodeVue3 from "qrcode-vue3";
import { formatTime } from '@/utils';

const route = useRoute()
const logout = useLogout()
const id = Number(route.params.id)
const ticket = ref<TicketModel>()

TicketService.getTicketById(id)
    .then(rsp => ticket.value = rsp.data)
    .catch(e => logout(e))
</script>

<template>
    <Navigation />
    <h3 class="text-center">Printable Ticket</h3>
    <div class="card mb-3" v-if="ticket">
        <div class="row g-0">
            <div class="col-md-4">
                <QRCodeVue3 :value="`${ticket.ticketId} ${ticket.flight.flightKey}`" class="img-fluid rounded-start" />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ ticket.flight.destination }} - {{ ticket.airline.name }}</h5>
                    <p class="card-text">{{ ticket.ticketId }} {{ ticket.flight.flightKey }}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <i class="fa-solid fa-clock-rotate-left"></i> {{ formatTime(ticket.flight.estimatedAt ??
                            ticket.flight.scheduledAt) }}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-plane"></i> Plane: {{ ticket.flight.plane }}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-circle-info"></i> {{ ticket.flight.gate ? `Gate: ${ticket.flight.gate} /
                        Terminal: ${ticket.flight.terminal}`
                            :
                            'Terminal: ' + ticket.flight.terminal }}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-bookmark"></i> Created At: {{ formatTime(ticket.createdAt) }}
                    </li>
                    <li class="list-group-item" v-if="ticket.paidAt">
                        <i class="fa-solid fa-cart-shopping"></i> Paid At: {{ formatTime(ticket.paidAt) }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>