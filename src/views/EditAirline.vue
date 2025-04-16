<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { AirlineModel } from '@/models/airline.model';
import { AirlineService } from '@/services/airline.service';
import { formatTime } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const logout = useLogout()
const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const airline = ref<AirlineModel>()

AirlineService.getAirlineById(id)
    .then(rsp => airline.value = rsp.data)
    .catch(e => logout(e))

function doUpdate() {
    AirlineService.updateAirline(id, airline.value)
        .then(rsp => router.push('/airline'))
        .catch(e => logout(e))
}
</script>

<template>
    <Navigation />
    <div class="custom-form" v-if="airline">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/airline">Airlines</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Edit
                </li>
            </ol>
        </nav>
        <h3>Edit Airline</h3>
        <div class="card">
            <div class="card-body">
                <form v-on:submit.prevent="doUpdate">
                    <div class="mb-3">
                        <label for="id" class="form-label">ID:</label>
                        <input type="number" class="form-control" id="id" :value="airline.airlineId" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">Name:</label>
                        <input type="text" class="form-control" id="name" v-model="airline.name">
                    </div>
                    <div class="mb-3">
                        <label for="website" class="form-label">Website:</label>
                        <input type="text" class="form-control" id="website" v-model="airline.website">
                    </div>
                    <div class="mb-3">
                        <label for="updated" class="form-label">Updated At:</label>
                        <input type="text" class="form-control" id="updated"
                            :value="formatTime(airline.updatedAt ?? airline.createdAt)" disabled>
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