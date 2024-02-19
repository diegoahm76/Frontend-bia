import type React from "react";

/**
 * Interface for defining the structure of a data grid.
 */
export interface dataGridTypes {
  /**
   * An array of rows to be displayed in the data grid.
   */
  rows: any[];
  /**
   * An array of columns to be displayed in the data grid.
   */
  columns: any[];
  /**
   * The title of the data grid.
   */
  title?: string;
  /**
   * An optional additional element to be displayed alongside the data grid.
   */
  aditionalElement?: React.ReactNode | React.ReactElement | JSX.Element;
}

// BEGIN: ed8c6549bwf9
export interface dataGridTypesWithAdditionalElement extends dataGridTypes {
  aditionalElement?: React.ReactNode | React.ReactElement | JSX.Element;
} // END: ed8c6549bwf9