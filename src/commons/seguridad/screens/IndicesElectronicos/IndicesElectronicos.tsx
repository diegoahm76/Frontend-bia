/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useEffect, useState } from 'react';
import { api } from '../../../../api/axios';
import { v4 as uuidv4 } from 'uuid';
export const IndicesElectronicos: FC = (): JSX.Element => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const url = `gestor/ccd/get-terminados/`;
    void api.get(url).then((response) => {
      const newData = response.data.map((item: any) => ({
        ...item,
        searchIndex: uuidv4()
      }));
      console.log(newData);

      setData(newData);
    });
  }, []);

  return (
    <div>
      <h1>Hola desde los índices electronicos</h1>
    </div>
  );
};
