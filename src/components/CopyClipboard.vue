<template>
    <span>
      <img src="static/svg/copy.svg" width="20px" class="clipboard"
           v-clipboard="() => value"
           v-clipboard:success="clipboardSuccessHandler"/>
    </span>
</template>

<script>
  import eventBus from '@/plugins/event-bus'
  export default {
    name: "CopyClipboard",
    data() {
      return {
        copied: null
      }
    },
    props: {
      value: String
    },
    methods: {
      clipboardSuccessHandler({value, event}) {
        eventBus.emit('copied');
      },
    }
  }
</script>

<style scoped>

</style>
