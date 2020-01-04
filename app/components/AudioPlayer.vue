<template>
    <div :class="{ hidden: !visible }">
        <p>Playing audio: {{ audioFileName }}</p>
        <audio 
            controls="controls" 
            ref="audioPlayer" 
            :autoplay="autoPlay"
            @play="onAudioPlay"
            @ended="onAudioEnded">
            Your browser does not support the <code>audio</code> element.
        </audio>
    </div>
</template>

<script>
import { eventBus } from '../index.js';

export default {
    props: {
        audioFile: {
            type: Object,
            required: false
        },

        autoPlay: {
            type: Boolean,
            required: false,
            default: false
        },

        visible: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data() {
        return {
            playerStates: {
                playing: 'playing',
                stopped: 'stopped'
            },
            $audioPlayer: null,
            audioFileName: '',
            currentState: null
        }
    },

    methods: {
        onAudioPlay() {
            this.currentState = this.playerStates.playing;
            eventBus.$emit('audioPlayer - play', this.audioFile);
        },
        onAudioEnded() {
            this.currentState = this.playerStates.stopped;
            eventBus.$emit('audioPlayer - ended', this.audioFile);
        },

        stopPlaying() {
            this.$audioPlayer.pause();
            this.$audioPlayer.currentTime = 0;
            this.onAudioEnded();
        },

        startPlaying() {
            this.$audioPlayer.play();
        }
    },

    watch: {
        audioFile(file) {
            this.$audioPlayer.src = file.publicPath;
            this.$audioPlayer.load();
            this.audioFileName = file.originalname;
        }
    },

    created() {
        this.currentState = this.playerStates.stopped;
    },

    mounted() {
        this.$audioPlayer = this.$refs.audioPlayer;
    }
}
</script>

<style lang="scss" scoped>
    .hidden {
        visibility: hidden;
    }    
</style>