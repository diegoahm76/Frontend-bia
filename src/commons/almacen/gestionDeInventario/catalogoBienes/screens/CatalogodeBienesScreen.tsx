/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState, useEffect, useRef } from 'react';
import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
// // Hooks
// import { useAppDispatch, useAppSelector } from '../../../../hooks';
// Thunks

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import Button from '@mui/material/Button';
import { Grid, Stack, Box, Tooltip, IconButton, Avatar, CircularProgress, LinearProgress } from '@mui/material';
import { Title } from '../../../../../components/Title';
import CrearBienDialogForm from '../components/CrearBienDialogForm';
import {
  get_bienes_service,
  delete_nodo_service,
  get_code_bien_service,
} from '../store/thunks/catalogoBienesThunks';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import {
  initial_state_current_nodo,
  current_bien,
} from '../store/slices/indexCatalogodeBienes';
import { data, type INodo } from '../interfaces/Nodo';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
export const CatalogodeBienesScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [action, set_action] = useState<string>('create');

  const [add_bien_is_active, set_add_bien_is_active] = useState<boolean>(false);
  const { nodo, code_bien, current_nodo } = useAppSelector((state) => state.bien);
  const is_solicitud_realizada_ref = useRef(false);


  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (nodo?.length === 0) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 15000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [nodo]);
  
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const action_template = (node: INodo, Column: any) => {
    return (
      <>
        {node.data.crear && (
          <Tooltip title="Agregar">
            <IconButton
              onClick={() => {
                dispatch(current_bien(node));
                set_action('create_sub');
                set_add_bien_is_active(true);
             //   on_submit_crear_hijo(node.data);

              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <CreateNewFolderIcon
                  sx={{ color: '#495057', width: '25px', height: '25px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        )}
        {node.data.editar && (
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                dispatch(current_bien(node));
                set_action('editar');
                set_add_bien_is_active(true);
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <EditIcon
                  sx={{ color: '#495057', width: '25px', height: '25px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        )}
        {node.data.eliminar && (
          <Tooltip title="Eliminar">
            <IconButton
              onClick={() => {
                dispatch(delete_nodo_service(node.data.id_nodo));
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <DeleteIcon
                  sx={{ color: '#495057', width: '25px', height: '25px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        )}
      </>
    );
  };

  useEffect(() => {
    if (!is_solicitud_realizada_ref.current) {    
      void dispatch(get_bienes_service());
      is_solicitud_realizada_ref.current = true;
    }
  },[]);



  const on_submit_crear_padre = (): void => {
    const nivel_jerarquico = 1;
    void dispatch(
      get_code_bien_service(null, nivel_jerarquico)
  );
  };


  const on_submit_crear_hijo= (data: any): void => {
   //  console.log('')(data) 
  void dispatch(get_code_bien_service(data.bien?.id_bien, data.bien?.nivel_jerarquico + 1)) 
  }
    
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
          <Title title="Catálogo de bienes " />
          <Stack direction="row" spacing={2} sx={{ m: '20px 0' }}>
            <Button
              disabled={Object.keys(nodo).length !== 0 ? true : false}
              variant="outlined"
              startIcon={<AddIcon style={{ fontSize: '20px' }} />}
              onClick={() => {
                dispatch(current_bien(initial_state_current_nodo));
                set_action('create');
                set_add_bien_is_active(true);
             //   on_submit_crear_padre();

              }}
              type="button"
              title="Agregar"
              color="inherit"
            >
              Crear Carpeta Padre
            </Button>
          </Stack>
          <Grid item>
            <Box sx={{ width: '100%' }}>
              <TreeTable value={nodo} filterMode="strict" loading={loading} loadingIcon={<CircularProgress />}>
                <Column
                  expander
                  body={(row) =>
                    row.data.bien.nivel_jerarquico === 5 ? (
                      <InsertDriveFileIcon />
                    ) : (
                      <FolderIcon />
                    )
                  }
                  style={{ width: '250px' }}
                ></Column>
                <Column
                  header="Nombre"
                  field="nombre"
                  style={{ width: '300px' }}
                  filter
                  filterPlaceholder="Filter por nombre"
                ></Column>
                <Column
                  field="codigo"
                  header="Código"
                  style={{ width: '100px' }}
                  filter
                  filterPlaceholder="Filter por código"
                ></Column>
                <Column
                  header="Acciones"
                  body={action_template}
                  style={{ textAlign: 'center', width: '800px' }}
                ></Column>
              </TreeTable>
            </Box>
          </Grid>
        </Grid>
        <CrearBienDialogForm
          is_modal_active={add_bien_is_active}
          set_is_modal_active={set_add_bien_is_active}
          action={action}
        />
      </Grid>
    </>
  );
};
