<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { AirlineService } from '@/services/airline.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const logout = useLogout()
const router = useRouter()
const airline = ref({
    name: '',
    website: ''
})

function doCreate() {
    AirlineService.createAirline(airline.value)
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
                    Create
                </li>
            </ol>
        </nav>
        <h3>Create Airline</h3>
        <div class="card">
            <div class="card-body">
                <form v-on:submit.prevent="doCreate">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name:</label>
                        <input type="text" class="form-control" id="name" v-model="airline.name">
                    </div>
                    <div class="mb-3">
                        <label for="website" class="form-label">Website:</label>
                        <input type="text" class="form-control" id="website" v-model="airline.website">
                    </div>
                    <button class="btn btn-primary">
                        <i class="fa-solid fa-floppy-disk"></i> Save
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>