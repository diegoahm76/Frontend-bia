/* eslint-disable @typescript-eslint/naming-convention */
import type { AuthSlice } from "../commons/auth/interfaces/authModels";
import { useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import { InputText } from "primereact/inputtext";

interface PerfilPersonaIngresaProps {
    modo: any;
}

export const PerfilPersonaIngresa: React.FC<PerfilPersonaIngresaProps> = ({ modo }: PerfilPersonaIngresaProps) => {
    const { userinfo: { nombre_de_usuario } } = useSelector((state: AuthSlice) => state.auth);
    const nombre_usu = nombre_de_usuario;
    const etiqueta = (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'black' }}>
            <strong>{nombre_usu}</strong>
            <div>Persona</div>
        </div>
    );

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' ,flex:1}}>
            {/* <Avatar
                alt="Remy Sharp"
                src=""
                style={{ marginRight: 5 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'black' }}>
                <Chip label={etiqueta} style={{ width: 'auto', height: 39, backgroundColor: modo ? '#9b99c1' : '#d9d9d9' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'black', marginLeft: 15 }}>
                <ButtonGroup >
                    <span className="p-float-label">
                        <InputText id="username" style={{ width: 100, height: 15, marginTop: 5 }} value="hola" type="text" className="p-inputtext-sm" placeholder="Small" />
                        <label htmlFor="username" style={{ marginTop: 5 }}>Username</label>
                    </span>
                </ButtonGroup>
            </div> */}
        </div>
    );
}
