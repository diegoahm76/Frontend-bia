/* eslint-disable @typescript-eslint/naming-convention */
// import { getRequestStates } from '../services/getRequestStates.service';

export const BuscadorOtros = (props: any): JSX.Element => {
  const { controlBusquedaBandejaTareas } = props;

  // ? useState Necesario
  // const [requestStatuses, setRequestStatuses] = useState<any[]>([]);

  //* se debe establecer un useEffect ya que cada vez que se recargeue el elemento se deben filtrar de diferente manera los elementos
  /* useEffect(() => {
    void getRequestStates().then((res: any) => {
      //  console.log('')(res);
      setRequestStatuses(res);
    });
  }, []);*/

  // ?

  return <>Buscador otros</>;
};
