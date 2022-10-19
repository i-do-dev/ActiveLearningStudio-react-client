/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

const LibraryStatusSmSvg = ({ primaryColor, className = '' }) => (
  <>
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.33301 2H5.33301C6.04025 2 6.71853 2.28095 7.21863 2.78105C7.71872 3.28115 7.99967 3.95942 7.99967 4.66667V14C7.99967 13.4696 7.78896 12.9609 7.41389 12.5858C7.03882 12.2107 6.53011 12 5.99967 12H1.33301V2Z"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6667 2H10.6667C9.95942 2 9.28115 2.28095 8.78105 2.78105C8.28095 3.28115 8 3.95942 8 4.66667V14C8 13.4696 8.21071 12.9609 8.58579 12.5858C8.96086 12.2107 9.46957 12 10 12H14.6667V2Z"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </>
);

export default LibraryStatusSmSvg;
