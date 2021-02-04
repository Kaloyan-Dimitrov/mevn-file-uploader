<template>
  <div id="app">
    <file-uploader></file-uploader>
    <file-list></file-list>
  </div>
</template>

<script>
import FileList from './components/FileList.vue';
import FileUploader from './components/FileUploader.vue';

export default {
  name: "App",
  components: {
    FileUploader,
    FileList
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
