/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { control_warning } from "../../../../../../../almacen/configuracion/store/thunks/BodegaThunks";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useAppSelector } from "../../../../../../../../hooks";
import { useContext, useEffect } from "react";
import { useStepperResSolicitudUsuario } from "../../../hook/useStepperResSolicitudUsuario";
import { ResSolicitudUsuarioContext } from "../../../context/ResSolicitudUsarioContext";
import { useDispatch } from "react-redux";
import { addAnexo } from "../../../toolkit/slice/ResSolicitudUsarioSlice";
import { DataGrid } from "@mui/x-data-grid";
import { RenderDataGrid } from "../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid";
export const FormParte2 = ({
  controlFormulario,
  handleSubmitFormulario,
  errorsFormulario,
  resetFormulario,
  watchFormulario,
}: // setInfoReset,
any): JSX.Element => {
  // ? stepper hook
  const { handleNext, handleBack } = useStepperResSolicitudUsuario();
  const { respuestaPqrsdfMade, setrespuestaPqrsdfMade } = useContext(
    ResSolicitudUsuarioContext
  );
  //* redux states functions
  // const dispatch = useDispatch();

  // const enviarAnexosAccion = () => {
  //   if (
  //     respuestaPqrsdfMade &&
  //     respuestaPqrsdfMade.anexos &&
  //     respuestaPqrsdfMade.anexos.length > 0
  //   ) {
  //     const primerAnexo = respuestaPqrsdfMade.anexos[0];

  //     const anexoActualizado: Anexo = {
  //       id: primerAnexo.id_anexo,
  //       nombre_archivo: primerAnexo.nombre_anexo,
  //       descripcion_de_la_solicitud: primerAnexo.metadatos?.descripcion || "",
  //       asunto: primerAnexo.metadatos?.asunto || "",
  //       descripcionMetadatos: primerAnexo.metadatos?.descripcion || null,
  //       categoriaArchivoMetadatos:
  //         primerAnexo.metadatos?.cod_categoria_archivo || null,
  //       origenArchivoMetadatos:
  //         primerAnexo.metadatos?.cod_origen_archivo || null,
  //       tieneReplicaFisicaMetadatos:
  //         primerAnexo.metadatos?.tiene_replica_fisica || null,
  //       tipologiasDocumentalesMetadatos:
  //         primerAnexo.metadatos?.tipologia_no_creada_TRD || null,
  //       palabrasClavesMetadatos:
  //         primerAnexo.metadatos?.palabras_clave_doc || null,
  //       // other properties...
  //     };

  //     console.log(anexoActualizado);

  //     dispatch(addAnexo(anexoActualizado));
  //   }
  // };

  const { handleSubmit, setValue, watch } = useForm();

  // Resto del código...

  useEffect(() => {
    // Verifica si respuestaPqrsdfMade tiene valor antes de intentar asignarlo a watchFormulario
    if (respuestaPqrsdfMade) {
      // Actualiza el valor del campo 'asunto' en watchFormulario con el valor de respuestaPqrsdfMade.asunto
      setValue("asunto", respuestaPqrsdfMade.asunto);
    }
  }, [respuestaPqrsdfMade]);

  const columns = [
    { field: "nombre_anexo", headerName: "Nombre Anexo", flex: 1 },
    { field: "orden_anexo_doc", headerName: "Orden Anexo Doc", flex: 1 },
    {
      field: "nombre_medio_almacenamiento",
      headerName: "Nombre Medio Almacenamiento",
      flex: 1,
    },
    { field: "numero_folios", headerName: "Número de Folios", flex: 1 },
    {
      field: "ya_digitalizado",
      headerName: "Ya Digitalizado",
      flex: 1,
      type: "boolean",
    },
    {
      field: "observacion_digitalizacion",
      headerName: "Observación de Digitalización",
      flex: 1,
    },
    {
      field: "metadatos.asunto",
      headerName: "Asunto",
      flex: 1,
      valueGetter: (params: any) => params.getValue(params.id, "metadatos")?.asunto,
    },
    {
      field: "metadatos.descripcion",
      headerName: "Descripción Metadatos",
      flex: 1,
      valueGetter: (params: any) =>
        params.getValue(params.id, "metadatos")?.descripcion,
    },
    {
      field: "metadatos.cod_categoria_archivo",
      headerName: "Código Categoría Archivo",
      flex: 1,
      valueGetter: (params: any) =>
        params.getValue(params.id, "metadatos")?.cod_categoria_archivo,
    },
    {
      field: "metadatos.es_version_original",
      headerName: "Es Versión Original",
      flex: 1,
      type: "boolean",
      valueGetter: (params: any) =>
        params.getValue(params.id, "metadatos")?.es_version_original,
    },
    {
      field: "metadatos.tiene_replica_fisica",
      headerName: "Tiene Réplica Física",
      flex: 1,
      type: "boolean",
      valueGetter: (params: any) =>
        params.getValue(params.id, "metadatos")?.tiene_replica_fisica,
    },
    {
      field: "metadatos.nro_folios_documento",
      headerName: "Número de Folios Documento",
      flex: 1,
      valueGetter: (params: any) =>
        params.getValue(params.id, "metadatos")?.nro_folios_documento,
    },
    {
      field: "metadatos.palabras_clave_doc",
      headerName: "Palabras Clave Documento",
      flex: 1,
      valueGetter: (params:any) =>
        params.getValue(params.id, "metadatos")?.palabras_clave_doc,
    },
  ];

  return (
    <>
      <RenderDataGrid
        rows={respuestaPqrsdfMade?.anexos ?? []}
        title="Anexos de respuestas de PQRSDF"
        columns={columns ?? []}
      />
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          if (
            watchFormulario.asunto.length === 0 ||
            watchFormulario.descripcion_de_la_solicitud.length === 0
          ) {
            control_warning("Todos los campos son obligatorios");
            return;
          }

          handleNext();
        }}
        style={{
          marginTop: "3rem",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Controller
              name="asunto"
              control={controlFormulario}
              defaultValue=""
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  fullWidth
                  label="Asunto"
                  size="small"
                  variant="outlined"
                  value={respuestaPqrsdfMade?.asunto || value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    onChange(e.target.value);
                    e.target.value.length === 50 &&
                      control_warning("máximo 50 caracteres");
                  }}
                  inputProps={{ maxLength: 50 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="fecha_de_solicitud"
              control={controlFormulario}
              // defaultValue={new Date().toISOString().slice(0, 10)}
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  fullWidth
                  disabled
                  type="date"
                  label="Fecha de solicitud"
                  // helperText={error ? 'Es obligatorio subir un archivo' : ''}
                  size="small"
                  variant="outlined"
                  //* se debe poner la condicional del reset
                  value={new Date().toISOString().slice(0, 10)}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="descripcion_de_la_solicitud"
              control={controlFormulario}
              defaultValue=""
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={5}
                  // name="nombre"
                  label="Descripción de la solicitud"
                  // helperText={error ? 'Es obligatorio subir un archivo' : ''}
                  size="small"
                  variant="outlined"
                  value={respuestaPqrsdfMade?.descripcion || value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    onChange(e.target.value);
                    e.target.value.length === 255 &&
                      control_warning("máximo 255 caracteres");
                  }}
                  inputProps={{ maxLength: 255 }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid
          item
          spacing={2}
          container
          xs={12}
          sm={12}
          sx={{
            width: "100%",
            maxWidth: "100%",
            mt: "2rem",
            justifyContent: "center",
            textAlign: "center",
            paddingBottom: "1.2rem",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={respuestaPqrsdfMade?.anexos && respuestaPqrsdfMade.anexos.length > 0}
            endIcon={<ArrowForward />}
            sx={{
              width: "35%",
              mr: "2rem",
            }}
          >
            Siguiente paso
          </Button>
        </Grid>
      </form>
    </>
  );
};
