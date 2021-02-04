<template>
  <div id="app">
    <file-uploader></file-uploader>
  </div>
</template>

<script>
import FileUploader from './components/FileUploader.vue';

export default {
  name: "App",
  components: {
    FileUploader
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
