<script lang="ts" setup>
import type { AirlineModel } from '@/models/airline.model';
import { AirlineService } from '@/services/airline.service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const id = Number(route.params.id)
const airline = ref<AirlineModel>()

AirlineService.getAirlineById(id)
    .then(rsp => airline.value = rsp.data)
</script>

<template>
    {{ airline }}
</template>