module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/car-pooling/' // Thay tên repository của các bạn vào đây nhé
    : '/'
};
