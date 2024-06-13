/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { ButtonGroup, Grid, IconButton, Tooltip } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { set } from 'date-fns';
import dayjs, { Dayjs } from 'dayjs';
import { interface_movimientos_inventario } from '../interfaces/types';
import ExportDocs from '../../controlDeInventario/screens/ExportDocs';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { DialogMAFI } from '../components_reports/DialogMAFI';

interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_movimientos_inventario }) => React.ReactNode;
}

interface props {
  data: interface_movimientos_inventario[];
}

const TablaMovimientosInventario: React.FC<props> = ({
  data
}) => {

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [currentBien, setCurrentBien] = useState<any>(null);

  let columns: custom_column[] = [
    {field: 'consecutivo',headerName: 'Consecutivo',minWidth: 120, flex: 1},
    {field: 'codigo_bien', headerName:'Código bien', minWidth:150, flex:1},
    {field: 'nombre_bien', headerName:'Nombre bien', minWidth:250, flex:1},
    {field: 'estado', headerName:'Estado bien', minWidth:150, flex:1},
    {field: 'identificador_bien', headerName:'Placa / Serial', minWidth:150, flex:1},
    {field: 'nombre_marca', headerName:'Marca del bien', minWidth:150, flex:1},
    {field: 'cod_tipo_activo', headerName:'Tipo Activo', minWidth:150, flex:1},
    {field: 'nombre_persona_responsable', headerName:'Funcionario responsable', minWidth:300, flex:1},
    {field: 'nombre_persona_origen', headerName:'Persona origen', minWidth:300, flex:1},
    {field: 'tipo_movimiento', headerName:'Tipo de movimiento', minWidth:240, flex:1},
    {field: 'fecha_ingreso', headerName:'Fecha ingreso', minWidth:180, flex:1,
      valueFormatter: (params) => params.value ? dayjs(params.value as string).format('DD/MM/YYYY') : '',
    },
    {field: 'fecha_ultimo_movimiento', headerName:'Fecha del movimiento', minWidth:180, flex:1,
      valueFormatter: (params) => params.value ? dayjs(params.value as string).format('DD/MM/YYYY') : '',
    },
    {field: 'cantidad', headerName:'Cantidad', minWidth:80, flex:1},
    {field: 'valor_ingreso', headerName:'Valor ingreso', minWidth:140, flex:1},
    {field: 'ubicacion', headerName:'Ubicación', minWidth:200, flex:1},
    {
      field: 'ACCIONES',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
        <>
          <Tooltip title="Ver" arrow>
            <IconButton
              onClick={() => {
                setShowDialog(true);
                setCurrentBien(params.row);
              }}
            >
                <RemoveRedEyeIcon
                  titleAccess="Editar cuenca"
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];


  return (
    <>
      <DialogMAFI
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        currentBien={currentBien}
      />
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={12}>
          <ExportDocs cols={columns} resultado_busqueda={data} filtros={null} title={'Movimientos sobre los bienes (activos fijos) del inventario'} nombre_archivo={'Movimientos sobre los bienes (activos fijos) del inventario'} filtros_pdf={null}></ExportDocs>
          <DataGrid
            style={{margin:'15px 0px'}}
            density="compact"
            autoHeight
            rows={data ?? []}
            columns={columns ?? []}
            pageSize={5}
            rowHeight={75}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row.id_bien === undefined ? uuidv4() : row.id_bien}
          />
        </Grid>
      </Grid>

    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaMovimientosInventario;