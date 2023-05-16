import { deviceSizeProps, sizeProps, themeProps } from '../types/themeType';

const size: sizeProps = {
  mobile: '480px',
  middle: '820px',
  tablet: '900px',
};
const deviceSize: deviceSizeProps = {
  mobile: `(max-width : ${size.mobile})`,
  middle: `(max-width : ${size.middle})`,
  tablet: `(max-width : ${size.tablet})`,
};
const theme: themeProps = {
  size,
  deviceSize,
};
export default theme;
