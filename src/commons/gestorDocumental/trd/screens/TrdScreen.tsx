/* eslint-disable @typescript-eslint/naming-convention */
//! libraries or frameworks
import { useContext, type FC } from 'react';
import { Controller } from 'react-hook-form';
//* Components Material UI
import { Grid, Box, TextField, Stack, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Title } from '../../../../components/Title';
// * react select
import Select from 'react-select';

import type {
  GridColDef
  // GridValueGetterParams
} from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { ModalContextTRD } from '../context/ModalsContextTrd';
import { ModalSearchTRD } from '../components/ModalBusqueda/ModalSearchTRD';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

// Íconos
import SyncIcon from '@mui/icons-material/Sync';
import CleanIcon from '@mui/icons-material/CleaningServices';

//* personalized hook
import { use_trd } from '../hooks/use_trd';

//* thunks
import { create_trd_service } from '../toolkit/TRDResources/thunks/TRDResourcesThunks';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
];

export const TrdScreen: FC = (): JSX.Element => {

  //* dispatch declaration
  const dispatch = useAppDispatch();

  //! use_trd hook
  const {
    // ? create_trd_modal - ccd, name and version
    control_create_trd_modal,
    // handle_submit_create_trd_modal,
    data_create_trd_modal,

    // ? list of finished ccd
    list_finished_ccd,

    // ? clean searched trd
    // reset_create_trd_modal,

    // ? reset all
    reset_all_trd
  } = use_trd();
  // const dispatch = useDispatch();

  // ? redux toolkit - values
  const { trd_current } = useAppSelector((state: any) => state.trd_slice);

  // ? modal context
  const { openModalModalSearchTRD } = useContext(ModalContextTRD);

  const onSubmit = (): any => {
    console.log('data', data_create_trd_modal);

    dispatch(create_trd_service(data_create_trd_modal))

  };

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        <Grid item xs={12}>
          <Title title="TRD - ( Tabla de retención documental )" />
          <form
            onSubmit={(w) => {
              w.preventDefault();
              onSubmit();
            }}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {/* <label className="text-terciary">
                  Lista de ccds terminadoss
                  <samp className="text-danger">*</samp>
                </label> */}
                {/* In this selection, I want to select the cdd id to make the post request to create a TRD */}
                <Controller
                  name="id_ccd"
                  control={control_create_trd_modal}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <div>
                      <Select
                        value={value}
                        // name="id_ccd"
                        onChange={(selectedOption) => {
                          console.log('selectedOption', selectedOption);
                          onChange(selectedOption);
                        }}
                        options={list_finished_ccd}
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
                          CDD Terminados
                        </small>
                      </label>
                    </div>
                  )}
                />
                {/* {errors.subserie_asignacion != null && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )} */}
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="nombre"
                  control={control_create_trd_modal}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      // name="nombre"
                      label="Nombre del TRD"
                      helperText="Ingrese nombre"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        console.log(e.target.value);
                      }}
                      // error={!!error}
                      /* helperText={
                        error
                          ? 'Es obligatorio subir un archivo'
                          : 'Seleccione un archivo'
                      } */
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="version"
                  control={control_create_trd_modal}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      // name="version"
                      label="Versión del TRD"
                      helperText="Ingrese versión"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        console.log(e.target.value);
                      }}
                      // error={!!error}
                      /* helperText={
                        error
                          ? 'Es obligatorio subir un archivo'
                          : 'Seleccione un archivo'
                      } */
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
                color="primary"
                variant="outlined"
                startIcon={<SearchIcon />}
                onClick={openModalModalSearchTRD}
              >
                BUSCAR TRD
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                startIcon={trd_current != null ? <SyncIcon /> : <SaveIcon />}
              >
                {trd_current != null ? 'ACTUALIZAR TRD' : 'CREAR TRD'}
              </Button>

              <Button
                color="success"
                variant="contained"
                startIcon={<CleanIcon />}
                onClick={() => {
                  reset_all_trd();
                  console.log('reset_create_trd_modal');

                  // setTrdCurrent(null);
                }}
              >
                LIMPIAR CAMPOS
              </Button>
            </Stack>
          </form>
          <Grid item>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Grid>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ m: '20px 0' }}
          >
            <Button
              color="success"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              FINALIZAR
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {/* -- this modal allow us to do the TRD search  -- */}
      <ModalSearchTRD />
      {/* -- this modal allow us to do the TRD search -- */}
    </>
  );
};
