import FetchService from './fetch.service';

const FileService = {
    fetchService: new FetchService('http://localhost:3000/file'),

    fetchAllAudioFiles() {
        return this.fetchService.get('/all');
    },

    deleteFile(data) {
        return this.fetchService.delete('/delete', { data });
    },

    uploadAudioFile(file) {
        const formData = new FormData();
        formData.append('audio', file);
        return this.fetchService.post('/upload-audio', formData);
    }
}

export default FileService;
