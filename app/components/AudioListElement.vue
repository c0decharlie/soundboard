<template>
    <div>
        <button 
            v-if="!deletable"
            @click="onAudioFileButtonClick"
            class="waves-effect waves-light btn">
            {{ audioFile.originalname }}
            <i class="material-icons right">{{ currentButtonIcon }}</i>
        </button>

        <button 
            v-else
            @click="onDeleteAudioFileClick"
            class="waves-effect waves-light red lighten-2 btn">
            {{ audioFile.originalname }}
            <i class="material-icons right">{{ buttonIcons.deleteForever }}</i>
        </button>
    </div>
</template>

<script>
import { eventBus } from '../index.js';

export default {
    props: {
        audioFile: {
            type: Object,
            required: true
        },
        deletable: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data() {
        return {
            buttonIcons: {
                play: 'play_arrow',
                stop: 'stop',
                deleteForever: 'delete_forever'
            },
            currentButtonIcon: null
        }
    },

    methods: {
        onAudioFileButtonClick() {
            this.$emit('audioListElementClick', this.audioFile);
        },

        onDeleteAudioFileClick() {
            this.$emit('deleteAudioFile', this.audioFile.originalname);
        },

        checkIsPlayerPlayingProperFile(playingFilename) {
            return (playingFilename === this.audioFile.filename);
        },

        setCurrentIcon(icon) {
            this.currentButtonIcon = icon;
        },

        listenOnAudioPlayerEvents() {
            eventBus.$on('audioPlayer - play', audioFile => {
                const isCurrentFile = this.checkIsPlayerPlayingProperFile(audioFile.filename);

                if (isCurrentFile) {
                    return this.setCurrentIcon(this.buttonIcons.stop);
                } 

                this.setCurrentIcon(this.buttonIcons.play);
            });

            eventBus.$on('audioPlayer - ended', audioFile => {
                const isCurrentFile = this.checkIsPlayerPlayingProperFile(audioFile.filename);
                if (isCurrentFile) {
                    this.setCurrentIcon(this.buttonIcons.play);
                }
            });
        }
    },

    created() {
        this.currentButtonIcon = this.buttonIcons.play;
        this.listenOnAudioPlayerEvents();
    }
}
</script>
