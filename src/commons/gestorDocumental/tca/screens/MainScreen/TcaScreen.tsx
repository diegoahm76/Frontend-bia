import { Link } from 'react-router-dom';
// Components Material UI
import { type FC } from 'react';
import {
  Grid,
  Box,
  TextField,
  // MenuItem,
  Stack,
  // ButtonGroup,
  Button
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Title } from '../../../../../components/Title';

import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { containerStyles } from '../utils/constants/constants';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import  LoadingButton  from '@mui/lab';
// import  SyncIcon  from '@mui/icons-material/Sync';

// ? hooks
import { use_tca } from '../../hooks/use_tca';

// Graficas

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

/* const tipos_unidades = [
  {
    value: '1',
    label: 'Test'
  },
  {
    value: 'EUR',
    label: 'Test'
  },
  {
    value: 'BTC',
    label: '฿'
  },
  {
    value: 'JPY',
    label: '¥'
  }
]; */

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TcaScreen: FC<any> = (props): JSX.Element => {
  // ? useForm create and update tca
  const {
    control_create_update_tca
    // handleSubmit_create_update_tca,
    // formState_create_update_tca,
    // reset_create_update_tca,
    // watch_create_update_tca_value
  } = use_tca();

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
                // onClick={openModalCCDUsados}
              >
                {`VER TCA'S TERMINADOS`}
              </Button>

              <Button
                color="warning"
                variant="contained"
                startIcon={<VisibilityIcon />}
                // onClick={openModalCCDUsados}
              >
                {`VER TRD'S USADOS`}
              </Button>
              <Button
                color="primary"
                variant="outlined"
                startIcon={<SearchIcon />}
                // onClick={openModalModalSearchTRD}
              >
                BUSCAR TCA
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
                CREAR TCA
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

      {/* parte 2. catalogo TRD seleccionado */}

      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Catálogo Tabla de retención documental seleccionado" />
          <Box sx={{ mt: '20px', mb: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {/* fin parte 2 */}

      {/* parte 3. catalogo TCA */}

      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Catálogo de la TCA ( Tabla control de acceso )" />
          <Box sx={{ mt: '20px', mb: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
            </Grid>
          </Box>
          <Grid item xs={12} sm={3.2} sx={{ marginTop: '20px' }}>


          <Link
              to="/app/gestor_documental/tca/administrar-tca/"
            >
              <Button
                // color="info"
                color="warning"
                variant="contained"
                // disabled={!trd_current}
                startIcon={<AdminPanelSettingsIcon />}
              >
                ADMINISTRAR CATÁLOGO TCA
              </Button>
            </Link>


           {/* <Button
              fullWidth
              color="warning"
              variant="contained"
              startIcon={<AdminPanelSettingsIcon />}
            >
              ADMINISTRAR CATÁLOGO TCA
            </Button> */}
          </Grid>
        </Grid>
      </Grid>

      {/* fin parte 3 */}

      {/* parte 4 - finalizar TCA  */}

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ mt: '20px' }}
      >
        <Button
          color="success"
          variant="contained"
          startIcon={
            //* -- <SaveIcon /> : <SyncIcon />
            <SaveIcon />
          }
        >
          {/*  condicional de terminación de tca necesarua  */}
          TERMINAR TCA
        </Button>
      </Stack>

      {/* fin parte 4 */}
    </>
  );
};
