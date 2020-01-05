<template>
    <div>
        <ul class="audio-list">
            <li 
                class="audio-list-element" 
                v-for="audioFile in audioFiles" 
                :key="audioFile.filename"
            >
                <AudioListElement 
                    :audioFile="audioFile" 
                    @audioListElementClick="onAudioListElementClick"
                    @deleteAudioFile="onDeleteAudioFile"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import AudioListElement from './AudioListElement';

export default {
    components: {
        AudioListElement
    },

    props: {
        audioFiles: {
            type: Array,
            default: () => [],
            required: false
        }
    },

    methods: {
        onAudioListElementClick(audioFile) {
            this.$emit('audioListElementClick', audioFile);
        },

        onDeleteAudioFile(fileName) {
            this.$emit('audioListElementDelete', fileName);
        }
    }
}
</script>

<style lang="scss" scoped>
    .audio-list {
        display: flex;
        flex-wrap: wrap;

        .audio-list-element {
            margin-right: 20px;
            margin-bottom: 20px;
        }
    }
</style>