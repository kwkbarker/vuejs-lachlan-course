export const albums = {
  namespaced: true,

  state() {
    return {
      all: []
    }
  },

  mutations: {
    //from below, here's the mutation to commit
    setAlbums(state, albums) {
      state.all = albums
    }
  },

  actions: {
    async fetch(ctx) {
      const res = await window.fetch('https://jsonplaceholder.typicode.com/albums')
      const json = await res.json()
      // in order to save albums in state, must commit a mutation
      ctx.commit('setAlbums', json)
    }
  }
}