<template>
    <div ref="alert">
        <p class="title">{{ title }}</p>
        <p class="message">{{ message }}</p>
    </div>
</template>

<script>
import * as Materialize from 'materialize-css';

export default {
    props: {
        displayLength: {
            type: Number,
            default: 5000,
            required: false
        }
    },

    data() {
        return {
            title: null,
            message: null,
            type: null,
            alert: null
        }
    },

    methods: {
        toast(options) {
            Object.keys(options).forEach(option => this[option] = options[option]);
            Materialize.toast({ 
                html: this.alert,
                displayLength: this.displayLength,
                completeCallback: this.clearOptions.bind(this, options) 
            });
        },

        clearOptions(options) {
            Object.keys(options).forEach(option => this[option] = null);
        }
    },

    mounted() {
        this.alert = this.$refs.alert;
    },
}
</script>

<style lang="scss" scoped>
    .title {
        font-size: 18px;
    }

    .message {
        font-size: 15px;
    }
</style>