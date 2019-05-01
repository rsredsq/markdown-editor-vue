<template>
  <div>
    <b-button variant="success" class="mb-2 mt-2" v-b-modal.modal-new-document>
      New document
    </b-button>
    <b-modal
      id="modal-new-document"
      ref="modal"
      title="Enter title"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="titleState"
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
        >
          <b-form-input
            id="title-input"
            v-model="title"
            :state="titleState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "NewDocumentButton",
  data() {
    return {
      title: "",
      titleState: null
    };
  },
  methods: {
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.titleState = valid ? "valid" : "invalid";
      return valid;
    },
    resetModal() {
      this.title = "";
      this.titleState = null;
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$emit("save", this.title);
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    }
  }
};
</script>

<style scoped></style>
