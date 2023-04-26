/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState, useEffect } from "react";
import { Column } from "primereact/column";
import { TreeTable } from "primereact/treetable";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// // Hooks
// import { useAppDispatch, useAppSelector } from '../../../../hooks';
// Thunks

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Button from "@mui/material/Button";
import { Grid, Stack, Box } from "@mui/material";
import { Title } from "../../../../../components/Title";
import CrearBienDialogForm from "../components/CrearBienDialogForm";
import { get_bienes_service, delete_nodo_service } from "../store/thunks/catalogoBienesThunks";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/hooks";
import { initial_state_current_nodo, current_bien } from "../store/slices/indexCatalogodeBienes";
import { type INodo } from "../interfaces/Nodo";

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
export const CatalogodeBienesScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [action, set_action] = useState<string>("create");

  const [add_bien_is_active, set_add_bien_is_active] = useState<boolean>(false);
  const { nodo } = useAppSelector((state) => state.bien);



  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const action_template = (
    node: INodo,
    Column: any
  ) => {
    return (
      <>
        {node.data.crear ?
          <Button
            type="button"
            startIcon={<AddIcon />}
            title="Agregar"
            style={{ marginRight: ".5em", color: "black", border: "none" }}
            onClick={() => {
              dispatch(current_bien(node));
              set_action("create_sub")
              set_add_bien_is_active(true)
            }}
            disabled={!node.data.crear}
          ></Button> : null}
        {node.data.editar ?
          <Button
            type="button"
            startIcon={<EditIcon />}
            title="Editar"
            style={{ marginRight: ".5em", color: "black", border: "none" }}
            disabled={!node.data.editar}
            onClick={() => {
              dispatch(current_bien(node));
              set_action("create_sub")
              set_add_bien_is_active(true)
            }}
          ></Button> : null}
        {node.data.eliminar ?
          <Button
            type="button"
            startIcon={<DeleteIcon />}
            className="p-button-danger p-button-outlined"
            title="Eliminar"
            onClick={() => {
              dispatch(delete_nodo_service(node.data.id_nodo));
            }}
            style={{ marginRight: ".5em", color: "black", border: "none" }}
            disabled={!node.data.eliminar}
          ></Button> : null}
      </>
    );
  };
  useEffect(() => {
    void dispatch(get_bienes_service());
  }, []);

  return (
    <>
      <Grid
        container
        sx={{
          position: "relative",
          background: "#FAFAFA",
          borderRadius: "15px",
          p: "20px",
          mb: "20px",
          boxShadow: "0px 3px 6px #042F4A26",
        }}
      >
        <Grid item xs={12}>
          <Title title="CATÁLOGO DE BIENES" />
          <Stack direction="row" spacing={2} sx={{ m: "20px 0" }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon style={{ fontSize: "20px" }} />}
              onClick={() => {
                dispatch(current_bien(initial_state_current_nodo));
                set_action("create")
                set_add_bien_is_active(true);
              }}
              type="button"
              title="Agregar"
              color="inherit"
            >
              Crear Carpeta Padre
            </Button>
          </Stack>
          <Grid item>
            <Box sx={{ width: "100%" }}>
              <TreeTable value={nodo} filterMode="strict">
                <Column
                  expander
                  body={<i className="fa-regular fa-folder fs-4"></i>}
                  style={{ width: "250px" }}
                ></Column>
                <Column
                  header="Nombre"
                  field="nombre"
                  style={{ width: "300px" }}
                  filter
                  filterPlaceholder="Filter por nombre"
                ></Column>
                <Column
                  field="codigo"
                  header="Código"
                  style={{ width: "100px" }}
                  filter
                  filterPlaceholder="Filter por código"
                ></Column>
                <Column
                  header="Acciones"
                  body={action_template}
                  style={{ textAlign: "center", width: "800px" }}
                ></Column>
              </TreeTable>
            </Box>
          </Grid>
        </Grid>
        <CrearBienDialogForm
          is_modal_active={add_bien_is_active}
          set_is_modal_active={set_add_bien_is_active}
          action={action}
        />
      </Grid>
    </>
  );
};
