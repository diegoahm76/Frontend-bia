import { useEffect, useState } from 'react';
import { Box, Button, Grid, Stack, Tooltip, IconButton, Avatar } from "@mui/material";
import { Title } from "../../../../components";
import { get_germination_beds_service, update_germination_beds_service } from '../store/thunks/configuracionThunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IObjGerminationBed, type IObjNursery } from "../interfaces/configuracion";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useParams } from 'react-router-dom';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { current_germination_bed, initial_state_current_germination_bed } from '../store/slice/configuracionSlice';
import BlockIcon from '@mui/icons-material/Block';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import CrearCamaGerminacionDialogForm from '../componentes/CrearCamaGerminacionDialogForm';
import AutocompleteVivero from "../../componentes/AutocompleteVivero";

// eslint-disable-next-line @typescript-eslint/naming-convention
export function AdministracionCamasGerminacionScreen(): JSX.Element {
  const { germination_beds } = useAppSelector((state) => state.configuracion);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [action, set_action] = useState<string>("");
  const [nursery, set_nursery] = useState<IObjNursery | null>(null);
  const [aux_germination_beds, set_aux_germination_beds] = useState<IObjGerminationBed[]>([]);

  const [add_bed_is_active, set_add_bed_is_active] =useState<boolean>(false);
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
          <Tooltip title={(params.row.item_activo === true) ? "Desactivar" : "Activar"}>
            <IconButton
              onClick={() => {
                activate_deactivate_germination_bed(params.row.nro_de_orden);

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
                {params.row.item_activo === true ?
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
                onClick={() => {
                  delete_germination_bed(params.row.nro_de_orden);
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

  const delete_germination_bed: any = ((id: number | string) => {
    const aux_beds: IObjGerminationBed[] = []
    aux_germination_beds.forEach((option) => {
      if (option.nro_de_orden !== id) {
        aux_beds.push(option)
      }
    })
    set_aux_germination_beds(aux_beds)
  })

  const activate_deactivate_germination_bed: any = ((id: number | string) => {
    const aux_beds: IObjGerminationBed[] = []
    aux_germination_beds.forEach((option) => {
      if (option.nro_de_orden === id) {
        const state = !(option.item_activo??true)
        aux_beds.push({ ...option, item_activo: state })
      } else {
        aux_beds.push(option)
      }
    })
    set_aux_germination_beds(aux_beds)
  })

  useEffect(() => {
    if (nursery !== null) { void dispatch(get_germination_beds_service(nursery.id_vivero)) }
  }, [nursery]);

  useEffect(() => {
    set_aux_germination_beds(germination_beds)
  }, [germination_beds]);

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
            <AutocompleteVivero
              id={id}
              set_value={set_nursery}
              value={nursery}
            />

          </Grid>
          {nursery !== null ? nursery?.id_vivero !== null ? 
            <>
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
                    rows={aux_germination_beds}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row.nro_de_orden}
                  />
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mr: '15px', mb: '10px', mt: '10px' }}
                  >
                    <Button
                      onClick={() => {
                        dispatch(get_germination_beds_service(nursery?.id_vivero))
                      }}

                      variant="outlined"
                      startIcon={<CloseIcon />}
                    >
                      CANCELAR
                    </Button>

                    <Button
                      onClick={() => {
                        dispatch(update_germination_beds_service(nursery?.id_vivero, aux_germination_beds))
                      }}
                      type="button" variant="contained" startIcon={<SaveIcon />}>
                      GUARDAR
                    </Button>

                  </Stack>
                </Box>
              </Grid>
            </>
            : null : null}
          <CrearCamaGerminacionDialogForm
            is_modal_active={add_bed_is_active}
            set_is_modal_active={set_add_bed_is_active}
            action={action}
            beds={aux_germination_beds}
            set_aux_germination_beds={set_aux_germination_beds}
          />
        </Grid>
      </Grid>
    </>
  );
}
