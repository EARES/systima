<template>
  <div class="home">
    <HelloWorld />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'IndexView',
  computed: {
    ...mapGetters(['isAuth'])
  },
  mounted () {
    if (!this.isAuth) { this.notAuth() }
  },
  methods: {
    ...mapActions(['notAuth'])
  },
  components: {
    HelloWorld
  }
}
</script>
