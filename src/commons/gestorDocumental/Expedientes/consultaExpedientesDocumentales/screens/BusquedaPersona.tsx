import { LoadingButton } from '@mui/lab';
import { Box, Grid, type SelectChangeEvent, TextField, ButtonGroup } from '@mui/material';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import type * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomSelect, Title } from '../../../../../components';
import { download_xls_dos } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf_dos } from '../../../../../documentos-descargar/PDF_descargar';
import { obtener_personas, obtener_tipo_documento } from '../../ConcesionAcceso/thunks/ConcesionAcceso';
import { obtener_unidad_organizacional } from '../../aperturaExpedientes/thunks/aperturaExpedientes';
import { IList, InfoPersona } from '../../../../../interfaces/globalModels';
import { useAppDispatch } from '../../../../../hooks';

interface IProps {
  set_persona: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaPersona: React.FC<IProps> = (props: IProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit: handle_submit,
    formState: { errors },
  } = useForm();

  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [tipo_documento_av, set_tipo_documento_av] = useState('');
  const [und_organizacional_av, set_und_organizacional_av] = useState('');
  const [lt_unidades_org, set_lt_unidades_org] = useState<IList[]>([]);
  const [rows, set_rows] = useState<InfoPersona[]>([]);
  const [is_search, set_is_search] = useState(false);
  const [is_loading, set_is_loading] = useState(false);

  useEffect(() => {
    obtener_tipo_documento_fc();
    obtener_unidad_organizacional_fc();
  }, []);

  const obtener_tipo_documento_fc = async (): Promise<void> => {
    dispatch(obtener_tipo_documento()).then((response: any) => {
      if (response.success) {
        const personas_naturales_opc = response.data.filter((rd: any) => rd.value !== 'NT');
        set_tipo_documento_opt(personas_naturales_opc);
      }
    })
  };
  const obtener_unidad_organizacional_fc = async (): Promise<void> => {
    dispatch(obtener_unidad_organizacional()).then((response: any) => {
      if (response.success) {
        const org_activas = response.data.filter((rd: any) => rd.activo);
        const list_opc = org_activas.map((oa: any) => {
          return { label: oa.nombre, value: oa.id_unidad_organizacional }
        });
        set_lt_unidades_org(list_opc);
      }
    })
  };

  const on_submit_advance = handle_submit(
    async ({
      tipo_documento,
      numero_documento,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      und_organizacional
    }) => {
      set_is_search(true);
      set_rows([]);
      dispatch(obtener_personas(
        tipo_documento,
        numero_documento,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        und_organizacional
      )).then((response: any) => {
        if (response.success) {
          set_rows(response.data);
          set_is_search(false);
        }
      })
    }
  );

  const cambio_tipo_doc = (e: SelectChangeEvent<string>): void => {
    set_tipo_documento_av(e.target.value);
  };
  const cambio_und_org = (e: SelectChangeEvent<string>): void => {
    set_und_organizacional_av(e.target.value);
  };

  const columnsss = [
    {
      field: "tipo_persona_desc",
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
      field: "nombre_unidad_organizacional_actual",
      header: "Unidad organizacional",
      style: { minWidth: '200px' },
    }
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
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              onChange={cambio_tipo_doc}
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
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              onChange={cambio_und_org}
              label="Unidad organizacional *"
              name="und_organizacional"
              value={und_organizacional_av}
              options={lt_unidades_org}
              disabled={is_loading}
              // required={true}
              errors={errors}
              register={register}
            />
          </Grid>
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
              label="Segundo nombre"
              size="small"
              {...register('segundo_nombre')}
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
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label="Segundo apellido"
              size="small"
              {...register('segundo_apellido')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} container justifyContent="end">
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
                {download_xls_dos({ nurseries: rows, columns: columnsss })}
                {download_pdf_dos({ nurseries: rows, columns: columnsss, title: 'Resultados' })}
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
                  {columnsss.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} style={col.style} />
                  ))}
                </DataTable>
              </div>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
