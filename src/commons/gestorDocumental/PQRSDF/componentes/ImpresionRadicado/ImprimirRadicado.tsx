/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';

import { api } from '../../../../../api/axios';
import { type Persona } from '../../../../../interfaces/globalModels';
import { useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../../auth/interfaces';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';

import PrimaryForm from '../../../../../components/partials/form/PrimaryForm';
import type {
  IObjDocumentType,
  IObjFiled,
  IObjPerson,
} from '../../interfaces/pqrsdf';
import {
  set_persons,
  set_person,
  set_person_type,
  set_document_types,
  set_document_type,
  set_filed,
  set_filings,
} from '../../store/slice/pqrsdfSlice';
import {
  get_document_types_service,
  get_person_document_service,
  get_persons_service,
} from '../../store/thunks/pqrsdfThunks';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo_cormacarena_h from '../images/26_logocorma2_200x200.png';
import dayjs from 'dayjs';

interface IProps {
  visor: any;
  set_visor: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ImprimirRadicado = ({ visor, set_visor }: IProps) => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const { filed, person } = useAppSelector((state) => state.pqrsdf_slice);
  const [reporte, set_reporte] = useState<any[]>([]);
  const [doc, set_doc] = useState<jsPDF>(new jsPDF());
  const [doc_height, set_doc_height] = useState<number>(0);

  // useEffect(() => {
  //   if (filed.id_radicado !== null) {
  //     set_doc(new jsPDF());
  //     set_doc_height(doc.internal.pageSize.getHeight());
  //   }
  // }, [filed]);
  useEffect(() => {
    set_doc(new jsPDF());
    set_doc_height(doc.internal.pageSize.getHeight());
    crear_encabezado();
  }, []);

  const nueva_pagina: (
    doc: jsPDF,
    title: string,
    page_position: number
  ) => void = (doc: jsPDF, title: string, page_position: number) => {
    doc.addPage();
    doc.setPage(page_position);
    crear_encabezado();
  };

  const crear_encabezado: () => {
    title: string;
  } = () => {
    const title = `Resumen de radicado número${filed.nro_radicado ?? ''}`;
    doc.setFont('Arial', 'normal');
    doc.setFontSize(12);
    doc.addImage(logo_cormacarena_h, 'PNG', 160, 10, 40, 15);
    doc.setFont('Arial', 'bold'); // establece la fuente en Arial
    doc.text(
      'Reporte',
      (doc.internal.pageSize.width - doc.getTextWidth('Reporte')) / 2,
      10
    );
    doc.text(
      title,
      (doc.internal.pageSize.width - doc.getTextWidth(title)) / 2,
      15
    );
    doc.setFont('Arial', 'normal'); // establece la fuente en Arial
    const fecha_generacion = `Fecha de generación de reporte ${dayjs().format(
      'DD/MM/YYYY'
    )}`;
    doc.text(
      fecha_generacion,
      doc.internal.pageSize.width - doc.getTextWidth(fecha_generacion) - 5,
      5
    );
    doc.line(5, 30, doc.internal.pageSize.width - 5, 30);
    doc.line(5, 35, doc.internal.pageSize.width - 5, 35);
    const linea_uno = `Tipo de radicado: ${
      filed.tipo_radicado ?? 'Entrante'
    }               Fecha: ${filed.fecha_radicado ?? '2023/10/15 18:00:00'}`;
    const ancho_texto_linea_uno = doc.getTextWidth(linea_uno);
    const x_linea_uno =
      (doc.internal.pageSize.width - ancho_texto_linea_uno) / 2;
    doc.text(linea_uno, x_linea_uno, 45);

    const linea_dos = `Número de radicado: ${
      filed.nro_radicado ?? '654664646546'
    }               Asunto: ${'ndlsdkdklndksdslnjds'}`;
    const ancho_texto_linea_dos = doc.getTextWidth(linea_dos);
    const x_linea_dos =
      (doc.internal.pageSize.width - ancho_texto_linea_dos) / 2;
    doc.text(linea_dos, x_linea_dos, 55);

    const linea_tres = `Titular: ${
      person.nombre_completo ?? 'Edgar Sneider Fuentes Agudelo'
    }`;
    const ancho_texto_linea_tres = doc.getTextWidth(linea_tres);
    const x_linea_tres =
      (doc.internal.pageSize.width - ancho_texto_linea_tres) / 2;
    doc.text(linea_tres, x_linea_tres, 65);

    set_visor(doc.output('datauristring'));
    return { title };
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <Grid item xs={12}>
          <Box component="form" noValidate autoComplete="off">
            <embed
              src={visor}
              type="application/pdf"
              width="100%"
              height="1080px"
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default ImprimirRadicado;
