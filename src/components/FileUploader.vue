<template>
  <div class="file">
    <form enctype="multipart/form-data" @submit.prevent="onSubmit">
      <div class="container">
        <b-form-group label-size="lg">
          <b-form-file
            v-model="files"
            ref="files"
            multiple
            id="file-large"
            size="lg"
          ></b-form-file>
        </b-form-group>
      </div>
      <div class="fields">
        <b-button type="submit" variant="primary">Submit</b-button>
      </div>
    </form>
    <b-alert>{{ message }}</b-alert>
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
      console.log("here");
      const formData = new FormData();
      formData.append("files", this.files);
      console.log(formData);
      console.log(new FormData());
      let response = await fetch("/upload", {
        method: "POST",
        body: formData
      });
      console.log(await response.json())
      let result = await response.json();
      this.message = result;
    }
  }
};
</script>

<style></style>
