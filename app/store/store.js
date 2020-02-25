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
            state.audioFiles = this.audioFiles
                .filter(file => file.originalname !== fileName);
        }
    }, 
    actions: {
        fetchAudioList({commit}) {
            FileService.fetchAllAudioFiles()
                .then(({ data }) => commit('SET_AUDIO_LIST', data))
                .catch(err => console.log(err));
        },

        deleteAudioFile({commit}, fileName) {
            FileService.deleteFile({ fileName })
                .then(() => commit('REMOVE_AUDIO_LIST_ELEMENT', fileName))
                .catch(err => console.log('err', err));
        }
    }
});
