<template>
    <div class="container">
        <h4>File upload</h4>
        <AudioFileUpload
            @uploadFile="onFileUpload"
        />
        <div class="line-break"></div>

        <h4>Audio files</h4>
        <p>Click file to delete</p>
        <AudioList 
            :audioFiles="audioFiles"
            @audioListElementDelete="onAudioListElementDelete"
            deletable
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AudioList from '../components/AudioList';
import AudioFileUpload from '../components/AudioFileUpload';

export default {
    components: {
        AudioList,
        AudioFileUpload
    },
    methods: {
        onAudioListElementDelete(fileName) {
            this.$store.dispatch('deleteAudioFile', fileName);
        },

        onFileUpload(file) {
            this.$store.dispatch('uploadAudioFile', file);
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
    .line-break {
        width: 100%;
        display: block;
        height: 1px;
        background-color: #eaeaea;
        margin: 40px 0;
    }    

    h4 {
        margin-bottom: 20px;
        color: #4c4c4c;
    }
</style>
