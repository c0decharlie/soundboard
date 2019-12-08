<template>
    <div>
        <AudioFileUpload 
            @uploadFile="onFileUpload"
        />
        <h2>Files:</h2>

        <AudioList 
            :audioFiles="audioFiles"
            @audioListElementClick="onAudioListElementClick"
            @audioListElementDelete="onAudioListElementDelete"
        />

        <hr>

        <AudioPlayer
            :audioFile="currentAudioFile"
        />
    </div>
</template>

<script>
import FileService from './services/file.service';

import AudioFileUpload from './components/AudioFileUpload';
import AudioList from './components/AudioList';
import AudioPlayer from './components/AudioPlayer';

export default {
    components: {
        AudioFileUpload,
        AudioList,
        AudioPlayer
    },

    data() {
        return {
            fileService: new FileService(),
            audioFiles: [],
            currentAudioFile: null
        }
    },

    methods: {
        onFileUpload(file) {
            this.fileService.uploadAudioFile(file)
                .then(({data}) => {
                    this.audioFiles.push(data.file);
                })
                .catch(err => console.error(err));
        },

        onAudioListElementClick(audioFile) {
            this.currentAudioFile = audioFile;
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

    created() {
        this.fileService.fetchAllAudioFiles()
            .then(({data}) => this.audioFiles = data)
            .catch(err => console.log('err', err));
    }
}
</script>
