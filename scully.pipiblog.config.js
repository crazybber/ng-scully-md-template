exports.config = {
  projectRoot: "./src",
  projectName: "pipiblog",
  outDir: './dist/static',
  routes: {
    '/blog/:title': {
      type: 'contentFolder',
      title: {
        folder: "./mdblog"
      }
    },
  }
};