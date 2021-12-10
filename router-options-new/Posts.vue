<template>
  <h2>Posts</h2>
  <router-link to="/posts/new">New Post</router-link>
  <ul>
    <li
      v-for="post in posts"
      :key="post.id"
    >
      <router-link :to="`/posts/${post.id}`">
        {{ post.title }}
      </router-link>
    </li>
  </ul>
  <!--dynamic component receives props and emits event (createPost)
  createPost emitted by NewPost component, received here with '@' and
  sent to methods below-->
  <router-view 
    :posts="posts"
    @createPost="createPost"
  />
</template>

<script>
import { testPosts } from '../microblog-new/testPosts.js'

export default {
 data() {
  return {
    posts: testPosts
  }
 },

 methods: {
   createPost(newPost) {
     // don't forget the 'const'
     const id = this.posts.length + 1
     this.posts.push({
       id,
       title: newPost.title,
       content: newPost.content
     })

      // access router for redirect to new post with '$router'
      // need '$' with options, not with composition api
     this.$router.push(`/posts/${id}`)
   }
 }
}
</script>

<style scoped>

</style>