const importImages = (value) => {
  let images = {};
  value.keys().map((item) => {images[item.replace('./', '')] = value(item);});
  return images;
}

const images = importImages(require.context('../../assets/png/companies', false, /\.png/));

export {images};