//https://github.com/scullyio/scully/blob/master/docs/scully-configuration.md
exports.config = {
  projectRoot: "./src",
  projectName: "pipiblog",
  outDir: './dist/static',
  routes: {
    '/blog/:title': {
      type: 'contentFolder',
      title: {
        folder: "./blog"
      }
    },
  }
};
