import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import FileService from '../services/file.service';

export const store = new Vuex.Store({
    state: {
        audioList: []
    },
    getters: {
        audioList(state){
          return state.audioList;  
        } 
    },
    mutations: {
        SET_AUDIO_LIST(state, payload) {
            state.audioList = [...payload];
        },

        REMOVE_AUDIO_LIST_ELEMENT(state, fileName) {
            const audioFiles = state.audioFiles
                .filter(file => file.originalname !== fileName);
            state.audioFiles = audioFiles;
        },

        ADD_AUDIO_FILE(state, { file }) {
            state.audioList.push(file);
        }
    }, 
    actions: {
        fetchAudioList({commit}) {
            FileService.fetchAllAudioFiles()
                .then(({ data }) => commit('SET_AUDIO_LIST', data))
                .catch(err => console.log('fetchAudioList error', err));
        },

        deleteAudioFile({commit}, fileName) {
            FileService.deleteFile({ fileName })
                .then(() => commit('REMOVE_AUDIO_LIST_ELEMENT', fileName))
                .catch(err => console.log('deleteAudioFile error', err));
        },

        uploadAudioFile({commit}, file) {
            FileService.uploadAudioFile(file)
                .then(file => commit('ADD_AUDIO_FILE', file))
                .catch(err => console.log('uploadAudioFile error', err));
        }
    }
});
