import { LoadingButton } from '@mui/lab';
import { Box, Grid, type SelectChangeEvent, TextField, ButtonGroup } from '@mui/material';
import { type AxiosError } from 'axios';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import type * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { control_error } from '../helpers';
import {
  type IList,
  type InfoPersona,
  type ResponseServer,
} from '../interfaces/globalModels';
import { get_tipo_documento, search_avanzada } from '../request';
import { CustomSelect } from './CustomSelect';
import { Title } from './Title';
import { download_xls_dos } from '../documentos-descargar/XLS_descargar';
import { download_pdf_dos } from '../documentos-descargar/PDF_descargar';

interface IProps {
  set_persona: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaPersona: React.FC<IProps> = (props: IProps) => {
  const {
    register,
    handleSubmit: handle_submit,
    formState: { errors },
  } = useForm();

  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [tipo_documento_av, set_tipo_documento_av] = useState('');
  const [rows, set_rows] = useState<InfoPersona[]>([]);
  const [is_search, set_is_search] = useState(false);
  const [is_loading, set_is_loading] = useState(false);

  useEffect(() => {
    void get_selects_options();
  }, []);

  const get_selects_options = async (): Promise<void> => {
    set_is_loading(true);
    try {
      const {
        data: { data: res_tipo_documento },
      } = await get_tipo_documento();
      set_tipo_documento_opt(res_tipo_documento ?? []);
    } catch (err) {
      control_error(err);
    } finally {
      set_is_loading(false);
    }
  };

  const on_submit_advance = handle_submit(
    async ({
      tipo_documento,
      numero_documento,
      primer_nombre,
      primer_apellido,
      razon_social,
      nombre_comercial,
    }) => {
      set_is_search(true);
      try {
        set_rows([]);
        const {
          data: { data },
        } = await search_avanzada({
          tipo_documento,
          numero_documento,
          primer_nombre,
          primer_apellido,
          razon_social,
          nombre_comercial,
        });

        if (data?.length > 0) {
          set_rows(data);
        }
      } catch (error) {
        const temp_error = error as AxiosError;
        const resp = temp_error.response?.data as ResponseServer<any>;
        control_error(resp.detail);
      } finally {
        set_is_search(false);
      }
    }
  );

  const handle_change_select = (e: SelectChangeEvent<string>): void => {
    set_tipo_documento_av(e.target.value);
  };

  const columnsss = [
    {
      field: "tipo_persona",
      header: "Tipo persona",
      style: { minWidth: '150px' },
    },
    {
      field: "tipo_documento",
      header: "Tipo documento",
      style: { minWidth: '160px' },
    },
    {
      field: "numero_documento",
      header: "Numero documento",
      style: { minWidth: '200px' },
    },
    {
      field: "primer_nombre",
      header: "Primer nombre",
      style: { minWidth: '180px' },
    },
    {
      field: "segundo_nombre",
      header: "Segundo nombre",
      style: { minWidth: '180px' },
    },
    {
      field: "primer_apellido",
      header: "Primer apellido",
      style: { minWidth: '180px' },
    },
    {
      field: "segundo_apellido",
      header: "Segundo apellido",
      style: { minWidth: '180px' },
    },
    {
      field: "razon_social",
      header: "Razón social",
      style: { minWidth: '180px' },
    },
    {
      field: "nombre_comercial",
      header: "Nombre comercial",
      style: { minWidth: '180px' },
    },
  ];

  return (
    <>
      <form
        onSubmit={(e) => {
          void on_submit_advance(e);
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            position: 'relative',
            background: '#FFFFFF',
            borderRadius: '15px',
            p: '10px',
            mb: '20px',
            mt: '5px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <CustomSelect
              onChange={handle_change_select}
              label="Tipo de documento"
              name="tipo_documento"
              value={tipo_documento_av}
              options={tipo_documento_opt}
              disabled={is_loading}
              required={false}
              errors={errors}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Número de documento"
              type="number"
              size="small"
              disabled={tipo_documento_av === '' ?? true}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              {...register('numero_documento', {
                required: false,
              })}
            />
          </Grid>
          {tipo_documento_av !== 'NT' ? (
            <>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  label="Primer nombre"
                  size="small"
                  {...register('primer_nombre')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  label="Primer apellido"
                  size="small"
                  {...register('primer_apellido')}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  label="Razón social"
                  size="small"
                  {...register('razon_social')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  label="Nombre comercial"
                  size="small"
                  {...register('nombre_comercial')}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={6} md={2} container justifyContent="end">
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={is_search}
              disabled={is_search}
            >
              Buscar
            </LoadingButton>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            position: 'relative',
            background: '#FFFFFF',
            borderRadius: '15px',
            p: '5px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >
          <Grid item xs={12} sm={12}>
            <Title title="Resultados" />
            <Box sx={{ width: '100%', mt: '20px' }}>
            <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>
              {download_xls_dos({ nurseries: rows, columns:columnsss })}
              {download_pdf_dos({ nurseries: rows, columns:columnsss, title: 'Resultados' })}
            </ButtonGroup>
              <div className="card">
                <DataTable
                  value={rows}
                  sortField="numero_documento"
                  size={'small'}
                  paginator
                  rows={10}
                  scrollable
                  scrollHeight="flex"
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  tableStyle={{ minWidth: '40rem' }}
                  selectionMode="single"
                  selection={props.set_persona}
                  onSelectionChange={(e) => {
                    props.set_persona(e.value);
                  }}
                  dataKey="id_persona"
                >
                  <Column
                    field="tipo_persona"
                    header="Tipo persona"
                    style={{ minWidth: '150px' }}
                  ></Column>
                  <Column
                    field="tipo_documento"
                    header="Tipo documento"
                    style={{ minWidth: '160px' }}
                  ></Column>
                  <Column
                    field="numero_documento"
                    header="Numero documento"
                    style={{ minWidth: '200px' }}
                  ></Column>
                  <Column
                    field="primer_nombre"
                    header="Primer nombre"
                    style={{ minWidth: '180px' }}
                  ></Column>
                  <Column
                    field="segundo_nombre"
                    header="Segundo nombre"
                    style={{ minWidth: '180px' }}
                  ></Column>
                  <Column
                    field="primer_apellido"
                    header="Primer apellido"
                    style={{ minWidth: '180px' }}
                  ></Column>
                  <Column
                    field="segundo_apellido"
                    header="Segundo apellido"
                    style={{ minWidth: '180px' }}
                  ></Column>
                  <Column
                    field="razon_social"
                    header="Razón social"
                    style={{ minWidth: '180px' }}
                  ></Column>
                  <Column
                    field="nombre_comercial"
                    header="Nombre comercial"
                    style={{ minWidth: '180px' }}
                  ></Column>
                </DataTable>
              </div>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
