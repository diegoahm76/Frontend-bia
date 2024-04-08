/* eslint-disable @typescript-eslint/naming-convention */
import React, { Fragment, useContext, useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingButton } from '@mui/lab';
import { Button, Grid, TextField } from '@mui/material';
import type { Iprops } from './types/types';
import { control_warning } from '../../almacen/configuracion/store/thunks/BodegaThunks';
import { DataContextSeguimientoPAI } from '../SeguimientoPAI/context/context';

export const FileDocs = ({ multiple }: Iprops) => {
  const { archivos, set_archivos } = useContext(DataContextSeguimientoPAI);

  const agregar_otro_archivo = (): void => {
    set_archivos([...archivos, null]);
  };

  const handle_file_select = (file: File | null, index: number): any => {
    const updated_archivos = [...archivos];
    if (file != null) {
      updated_archivos[index] = file;
      set_archivos(updated_archivos);
    }
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const file = e.target.files?.[0];
    if (file != null) {
      handle_file_select(file, index);
    }
  };

  useEffect(() => {
    //  console.log('')(archivos, 'archivos');
  }, [archivos]);

  return (
    <>
      {!multiple && (
        <>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              fullWidth
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              {archivos[0]?.name || 'Seleccione archivo'}
              <input
                hidden
                type="file"
                disabled={false}
                required={false}
                autoFocus
                style={{ opacity: 0 }}
                onChange={(e) => handleFileSelect(e, 0)}
              />
            </Button>
          </Grid>
        </>
      )}
      {multiple &&
        archivos.map((_file: any, index: any) => (
          <Fragment key={index}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                {archivos[index]?.name || 'Seleccione archivo'}
                <input
                  hidden
                  type="file"
                  disabled={false}
                  required={false}
                  accept="application/pdf"
                  autoFocus
                  style={{ opacity: 0 }}
                  onChange={(e) => handleFileSelect(e, index)}
                />
              </Button>
            </Grid>
          </Fragment>
        ))}
      {multiple && (
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <LoadingButton
              variant="outlined"
              color="primary"
              size="large"
              onClick={agregar_otro_archivo}
            >
              Agregar archivo
            </LoadingButton>
          </Grid>
        </Grid>
      )}
    </>
  );
};
