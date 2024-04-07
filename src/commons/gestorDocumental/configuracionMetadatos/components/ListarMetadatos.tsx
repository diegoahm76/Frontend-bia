/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Avatar, Button, Chip, Grid, IconButton, Tooltip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import { Title } from '../../../../components/Title';
import FormSelectController from '../../../../components/partials/form/FormSelectController';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { get_uni_organizacional } from '../../../almacen/registroSolicitudesAlmacen/solicitudBienConsumo/store/solicitudBienConsumoThunks';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { get_metadatos } from '../store/thunks/metadatos';

interface IProps {
  handle_edit_click: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
const ListadoMetadatos = ({ handle_edit_click }: IProps) => {
  const { metadatos } = useAppSelector((state) => state.metadatos);
  const dispatch = useAppDispatch();

  const colums_persona_alerta: GridColDef[] = [
    {
      field: 'nombre_metadato',
      headerName: 'NOMBRE',
      width: 250,
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCIÓN',
      width: 250,
    },
    {
      field: 'ACCIÓN',
      headerName: 'ACCIÓN',
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={() => handle_edit_click(params.row)}
          startIcon={<EditIcon />}
        ></Button>
      ),
    },
  ];

  useEffect(() => {
    void dispatch(get_metadatos());
    //  console.log('')(metadatos)
  }, []);

  return (
    <Grid
      container
      spacing={2}
      m={2}
      p={2}
      justifyContent={'center'}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        m: '10px 0 20px 0',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',

      }}
    >
      <Grid item xs={12}>
        <Title title="LISTADO DE METADATOS" />
      </Grid>

      <Grid item marginTop={2} spacing={2}  xs={8}>
        <DataGrid
          density="compact"
          autoHeight
          rows={metadatos}
          columns={colums_persona_alerta}
          getRowId={(row) => uuidv4()}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default ListadoMetadatos;
