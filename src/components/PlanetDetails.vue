<template>
    <div class="info">
        <div class="main_info">
            <h1>{{planet.name}}</h1>
            <img :src="planet.img" alt="Planet">
        </div>
        <div class="other_info">
            <ul>
                <li>Climate: {{planet.climate}}</li>
                <li>Population: {{planet.population}}</li>
                <li>Terrains: {{planet.terrain}}</li>
                <li v-if="planet.residents.length>0">
                    Residents:
                    <ul v-for="resident in planet.residents">
                        <li>{{resident.name}}</li>
                    </ul>
                </li>
                <li v-else>No residents</li>
            </ul>
            <router-link tag="button" to="/">Back</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PlanetDetails",
        data() {
            return {
                planet: this.$store.getters.getPlanetById(this.$route.params.id)
            }
        }
    }
</script>

<style scoped>
    h1{
        width: 100%;
    }
    div>ul{
        list-style: none;
        padding: 0;
    }
    .info{
        display: flex;
    }
    .other_info{
        padding: 60px 0 0 10px;
    }

</style>