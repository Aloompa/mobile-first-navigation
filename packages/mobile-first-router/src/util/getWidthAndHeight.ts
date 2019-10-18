export const getWidthAndHeight = ({ width, height }) => {
  if (!window) {
    throw 'Please provide Width and Height to the router if you are using React-Native';
  }
  return {
    width: width ? width : window.innerWidth,
    height: height ? height : window.innerHeight
  };
};
