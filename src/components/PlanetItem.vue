<template>
    <li>
        <router-link :to="`/planet/${planet.id}`">{{planet.name}}</router-link>
    </li>
</template>

<script>
    export default {
        name: "PlanetItem",
        props: {
            planet: Object
        }
    }
</script>

<style scoped>

</style>