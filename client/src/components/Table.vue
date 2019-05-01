<template>
  <b-container fluid>
    <NewDocumentButton @save="onSave"></NewDocumentButton>
    <b-table show-empty :items="items" :fields="fields">
      <template slot="actions" slot-scope="row">
        <b-button @click="edit(row.item, row.index)" class="mr-1">
          Edit
        </b-button>
        <b-button variant="danger" @click="remove(row.item, row.index)">
          Delete
        </b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import api from "../api/markdown";
import NewDocumentButton from "./NewDocumentButton";

export default {
  name: "Table",
  components: { NewDocumentButton },
  data() {
    return {
      items: [],
      fields: [{ key: "title" }, { key: "actions", label: "Actions" }]
    };
  },
  mounted() {
    fetch("http://localhost:3000/api/1.0/markdowns")
      .then(res => res.json())
      .then(res => (this.items = res));
  },
  methods: {
    onSave(title) {
      console.log("Saved", title);
      this.newDocument(title);
    },
    newDocument(title) {
      api.newDocument(title).then(document => {
        this.items.push(document);
      });
    },
    edit(item, index) {
      console.log("EDIT", item, index);
    },
    remove(item, index) {
      api.deleteDocument(item._id).then(() => this.items.splice(index, 1));
    }
  }
};
</script>

<style scoped></style>
