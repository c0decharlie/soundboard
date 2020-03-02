<template>
    <div class="container">
        <template v-if="audioFiles.length !== 0">
            <AudioList 
                :audioFiles="audioFiles"
                @audioListElementClick="onAudioListElementClick"
            />

            <AudioPlayer
                ref="audioPlayer"
                :audioFile="currentAudioFile"
                autoPlay
            />
        </template>

        <InfoContainer v-if="audioFiles.length === 0">
            <h3>There's no audio files to show.</h3>
            <p>To add audio files go to management page.</p>
        </InfoContainer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AudioList from '../components/AudioList';
import AudioPlayer from '../components/AudioPlayer';
import InfoContainer from '../components/InfoContainer';

export default {
    components: {
        AudioList,
        AudioPlayer,
        InfoContainer
    },

    data() {
        return {
            currentAudioFile: null
        }
    },

    methods: {
        onAudioListElementClick(audioFile) {
            if (!this.currentAudioFile) {
                this.currentAudioFile = audioFile;
                return;
            }

            const isCurrentAudio = (this.currentAudioFile.filename === audioFile.filename);

            if (!isCurrentAudio){
                this.currentAudioFile = audioFile;
                return;
            }

            const $player = this.$refs.audioPlayer;
            const playerState = $player.currentState;

            if (playerState === 'playing') {
                $player.stopPlaying();
                return;
            }

            if (playerState === 'stopped') {
                $player.startPlaying();
            }
        }
    },

    computed: {
        ...mapGetters({
            audioFiles: 'audioList'
        })
    }
}
</script>

<style lang="scss" scoped>
    .container {
        height: 100%;
    }
</style>
