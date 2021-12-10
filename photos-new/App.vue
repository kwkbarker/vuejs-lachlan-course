<template>
  <layout>
    <!-- template for each slot with v-slot directive -->
    <template v-slot:header>
      Header
    </template>

    <template v-slot:sidebar>
      <album
        v-for="album in albums"
        :key="album.id"
        :album="album"
      />
    </template>

    <template v-slot:content>
      Content
    </template>
  </layout>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import Layout from './Layout.vue'
import Album from './Album.vue'

export default {
  components: {
    Layout,
    Album
  },

  setup() {
    // reference to vuex store
    const store = useStore()

    // // fetching data from api -- create albums array
    // ) -  convert this to computed property to bring in from store


    // on mount, async call to api, be sure to await fetch and await res.json
    onMounted (() => {
      // const res = await window.fetch('https://jsonplaceholder.typicode.com/albums')
      // const json = await res.json() ====>>> moved to albums.js
      // albums.value = json

      store.dispatch('albums/fetch')
    })

    const albums = computed(() => {
      return store.state.albums.all
    })

    return {
      albums
    }
  }
  
  }
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}
button {
  background: darkcyan;
  color: white; 
  border: none;
  padding: 10px;
  margin: 0 10px 5px 0;
  font-size: 18px;
  border-radius: 5px;
  transition: .1s;
  width: 100%;
  display: block;
  text-align: center;
  text-decoration: none;
  font-family: Arial;
}
button:hover {
  filter: brightness(120%);
  cursor: pointer;
  transition: .1s;
}
</style>