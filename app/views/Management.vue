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
            :audioFiles="audioList"
            @audioListElementDelete="onAudioListElementDelete"
            deletable
        />

        <Modal
            ref="modal"
            declineText="Cancel"
            @acceptClick="onModalAcceptClick"
            @declineClick="onModalDeclineClick"
            showDecline
        >
            <h4>Warning!</h4>
            <p>Do you want to remove file permamently?</p>
        </Modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { eventBus } from '../index.js';

import AudioList from '../components/AudioList';
import AudioFileUpload from '../components/AudioFileUpload';
import Modal from '../components/Modal';

export default {
    components: {
        AudioList,
        AudioFileUpload,
        Modal
    },

    data() {
        return {
            modal: null,
            fileToDelete: null,
        }
    },

    methods: {
        onAudioListElementDelete(filename) {
            // Check stored settings
            // if ...
            // else ...
            this.fileToDelete = filename;
            this.modal.open();
        },

        onModalAcceptClick() {
            this.deleteFile(this.fileToDelete);
        },

        onModalDeclineClick() {
            this.fileToDelete = null;
        },

        deleteFile(filename) {
            const message = {
                type: 'success',
                title: 'File deleted successfully'
            };
            this.$store.dispatch('deleteAudioFile', filename)
                .then(() => eventBus.$emit('message', message))
                .catch(err => { 
                    message.type = 'error';     
                    message.title = 'File deletion failed';
                    message.message = `Details: ${err}`;
                    eventBus.$emit('message', message);
                });
        },

        onFileUpload(file) {
            const message = {
                type: 'success',
                title: 'File uploaded successfully'
            };
            this.$store.dispatch('uploadAudioFile', file)
                .then(() => eventBus.$emit('message', message))
                .catch(err => {
                    message.type = 'error';     
                    message.title = 'File deletion failed';
                    message.message = `Details: ${err}`;
                    eventBus.$emit('message', message);
                });
        }
    },

    computed: {
        ...mapGetters(['audioList'])
    },

    mounted() {
        this.modal = this.$refs.modal;
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
