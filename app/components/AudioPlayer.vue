<template>
    <div>
        <p>Playing audio: {{ audioFileName }}</p>
        <audio controls="controls" ref="audioPlayer">
            Your browser does not support the <code>audio</code> element.
        </audio>
    </div>
</template>

<script>
export default {
    props: {
        audioFile: {
            type: Object,
            required: false
        }
    },

    data() {
        return {
            $audioPlayer: null,
            audioFileName: ''
        }
    },

    watch: {
        audioFile(file) {
            this.$audioPlayer.src = file.publicPath;
            this.$audioPlayer.load();
            this.audioFileName = file.originalname;
        }
    },

    mounted() {
        this.$audioPlayer = this.$refs.audioPlayer;
    }
}
</script>