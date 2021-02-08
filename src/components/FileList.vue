<template>
  <div class="mt-3 overflow-auto">
    <b-card-header v-if="files.length > 0">My Files: </b-card-header>
    <b-list-group>
      <div v-for="f in files" :key="f._id" class="d-flex align-items-stretch">
        <b-link
          :href="`http://localhost:8081/download/${f._id}/${f.filename}`"
          style="width: 85%"
        >
          <b-list-group-item>{{ f.filename }}</b-list-group-item> </b-link
        ><b-link
          v-b-modal.share-file-modal
          @click="selectFile(f)"
          style="width: 15%"
        >
          <b-list-group-item
            class="d-flex justify-content-center align-items-center h-100"
            ><i class="fa fa-share"></i
          ></b-list-group-item>
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
    <b-modal
      id="share-file-modal"
      :title="`Share ${selectedFile.filename} with:`"
      centered
      @ok="shareFile()"
    >
      <b-form-input list="user-list" v-model="selectedUser"></b-form-input>
      <datalist id="user-list">
        <option v-for="user in allUsers" :key="user._id">{{
          user.email
        }}</option>
      </datalist>
    </b-modal>
    <b-card-header v-if="shared_files.length > 0"
      >Files, shared with me:
    </b-card-header>
    <b-list-group>
      <div
        v-for="f in shared_files"
        :key="f._id"
        class="d-flex align-items-stretch"
      >
        <b-link
          :href="`http://localhost:8081/download/${f._id}/${f.filename}`"
          style="width: 85%"
        >
          <b-list-group-item
            >{{ f.filename }}
            <small>
              by {{ allUsers.find(i => i._id == f.userId).email }}</small
            ></b-list-group-item
          >
        </b-link>
        <b-link
          :href="`http://localhost:8081/delete-shared/${userId}/${f._id}`"
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
    this.files = (await res.json()).files;
    res = await fetch(`http://localhost:8081/all-shared-files/${this.userId}`);
    this.shared_files = (await res.json()).files;
    res = await fetch(`http://localhost:8081/all-users`);
    this.allUsers = (await res.json()).users.filter(i => i._id != this.userId);
  },
  data() {
    return {
      files: [],
      shared_files: [],
      userId: localStorage.getItem("userId"),
      selectedFile: {},
      selectedUser: "",
      allUsers: []
    };
  },
  methods: {
    selectFile(f) {
      this.selectedFile = f;
    },
    async shareFile() {
      await fetch(
        `http://localhost:8081/share/${this.userId}/${
          this.allUsers.find(i => i.email == this.selectedUser)._id
        }/${this.selectedFile._id}`,
        { mode: "no-cors" }
      );
      this.$bvToast.toast("Successfully shared the file", {
        title: "Success",
        autoHideDelay: 5000,
        variant: "success",
        solid: true
      });
    }
  }
};
</script>

<style></style>
