import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Column } from "primereact/column";
import { TreeTable } from "primereact/treetable";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  obtener_todos_bienes,
  seleccionar_bien_edit,
  seleccionar_bien_create,
  initial_state_bien,
} from "../../../almacen/entradaysalidaArticulos/slices/indexCatalogodeBienes";
import {
  use_app_dispatch,
 // use_app_selector,
} from "../../entradaysalidaArticulos/hooks/hooks";
import "primeicons/primeicons.css";
import {type INodo  } from "../interfaces/Nodo"; 
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { api } from "../../../../api/axios";
import Button from "@mui/material/Button";
import { Grid, Stack } from "@mui/material";
import { Title } from "../../../../components";

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
export const CatalogodeBienesScreen: React.FC = () => {
 //  const bien = use_app_selector((state) => state.bien);
  const dispatch = use_app_dispatch();

  // const [buscarProducto, setBuscarProducto] = useState(true);
  // const [bienesExampleH, setBienesExampleNodes] = useState<IBienes[]>([]);
  // const [global_filter1, set_global_filter1] = useState(null);
  // const [global_filter2, set_global_filter2] = useState(null);
  const [array_total, set_array_total] = useState<INodo[]>([]);

  useEffect(() => {
    void get_bienes();
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const get_bienes = async () => {
    await api
      .get("almacen/bienes/catalogo-bienes/get-list")
      .then((bienes) => {
        set_array_total(bienes.data.data);
      })
      .catch(() => {});
  };
  console.log(array_total, "estos son todos los datos");

  // useEffect(() => {
  //   armarArbol(bien);
  // }, [bien]);

  // function armarArbol(bienArray) {
  //   let contador = 0;
  //   bien.forEach((bienElement) => {
  //     agregarNodosBase(bienElement, contador);
  //     contador = array_total.length;
  // });
  // }

  // const tree_table_func_map = {
  //   global_filter1: set_global_filter1,
  //   global_filter2: set_global_filter2,
  // };

 
  // const get_header = (globalFilterKey: string) => {
  //   return (
  //     <div className="text-right">
  //       <div className="p-input-icon-left">
  //         <i className="pi pi-search"></i>
  //         <InputText
  //           type="search"
  //           onInput={(e: any) =>
  //             tree_table_func_map[`${globalFilterKey}`](e.target.value)
  //           }
  //           placeholder="Global Search"
  //           size={50}
  //         />
  //       </div>
  //     </div>
  //   );
  // };

  // armarArbol();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const action_template = (
    node: { data: { crear: any; editar: any; eliminar: any } },
    Column: any
  ) => {
    return (
      <div>
        <Button
          type="button"
          startIcon={<AddIcon />}
          title="Agregar"
          style={{ marginRight: ".5em", color: "black", border: "none" }}
          onClick={() => {
            enviar_datos(node, false); // crear
          }}
          disabled={!node.data.crear}
        ></Button>
        <Button 
          type="button"
          startIcon={< EditIcon />}
          title="Editar"
          style={{ marginRight: ".5em", color: "black", border: "none" }}
          onClick={() => {
            enviar_datos(node, true); // true
          }}
          disabled={!node.data.editar}
        ></Button>
        <Button
          type="button"
          startIcon={<DeleteIcon />}
          className="p-button-danger p-button-outlined"
          title="Eliminar"
          style={{ marginRight: ".5em", color: "black", border: "none" }}
          disabled={!node.data.eliminar}
          onClick={() => {
            eliminarNodo(node); // true
          }}
        ></Button>
      </div>
    );
  };

  function enviar_datos(nodo: { data: any }, accion: boolean) : void {
    if (accion) {
      seleccionar_bien_edit(dispatch, nodo.data.bien);
    } else {
      seleccionar_bien_create(dispatch, nodo.data.bien);
    }
    navigate(
      "/dashboard/Recaudo/gestor-notificacion/crear-entrada-articulos-fijos"
    );
  }

  function eliminarNodo(nodo: {
    data: { crear: any; editar: any; eliminar: any } | { id_nodo: any };
  }) : void {
    // eliminarBien(dispatch, nodo);
    void obtener_todos_bienes(dispatch);
  }

  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const crear_articulo = () => {
    console.log("crear", initial_state_bien);
    seleccionar_bien_create(dispatch, initial_state_bien.bienSeleccionado);
    navigate(
      "/dashboard/Recaudo/gestor-notificacion/crear-entrada-articulos-fijos"
    );
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          id="configForm"
        >
       
           <Title title='CATÁLOGO DE BIENES' />
           <Grid/>         
           <Stack direction="row" spacing={2} sx={{ m: '20px 0' }}>          
              <Button
                variant="outlined"
                startIcon={<AddIcon style={{ fontSize: "20px" }} />}
                type="button"
                title="Agregar"
                color="inherit"                
                onClick={() => { crear_articulo(); }}>
                Crear Carpeta Padre
              </Button>
              </Stack>
            
          <div className="col-12 col-md-12  mt-4">
            <div className="card">
              <TreeTable value={array_total} filterMode="strict">
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
                />
                {/* <Column field="agregar" header="Agregar"></Column>
                    <Column field="editar" header="Editar"></Column>
                    <Column field="eliminar" header="Eliminar"></Column> */}
              </TreeTable>
              ;
            </div>
          </div>
        </form>
      </div>
    </div>
    
  );
};
