/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect } from 'react';
import { LiquidatorService } from './liquidator.api';
import { modifyVariableInitValue } from '../visual-block-editor/utils';
import { Button, MenuItem, Select, Stack, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalculateIcon from '@mui/icons-material/Calculate';
import './liquidator.css';

function Liquidator(props) {
  const [formData, setFormData] = useState(
    (props.variables ?? []).reduce(
      (acc, variable) => {
        acc[variable] = '';
        return acc;
      },
      { liquidador: '' }
    )
  );
  const [isVisible, setIsVisible] = useState(props.test ?? false);
  const [textValue, setTextValue] = useState('');
  const [liquidaciones, setLiquidaciones] = useState([]);
  const [localVariables, setLocalVariables] = useState([]);
  const [externalRawCode, setExternalRawCode] = useState(null);

  useEffect(() => {
    setLocalVariables(props.variables ?? []);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (props.preview) return;
    LiquidatorService.findAll().then((data) => {
      setLiquidaciones(data);
    });
  }, [props.preview, props.variables]);

  const onChange = async (e) => {
    const id = e.target.value;
    const liquidacion = await LiquidatorService.findOne(id);
    setLocalVariables(liquidacion.variables);
    setExternalRawCode(liquidacion.funcion);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    // Actualizar formData cuando cambian los props
    const initialFormData = {};
    props.variables.forEach(variable => {
      initialFormData[variable] = props.selectedVariables?.[variable] || '';
    });
    setFormData(initialFormData);
  }, [props.selectedVariables, props.variables]);

  // const handleInputChange = (event) => {
  //   setFormData({ ...formData, [event.target.name]: event.target.value });
  // };
 const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    /**
     * get code from endpoint or generate from current editor
     */
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const endCode = externalRawCode || props.generateCode();

    const result = executeCode(endCode, formData);

    const dollarUSLocale = Intl.NumberFormat('en-US');
    setTextValue('$ ' + dollarUSLocale.format(result));
  };
  const executeCode = (endCode, initilState) => {
    /**
     * set default values for variables
     */
    localVariables.forEach((v) => {
      endCode = modifyVariableInitValue(endCode, v, initilState[v]);
    });
    //  console.log('')(endCode);

    try {
      // eslint-disable-next-line no-eval
      const result = eval(endCode);
      if (result === undefined) {
        props.setNotifications({
          open: true,
          message: 'No se ha encontrado resultado, revisa tu diseño',
          type: 'error',
        });
      }
      //  console.log('')('code executed: ', result);
      return result;
    } catch (error) {
      props.setNotifications({
        open: true,
        message: 'Error al ejecutar el código',
        type: 'error',
      });
      return undefined;
    }
  };
  const handleClick = () => {
    console.log(props.selectedVariables);
    console.log("2222222"); 
  };
  return (
    <div className="Liquidator-wrapper">
      <header className="Liquidator-title">
        <h3>Prueba Liquidador</h3>
        
        <div>Resultado: {textValue && <span>{textValue}</span>}</div>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          {!props.preview && (
            <Select
              variant="outlined"
              margin="normal"
              fullWidth
              placeholder="Seleccione liquidador"
              name="liquidador"
              label="Liquidador a usar"
              onChange={onChange}
            >
              {liquidaciones.map((liquidacion, i) => {
                return (
                  <MenuItem
                    key={liquidacion.id}
                    value={liquidacion.id}
                    selected={i === 0}
                  >
                    {liquidacion.descripcion}
                  </MenuItem>
                );
              })}
            </Select>
          )}
          {(isVisible || props.preview) &&
            localVariables?.map((variable) => {
              return (
                <TextField
                  key={variable}
                  label={variable?.toUpperCase()}
                  name={variable}
                  required
                  size="medium"
                  type="number"
                  value={formData[variable]}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              );
            })
          }
          <Stack
            direction='row'
            justifyContent='flex-end'
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              type='button'
              variant="outlined"
              onClick={() => props.handle_close(false)}
              startIcon={<CloseIcon />}
            >
              Cerrar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<CalculateIcon />}
            >
              Calcular
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export { Liquidator };
