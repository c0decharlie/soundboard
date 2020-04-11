<template>
    <div class="container">
        <h4>File upload</h4>
        <AudioFileUpload
            ref="fileUpload"
            @uploadFile="onFileUpload"
        />
        <div class="line-break"></div>

        <h4>Audio files</h4>
        <template v-if="audioList.length > 0">
            <p>Click file to delete</p>
            <AudioList 
                :audioFiles="audioList"
                @audioListElementDelete="onAudioListElementDelete"
                deletable
            />    
        </template>


        <InfoContainer v-if="audioList.length === 0">
            <p class="align-left">There's no uploaded audio files yet.</p>
        </InfoContainer>


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

import AlertMixin from '../mixins/alert-mixin';

import AudioList from '../components/AudioList';
import AudioFileUpload from '../components/AudioFileUpload';
import Modal from '../components/Modal';
import InfoContainer from '../components/InfoContainer';

export default {
    components: {
        AudioList,
        AudioFileUpload,
        Modal,
        InfoContainer
    },

    mixins: [AlertMixin],

    data() {
        return {
            modal: null,
            fileToDelete: null,
        }
    },

    methods: {
        onAudioListElementDelete(filename) {
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
            const alertProps = {
                type: 'success',
                content: `File ${filename} deleted successfully`
            };
            this.$store.dispatch('deleteAudioFile', filename)
                .then(() => this.showAlert(alertProps))
                .catch(err => { 
                    alert.type = 'error';     
                    alert.content = 'File deletion failed';
                    this.showAlert(alertProps);
                });
        },

        onFileUpload(file) {
            const alertProps = {
                type: 'success',
                content: `File ${file.name} uploaded successfully`
            };
            this.$store.dispatch('uploadAudioFile', file)
                .then(() => {
                    this.showAlert(alertProps);
                    this.$refs.fileUpload.clearValues();
                })
                .catch(err => {
                    alertProps.type = 'error';     
                    alertProps.content = `File upload failed. ${err}`;
                    this.showAlert(alertProps);
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

    .align-left {
        text-align: left;
    }
</style>
