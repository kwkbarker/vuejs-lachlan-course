<template>
  <button @click="click">
    {{ album.title }}
  </button>
</template>

<script>
import { useStore } from 'vuex'

export default {
  props: {
    album: {
      //id
      //title
      type: Object,
      required: true
    }
  },

  setup(props) {
    const store = useStore()

    const click = () => {
      store.dispatch('photos/getByAlbum', { album: props.album })
    }

    return {
      click
    }
  }
}
</script>

<style scoped>

</style>