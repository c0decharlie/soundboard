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
        }
    }, 
    actions: {
        fetchAudioList({commit}) {
            FileService.fetchAllAudioFiles()
                .then(({ data }) => commit('SET_AUDIO_LIST', data))
                .catch(err => console.log(err));
        }
    }
});
