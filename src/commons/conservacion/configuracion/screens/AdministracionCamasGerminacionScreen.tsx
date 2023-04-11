
import { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Grid, TextField, Stack, Chip, Tooltip, IconButton, Avatar } from "@mui/material";
import { Title } from "../../../../components";
import { get_germination_beds_service, get_nursery_service, get_nurseries_service } from '../store/thunks/configuracionThunks';
// // Hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IObjNursery } from "../interfaces/configuracion";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { current_germination_bed, initial_state_current_germination_bed } from '../store/slice/configuracionSlice';
import BlockIcon from '@mui/icons-material/Block';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import CrearCamaGerminacionDialogForm from '../componentes/CrearCamaGerminacionDialogForm';



// eslint-disable-next-line @typescript-eslint/naming-convention
export function AdministracionCamasGerminacionScreen(): JSX.Element {
  const { nurseries, current_nursery, germination_beds } = useAppSelector((state) => state.configuracion);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [action, set_action] = useState<string>("");
  const [nursery, set_nursery] = useState<IObjNursery>(current_nursery);
  const [add_bed_is_active, set_add_bed_is_active] =
  useState<boolean>(false);
  const columns: GridColDef[] = [
    { field: 'id_cama_germinacion_vivero', headerName: 'ID', width: 20 },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'observacion',
      headerName: 'Observacion',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
   
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <>
        <Tooltip title="Detalle">
            <IconButton
              onClick={() => {
                dispatch(current_germination_bed(params.row));
                set_action("detail")
                set_add_bed_is_active(true)
              }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <ArticleIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />

              </Avatar>
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                dispatch(current_germination_bed(params.row));
                set_action("edit")
                set_add_bed_is_active(true)
              }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <EditIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />

              </Avatar>
            </IconButton>
          </Tooltip>
          <Tooltip title={params.row.activo ? "Desactivar" : "Activar"}>
            <IconButton
              // onClick={() => {
              //   dispatch(activate_deactivate_bed_service(params.row.id_vivero));
              // }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                {params.row.activo ?
                  <BlockIcon // icon desactivar
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  /> :
                  <DoneOutlineIcon // icon activar
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  />
                }

              </Avatar>
            </IconButton>
          </Tooltip>

          {(params.row.item_activo === false && params.row.item_ya_usado === false) ?
            <Tooltip title="Eliminar">
              <IconButton
                // onClick={() => {
                //   dispatch(delete_nursery_service(params.row.id_vivero));
                // }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <DeleteIcon
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  />

                </Avatar>
              </IconButton>
            </Tooltip>
            : null
          }
        </>
      ),
    },
  ];
  


  useEffect(() => {
    void dispatch(get_nurseries_service());
    if(id !== null && id !== undefined ){
      void dispatch(get_nursery_service(id))
    } else(
      set_nursery(current_nursery)
    )
  }, []);

  useEffect(() => {
    set_nursery({...current_nursery, justificacion_apertura:"", justificacion_cierre:""})
    console.log(current_nursery)
  }, [current_nursery]);

  useEffect(() => {
    void dispatch(get_germination_beds_service(nursery.id_vivero))
  }, [nursery]);

  const nurseries_closing = {
    options: nurseries,
    getOptionLabel: (option: IObjNursery) => option.nombre,
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
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Camas de germinacion viveros"></Title>
          <Grid item xs={11} md={12} margin={2} >
              <Autocomplete
                {...nurseries_closing}
                id="controlled-demo"
                value={nursery}
                onChange={(event: any, newValue: any) => {
                  set_nursery(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Seleccione vivero" variant="standard" />
                )}
              />
          </Grid>
          <Stack direction="row" spacing={2} sx={{ m: '20px 0' }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                dispatch(current_germination_bed(initial_state_current_germination_bed));
                set_action("create")
                set_add_bed_is_active(true);
              }}
            >
              Crear cama de germinación
            </Button>
          </Stack>
          <Grid item>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={germination_beds}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_cama_germinacion_vivero}
              />
            </Box>
          </Grid>
          <CrearCamaGerminacionDialogForm
            is_modal_active={add_bed_is_active}
            set_is_modal_active={set_add_bed_is_active}
            action = {action}
          />
        </Grid>
      </Grid>
    </>
  );
}
