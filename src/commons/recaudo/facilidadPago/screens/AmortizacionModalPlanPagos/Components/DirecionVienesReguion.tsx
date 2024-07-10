/* eslint-disable @typescript-eslint/naming-convention */
// @ts-ignore
import { Grid, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { api, baseURL } from '../../../../../../api/axios';
import { Title } from '../../../../../../components/Title';

interface Paises {
    value: string;
    label: string;
}

interface Departamento {
    value: string;
    label: string;
}

interface Municipios {
    value: string;
    label: string;
}

interface PaisesResponse {
    success: boolean;
    data: Paises[];
    detail?: string;
}

interface DepartamentoResponse {
    success: boolean;
    data: Departamento[];
    detail?: string;
}

interface MunicipiosResponse {
    success: boolean;
    data: Municipios[];
    detail?: string;
}

interface DireccionVienesRegionProps {
    onMunicipioChange: (municipio: string) => void;
}

export const DireccionVienesRegion: React.FC<DireccionVienesRegionProps> = ({ onMunicipioChange }:DireccionVienesRegionProps) => {
    const [link, setLink] = useState('');
    const [selectedMunicipio, setSelectedMunicipio] = useState<string>('');
    const [municipios, setMunicipios] = useState<Municipios[]>([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState<string>('');
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [departamentosRetur, setDepartamentosRetur] = useState<Departamento[]>([]);
    const formValues = {
        pais_sucursal_exterior: '',
        municipio: ''
    };

    useEffect(() => {
        setLink(`${baseURL}listas/departamentos/?pais=CO`);
    }, []);

    useEffect(() => {
        const fetchDepartamentos = async () => {
            try {
                const response = await fetch(link);
                const data: DepartamentoResponse = await response.json();
                if (data.success) {
                    setDepartamentos(data.data);
                } else {
                    console.log(data.detail);
                }
            } catch (error) {
                console.error('Error fetching departamentos:', error);
            }
        };
        if (link) {
            fetchDepartamentos();
        }
    }, [link]);

    useEffect(() => {
        const fetchMunicipios = async () => {
            try {
                const response = await fetch(`${baseURL}listas/municipios/?cod_departamento=${selectedDepartamento}`);
                const data: MunicipiosResponse = await response.json();
                if (data.success) {
                    setMunicipios(data.data);
                } else {
                    console.log(data.detail);
                }
            } catch (error) {
                console.error('Error fetching municipios:', error);
            }
        };
        if (selectedDepartamento) {
            fetchMunicipios();
        }
    }, [selectedDepartamento]);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        formValues[name as keyof typeof formValues] = value as string;
    };

    const handleMunicipioChange = (event:any) => {
        const newValue = event.target.value !== null ? event.target.value as string : '';
        setSelectedMunicipio(newValue);
        handleInputChange(event); // Si necesitas manejar cambios en otros inputs
        onMunicipioChange(newValue); // Llama a la función del padre
    };

    return (
        <>
            <Grid item xs={12} sm={5}>
                <FormControl required size="small" fullWidth>
                    <InputLabel shrink={true}>Departamento</InputLabel>
                    <Select
                        label="Departamento"
                        value={
                            formValues.pais_sucursal_exterior === null
                                ? 'departamento'
                                : selectedDepartamento
                        }
                        onChange={(event) => {
                            setSelectedDepartamento(event.target.value as string);
                        }}
                        disabled={
                            formValues.pais_sucursal_exterior === null &&
                            departamentosRetur.length !== 1
                        }
                    >
                        {departamentosRetur.length === 1 && (
                            <MenuItem value="departamento">
                                {departamentosRetur.map((departamento) => (
                                    <span key={departamento.value}>{departamento.label}</span>
                                ))}
                            </MenuItem>
                        )}
                        {departamentos.map((departamento) => (
                            <MenuItem key={departamento.value} value={departamento.value}>
                                {departamento.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={5}>
                <FormControl required size="small" fullWidth>
                    <InputLabel shrink={true}>Municipio</InputLabel>
                    <Select
                        label="Municipio"
                        name="municipio"
                        value={selectedMunicipio}
                        onChange={handleMunicipioChange}
                        inputProps={{ shrink: true }}
                    >
                        {municipios.map((municipio) => (
                            <MenuItem key={municipio.value} value={municipio.value}>
                                {municipio.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </>
    );
};
