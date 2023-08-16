/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useState } from 'react';
import { Checkbox, Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useUnidadAUnidad } from '../../../../hook/useUnidadAUnidad';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../../../../../../../hooks';
import { Title } from '../../../../../../../../../../components';
import { containerStyles } from '../../../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { getListPersonasUnidades } from '../../../../toolkit/thunks/thunks_uni_a_uni';
import { setListadoPersonasUnidades } from '../../../../toolkit/slice/Uni_A_UniSlice';
import { columnsTraslado } from './columnsTraslado/columnsTraslado';
import { Loader } from '../../../../../../../../../../utils/Loader/Loader';
import './css/style.css';
import { RenderDataGrid } from '../../../../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
export const Traslado: FC<any> = (): JSX.Element => {
  //* dispatch declararion
  const dispatch = useAppDispatch();

  //* states
  const {
    unidades_org_anterior,
    unidades_org_actual,
    listado_personas_unidades
  } = useAppSelector((state: any) => state.uni_a_uni_slice);

  //* hooks
  const { control_traslado_unidad_a_unidad } = useUnidadAUnidad();

  //* states for this component
  const [viweGridDataPersons, setviweGridDataPersons] = useState(false);

  const [selectedItems, setSelectedItems] = useState<any>([]);

  const handleCheckboxChange = (event: any, item: any): void => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, item]);
      console.log(selectedItems);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem: any) => selectedItem !== item)
      );
      console.log(selectedItems);
    }
  };

  //! complemento columnas

  const columnsToUseDataGrid = [
    ...columnsTraslado,
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 180,
      renderCell: (params: any) => (
        <>
          <Checkbox
            checked={selectedItems.includes(params.row)}
            onChange={(event) => handleCheckboxChange(event, params.row)}
            inputProps={{ 'aria-label': 'Seleccionar item' }}
          />
        </>
      )
    }
  ];

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Proceso traslado de unidad a unidad" />
          <form
            onSubmit={(w) => {
              w.preventDefault();
              console.log('submit');
              // onSubmit();
            }}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid
              item
              xs={12}
              sm={5}
              sx={{
                zIndex: 99999
              }}
            >
              <Controller
                name="id_antigua_unidad_organizacional"
                rules={{ required: true }}
                control={control_traslado_unidad_a_unidad}
                render={({ field: { onChange, value, name } }) => (
                  <div>
                    <Select
                      className="basic-single"
                      value={value}
                      onChange={(selectedOption) => {
                        void getListPersonasUnidades(
                          selectedOption.value,
                          setviweGridDataPersons
                        ).then((res) => {
                          console.log(res);
                          dispatch(setListadoPersonasUnidades(res));
                          // * from this event I have to manage the modal show and hide of the grid
                        });
                        onChange(selectedOption);
                      }}
                      options={unidades_org_anterior}
                      placeholder="Seleccionar unidad organizacional"
                    />
                    <label htmlFor={name}>
                      <small
                        style={{
                          color: 'rgba(0, 0, 0, 0.6)',
                          fontWeight: 'thin',
                          fontSize: '0.75rem'
                        }}
                      >
                        Unidad organizacional origen
                      </small>
                    </label>
                  </div>
                )}
              />
            </Grid>

            {/* definir parte 2, debe estar controlada por un boolean para mostrar o no - para carga del grid que muestras las personas que pertenecen a la unidad seleccioanda y las unidades del organigrama actual */}
            {viweGridDataPersons ? (
              <Loader altura="270px" />
            ) : (
              <RenderDataGrid
                title="Personas pertenecientes a la unidad organizacional seleccionada"
                rows={listado_personas_unidades}
                columns={columnsToUseDataGrid}
              />
            )}

            <Grid
              item
              xs={12}
              sm={5}
              sx={{
                zIndex: 99999
              }}
            >
              <Controller
                name="id_nueva_unidad_organizacional"
                rules={{ required: true }}
                control={control_traslado_unidad_a_unidad}
                render={({ field: { onChange, value, name } }) => (
                  <div>
                    <Select
                      className="basic-single"
                      value={value}
                      onChange={(selectedOption) => {
                        console.log(selectedOption);
                        onChange(selectedOption);
                      }}
                      options={unidades_org_actual}
                      placeholder="Seleccionar unidad organizacional destino"
                    />
                    <label htmlFor={name}>
                      <small
                        style={{
                          color: 'rgba(0, 0, 0, 0.6)',
                          fontWeight: 'thin',
                          fontSize: '0.75rem'
                        }}
                      >
                        Unidad organizacional destino
                        {/*
                          {ccd_current
                            ? `
                              Organigrama Seleccionado
                            `
                            : `Seleccionar Organigrama`} */}
                      </small>
                    </label>
                  </div>
                )}
              />

              {/* definir parte 2, debe estar controlada por un moda - para carga del grid que muestras las personas que pertenecen a la unidad seleccioanda y las unidades del organigrama actual */}

              {/* {errors_create_ccd.organigrama != null && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )} */}
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
