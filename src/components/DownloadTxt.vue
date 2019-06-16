<template>
  <div>

  </div>
</template>

<script>
  export default {
    name: "DownloadTxt",
    methods: {
      downloadTxt(filename, text) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      }
    }
  }
</script>

<style scoped>

</style>
