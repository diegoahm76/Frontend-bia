/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useState } from 'react';
import { Button, Checkbox, Grid, Stack } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useUnidadAUnidad } from '../../../../hook/useUnidadAUnidad';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../../../../../../../hooks';
import { Title } from '../../../../../../../../../../components';
import { containerStyles } from '../../../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import {
  TrasladoMasivoUnidadAUnidad,
  getListPersonasUnidades
} from '../../../../toolkit/thunks/thunks_uni_a_uni';
import {
  setListadoPersonasTotalesUnidades,
  setListadoPersonasUnidades,
  setUnidadActualCurrent,
  setUnidadAnteriorCurrent
} from '../../../../toolkit/slice/Uni_A_UniSlice';
import { columnsTraslado } from './columnsTraslado/columnsTraslado';
import { Loader } from '../../../../../../../../../../utils/Loader/Loader';
import './css/style.css';
import { RenderDataGrid } from '../../../../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ClearIcon from '@mui/icons-material/Clear';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LoadingButton } from '@mui/lab';

export const Traslado: FC<any> = (): JSX.Element => {
  //* dispatch declararion
  const dispatch = useAppDispatch();

  //* states
  const {
    unidades_org_anterior,
    unidad_anterior_current,
    unidades_org_actual,
    listado_personas_unidades,
    unidad_actual_current
  } = useAppSelector((state: any) => state.uni_a_uni_slice);

  //* hooks
  const { control_traslado_unidad_a_unidad, reset_traslado_unidad_a_unidad } =
    useUnidadAUnidad();

  //* states for this component
  // ? controla la visibilidad del grid de personas
  const [viweGridDataPersons, setviweGridDataPersons] = useState(false);
  // ? controla la visibilidad del grid de personas - incluido el select de unidades organizacionales y buttons (proceder, limpiar , salir)
  const [showSecondPart, setshowSecondPart] = useState(false);
  // ? acumula los items que selecciono en el datagrid con el checkbox para realizar el traslado masivo
  const [selectedItems, setSelectedItems] = useState<any>([]);
  // ? loading realizar traslado masivo
  const [loadingTrasladoMasivo, setLoadingTrasladoMasivo] = useState(false);

  const handleCheckboxChange = (event: any, item: any): void => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, item]);
      //  console.log('')(selectedItems);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem: any) => selectedItem !== item)
      );
      //  console.log('')(selectedItems);
    }
  };

  const cleanFormAndGrid = (): void => {
    //  console.log('')('clean');
    reset_traslado_unidad_a_unidad({
      id_antigua_unidad_organizacional: '',
      id_nueva_unidad_organizacional: ''
    });
    dispatch(setUnidadAnteriorCurrent(null));
    dispatch(setListadoPersonasUnidades([]));
    dispatch(setUnidadActualCurrent(null));
    setSelectedItems([]);
  };

  const onSubmit = async (): Promise<any> => {
    const result = await Swal.fire({
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn'
      },
      width: 350,
      text: '¿Estás seguro de realizar el traslado masivo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, realizar!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const dataToSend = {
          personas: selectedItems.map((el: any) => el.id_persona),
          id_nueva_unidad_organizacional: unidad_actual_current
        };

        void TrasladoMasivoUnidadAUnidad(
          dataToSend,
          setLoadingTrasladoMasivo
        ).then((_res) => {
          //* realizar la peticion para refresecar el grid con las personas actualizadas de la unidad
          void getListPersonasUnidades(
            unidad_anterior_current,
            setviweGridDataPersons
          ).then((_res) => {
            setSelectedItems([]);
            setshowSecondPart(false);
            cleanFormAndGrid();
            // //  console.log('')(res);
            // ? pendiente
            // dispatch(setListadoPersonasUnidades(res));
            // * from this event I have to manage the modal show and hide of the grid
          });
        });
      } catch (error: any) {
        //  console.log('')(error);
      }
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
            title="Seleccionar item para traslado a nueva unidad"
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
              void onSubmit();
            }}
            style={{
              marginTop: '20px',
              marginBottom: '2rem',
            }}
          >
            <Grid
              item
              xs={12}
              sm={5}
              sx={{
                zIndex: 9999
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
                        //  console.log('')(selectedOption);
                        setshowSecondPart(true);
                        dispatch(
                          setUnidadAnteriorCurrent(selectedOption.value)
                        );
                        void getListPersonasUnidades(
                          selectedOption.value,
                          setviweGridDataPersons
                        ).then((res) => {
                          //  console.log('')(res);
                          dispatch(setListadoPersonasUnidades(res?.dataFilter));
                          dispatch(
                            setListadoPersonasTotalesUnidades(res?.dataTotal)
                          );
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
                        Unidad organizacional de origen
                      </small>
                    </label>
                  </div>
                )}
              />
            </Grid>
            {showSecondPart && (
              <>
                {viweGridDataPersons ? (
                  <Loader altura="270px" />
                ) : (
                  <>
                    <RenderDataGrid
                      title="Personas pertenecientes a la unidad organizacional seleccionada"
                      rows={listado_personas_unidades || []}
                      columns={columnsToUseDataGrid || []}
                    />
                  </>
                )}

                <Grid container sx={containerStyles} spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={5}
                    sx={{
                      zIndex: 999
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
                              //  console.log('')(selectedOption);
                              dispatch(
                                setUnidadActualCurrent(selectedOption.value)
                              );
                              onChange(selectedOption);
                            }}
                            options={unidades_org_actual}
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
                              Unidad organizacional de destino
                            </small>
                          </label>
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={2}
                    >
                      <LoadingButton
                        loading={loadingTrasladoMasivo}
                        type="submit"
                        fullWidth
                        title="Trasladar personas seleccionadas a la unidad organizacional destino"
                        disabled={
                          selectedItems.length === 0 || !unidad_actual_current
                        }
                        variant="contained"
                        color="success"
                        sx={{ height: '100% !important' }}
                        startIcon={<ChecklistIcon />}
                      >
                        PROCEDER
                      </LoadingButton>
                      <Button
                        fullWidth
                        title="Limpiar campos y data de personas"
                        variant="outlined"
                        color="primary"
                        onClick={cleanFormAndGrid}
                        sx={{ height: '100% !important' }}
                        startIcon={<CleanIcon />}
                      >
                        LIMPIAR CAMPOS
                      </Button>
                      <Link to="/app/home" onClick={cleanFormAndGrid}>
                        <Button
                          // type="submit"
                          fullWidth
                          title="Salir del proceso de traslado de unidad a unidad, volver a home"
                          variant="outlined"
                          color="error"
                          sx={{ height: '100% !important' }}
                          startIcon={<ClearIcon />}
                        >
                          SALIR
                        </Button>
                      </Link>
                    </Stack>
                  </Grid>
                </Grid>
              </>
            )}

            {/* definir parte 2, debe estar controlada por un boolean para mostrar o no - para carga del grid que muestras las personas que pertenecen a la unidad seleccioanda y las unidades del organigrama actual */}
          </form>
        </Grid>
      </Grid>
    </>
  );
};
