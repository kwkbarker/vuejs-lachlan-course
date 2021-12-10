<template>
  <button
    v-for="post in posts"
    :key="post.id"
    @click="click(post)"
  >
    {{ post.title }}
  </button>
  <!-- defensive programming - use v-if for when post id not avail -->
  <div v-if="currentPost">
    <h2>{{ currentPost.title }}</h2>
    <h4>{{ currentPost.content }}</h4>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

export default {
  setup() {

    const store = useStore()

    //ACTIONS: pass in handle & arg
    // for module, must use '{namespace}/{handler}'
    const fetchData = () => {
      store.dispatch('posts/fetch')
    }

    // // get current post - compute post, takes callback and updates
    // // when dependencies change, access current id and array of posts
    // const currentPost = computed(() => {
    //   return store.state.posts.find(x => {
    //     return x.id === store.state.postId
    //   })
    // }) ==>> nmoved into store as GETTER

    // call fetch data on mount
    onMounted(() => {
      fetchData()
    })




    // listener for click triggers this function to log ID
    const click = (post) => {
      store.commit('posts/setPostId', post.id)
    }

    // const click = () => {
    //   // to call mutation [vuex method to alter state],
    //   // use 'commit' - pass in method 'handle' and payload? -
    //   // if multiple use { object } otherwise just 10
    //   store.commit('increment', { number: 10 })
    // }


    return {
      click,
      // for module, pass in bracketed string instead of store.getters.currentPost
      currentPost: computed(() => store.getters['posts/currentPost']),
      // // null by default, not reactive - must compute
      // postId: store.state.postId, --> accessing just state object needed
      // rather than whole state
      postId: computed(() => store.state.postId),
      posts: computed(() => store.state.posts.all)
    }
  }
}
</script>

<style scoped>

</style>