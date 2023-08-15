/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useState } from 'react';
import { Avatar, Grid, IconButton } from '@mui/material';
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
import { DataGrid } from '@mui/x-data-grid';
import { columnsTraslado } from './columnsTraslado/columnsTraslado';
import { v4 as uuidv4 } from 'uuid';
import { Loader } from '../../../../../../../../../../utils/Loader/Loader';
import './css/style.css';
import AddIcon from '@mui/icons-material/Add';
import { AvatarStyles } from '../../../../../../../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';
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

  //! complemento columnas

  const columnsToUseDataGrid = [
    ...columnsTraslado,
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 180,
      renderCell: (params: any) => (
        <>
          <IconButton
            aria-label="añadirPersona"
            size="large"
            title="Agregar persona para traslado"
            onClick={() => {
              // ? añdir y actualizar tipologias asociadas a trd
              /* dispatch(
                add_tipologia_documental_to_trd(
                  nuevasTipologias.length > 0
                    ? [...nuevasTipologias, params.row]
                    : [...tipologias_asociadas_a_trd, params.row]
                )
              );
              control_success('Tipología añadida a la relación TRD'); */
              console.log(params.row);
              /* reset_administrar_trd({
              }); */
            }}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <AddIcon
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px'
                }}
              />
            </Avatar>
          </IconButton>
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
            </Grid>

            {/* definir parte 2, debe estar controlada por un boolean para mostrar o no - para carga del grid que muestras las personas que pertenecen a la unidad seleccioanda y las unidades del organigrama actual */}
            {viweGridDataPersons ? (
              <Loader altura="270px" />
            ) : (
              <DataGrid
                sx={{ marginTop: '1.5rem' }}
                density="compact"
                autoHeight
                rows={listado_personas_unidades}
                columns={columnsToUseDataGrid}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => uuidv4()}
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
