/* eslint-disable @typescript-eslint/naming-convention */

import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Title } from "../../../../../../../../../components/Title"
import { useContext, useEffect, useState } from "react";
import { api } from "../../../../../../../../../api/axios";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { v4 as uuidv4 } from 'uuid';
import SaveIcon from '@mui/icons-material/Save';
import { TipodeCeaccionContext } from "../../context/CreacionTipologuia";
import { control_info } from "../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/success_errors";



export interface VariablesCreacionPlantilla {
    valor_inicial: any;
    cantidad_digitos: any;
    prefijo_consecutivo: any;
    id_unidad_organizacional: any;
}


export const ConfiguracionUnidadOrganizacional = () => {

    const { Formulario_Empresa, Set_Formulario_Empresa ,Datos_Return} = useContext(TipodeCeaccionContext);




    const {
        Persona_ult_config_implemen,
        T247fechaUltConfigImplemen,
        T247consecutivoInicial,
        T247consecutivoActualAMostrar
    
    }= Datos_Return;

    const columna_numero_1 = [
        { attribute: "Consecutivo inicial", value: T247consecutivoInicial || "" },
        { attribute: "Consecutivo Actual", value: T247consecutivoActualAMostrar || "" },
        { attribute: "Persona Ultima Configuracion", value: Persona_ult_config_implemen || "" },
        { attribute: "Fecha Ultima Configuracion (sin T)", value: T247fechaUltConfigImplemen ? new Date(T247fechaUltConfigImplemen).toISOString().split('T')[0] : "" },    ]



      

    const columns: GridColumns = [
        { field: 'id_unidad_organizacional', headerName: 'sección-Subsección', flex: 1, align: 'center', headerAlign: 'center' },
        {
            field: 'Consecutivo',
            headerName: 'Consecutivo Actual',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            valueGetter: (params) => {
              const { valor_inicio, cantidad_digitos, prefijo_consecutivo } = params.row;
          
              const valorNumerico = isNaN(valor_inicio) ? 0 : Number(valor_inicio);
              const valorFormateado = String(valorNumerico).padStart(cantidad_digitos, '0');
              return `${valorFormateado}-${prefijo_consecutivo}`;
            },
          },
          
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 200,
            flex: 1,
            renderCell: (params: any) => (
                <Button startIcon={<SaveIcon />}
                    onClick={()=>eliminar_configuracion_tipologuia(params.row.id_unidad_organizacional)}
                    color='error'
                    variant="contained">h

                </Button>
            ),
        },

    ];
    


    const [seccionoSubseccion, set_seccionoSubseccion] = useState<any>([]);

    const fetch_choise_seccionsubseccion = async (): Promise<void> => {
        try {
            const url = `/transversal/organigrama/unidades/get-sec-sub/132/`;
            const res: any = await api.get(url);
            const numero_consulta: any = res.data.data;
            set_seccionoSubseccion(numero_consulta);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetch_choise_seccionsubseccion().catch((error) => {
            console.error(error);
        });
    }, []);


    const valores_defecto: VariablesCreacionPlantilla = {
        valor_inicial: 1,
        cantidad_digitos: 0,
        prefijo_consecutivo: "",
        id_unidad_organizacional: 0,
    }

    const [form, set_form] = useState(valores_defecto);
    // console.log(form);




    const HandleCompletarDatos = (e: any) => {
        set_form({
            ...form,
            [e.target.name]: e.target.value

        })
    }


    const eliminar_configuracion_tipologuia = (id_unidad_organizacional: number) => {
        // Filtra la configuración para excluir la que se va a eliminar
        const nuevaConfiguracion = Formulario_Empresa.configuracion_por_unidad.filter(
          (configuracion: any) => configuracion.id_unidad_organizacional !== id_unidad_organizacional
        );
      
        // Actualiza el estado con la nueva configuración
        Set_Formulario_Empresa({
          ...Formulario_Empresa,
          configuracion_por_unidad: nuevaConfiguracion,
        });
      };

      const Agragar_configuracion = () => {
        const { configuracion_por_unidad } = Formulario_Empresa;
      
        // Verificar si ya existe un elemento con el mismo id_unidad_organizacional
        const existeConfiguracion = configuracion_por_unidad.some(
          (configuracion:any) => configuracion.id_unidad_organizacional === form.id_unidad_organizacional
        );
      
        if (!existeConfiguracion) {
          Set_Formulario_Empresa({
            ...Formulario_Empresa,
            configuracion_por_unidad: [...configuracion_por_unidad, form],
          });
        } else {
          // Manejar el caso donde ya existe la configuración
          control_info("Ya existe");
        }
      };
    return (
        <>
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item container spacing={1} justifyContent="flex-center" style={{ margin: 1 }}>

                    <Grid container xs={12}>


                        <Grid item xs={12}>
                            <Title title="Configuracion Valores Iniciales-Nivel Unidad Organizacional" />
                        </Grid>


                        <Grid item xs={12}>
                            <FormControl fullWidth size="small" style={{ marginTop: 15 }}>
                                <InputLabel id="choise-label">Seccion o Subseccion</InputLabel>
                                <Select
                                    id="demo-simple-select-2"
                                    label="Seccion o Subseccion"
                                    style={{ width: "95%" }}
                                    name="id_unidad_organizacional"
                                    value={form.id_unidad_organizacional || ""}
                                    onChange={HandleCompletarDatos}
                                >
                                    {seccionoSubseccion?.map((item: any, index: number) => (
                                        <MenuItem key={index} value={item.id_unidad_organizacional}>
                                            {item.nombre_unidad_org_actual_admin_series}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>



                        <Grid item xs={3}>
                            <TextField
                                style={{ width: '95%', marginTop: 20 }}
                                variant="outlined"
                                label="Valor Inicial"
                                fullWidth
                                name="valor_inicial"
                                value={form.valor_inicial}
                                onChange={(e) => {
                                    const input = e.target.value;
                                    if (/^\d*$/.test(input)) {  // Esta expresión regular permite solo dígitos
                                        set_form({
                                            ...form,
                                            valor_inicial: +input
                                        });
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                style={{ marginTop: 20, width: '95%' }}
                                variant="outlined"
                                label="Cantidad de Digitos"
                                fullWidth
                                name="cantidad_digitos"
                                value={form.cantidad_digitos}
                                onChange={(e) => {
                                    const input = e.target.value;
                                    if (/^\d*$/.test(input)) {  // Esta expresión regular permite solo dígitos
                                        set_form({
                                            ...form,
                                            cantidad_digitos: +input
                                        });
                                    }
                                }}
                               
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                style={{ marginTop: 20, width: '95%' }}
                                variant="outlined"
                                label="Aignar Prefijo"
                                fullWidth
                                name="prefijo_consecutivo"
                                value={form.prefijo_consecutivo}
                                onChange={HandleCompletarDatos}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <Button
                                style={{ marginTop: 27, width: "80%" }}
                                startIcon={<SaveIcon />}
                                color='success'
                                fullWidth
                                onClick={Agragar_configuracion}
                                variant="contained">Agregar</Button>
                        </Grid>
                        <Grid container alignItems="center" justifyContent="center">

                            <Grid item xs={8}>
                                <div style={{ height: 300, width: '100%', marginTop: 15 }}>
                                    <DataGrid
                                        density="compact"
                                        rows={Formulario_Empresa.configuracion_por_unidad}
                                        columns={columns}
                                        pageSize={5} // Ajusta según la cantidad de atributos
                                        getRowId={(row) => uuidv4()}
                                    />
                                </div>
                            </Grid>



                            {Datos_Return?.length !== 0 ? (
                                <Grid item xs={8}>
                                    <DataGrid
                                        density="compact"
                                        style={{ marginTop: 20 }}
                                        autoHeight
                                        rows={columna_numero_1 || ""}
                                        columns={[
                                            { field: "attribute", headerName: "Consecutivo Actual", flex: 1, align: "center", headerAlign: "center" },
                                            { field: "value", headerName: "Registro", flex: 1, align: "center", headerAlign: "center" },
                                        ]}
                                        pageSize={13} // Ajusta según la cantidad de atributos
                                        getRowId={(row) => uuidv4()} />

                                </Grid>
                            ) :
                                (<h3>...</h3>)}

                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
