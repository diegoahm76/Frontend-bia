import type React from "react";

export interface dataGridTypes {
  rows: any[];
  columns: any[];
  title: string;
  aditionalElement?: React.ReactNode | React.ReactElement | JSX.Element;
} // END: abpxx6d04wxr

// BEGIN: ed8c6549bwf9
export interface dataGridTypesWithAdditionalElement extends dataGridTypes {
  aditionalElement?: React.ReactNode | React.ReactElement | JSX.Element;
} // END: ed8c6549bwf9