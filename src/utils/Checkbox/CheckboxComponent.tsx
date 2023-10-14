/**
 * CheckboxComponent is an atom component for handling checkboxes.
 *
 * @param {boolean} checked - The state of the checkbox.
 * @param {boolean} condition - A boolean that determines which title to render.
 * @param {string} title1 - The title to render when condition is true.
 * @param {string} title2 - The title to render when condition is false.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} handleChange - A function to handle the state change of the checkbox.
 *
 * @returns {JSX.Element} A JSX element that renders a checkbox with a title and an info icon.
 */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Tooltip
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { stylesCheckboxTitle1, stylesCheckboxTitle2 } from './styles/constanst';
import { CheckBoxTypes } from './types/CheckboxComponent.types';

//! This creates an Atom-type component for handling checkboxes.
export const CheckboxComponent = ({
  checked,
  title1 = 'marcado',
  title2 = 'desmarcado',
  handleChange
}: CheckBoxTypes): JSX.Element => {
  return (
    <>
      <FormControl fullWidth>
        <FormControlLabel
          sx={{
            justifyContent: 'center',
          }}
          control={
            <Checkbox
              checked={checked}
              value={checked}
              onChange={(event) => handleChange(event)}
              inputProps={{ 'aria-label': 'Seleccionar item' }}
            />
          }
          label={
            checked ? (
              <Tooltip title={title1} placement="right">
                <InfoIcon sx={stylesCheckboxTitle1} />
              </Tooltip>
            ) : (
              <Tooltip title={title2} placement="right">
                <InfoIcon sx={stylesCheckboxTitle2} />
              </Tooltip>
            )
          }
        />
      </FormControl>
    </>
  );
};
