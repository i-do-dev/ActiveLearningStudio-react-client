/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

const EditMdSvg = ({ primaryColor, className = '' }) => (
  <>
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.05116 2.89771H2.78915C2.31464 2.89771 1.85956 3.0862 1.52403 3.42173C1.1885 3.75726 1 4.21234 1 4.68685V17.2109C1 17.6854 1.1885 18.1405 1.52403 18.476C1.85956 18.8115 2.31464 19 2.78915 19H15.3132C15.7877 19 16.2428 18.8115 16.5783 18.476C16.9138 18.1405 17.1023 17.6854 17.1023 17.2109V10.9489"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7602 1.55586C16.1161 1.19998 16.5988 1.00005 17.1021 1.00005C17.6054 1.00005 18.088 1.19998 18.4439 1.55586C18.7998 1.91175 18.9997 2.39443 18.9997 2.89772C18.9997 3.40102 18.7998 3.8837 18.4439 4.23958L9.94548 12.738L6.36719 13.6326L7.26176 10.0543L15.7602 1.55586Z"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </>
);

export default EditMdSvg;
