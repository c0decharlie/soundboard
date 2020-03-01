<template>
    <div>
        <Navigation />
        <router-view></router-view>
        <Alert ref="alert" />
    </div>
</template>

<script>
import { eventBus } from './index.js';

import Navigation from './components/Navigation';
import Alert from './components/Alert';

export default {
    components: {
        Navigation,
        Alert
    },

    data() {
        return {
            alert: null
        }
    },

    methods: {
        listenForMessageEvents() {
            eventBus.$on('message', payload => {
                this.alert.toast(payload);
            });
        }
    },

    mounted() {
        this.alert = this.$refs.alert;
        this.$store.dispatch('fetchAudioList');
        this.listenForMessageEvents();
    }
}
</script>
