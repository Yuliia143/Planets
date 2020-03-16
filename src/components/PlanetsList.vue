<template>
    <div class="container">
        <h1>Planets</h1>
        <div class="loading" v-if="getLoading">Loading...</div>
        <div class="errored" v-if="getErrored">
            <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
        </div>
        <div class="planets-container">
            <ol>
                <planet-item
                        v-for="(planet, index) in getPlanets"
                        :key="index"
                        :planet="planet"></planet-item>
            </ol>
            <button v-if="getNextPage" @click="loadMore">Load more</button>
        </div>
    </div>
</template>

<script>
    import PlanetItem from './PlanetItem';
    import {mapGetters} from 'vuex';

    export default {
        name: "PlanetsList",
        components: {
            PlanetItem
        },
        computed: {
            ...mapGetters([
                'getPlanets',
                'getErrored',
                'getLoading',
                'getNextPage'
            ])
        },
        methods: {
            loadMore() {
                this.$store.dispatch('loadPlanets', this.getNextPage);
            }
        }
    }
</script>

<style scoped>

</style>