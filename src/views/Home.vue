<template>
  <div class="home d-flex flex-column" v-if="userId">
    <file-uploader></file-uploader>
    <file-list></file-list>
  </div>
</template>

<script>
// @ is an alias to /src
import FileUploader from "../components/FileUploader.vue";
import FileList from "../components/FileList.vue";

export default {
  name: "Home",
  components: {
    FileUploader,
    FileList
  },
  data() {
    return { userId: localStorage.getItem("userId") };
  },
  mounted() {
    if (!this.userId) window.location.href = "/login";
  }
};
</script>
