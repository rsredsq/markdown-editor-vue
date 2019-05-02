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
import NewDocumentButton from "../components/NewDocumentButton";

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
    api.fetchDocuments().then(docs => (this.items = docs));
  },
  methods: {
    onSave(title) {
      this.newDocument(title);
    },
    newDocument(title) {
      api.newDocument(title).then(document => {
        this.items.push(document);
      });
    },
    edit(item) {
      this.$router.push(`/edit/${item._id}`);
    },
    remove(item, index) {
      api.deleteDocument(item._id).then(() => this.items.splice(index, 1));
    }
  }
};
</script>
