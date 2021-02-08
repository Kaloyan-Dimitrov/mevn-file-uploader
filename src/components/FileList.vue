<template>
  <div class="mt-3 overflow-auto">
    <b-card-header>My Files: </b-card-header>
    <b-list-group>
      <div v-for="f in files" :key="f._id" class="d-flex align-items-stretch">
        <b-link
          :href="`http://localhost:8081/download/${f._id}/${f.filename}`"
          style="width: 85%"
        >
          <b-list-group-item>{{ f.filename }}</b-list-group-item>
        </b-link>
        <b-link
          :href="`http://localhost:8081/delete/${userId}/${f._id}`"
          style="width: 15%"
        >
          <b-list-group-item
            class="d-flex justify-content-center align-items-center h-100"
            ><i class="fa fa-trash"></i
          ></b-list-group-item>
        </b-link>
      </div>
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
