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
import React from 'react';
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

{
  /*

        <>
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Checkbox //* el title debe ir como un parametro que reciba el componente
                  checked={params.row.crear_documentos_exps_no_propios} //* debe ir como un parametro que reciba el componente
                  onChange={(event) => {
                    handleCheckboxChange(
                      event,
                      params.row.id_und_organizacional_actual
                    );
                    // ? la funcion onchange tambien debe ser un paramatro que reciba el componente con la lógica
                    console.log(event);
                  }}
                  inputProps={{ 'aria-label': 'Seleccionar item' }}
                />
              }
              label={
                params.row.crear_documentos_exps_no_propios ? (
                  <Tooltip title={`crear documento marcado`} placement="right">
                    <InfoIcon
                      sx={{
                        width: '1.2rem',
                        height: '1.2rem',
                        ml: '0.5rem',
                        color: 'green'
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title={`crear documento desmarcado`}
                    placement="right"
                  >
                    <InfoIcon
                      sx={{
                        width: '1.2rem',
                        height: '1.2rem',
                        ml: '0.5rem',
                        color: 'orange'
                      }}
                    />
                  </Tooltip>
                )
              }
            />
          </FormControl>
        </>



*/
}
