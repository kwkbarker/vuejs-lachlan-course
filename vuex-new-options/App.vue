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

export default {
  created() {
    // access store with '$store'
    this.$store.dispatch('posts/fetch')
  },

  computed: {
    posts() {
      // this. $store. state. posts(module namespace). all(state getter)
      return this.$store.state.posts.all
    },

    currentPost() {
      return this.$store.getters['posts/currentPost']
    }
  },

  methods: {
    click(post) {
      //setPostId --> sets current post in state
      this.$store.commit('posts/setPostId', post.id)
    }
  }
}
</script>

<style scoped>

</style>