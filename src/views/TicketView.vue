<script lang="ts" setup>
import { MainService } from '@/services/main.service';
import { doLogout } from '@/utils';
import { ref } from 'vue';

const tickets = ref()
MainService.useAxios('/ticket')
    .then(rsp => tickets.value = rsp.data)
    .catch(e => doLogout())
</script>

<template>
    <pre>{{ tickets }}</pre>
</template>