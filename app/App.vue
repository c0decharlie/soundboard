<template>
    <div>
        <Navigation />
        <router-view></router-view>
    </div>
</template>

<script>
import Navigation from './components/Navigation';

export default {
    components: {
        Navigation
    },
    
    mounted() {
        this.$store.dispatch('fetchAudioList');
    }
}
</script>
