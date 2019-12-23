import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

/**
 * This link can be used with the Mui library, keeping all the styles and animations
 * while also allowing for react-router-dom routing capabilities. It acts as a react-router-dom Link
 */
const Link = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} />
));

export default Link;
