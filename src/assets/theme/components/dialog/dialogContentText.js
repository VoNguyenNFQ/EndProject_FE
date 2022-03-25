// Practise React React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Practise React React helper functions
// import pxToRem from "assets/theme/functions/pxToRem";

const { size } = typography;
const { text } = colors;

export default {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: text.main,
    },
  },
};
