<template>
  <div class="mt-3 overflow-auto">
    <b-card-header>My Files: </b-card-header>
    <b-list-group>
      <b-link
        v-for="f in files"
        :key="f._id"
        :href="'http://localhost:8081/download/' + f.filename"
        ><b-list-group-item>{{ f.filename }}</b-list-group-item></b-link
      >
    </b-list-group>
  </div>
</template>

<script>
export default {
  async mounted() {
    let res = await fetch(`http://localhost:8081/all-files/${this.userId}`);
    this.files = await res.json();
    this.files = this.files.files;
  },
  data() {
    return {
      files: [],
      userId: localStorage.getItem("userId")
    };
  }
};
</script>

<style></style>
