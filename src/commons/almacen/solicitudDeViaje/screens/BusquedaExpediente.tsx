/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import {
	Grid,
	TextField,
	Box,
	Button,
	Dialog,
	DialogContent,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAppDispatch } from '../../../../hooks';
import { Title } from '../../../../components';
import { buscar_expediente } from '../thunks/viajes';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ClearIcon from '@mui/icons-material/Clear';
import { control_error, control_success } from '../../../../helpers';

interface IProps {
	set_mostrar_busqueda_expediente: React.Dispatch<React.SetStateAction<boolean>>;
	mostrar_busqueda_expediente: boolean;
	set_id_expediente: React.Dispatch<React.SetStateAction<number>>;
	id_expediente: number;
}

const BusquedaExpediente: React.FC<IProps> = ({ set_mostrar_busqueda_expediente, mostrar_busqueda_expediente, set_id_expediente, id_expediente }) => {
	const dispatch = useAppDispatch();
	const [expedientes, set_expedientes] = useState<any>([]);
	const [fecha_inicio, set_fecha_inicio] = useState<Dayjs | null>(null);
	const [msj_error_fecha_inicio, set_msj_error_fecha_inicio] = useState<string>("");
	const [fecha_fin, set_fecha_fin] = useState<Dayjs | null>(null);
	const [msj_error_fecha_fin, set_msj_error_fecha_fin] = useState<string>("");
	const [titulo_expediente, set_titulo_expediente] = useState<string>('');
	const [msj_error_titulo_expediente, set_msj_error_titulo_expediente] = useState<string>("");
	const [palabras_clave, set_palabras_clave] = useState<string>('');
	const [msj_error_palabras_clave, set_msj_error_palabras_clave] = useState<string>("");

	/**
	* Definición de columnas para la visualización de datos en una tabla o grid.
	* Cada columna tiene propiedades específicas como campo (field), encabezado (headerName),
	* ancho (width), y funciones para obtener valores (valueGetter).
	* @type {GridColDef[]}
	*/
	const columns: GridColDef[] = [
		{
			field: 'nombre_persona_titular',
			headerName: 'PERSONA TITULAR',
			width: 200,
			valueGetter: (params) => params.row.nombre_persona_titular ?? 'N/A',
		},
		{
			field: 'fecha_apertura_expediente',
			headerName: 'Fecha expediente',
			width: 200,
			valueGetter: (params) => dayjs(params.row.fecha_apertura_expediente).format('DD/MM/YYYY') ?? 'N/A',
		},
		{
			field: 'codigo_exp_und_serie_subserie',
			headerName: 'CÓDIGO',
			sortable: true,
			width: 200,
			valueGetter: (params) =>
				params.row.codigo_exp_und_serie_subserie +
				'.' +
				params.row.codigo_exp_Agno +
				(params.row.codigo_exp_consec_por_agno !== null
					? '.' + params.row.codigo_exp_consec_por_agno
					: ''),
		},
		{
			field: 'nombre_trd_origen',
			headerName: 'TRD',
			sortable: true,
			width: 200,
		},
		{
			field: 'titulo_expediente',
			headerName: 'TITULO',
			width: 200,
		},
		{
			field: 'nombre_unidad_org',
			headerName: 'UNIDAD ORGANIZACIONAL',
			width: 200,
		},
		{
			field: 'nombre_serie_origen',
			headerName: 'SERIE',
			width: 200,
		},
		{
			field: 'nombre_subserie_origen',
			headerName: 'SUBSERIE',
			width: 200,
			valueGetter: (params) => params.row.nombre_subserie_origen ?? 'N/A',
		},
	];

	/**
	* Maneja el cambio de la fecha de inicio.
	* 
	* @param {Dayjs | null} date - Objeto que representa la fecha seleccionada.
	* @returns {void}
	*/
	const cambio_fecha_inicio = (date: Dayjs | null): void => {
		if (date !== null) {
			set_fecha_inicio(date);
			set_msj_error_fecha_inicio("");
		} else {
			set_msj_error_fecha_inicio("El campo Fecha inicio es obligatorio.");
		}
	};

	/**
	* Maneja el cambio de la fecha de fin.
	* 
	* @param {Dayjs | null} date - Objeto que representa la fecha seleccionada.
	* @returns {void}
	*/
	const cambio_fecha_fin = (date: Dayjs | null): void => {
		if (date !== null) {
			set_fecha_fin(date);
			set_msj_error_fecha_fin("");
		} else {
			set_msj_error_fecha_fin("El campo Fecha inicio es obligatorio");
		}
	};

	/**
	 * Valida el formulario de búsqueda de expedientes.
	 * 
	 * @returns {Promise<boolean | void>} - Una promesa que resuelve a `true` si la validación es exitosa, de lo contrario, retorna `false`.
	 */
	const validar_form_busqueda_expediente: () => Promise<boolean | void> = async () => {
		if (fecha_inicio?.isValid() === false) {
			control_error('Ingrese una fecha de inicio válida');
			set_msj_error_fecha_inicio('Ingrese una fecha de inicio válida');
			return false;
		} else if (fecha_fin?.isValid() === false) {
			control_error('Ingrese una fecha fin de expediente válida');
			set_msj_error_fecha_fin('Ingrese una fecha fin de expediente válida');
			return;
		}
		return true;
	}

	/**
	 * Maneja la búsqueda de expedientes según los filtros especificados en el formulario.
	 * 
	 * @param {React.FormEvent} e - Objeto que representa el evento de formulario.
	 * @returns {void}
	 */
	const expedientes_por_filtros_fc: (e: React.FormEvent) => void = async (e) => {
		e.preventDefault();
		const form_valido = await validar_form_busqueda_expediente();
		if (form_valido) {
			dispatch(
				buscar_expediente(
					titulo_expediente,
					fecha_inicio?.format('YYYY-MM-DD') === undefined ? '' : fecha_inicio?.format('YYYY-MM-DD'),
					fecha_fin?.format('YYYY-MM-DD') === undefined ? '' : fecha_fin?.format('YYYY-MM-DD'),
					palabras_clave)
			).then((response: any) => {
        if(Object.keys(response).length !== 0){
          //cambiar esta validacion, cuando no hay resultados, no retorna data
          if('success' in response){
            set_expedientes(response.data);
            control_success('Expedientes encontrados');
          } else {
            control_error('No se encontraron expedientes');
            set_expedientes([]);
          }
        }
			}).catch((err: any) => {
				set_expedientes([]);
				console.log(err);
			});
		}
	};

	/**
	 * Maneja la selección de expedientes en una cuadrícula o tabla.
	 * 
	 * @param {any} params - Parámetros de la selección del expediente.
	 * @returns {void}
	 */
	const seleccion_expediente_grid = (params: any): void => {
		set_id_expediente(params[0]);
	};

	/**
	 * Maneja la acción de seleccionar un expediente.
	 * 
	 * Si el ID del expediente es 0, muestra un mensaje de error indicando que se debe seleccionar una fila.
	 * En caso contrario, oculta la búsqueda de expedientes y muestra un mensaje de éxito.
	 * 
	 * @returns {void}
	 */
	const gtn_seleccionar = () => {
		if (id_expediente === 0) {
			control_error('Seleccione una fila de la tabla');
		} else {
			set_mostrar_busqueda_expediente(false);
			control_success('Id de expediente seleccionado correctamente');
		}
	}

	/**
	 * Limpia el formulario de búsqueda de expedientes.
	 * 
	 * Establece los valores de los estados relacionados con el formulario a sus valores iniciales.
	 * 
	 * @returns {void}
	 */
	const limpiar_formulario_busqueda = () => {
		set_id_expediente(0);
		set_fecha_inicio(null);
		set_msj_error_fecha_inicio('');
		set_fecha_fin(null);
		set_msj_error_fecha_fin('');
		set_titulo_expediente('');
		set_msj_error_titulo_expediente('');
		set_palabras_clave('');
		set_msj_error_palabras_clave('');
	}

	/**
	 * Efecto secundario que se ejecuta al montar el componente.
	 * Realiza una búsqueda inicial de expedientes para mostrar en la tabla
	 * y actualiza el estado correspondiente solo cuabndo la tabla esta es un estao visible.
	 */
  const expedientes_obtenidos = useRef(false);
	useEffect(() => {
		if (mostrar_busqueda_expediente && !expedientes_obtenidos.current) {
			dispatch(
				buscar_expediente('', '', '', '')
			).then((response: any) => {
        if(Object.keys(response).length !== 0){
          if(response.data.length !== 0){
            set_expedientes(response.data);
            expedientes_obtenidos.current = true;
          } else {
            control_error('No se encontraron expedientes');
            set_expedientes([]);
            expedientes_obtenidos.current = true;
          }
        }
			}).catch((err: any) => {
				set_expedientes([]);
				console.error(err);
			});
		}
	}, [mostrar_busqueda_expediente])

	return (
		<>
			<Dialog
				open={mostrar_busqueda_expediente}
				onClose={() => {
					set_id_expediente(0)
					set_mostrar_busqueda_expediente(false)
				}}
				fullWidth maxWidth="lg" >
				<DialogContent>
					<Grid item md={12} xs={12} sx={{
						p: "10px",
						mb: "20px",
					}}>
						<Title title="Búsqueda de expedientes" />
						<Box
							component="form"
							onSubmit={expedientes_por_filtros_fc}
							sx={{ mt: '20px' }}
							noValidate
							autoComplete="off"
						>
							<Grid item container xs={12} sm={12} marginY={'15px'} spacing={1}>
								<Grid item xs={12} md={3}>
									<TextField
										label='Título de expediente'
										fullWidth
										value={titulo_expediente}
										error={msj_error_titulo_expediente !== ''}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											set_msj_error_titulo_expediente('')
											set_titulo_expediente(e.target.value)
										}}
										size="small"
									/>
								</Grid>

								<Grid item xs={12} md={2}>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DatePicker
											label="Inicio expediente"
											value={fecha_inicio}
											onChange={(newValue) => { cambio_fecha_inicio(newValue); }}
											renderInput={(params) => (
												<TextField
													fullWidth
													error={msj_error_fecha_inicio !== ''}
													size="small"
													{...params}
												/>
											)}
										/>
									</LocalizationProvider>
								</Grid>

								<Grid item xs={12} md={2}>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DatePicker
											label="Fin expediente"
											value={fecha_fin}
											onChange={(newValue) => { cambio_fecha_fin(newValue); }}
											renderInput={(params) => (
												<TextField
													error={msj_error_fecha_fin !== ''}
													fullWidth
													size="small"
													{...params}
												/>
											)}
										/>
									</LocalizationProvider>
								</Grid>

								<Grid item xs={12} md={3}>
									<TextField
										label='Palabras clave'
										fullWidth
										value={palabras_clave}
										error={msj_error_palabras_clave !== ''}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											set_msj_error_palabras_clave('')
											set_palabras_clave(e.target.value)
										}}
										size="small"
									/>
								</Grid>

								<Grid item xs={12} md={2} display={'flex'} alignItems={'center'}>
									<Button
										fullWidth
										color="primary"
										variant="contained"
										startIcon={<SearchIcon />}
										type='submit'
									>
										Buscar
									</Button>

								</Grid>
							</Grid>
							<Grid item xs={12} sm={12}>
								<DataGrid
									density="compact"
									autoHeight
									columns={columns}
									pageSize={5}
									rowsPerPageOptions={[5]}
									rows={expedientes ?? []}
									getRowId={(row) => row.id_expediente_documental}
									onSelectionModelChange={seleccion_expediente_grid}
								/>
							</Grid>
							<Grid item container xs={12} sm={12} spacing={1} marginTop={1} display={'flex'} justifyContent={'end'}>
								<Grid item xs={12} md={2}>
									<Button
										fullWidth
										color="primary"
										variant="contained"
										startIcon={<SaveIcon />}
										onClick={gtn_seleccionar}
									>
										{"Seleccionar"}
									</Button>
								</Grid>
								<Grid item xs={12} md={1.5}>
									<Button
										fullWidth
										color="error"
										variant="contained"
										startIcon={<ClearIcon />}
										onClick={() => {
											set_id_expediente(0)
											set_mostrar_busqueda_expediente(false)
										}}
									>
										Salir
									</Button>
								</Grid>
								<Grid item xs={12} md={1.5}>
									<Button
										fullWidth
										color="inherit"
										variant="outlined"
										startIcon={<CleanIcon />}
										onClick={limpiar_formulario_busqueda}
									>
										Limpiar
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Grid>
				</DialogContent>
			</Dialog>
		</>
	);
};

// eslint-disable-next-line no-restricted-syntax
export default BusquedaExpediente;