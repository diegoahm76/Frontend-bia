/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useState, useEffect } from 'react';
import { api } from '../../../../api/axios';
import { v4 as uuidv4 } from 'uuid';
import { type GridColDef } from '@mui/x-data-grid';
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import { AvatarStyles } from '../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Title } from '../../../../components';
import { xmlFromJson } from './utils/xmlFromJson';
import { saveAs } from 'file-saver';
import { BuscarExpedienteIndicesElectronicos } from './buscadorIndices/BuscadorIndices';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsDelIndiceExp, indexColumns } from './columns/indexColumns';
import { containerStyles } from '../../../gestorDocumental/tca/screens/utils/constants/constants';
import CloseIcon from '@mui/icons-material/Close';
import { getOutModule } from '../../../../utils/functions/getOutOfModule';
import { useNavigate } from 'react-router-dom';
import { getIndiceElectronicoByExp } from './services/getIndiceElectronicoByExp.service';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { getTrdExp } from './services/busqueda/getTrd.service';

export const IndicesElectronicos: FC = (): JSX.Element => {
  //* navigate de react router dom
  const navigate = useNavigate();

  // ! use this state to show the xml in the DataGrid
  const [data, setData] = useState<any[]>([]);
  // ! use this state to show the xml in the DataGrid
  const [dataIndice, setDataIndice] = useState<any[]>([]);
  // ! use this state to set the json to xml
  const [xmlToJsonisTrue, setXmlToJsonisTrue] = useState<any>();

  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const [dataInicialSelects, setdataInicialSelects] = useState({
    dataTrd: [],
    dataSeries: [],
    dataSubSeries: [],
  });

  // ? useeffect para la busqueda de expedientes

  useEffect(() => {
    void getTrdExp().then((res: any) =>
      setdataInicialSelects({
        dataTrd: res,
        dataSeries: [],
        dataSubSeries: [],
      })
    );
  }, []);

  // ? colums for the DataGrid
  const columnsIndicesElectronicos: GridColDef[] = [
    ...indexColumns,
    {
      headerName: 'Acciones',
      field: 'accion',
      minWidth: 180,
      maxWidth: 200,
      flex: 1,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Consulta índice electrónico del expediente">
            <IconButton
              onClick={async () => {
                setLoadingStates((prev) => ({
                  ...prev,
                  [params.row.id_expediente_documental]: true,
                }));
                await getIndiceElectronicoByExp(
                  params.row.id_expediente_documental
                )
                  .then((res: any) => {
                    console.log('res', res);
                    setXmlToJsonisTrue(res?.data);
                    setDataIndice(res?.dataIndice);
                  })
                  .finally(() => {
                    setLoadingStates((prev) => ({
                      ...prev,
                      [params.row.id_expediente_documental]: false,
                    }));
                  });
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                {loadingStates[params.row.id_expediente_documental] ? (
                  <CircularProgress size={18} />
                ) : (
                  <NoteAddIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                )}
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  // ? this is the return of the component
  return (
    <>
      <BuscarExpedienteIndicesElectronicos
        data={data}
        setData={setData}
        setDataIndice={setDataIndice}
        dataInicialSelects={dataInicialSelects}
        setdataInicialSelects={setdataInicialSelects}
        setXmlToJsonisTrue={setXmlToJsonisTrue}
      />

      {
        // ? this is the DataGrid
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        data.length > 0 && (
          <RenderDataGrid
            columns={columnsIndicesElectronicos ?? []}
            rows={[...data,] ?? []}
            title="Listado de expedientes encontrados"
          />
        )
      }

      {
        // ? this is the DataGrid
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        data?.length > 0 && dataIndice?.length > 0 && (
          <RenderDataGrid
            columns={columnsDelIndiceExp ?? []}
            rows={[...dataIndice] ?? []}
            title="índice electrónico del expediente"
            aditionalElement={
              <Button
                variant="outlined"
                color="primary"
                startIcon={<DownloadForOfflineIcon />}
                // eslint-disable-next-line eqeqeq, @typescript-eslint/strict-boolean-expressions
                disabled={
                  Object.keys(xmlToJsonisTrue ?? {}).length == 0 &&
                  dataIndice?.length == 0
                }
                onClick={() => {
                  const xml = xmlFromJson(xmlToJsonisTrue);
                  console.log('xml', xml);

                  const blob = new Blob([xml], {
                    type: 'text/xml;charset=utf-8',
                  });
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  saveAs(blob, `archivo_${uuidv4().slice(0, 8)}.xml`);
                }}
              >
                Descargar XML del índice electrónico
              </Button>
            }
          />
        )
      }

      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Acciones" />
          <form
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Grid
              container
              sx={{
                justifyContent: 'center',
              }}
              spacing={2}
            >
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  // zIndex: 2,
                  justifyContent: 'center',
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                  sx={{ m: '20px 0' }}
                >
                  <Button
                    color="error"
                    variant="contained"
                    startIcon={<CloseIcon />}
                    onClick={() => {
                      getOutModule(navigate);
                    }}
                  >
                    SALIR DEL MÓDULO
                  </Button>

                  {data?.length > 0 && (
                    <Button
                      color="primary"
                      variant="outlined"
                      startIcon={<CleanIcon />}
                      onClick={() => {
                        setData([]);
                        setDataIndice([]);
                        setXmlToJsonisTrue({});
                      }}
                    >
                      REINICIAR MÓDULO
                    </Button>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

{
  /*
   <>
        <Tooltip
          <IconButton
            onClick={async () => {
              // //  console.log('')('params electronic index', params.row);
              // console.log('params', params.row);
              // setXmlToJsonisTrue(params.row);

              // ? aquí se debe es llamar el indice electronico del expediente
            }}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <NoteAddIcon
                titleAccess="Crear XML de índice electrónico"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
        </>

*/
}
