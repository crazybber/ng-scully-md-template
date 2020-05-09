//https://github.com/scullyio/scully/blob/master/docs/scully-configuration.md
exports.config = {
  projectRoot: "./src",
  projectName: "pipiblog",
  outDir: './dist/static',
  staticPort:'5000',
  routes: {
    '/blog/:title': {
      type: 'contentFolder',
      title: {
        folder: "./blog"
      }
    },
  }
};
