/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from "react";
import { Button, Grid, Tooltip } from "@mui/material";
import { Title } from "../../../../../../components";
import { RenderDataGrid } from "../../../../tca/Atom/RenderDataGrid/RenderDataGrid";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReplyIcon from '@mui/icons-material/Reply';
import RequestIcon from '@mui/icons-material/ContactMail';
import CancelIcon from '@mui/icons-material/Clear';
import { useEffect } from "react";
import { api } from "../../../../../../api/axios";
import { ModalVerRequerimientoTramite } from "../../ModalVerRequerimientoTramite/ModalVerRequerimientoTramite";

export const RequerimientosTramiteScreen = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    
    const columns = [
        { field: "tipo_tramite", headerName: "Tipo de Trámite", flex: 1 },
        { field: "numero_requerimiento", headerName: "Número de Requerimiento", flex: 1 },
        { field: "radicado_requerimiento", headerName: "Radicado del Requerimiento", flex: 1 },
        { field: "fecha_comunicacion", headerName: "Fecha de Comunicación", flex: 1 },
        { field: "plazo_entrega", headerName: "Plazo de Entrega", flex: 1 },
        { field: "dias_restantes", headerName: "Días Restantes", flex: 1 },
        { field: "estado", headerName: "Estado", flex: 1 },
        {
            field: "acciones",
            headerName: "Acciones",
            flex: 2,
            renderCell: (params: any) => (
                <>
                    <Tooltip title="Ver" placement="top">
                        <Button onClick={()=>setIsModalOpen(true)}>
                            <VisibilityIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Responder" placement="top">
                        <Button>
                            <ReplyIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Solicitar" placement="top">
                        <Button>
                            <RequestIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Desistir Trámite" placement="top">
                        <Button>
                            <CancelIcon />
                        </Button>
                    </Tooltip>
                </>
            ),
        }
    ];

    const listadoDeAsignaciones = [
        {
            id: 1,
            tipo_tramite: "Trámite 1",
            numero_requerimiento: "RQ001",
            radicado_requerimiento: "RAD001",
            fecha_comunicacion: "2024-02-25",
            plazo_entrega: "2024-03-10",
            dias_restantes: 12,
            estado: "En proceso"
        },
        {
            id: 2,
            tipo_tramite: "Trámite 2",
            numero_requerimiento: "RQ002",
            radicado_requerimiento: "RAD002",
            fecha_comunicacion: "2024-02-20",
            plazo_entrega: "2024-03-05",
            dias_restantes: 8,
            estado: "Pendiente"
        },
        // Agregar más objetos de datos según sea necesario
    ];

    return (
        <Grid container
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}>

            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <RenderDataGrid
                        title="Requerimientos de Trámite"
                        columns={columns}
                        rows={listadoDeAsignaciones}
                    />
                </Grid>
            </Grid>

            {isModalOpen && <ModalVerRequerimientoTramite data={""} onClose={()=>setIsModalOpen(false)} />}

        </Grid>
    )
}
