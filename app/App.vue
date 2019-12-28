<template>
    <div>

        <Navigation />

        <!-- <AudioFileUpload 
            @uploadFile="onFileUpload"
        />
        <h2>Files:</h2>

        

        <hr>

        <AudioPlayer
            :audioFile="currentAudioFile"
        /> -->
        <router-view></router-view>
    </div>
</template>

<script>
import FileService from './services/file.service';

import AudioFileUpload from './components/AudioFileUpload';
import AudioList from './components/AudioList';
import AudioPlayer from './components/AudioPlayer';
import Navigation from './components/Navigation';

export default {
    components: {
        AudioFileUpload,
        AudioList,
        AudioPlayer,
        Navigation
    },

    data() {
        return {
            fileService: new FileService(),
            audioFiles: [],
            currentAudioFile: null
        }
    },

}
</script>
