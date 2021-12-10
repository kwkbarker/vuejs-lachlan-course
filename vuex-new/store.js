import { createStore } from 'vuex'
import { testPosts } from '../microblog-new/testPosts'

// delay to simulate api fetch
const delay = () => new Promise(response => setTimeout(response, 1000))



// one big global state - doesn't scale great - make modules:
// namespaced: true
const posts = {
  namespaced: true,

  state() {
    return {
      postId: null,
      all: []
    }
  },

  // mutations as simple as possible - no async behavior,
  // just updating the state.
  mutations: {
    increment(state, { payload }) {
      state.count += payload
    },

    setPostId(state, postId) {
      state.postId = postId
    },

    setPosts(state, posts) {
      state.all = posts
      // need to commit this mutation somewhere - in actions
    }
  },

  // can be async
  actions: {
    // ctx != state - ctx gives access to commit, dispatch, state
    async fetch(ctx) {
      await delay()
      ctx.commit('setPosts', testPosts)
    }
  },

  getters: {
    currentPost(state) {
      return state.all.find(x => {
        return x.id === state.postId
      })
    }
  }
}

export const store = createStore({
  modules: {
    posts // access by namespace store.state.posts.posts
  }
})

// VUEX workflow - scalability
// fetch data with ACTION, update state with MUTATION, 
// STATE causes re-render

// render component - dispatch call to api, await data, 
// commit mutation, mutate state, rerender new state.