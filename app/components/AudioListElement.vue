<template>
    <div>
        <button 
            @click="onAudioFileButtonClick"
            class="waves-effect waves-light btn">
            {{ audioFile.originalname }}
            <i class="material-icons right">play_arrow</i>
        </button>
        <!-- <button @click="onDeleteAudioFileClick">x</button> -->
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
