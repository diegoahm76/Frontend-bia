/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useEffect, useState } from 'react';
import { api } from '../../../../api/axios';
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Avatar, IconButton } from '@mui/material';
import { AvatarStyles } from '../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';
import EditIcon from '@mui/icons-material/Edit';
export const IndicesElectronicos: FC = (): JSX.Element => {
  const columns_indices_electronicos: GridColDef[] = [
    {
      headerName: 'NOMBRE',
      field: 'nombre',
      minWidth: 200,
      maxWidth: 225,
      flex: 1
    },
    {
      headerName: 'searchIndex',
      field: 'searchIndex',
      minWidth: 250,
      maxWidth: 200,
      flex: 1
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      minWidth: 150,
      maxWidth: 170,
      flex: 1,
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => {
              console.log('params edit formato', params.row);
            }}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <EditIcon
                titleAccess="Editar formato tipo de medio"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      )
    }
  ];

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const url = `gestor/ccd/get-terminados/`;
    void api.get(url).then((response) => {
      const newData = response.data.map((item: any) => ({
        ...item,
        searchIndex: uuidv4().slice(0, 8)
      }));
      console.log(newData);

      setData(newData);
    });
  }, []);

  return (
    <div>
      <h1>Hola desde los índices electronicos</h1>
      <DataGrid
        density="compact"
        autoHeight
        columns={columns_indices_electronicos}
        rows={data}
        getRowId={(row) => row.searchIndex}
        pageSize={5}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};
