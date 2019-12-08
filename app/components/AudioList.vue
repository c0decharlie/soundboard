<template>
    <div>
        <ul>
            <li v-for="audioFile in audioFiles" :key="audioFile.filename">
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