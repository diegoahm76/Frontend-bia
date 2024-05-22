/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import { MostrarModalBuscarMediosSolicitud } from '../components/ModalBusquedaMediosSolicitud/ModalBusquedaMedios';
import { ModalConfiguracionTipoMedio } from './ModalConfiguracionTipoMedio/ModalConfiguracionTipoMedio';
import { useNavigate } from 'react-router-dom';

export const ConfiguracionMediosSolicitudScreem: React.FC = () => {
    const [openModal, setOpenModal] = useState<boolean>(false); // Aquí se declara el estado y su función de actualización

    return (
        <>
            <MostrarModalBuscarMediosSolicitud   openModal={openModal} setOpenModal={setOpenModal} />
            {/* Aquí se pasa el estado y su función de actualización como props */}
            <ModalConfiguracionTipoMedio openModal={openModal} setOpenModal={setOpenModal} />
        </>
    );
};
