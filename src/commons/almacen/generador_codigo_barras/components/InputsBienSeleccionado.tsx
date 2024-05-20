import { Button, Grid, TextField} from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { interface_busqueda_bienes } from '../interfaces/types';
import ModalBusquedaBienes from '../manners/ModalBusquedaBienes';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import jsPDF from 'jspdf';
import JsBarcode from 'jsbarcode';
import { Title } from '../../../../components';
import { generar_texto_centrado } from '../thunks/generador_codigo_barras';
import dayjs from 'dayjs';




// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const InputsBienSeleccionado: FC = () => {

  const dispatch = useDispatch()
  // Estados para busqueda de personas
  const [mostrar_modal_buscar_bien, set_mostrar_modal_buscar_bien] = useState<boolean>(false);

  const [data_bien_seleccionado, set_data_bien_seleccionado] = useState<interface_busqueda_bienes>(Object);

  const [accion, set_accion] = useState<string>('null');

  const pdf_viewer_ref = useRef(null);


  const handle_agregar_articulo = async () => {
    set_accion('codigo_generado');
  };

  useEffect(() => {
    const ancho_pdf: number = 50; // Ancho en mm
    const alto_pdf: number = 25; // Alto en mm

    const doc_barr_code = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [alto_pdf, ancho_pdf], // Alto de 25 mm y ancho de 600 mm
    });

    // --------------------- CODIGO DE BARRAS ------------------ //
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, data_bien_seleccionado.cod_tipo_bien === 'A' ? data_bien_seleccionado.identificador_bien : data_bien_seleccionado.codigo_bien, {
        format: 'CODE128',
        displayValue: false,
        margin: 2,
    });
    const image_data_url = canvas.toDataURL('image/jpeg');
    const width_code = 40;
    const height_code = 6;
    // Posicion del codigo de barras en eje Y
    const y = 6;
    // Posicion del codigo de barras en eje X para centrarlo
    const x = (ancho_pdf - width_code) / 2;
    doc_barr_code.addImage(image_data_url, 'JPEG', x, y, width_code, height_code);

    // ----------------------- ENCABEZADO --------------------- //
    doc_barr_code.setFont("courier", 'bold');
    doc_barr_code.setFontSize(7);
    doc_barr_code.text('CORMACARENA', 3, 4);
    doc_barr_code.setFontSize(6);
    doc_barr_code.text('NIT 822000091 - 2', 25, 4);

    // ----------------- NOMBRE DEL PRODUCTO ------------------ //
    generar_texto_centrado(data_bien_seleccionado?.nombre_bien, 7, 16, doc_barr_code);

    // ----- COD IDENTIFICADO, PIE DE CODIGO BARRA ----------- //
    generar_texto_centrado(`COD IDENT.: ${data_bien_seleccionado.cod_tipo_bien === 'A' ? data_bien_seleccionado.identificador_bien : data_bien_seleccionado.codigo_bien}`, 5, 13.4, doc_barr_code);

    // -------------- S/N - PIE PAGINA DE PDF --------------- //
    doc_barr_code.setFontSize(6);
    doc_barr_code.text(`S/N: ${data_bien_seleccionado.cod_tipo_bien === 'A' ? data_bien_seleccionado.identificador_bien : data_bien_seleccionado.codigo_bien}`, 3, 21.5);

    // ----------- COD -  PIE PAGINA DE PDF ---------------- //
    doc_barr_code.setFontSize(6);
    doc_barr_code.text(`COD: ${data_bien_seleccionado?.codigo_bien}`, 3, 23.5);

    const pdf_viewer:any = pdf_viewer_ref.current;
    if (pdf_viewer !== null) {
        pdf_viewer.src = doc_barr_code.output('bloburl');
    }
}, [pdf_viewer_ref, accion, data_bien_seleccionado]);


  return (
    <>
      <ModalBusquedaBienes
        set_mostrar_modal_buscar_bien={set_mostrar_modal_buscar_bien}
        mostrar_modal_buscar_bien={mostrar_modal_buscar_bien}
        set_data_bien_seleccionado={set_data_bien_seleccionado}
      />

      <Grid container item spacing={2} rowSpacing={3} my={5}xs={12}>
        <Grid item xs={12} lg={4}>
          <TextField
            label='Código del bien'
            value={data_bien_seleccionado.codigo_bien ?? ''}
            onChange={()=>{}}
            disabled
            fullWidth
            size="small" />
        </Grid>

        <Grid item xs={12} lg={4}>
          <TextField
            label='Nombre del bien'
            value={data_bien_seleccionado.nombre_bien ?? ''}
            onChange={()=>{}}
            disabled
            fullWidth
            size="small" />
        </Grid>

        <Grid item xs={12} lg={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<SearchOutlined />}
            onClick={() => {
              set_accion('null');
              set_mostrar_modal_buscar_bien(true);
            }}
          >
            Busqueda Avanzada
          </Button>
        </Grid>

        <Grid item xs={12} lg={4}>
          <TextField
            label='Estado del bien'
            value={data_bien_seleccionado.estado ?? ''}
            onChange={()=>{}}
            disabled
            fullWidth
            size="small" />
        </Grid>

        <Grid item xs={12} lg={4}>
          <TextField
            label='Identificador único'
            value={data_bien_seleccionado.identificador_bien ?? ''}
            onChange={()=>{}}
            disabled
            fullWidth
            size="small" />
        </Grid>

        <Grid item xs={12} lg={4}>
          <TextField
            label='Valor depreciación'
            value={data_bien_seleccionado.depreciacion_valor ?? ''}
            onChange={()=>{}}
            disabled
            fullWidth
            size="small" />
        </Grid>

        <Grid item xs={12} lg={4}>
          <TextField
            label='Nombre de la marca'
            value={data_bien_seleccionado.nombre_marca ?? ''}
            onChange={()=>{}}
            disabled
            fullWidth
            size="small" />
        </Grid>

        <Grid item xs={12} lg={4}>
          <TextField
            label='Ubicación bodega'
            value={data_bien_seleccionado.ubicacion ?? ''}
            onChange={()=>{}}
            disabled
            fullWidth
            size="small" />
        </Grid>

        <Grid item xs={12} lg={4}>
          <TextField
            label='Código de tipo de bien'
            value={data_bien_seleccionado.cod_tipo_bien === 'A' ? 'Activo fijo' : 'Consumo' ?? ''}
            onChange={()=>{}}
            disabled
            fullWidth
            size="small" />
        </Grid>


        <Grid container item my={2} xs={12} sx={{
          display: "flex",
          justifyContent: "end",
        }}>
          <Grid item xs={12} lg={4}>
            <Button
              fullWidth
              disabled={Object.keys(data_bien_seleccionado).length === 0}
              type='button'
              onClick={handle_agregar_articulo}
              variant='contained'
              color='success'
              startIcon={<QrCodeScannerIcon />}
            >
              Generar Código
            </Button>
          </Grid>
        </Grid>

        {accion !== 'null' &&
          <Grid container item xs={12} mt={3} rowSpacing={2} sx={{
              position: "relative",
              background: "#FAFAFA",
              borderRadius: "15px",
              p: "40px",
              mb: "20px",
              boxShadow: "0px 3px 6px #042F4A26",
            }}
          >
            <Grid item xs={12}>
              <Title title={`Vista previa del código de barras - IDENTIFICADOR : ${data_bien_seleccionado.identificador_bien}`} />
            </Grid>

            <Grid item xs={12}>
              <iframe
                title="PDF Viewer"
                ref={pdf_viewer_ref}
                // agregamos que tenga un zoom predeterminado
                style={{ 
                  width: '100%', 
                  height: '340px',
                  border: '1px solid #d6d6d6', 
                  borderRadius: '5px',
                }}
              >
              </iframe>
            </Grid>
          </Grid>
        }

      </Grid>

    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default InputsBienSeleccionado;