<template>
    <div class="container">
        <template v-if="audioFiles.length !== 0">
            <AudioList 
                :audioFiles="audioFiles"
                @audioListElementClick="onAudioListElementClick"
                @audioListElementDelete="onAudioListElementDelete"
            />

            <AudioPlayer
                ref="audioPlayer"
                :audioFile="currentAudioFile"
                autoPlay
            />
        </template>

        <template v-if="audioFiles.length === 0">
            <div class="info-container">
                <h3>There's no audio files to show.</h3>
                <p>To add audio files go to management page.</p>
            </div>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AudioList from '../components/AudioList';
import AudioPlayer from '../components/AudioPlayer';

export default {
    components: {
        AudioList,
        AudioPlayer
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
        },

        onAudioListElementDelete(fileName) {
            this.fileService.deleteFile({ fileName })
                .then(() => {
                    this.audioFiles = this.audioFiles
                        .filter(file => file.originalname !== fileName);
                })
                .catch(err => console.log('err', err));
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

    .info-container {
        text-align: center;

        h3 {
            color: #404040;
        }

        p {
            color: #676767;
        }
    }
</style>
