/**
 * Interface for the CheckBox component props.
 */
export interface CheckBoxTypes {
  /**
   * Whether the checkbox is checked or not.
   */
  checked: boolean
  /**
   * The condition that determines whether the checkbox is disabled or not.
   */
  condition: boolean,
  /**
   * The function to be called when the checkbox is clicked.
   */
  handleChange: Function,
  /**
   * Optional title for the first checkbox.
   */
  title1?: string,
  /**
   * Optional title for the second checkbox.
   */
  title2?: string,
}