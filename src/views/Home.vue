<template>
  <div class="home">
    <img alt="PostCoin logo" src="../assets/logo.png">
    <HelloWorld msg="PostCoin Paper Wallet"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
