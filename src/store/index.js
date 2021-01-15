import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        rankList: [],
        playList: [],
        playIndex: -1,
    },
    getters: {
        playList: state => state.playList,
        playIndex: state => state.playIndex,
        rankList: state => state.rankList
    },
    mutations: {
        getRankData(state, data) {
            state.rankList = data
        },
        setPlay(state, data) {
            if (state.playList.every(item => item.mid !== data.mid)) {
                state.playList.push(data)
            }
        },
        removeSong(state, index) {
            state.playList.splice(index, 1)
            if (index <= state.playIndex) {
                this.commit('setPlayIndex', state.playIndex - 1)
            } else if (state.playIndex === 0) {
                this.commit('setPlayIndex', 0)
            }
        },
        addPlayList(state, data) {
            state.playList.concat(data)
        },
        setPlayIndex(state, data) {
            state.playIndex = data
        }
    },
    actions: {},
    modules: {}
})