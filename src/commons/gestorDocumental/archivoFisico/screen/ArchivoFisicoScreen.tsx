/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState, useEffect } from "react";
import { Column } from "primereact/column";
import { TreeTable } from "primereact/treetable";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Button from "@mui/material/Button";
import { Grid, Stack, Box, Tooltip, IconButton, Avatar } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { Title } from "../../../../components";
import { estante_deposito, get_depositos } from "../store/thunks/thunksArchivoFisico";
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
export const ArchivoFisicoScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const [action, set_action] = useState<string>("create");

    const [add_bien_is_active, set_add_bien_is_active] = useState<boolean>(false);
    const { depositos } = useAppSelector((state) => state.archivo_fisico);


    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const action_template = (
        //  node: INodo,
        Column: any
    ) => {
        return (
            <>

                <Tooltip title="Agregar">
                    <IconButton
                        onClick={() => {
                            //  dispatch(current_bien(node));
                            set_action("create_sub")
                            set_add_bien_is_active(true)
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                background: '#fff',
                                border: '2px solid',
                            }}
                            variant="rounded"
                        >
                            <CreateNewFolderIcon
                                sx={{ color: '#495057', width: '25px', height: '25px' }}
                            />
                        </Avatar>
                    </IconButton>
                </Tooltip>


                <Tooltip title="Editar">
                    <IconButton
                        onClick={() => {
                            // dispatch(current_bien(node));
                            set_action("editar")
                            set_add_bien_is_active(true)
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                background: '#fff',
                                border: '2px solid',
                            }}
                            variant="rounded"
                        >
                            <EditIcon
                                sx={{ color: '#495057', width: '25px', height: '25px' }}
                            />
                        </Avatar>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Eliminar">
                    <IconButton
                        onClick={() => {
                            //  dispatch(delete_nodo_service(node.data.id_nodo));
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                background: '#fff',
                                border: '2px solid',
                            }}
                            variant="rounded"
                        >
                            <DeleteIcon
                                sx={{ color: '#495057', width: '25px', height: '25px' }}
                            />
                        </Avatar>
                    </IconButton>
                </Tooltip>

            </>
        );
    };
    useEffect(() => {
        void dispatch(get_depositos());
        //  void dispatch(estante_deposito(depositos.id_deposito))
    }, []);

    console.log(depositos)


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
                    <Title title="ARCHIVO FÍSICO" />

                    <Grid item>
                        <Box sx={{ width: "100%" }}>
                            <TreeTable filterMode="strict">
                                <Column
                                    expander
                                    body={(row) => uuidv4()}
                                    style={{ width: "250px" }}
                                ></Column>



                            </TreeTable>
                        </Box>
                    </Grid>
                </Grid>

            </Grid>
        </>
    );
};
