<template>
    <span>
      <img src="static/svg/copy.svg" width="20px" class="clipboard"
           v-clipboard="() => value"
           v-clipboard:success="clipboardSuccessHandler"/>
    </span>
</template>

<script>
  import CopyClipboard from '@/components/CopyClipboard';
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
        console.log(value)
        this.copied = 'Copied to clipboard';
        setTimeout(() => (this.copied = null), 1500);
        // Copied to clipboard
      },
    }
  }
</script>

<style scoped>

</style>
