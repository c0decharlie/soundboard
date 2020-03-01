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
            state.audioList = state.audioList
                .filter(file => file.originalname !== fileName);
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
            return new Promise((resolve, reject) => {
                FileService.deleteFile({ fileName })
                    .then(() => {
                        commit('REMOVE_AUDIO_LIST_ELEMENT', fileName);
                        resolve();
                    })
                    .catch(err => {
                        console.log('deleteAudioFile error', err);
                        reject(err);
                    });
            });
        },

        uploadAudioFile({commit}, file) {
            return new Promise((resolve, reject) => {
                FileService.uploadAudioFile(file)
                    .then(({ data }) => {
                        commit('ADD_AUDIO_FILE', data);
                        resolve();
                    })
                    .catch(err => {
                        console.log('uploadAudioFile error', err);
                        reject(err);
                    });
            });
        }
    }
});
