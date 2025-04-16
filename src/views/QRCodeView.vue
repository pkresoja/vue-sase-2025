<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { TicketModel } from '@/models/ticket.model';
import { TicketService } from '@/services/ticket.service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import QRCodeVue3 from "qrcode-vue3";

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
    <pre>{{ ticket }}</pre>
    <QRCodeVue3 value="Simple QR code" />
    <QRCodeVue3 :width="200" :height="200" :value="String(ticket.ticketId)" v-if="ticket"
        :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
        :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }" :dotsOptions="{
            type: 'dots',
            color: '#26249a',
            gradient: {
                type: 'linear',
                rotation: 0,
                colorStops: [
                    { offset: 0, color: '#26249a' },
                    { offset: 1, color: '#26249a' },
                ],
            },
        }" :backgroundOptions="{ color: '#ffffff' }" :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
        :cornersDotOptions="{ type: undefined, color: '#000000' }" fileExt="png" :download="true" myclass="my-qur"
        imgclass="img-qr" downloadButton="my-button" :downloadOptions="{ name: 'vqr', extension: 'png' }" />
</template>