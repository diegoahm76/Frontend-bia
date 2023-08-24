import { Button } from "@mui/material";

/* eslint-disable @typescript-eslint/naming-convention */
export const BotonConAlerta = ({ label, icono, onClick, numeroDeAlertas }: any): JSX.Element => {
    const tiene_alerta = numeroDeAlertas > 0;

    return (
        <Button
            style={{
                margin: 3,
                borderRadius: 5,
                height: 35,
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            variant="contained"
            color="primary"
            startIcon={icono}
            onClick={onClick}
        >
            {label}
            {tiene_alerta && (
                <span
                    style={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        backgroundColor: 'red',
                        color: 'white',
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 'bold',
                    }}
                >
                    {numeroDeAlertas}
                </span>
            )}
        </Button>
    );
};