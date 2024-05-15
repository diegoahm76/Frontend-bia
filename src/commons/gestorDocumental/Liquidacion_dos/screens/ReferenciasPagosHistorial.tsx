/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect } from 'react';
import { Grid, Button, TextField, ButtonGroup, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Persona } from '../../WorkFlowPQRSDF/interface/IwordFlow';
import { Title } from '../../../../components/Title';
import { BuscadorPerzonasStiven } from '../../WorkFlowPQRSDF/components/BuscadorPersonaPersonalizado/BuscadorPerzonas';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { DownloadButton } from '../../../../utils/DownloadButton/DownLoadButton';
import { api } from '../../../../api/axios';

interface ReferenciaPagoHistorico {
  id_referencia: number;
  nombre_completo: string;
  numero_documento: string;
  consecutivo: string;
  ruta_archivo: string;
  agno_referencia: number;
  nro_consecutivo: string;
  fecha_consecutivo: string;
  id_unidad: number;
  id_catalogo: number | null;
  id_persona_solicita: number;
  id_archivo: number;
}

interface FormState{
  referencia: string;
  fechaInicio:string;
  fechaFin: string;
  idPersona: string;
}
const intial_data: FormState = {
  referencia: '',
  fechaInicio: '',
  fechaFin: '',
  idPersona: ''
};


export const ReferenciasPagosHistorial = () => {
  const [data_table, set_data_tabla] = useState<ReferenciaPagoHistorico[]>([]);
  const [form, setForm] = useState<FormState>(intial_data);
  const [persona, set_persona] = useState<Persona | undefined>();

  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const Peticion_Busqueda_Avanzada = async (): Promise<void> => {
    try {
      let url = 'recaudo/configuracion_referencia/referencias/get/';
    

      const res = await api.get(url);
      const Data_consulta = res.data.data;
      set_data_tabla(Data_consulta);
    } catch (error) {
      console.error(error);
      // Handle errors appropriately here
    }
  };

  const limpiar_formulario = () => {
    // setForm([]);
  };

  useEffect(() => {
    Peticion_Busqueda_Avanzada();
  }, []);

  const handleResult = async (persona?: Persona): Promise<void> => {
    if (persona) {
      set_persona(persona);
    } else {
      console.log("No se seleccionó ninguna persona.");
    }
  };

  const {
    id_persona,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
} = persona ?? {};
const nombre_completo = `${primer_nombre ?? ''} ${segundo_nombre ?? ''} ${primer_apellido ?? ''} ${segundo_apellido ?? ''}`;
const nombre = nombre_completo ?? '';


  const columns: GridColDef[] = [
    { field: 'nombre_completo', headerName: 'Nombre Completo', flex: 1 },
    { field: 'numero_documento', headerName: 'Número Documento', flex: 1 },
    { field: 'consecutivo', headerName: 'Consecutivo', flex: 1 },
    { field: 'agno_referencia', headerName: 'Año Referencia', flex: 1 },
    { field: 'nro_consecutivo', headerName: 'Número Consecutivo', flex: 1 },
    { field: 'fecha_consecutivo', headerName: 'Fecha Consecutivo', flex: 1 },
    {
      field: 'ruta_archivo',
      headerName: 'Ruta Archivo',
      flex: 1,
      renderCell: (params: any) => (
        params.value ? (
          <DownloadButton
            condition={false}
            fileUrl={params.value}
            fileName={params.value}
          />
        ) : null
      ),
    }
  ];

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
                    <Title title="Consulta de Radicados " />
                </Grid>
               


                <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Prefijo"
                        value={form.fechaInicio}
                        onChange={(e) => handleInputChange('fechaInicio', e.target.value)}
                        style={{ marginTop: 15, width: '90%' }}
                    />
                </Grid>

                <Grid item xs={12} sm={2}>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Año"
                        value={form.fechaFin}
                        onChange={(e) => handleInputChange('fechaFin', e.target.value)}
                        style={{ marginTop: 15, width: '90%' }}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Modulo"
                        value={form.referencia}
                        onChange={(e) => handleInputChange('referencia', e.target.value)}
                        style={{ marginTop: 15, width: '90%' }}
                    />
                </Grid>

            
                {nombre && (
                    <Grid item xs={12} sm={3}>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            label="Nombre Titular"
                            value={nombre}
                            disabled
                            style={{ marginTop: 15, width: '95%' }}
                        />
                    </Grid>
                )}

                <Grid item xs={1} style={{ marginTop: 15 }}>
  
                <BuscadorPerzonasStiven onResultt={handleResult} />
                  </Grid>

                <Grid container spacing={2} justifyContent="flex-end" style={{marginTop:15}}>
                    <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                        <Button
                            style={{ width: '90%' }}
                            variant="contained"
                            startIcon={<SearchIcon />}
                            color="primary"
                            fullWidth
                            onClick={Peticion_Busqueda_Avanzada}
                        >
                            Buscar
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                        <Button
                            color="primary"
                            style={{ width: '90%' }}
                            variant="outlined"
                            onClick={limpiar_formulario}
                            fullWidth
                            startIcon={<CleanIcon />}
                        >
                            Limpiar
                        </Button>
                    </Grid>
                </Grid>

                <Grid item xs={12} style={{ marginTop: 10 }}>
                    <ButtonGroup
                        style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
                    >
                        {download_xls({ nurseries: data_table, columns })}
                        {download_pdf({
                            nurseries: data_table,
                            columns,
                            title: 'Consulta Radicados',
                        })}
                    </ButtonGroup>

                    <DataGrid
                        density="compact"
                        autoHeight
                        columns={columns}
                        rows={data_table || []}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={() => uuidv4()}
                    />
                </Grid>
            </Grid>
        </>
    );
};
