const size = {
  mobile: '480px',
  middle: '820px',
  tablet: '900px',
};

const deviceSize = {
  mobile: `(max-width : ${size.mobile})`,
  middle: `(max-width : ${size.middle})`,
  tablet: `(max-width : ${size.tablet})`,
};

// 중략

const theme = {
  size,
  deviceSize,
};

export default theme;
