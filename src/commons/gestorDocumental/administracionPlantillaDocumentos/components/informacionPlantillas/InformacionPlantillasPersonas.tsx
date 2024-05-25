/* eslint-disable @typescript-eslint/naming-convention */
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Grid, TextField, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Title } from '../../../../../components/Title';
import { api } from '../../../../../api/axios';
import { InfoPorId } from '../../interfaces/interfacesAdministradorPlantillas';


interface InformacionPlantillasPersonasProps {
  data: any; // Aquí debes especificar el tipo correcto de "data" si es posible
}
export const InformacionPlantillasPersonas: React.FC<InformacionPlantillasPersonasProps> = ( data ) => {
 
 const buscador_varaiable=data.data||0;

  const mi_info: InfoPorId = {
    id_plantilla_doc: 0,
    nombre_creador: null,
    nombre_completo: '',
    cod_tipo_acceso_display: '',
    nombre: '',
    descripcion: '',
    asociada_a_tipologia_doc_trd: false,
    otras_tipologias: null,
    codigo_formato_calidad_asociado: '',
    version_formato_calidad_asociado: '',
    cod_tipo_acceso: '',
    observacion: '',
    activa: false,
    fecha_creacion: '',
    id_archivo_digital: 0,
    id_formato_tipo_medio: 0,
    id_tipologia_doc_trd: 0,
    id_persona_crea_plantilla: 0,
  };
  const [info_por_id, set_info_por_id] = useState<InfoPorId>(mi_info);
  const [visible, set_visible] = useState<boolean>(false);

  const Fetch_buscar_info_porId = async (): Promise<void> => {
    try {
      const url = `/gestor/plantillas/plantilla_documento/get_id/${buscador_varaiable}/`;
      const res: any = await api.get(url);
      const [numero_consulta]: any = res.data.data;
      set_info_por_id(numero_consulta);
       //  console.log('')(numero_consulta);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (): void => {
    set_visible(true);
  };

  const footer_content = (
    <div>
      <Button
        style={{ margin: 3 }}
        color="primary"
        variant="contained"
        onClick={() => {
          set_visible(false);
        }}
      >
        Salir
      </Button>
    </div>
  );

  const title = <Title title="Detalle de Planilla " />;
  const {
    id_plantilla_doc,
    nombre_completo,
    cod_tipo_acceso_display,
    nombre,
    descripcion,
    asociada_a_tipologia_doc_trd,
    otras_tipologias,
    codigo_formato_calidad_asociado,
    version_formato_calidad_asociado,
    cod_tipo_acceso,
    observacion,
    activa,
    fecha_creacion,
    id_archivo_digital,
    id_formato_tipo_medio,
    id_tipologia_doc_trd,
    id_persona_crea_plantilla,
  } = info_por_id;
  // //  console.log('')(info_por_id);
  const fechaFormateada = new Date(fecha_creacion).toLocaleDateString();
  useEffect(() => {
    if (typeof buscador_varaiable !== 'undefined' && buscador_varaiable !== 0) {
      Fetch_buscar_info_porId().catch((error) => {
        console.error(error);
      });
    }
  }, [buscador_varaiable]);
  
  // useEffect(() => {
  //   Fetch_buscar_info_porId().catch((error) => {
  //     console.error(error);
  //   });
  // }, [buscador_varaiable]);

  return (
    <div>
      <Tooltip title="Informacion de alerta" placement="right">
       
          <VisibilityIcon onClick={handleClick}/>
       
      </Tooltip>
      <Dialog
        header={title}
        visible={visible}
        style={{ width: '60%' }}
        closable={false}
        onHide={() => {
          set_visible(false);
        }}
        footer={footer_content}
      >
        <Grid
          container
          sx={{
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >
          <Grid item xs={12} sm={3}>
            <TextField
              style={{ width: '85%', margin: 6 }}
              label="Clase Alerta"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={id_plantilla_doc||""}
            />
          </Grid>

          <Grid item xs={12} sm={9}>
            <TextField
              style={{ width: '94%', margin: 6 }}
              label="Nombre Creador"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={nombre_completo||""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              style={{ width: '95%', margin: 6 }}
              label="Nombre Completo"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={nombre||""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              style={{ width: '85%', margin: 6 }}
              label="Codigo Acceso"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={cod_tipo_acceso_display||""}
            />
          </Grid>

         
          <Grid item xs={12} sm={4}>
            <TextField
              style={{ width: '85%', margin: 6 }}
              label="asociado a tipologia"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={asociada_a_tipologia_doc_trd||""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              style={{ width: '85%', margin: 6 }}
              label="Otras Tipologias"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={otras_tipologias||""}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <TextField
              style={{ margin: 6, width: '85%' }}
              label="Codigo Formato Calidad Asociado"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={codigo_formato_calidad_asociado||""}
            />
          </Grid> 
           <Grid item xs={12} sm={3}>
            <TextField
              style={{ margin: 6, width: '85%' }}
              label="Activa"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={activa?"si":"no"||""}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              style={{ margin: 6, width: '85%' }}
              label="Version Formato De Calidad"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={version_formato_calidad_asociado||""}
            />
          </Grid>
          
  
          <Grid item xs={12} sm={3}>
            <TextField
              style={{ margin: 6, width: '85%' }}
              label="Codigo Acceso"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={cod_tipo_acceso_display||""}
            />
          </Grid>
      
          <Grid item xs={12} sm={4}>
            <TextField
              style={{ margin: 6, width: '85%' }}
              label="Fecha Creacion"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={fechaFormateada||""}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              style={{ margin: 6, width: '85%' }}
              label="Id Archivo Digital"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={id_archivo_digital||""}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              style={{ margin: 6, width: '85%' }}
              label="Id Formato  Medio"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={id_formato_tipo_medio||""}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              style={{ margin: 6, width: '85%' }}
              label="Id Tipologia Documento"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={id_tipologia_doc_trd||""}
            />
          </Grid> 
          <Grid item xs={12} sm={3}>
            <TextField
              style={{ margin: 6, width: '85%' }}
              label="Id Persona Creacion"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={id_persona_crea_plantilla||""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              style={{ margin: 6, width: '100%' }}
              label="Observacion"
              multiline
              value={observacion||""}
              // id="description"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              style={{ margin: 6, width: '100%' }}
              label="Descripcion"
              multiline
              value={descripcion||""}
              // id="description"
              disabled
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};
