/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack, TextField } from '@mui/material';
import { useContext, type FC } from 'react';
import { containerStyles } from '../../../screens/utils/constants/constants';
import { Title } from '../../../../../../components';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

// *icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { use_tca } from '../../../hooks/use_tca';
import { TCASTerminados } from '../view/TCASTerminados/TCASTerminados';
import { ModalContextTCA } from '../../../context/ModalContextTca';
import { TRDSUsados } from '../view/TRDSUsados/TRDSUsados';
import { BusquedaTCAModal } from '../view/BusquedaTCA/BusquedaTCAModal';

// import  LoadingButton  from '@mui/lab';
// import  SyncIcon  from '@mui/icons-material/Sync';

export const CreateAndUpdateTca: FC<any> = (): JSX.Element => {
  // ? useForm create and update tca
  const {
    control_create_update_tca
    // handleSubmit_create_update_tca,
    // formState_create_update_tca,
    // reset_create_update_tca,
    // watch_create_update_tca_value
  } = use_tca();

  //* CONTEXT MODALS
  const { openModalTcaTerminados, openModalTrdsUsados, openModalBusquedaTca } =
    useContext(ModalContextTCA);

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="TCA - ( Tabla de control de acceso )" />
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
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  zIndex: 2
                }}
              >
                {/* <label className="text-terciary">
            Lista de ccds terminadoss
            <samp className="text-danger">*</samp>
          </label> */}
                {/* In this selection, I want to select the cdd id to make the post request to create a TRD */}
                <Controller
                  name="id_trd"
                  control={control_create_update_tca}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <div>
                      <Select
                        value={value}
                        // name="id_trd"
                        onChange={(selectedOption) => {
                          /* dispatch(
                      getServiceSeriesSubseriesXUnidadOrganizacional(
                        selectedOption.item
                      )
                    ); */
                          console.log(selectedOption);
                          onChange(selectedOption);
                        }}
                        // isDisabled={tca_current != null}
                        options={[]}
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem'
                          }}
                        >
                          {/* {trd_current != null
                      ? `CCD seleccionado`
                      : `CDD's no usados en otro TRD`} */}
                          TRD seleccionado
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="nombre"
                  control={control_create_update_tca}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      fullWidth
                      // name="nombre"
                      label="Nombre del TCA"
                      /* helperText={
                   trd_current != null
                    ? 'Actualice el nombre'
                    : 'Ingrese nombre'
                } */
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        // console.log(e.target.value);
                      }}
                      // error={!!error}
                      /* helperText={
                  error
                    ? 'Es obligatorio este campo'
                    : 'Seleccione un archivo'
                } */
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="version"
                  control={control_create_update_tca}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      // name="version"
                      label="Versión del TCA"
                      /* helperText={
                  trd_current != null
                    ? 'Actualice la versión'
                    : 'Ingrese versión'
                } */
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        // console.log(e.target.value);
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: '20px', mt: '20px' }}
            >
              <Button
                color="warning"
                variant="outlined"
                startIcon={<VisibilityIcon />}
                onClick={openModalTcaTerminados}
              >
                {`TCA'S TERMINADOS`}
              </Button>

              <Button
                color="warning"
                variant="contained"
                startIcon={<VisibilityIcon />}
                onClick={openModalTrdsUsados}
              >
                {`TRD'S USADOS`}
              </Button>
              <Button
                color="primary"
                variant="outlined"
                startIcon={<SearchIcon />}
                onClick={openModalBusquedaTca}
              >
                BUSCAR
              </Button>
              {/* <LoadingButton
          disabled={trd_current != null}
          
          loading={false}
          type="submit"
          color="primary"
          variant="contained"
          startIcon={ trd_current != null ? <SyncIcon /> : <SaveIcon /> }
        >
           {trd_current != null ? 'ACTUALIZAR TRD' : 'CREAR TRD'} 
          CREAR TCA
        </LoadingButton> */}
              <Button
                color="primary"
                variant="contained"
                startIcon={<SaveIcon />}
                // onClick={openModalModalSearchTRD}
              >
                CREAR
              </Button>

              <Button
                color="success"
                variant="contained"
                startIcon={<CleanIcon />}
                onClick={() => {
                  console.log('cleaning');
                  // reset_all_trd();
                  // console.log('reset_create_trd_modal');
                  // setTrdCurrent(null);
                }}
              >
                LIMPIAR CAMPOS
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>

      {/* MODAL TCA'S TERMINADOS */}
      <TCASTerminados />

      {/* MODA TRD'S USADOS */}
      <TRDSUsados />

      {/* MODAL BUSQUEDA TCA */}

      <BusquedaTCAModal />
    </>
  );
};
