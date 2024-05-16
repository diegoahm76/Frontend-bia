/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect, useContext } from 'react';
import { jsPDF } from 'jspdf';
import { Iinformacion_opa, initialDataOpa } from '../../interfaces/InterfacesInicializacionJuridicaOpas';
import { StepperContext } from '../../../context/SteperContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from "@mui/icons-material/Save";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios, { AxiosError } from 'axios';
import { Button, Grid, TextField } from '@mui/material';
import { Title } from '../../../../../../components';
import { api } from '../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../helpers';
import { logo_cormacarena_h } from '../../../../../conservacion/Reportes/logos/logos';

export const VisorDocumento: React.FC = () => {

  const [visor, setVisor] = useState('');
  const [form_data, set_form_data] = useState<Iinformacion_opa>(initialDataOpa);
  const { id, setActiveStep, activeStep, activeDocuments } = useContext(StepperContext);
  console.log(activeDocuments);


  useEffect(() => {
    generarHistoricoBajas();
  }, []);


  const generarHistoricoBajas = () => {
    const doc = new jsPDF();

    const agregarEncabezado = () => {
      doc.addImage(logo_cormacarena_h, 160, 10, 40, 10);
    };

    agregarEncabezado();

    doc.setFontSize(12);

    let altura = 40;

    const camposParaMostrar = [
      'relacion_con_el_titular',
      'radicado',
      'cod_tipo_documento_persona_interpone',
      'nombre_persona_interpone',
      'numero_documento_persona_interpone',
      'cod_tipo_documento_persona_titular',
      'nombre_persona_titular',
      'numero_documento_persona_titular',
      'nombre_proyecto',
      'costo_proyecto'
    ];

    if (form_data !== null && form_data !== undefined) {
      camposParaMostrar.forEach((campo) => {
        if (form_data.hasOwnProperty(campo)) {
          const value = form_data[campo as keyof Iinformacion_opa]; // Comprobación de tipo
          doc.text(`${campo.charAt(0).toUpperCase() + campo.slice(1)}: ${value}`, 10, altura);
          altura += 10; // Incrementa la altura para la próxima línea
        }
      });
    }

    // Agregar título
    doc.setFontSize(16);
    doc.text("Título del documento", 105, 30, { align: "center" }); // Alineado al centro de la página

    // Agregar información de los documentos
    altura += 20; // Espacio entre secciones
    doc.text("Lista de Reporte de Documentos:", 10, altura);
    altura += 10; // Espacio entre título y contenido

    activeDocuments.forEach((document, index) => {
      const description = document.observation || "Sin descripción";
      const status = document.aprobado ? "Aprobado" : "No aprobado";

      const documentName = `El documento con nombre "${document.name}" tiene la siguiente observación en la revisión jurídica:`;
      const statusMessage = `Por lo tanto, el estado es "${status}".`;

      doc.text(`Documento ${index + 1}:`, 15, altura);
      doc.text(documentName, 20, altura + 10);

      // Dividir la descripción en líneas más cortas
      const maxLineLength = 80; // Cantidad máxima de caracteres por línea
      let lines = [];
      for (let i = 0; i < description.length; i += maxLineLength) {
        lines.push(description.substring(i, i + maxLineLength));
      }
      // Imprimir cada línea de la descripción
      lines.forEach((line, lineNumber) => {
        if (altura + 20 + lineNumber * 10 > 280) {
          doc.addPage();
          agregarEncabezado();
          altura = 40;
        }
        doc.text(line, 20, altura + 20 + lineNumber * 10);
      });

      doc.text(statusMessage, 20, altura + 20 + lines.length * 10);
      altura += 40 + lines.length * 10; // Espacio entre documentos
    });


    setVisor(doc.output('datauristring'));
  };



  // Consulta las opciones de tipo de pago
  const consulta_informacion_opa = async () => {
    try {
      let url = `/gestor/panel_juridica/opas/informacion/get/${id}/`;
      const res = await api.get(url);
      const dataConsulta = res.data.data;
      set_form_data(dataConsulta);

    } catch (error) {
      console.error(error);
    }
  };

  const crear_configuracion_expediente_simple = async () => {
    try {
      const body = {
        "aprueba_solicitud_tramite": true,
        "observacion": "Se finaliza la revisión jurídica ."
    };


     const response = await api.post(`/gestor/panel_juridica/opas/revision/create/${id}/`, body);
    const data = response.data;
    control_success('Completada correctamente');
    console.log(data);
      console.log(data);
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  }




useEffect(() => {
  consulta_informacion_opa();
}, [])



return (
  <>
    <Grid container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}>

      {/* Título */}
      <Grid item xs={12} sx={{
        marginBottom: 3.2,
      }}>
        <Title title="Finalización de revisión Jurídica" />
      </Grid>


      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          disabled
          style={{ marginTop: 15, width: '95%' }}
          size="small"
          variant="outlined"
          value={form_data.relacion_con_el_titular}
          label="Radicacion a Nombre"
          // onChange={(e) => handleInputChange('radicado', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          disabled
          style={{ marginTop: 15, width: '95%' }}
          size="small"
          variant="outlined"
          value={form_data.radicado}
          label="Radicado"
          // onChange={(e) => handleInputChange('Radicado', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>


      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          disabled
          style={{ marginTop: 15, width: '95%' }}
          size="small"
          variant="outlined"
          value={form_data.cod_tipo_documento_persona_interpone}
          label="Tipo Documento Persona Interpone"
        // onChange={(e) => handleInputChange('nombres', e.target.value)}
        />
      </Grid>


      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          disabled
          style={{ marginTop: 15, width: '95%' }}
          size="small"
          variant="outlined"
          value={form_data.nombre_persona_interpone}
          label="Nombre Persona Interpone"
        // onChange={(e) => handleInputChange('cedulaCiudadania', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          disabled
          style={{ marginTop: 15, width: '95%' }}
          size="small"
          variant="outlined"
          value={form_data.numero_documento_persona_interpone}
          label="Cédula de Ciudadanía Persona Interpone"
        // onChange={(e) => handleInputChange('numeroIdentificacion', e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          disabled
          style={{ marginTop: 15, width: '95%' }}
          size="small"
          variant="outlined"
          value={form_data.cod_tipo_documento_persona_titular}
          label="Tipo Documento Titular"
        // onChange={(e) => handleInputChange('nombres', e.target.value)}
        />
      </Grid>


      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          disabled
          style={{ marginTop: 15, width: '95%' }}
          size="small"
          variant="outlined"
          value={form_data.nombre_persona_titular}
          label="Nombre Titular"
        // onChange={(e) => handleInputChange('cedulaCiudadania', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          disabled
          style={{ marginTop: 15, width: '95%' }}
          size="small"
          variant="outlined"
          value={form_data.numero_documento_persona_titular}
          label="Cédula de Ciudadanía Titular"
        // onChange={(e) => handleInputChange('numeroIdentificacion', e.target.value)}
        />
      </Grid>



     {/* <Grid container alignItems="center" justifyContent="center">
        <Grid item style={{ marginTop: 15 }}>
          <Button startIcon={<PictureAsPdfIcon />} color="success" variant='contained' onClick={generarHistoricoBajas}>
            Generar PDF
          </Button>
        </Grid>
      </Grid>*/}

     {/* <Grid item xs={12} style={{ marginTop: 15 }}>

        <embed
          src={visor}
          type="application/pdf"
          width="100%"
          height="500px"
        />
      </Grid>
*/}


      <Grid container justifyContent="flex-end">

        <Grid item xs={12} sm={5} md={3.4} lg={2.9}>
          <Button
            startIcon={<SaveIcon />}
            style={{ width: "90%", marginTop: 30 }}
            onClick={crear_configuracion_expediente_simple}
            color="success" // Cambia el color según si es una actualización o creación
            fullWidth
            variant="contained"
          >
            Guardar Revision Juridica
          </Button>
        </Grid>



        <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
          <Button
            fullWidth
            style={{ width: "90%", marginTop: 30 }}
            variant="contained"
            color="warning"
            startIcon={<ArrowBackIcon />} // Agrega el icono de flecha hacia atrás
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
          >
            Paso anterior
          </Button>
        </Grid>
      </Grid>
    </Grid >
  </>
)
}
