<template>
  <div class="file">
    <form enctype="multipart/form-data" @submit.prevent="onSubmit">
      <div class="">
        <b-form-group label-size="lg">
          <b-form-file
            v-model="files"
            multiple
            id="file-large"
            size="lg"
          ></b-form-file>
        </b-form-group>
      </div>
      <div class="fields float-right">
        <b-button type="submit" variant="primary">Upload</b-button>
      </div>
    </form>
    <b-alert>{{ JSON.stringify(this.message) }}</b-alert>
  </div>
</template>

<script>
export default {
  name: "FileUpload",
  data() {
    return {
      files: [],
      message: ""
    };
  },
  methods: {
    async onSubmit() {
      const formData = new FormData();
      for (let file of this.files) formData.append("file", file);
      formData.append("userId", localStorage.getItem("userId"));
      let response = await fetch("http://localhost:8081/upload", {
        method: "POST",
        body: formData
      });
      let result = await response.json();
      console.log(result);
      this.message = result;
      window.location.reload();
    }
  }
};
</script>

<style></style>
