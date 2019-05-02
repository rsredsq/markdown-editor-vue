<template>
  <div id="content">
    <div class="d-flex justify-content-around mt-2 mb-2">
      <b-button to="/">Home</b-button>
      <h3>{{ title }}</h3>
      <b-button variant="success" @click="save">Save</b-button>
    </div>
    <div id="editor">
      <textarea v-model="content" @change="onChange"></textarea>
      <div v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>

<script>
import marked from "marked";

import api from "../api/markdown";

export default {
  data() {
    return {
      title: "",
      content: "",
      saved: true
    };
  },
  mounted() {
    api.fetchDocument(this.$route.params.id).then(doc => {
      this.title = doc.title;
      this.content = doc.content;
    });
  },
  computed: {
    compiledMarkdown: function() {
      if (!this.content) return "";
      return marked(this.content, { sanitize: true });
    }
  },
  methods: {
    save() {
      api
        .saveDocument(this.$route.params.id, this.title, this.content)
        .then(() => (this.saved = true))
        .catch(() => alert("Unable to save changes"));
    },
    onChange() {
      this.saved = false;
      console.log("CHANGE");
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.saved) {
      next();
      return;
    }
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  }
};
</script>

<style scoped>
#content,
#editor {
  margin: 0;
  height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

textarea,
#editor div {
  display: inline-block;
  border: 1px solid #ccc;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}
</style>
