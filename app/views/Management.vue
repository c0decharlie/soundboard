<template>
    <div class="container">
        <AudioList 
            :audioFiles="audioFiles"
            :audioListElementDelete="onAudioListElementDelete"
            deletable
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AudioList from '../components/AudioList';

export default {
    components: {
        AudioList
    },
    methods: {
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