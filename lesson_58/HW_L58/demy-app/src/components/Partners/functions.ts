type WebpackRequireContext = __WebpackModuleApi.RequireContext;

interface Images {
  [key: string]: string;
}

const importImages = (value: WebpackRequireContext): Images => {
  let images: Images = {};
  value.keys().forEach((item: string) => {
    images[item.replace('./', '')] = value(item);
  });
  return images;
}

const images = importImages(require.context('../../assets/png/companies', false, /\.png/));

export {images};