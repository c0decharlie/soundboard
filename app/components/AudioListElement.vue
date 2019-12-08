<template>
    <div>
        <button @click="onAudioFileButtonClick">{{ audioFile.originalname }}</button>
        <button @click="onDeleteAudioFileClick">x</button>
    </div>
</template>

<script>
export default {
    props: {
        audioFile: {
            type: Object,
            required: true
        }
    },

    methods: {
        onAudioFileButtonClick() {
            this.$emit('audioListElementClick', this.audioFile);
        },

        onDeleteAudioFileClick() {
            this.$emit('deleteAudioFile', this.audioFile.originalname);
        }
    }
}
</script>
