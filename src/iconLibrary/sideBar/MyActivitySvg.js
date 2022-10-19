/* eslint-disable react/prop-types */
import React from 'react';

const MyActivitySvg = ({ primaryColor }) => (
  <>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.2 1H2.8C1.80589 1 1 1.80589 1 2.8V6.4C1 7.39411 1.80589 8.2 2.8 8.2H17.2C18.1941 8.2 19 7.39411 19 6.4V2.8C19 1.80589 18.1941 1 17.2 1Z"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.2 11.8H2.8C1.80589 11.8 1 12.6059 1 13.6V17.2C1 18.1941 1.80589 19 2.8 19H17.2C18.1941 19 19 18.1941 19 17.2V13.6C19 12.6059 18.1941 11.8 17.2 11.8Z"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4.59998 4.59979H4.60943" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.59998 15.3998H4.60943" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </>
);

export default MyActivitySvg;
