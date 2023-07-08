/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/naming-convention */
import builder from 'xmlbuilder';

export type AnyObject = Record<string, any>;

export const xmlFromJson = (jsonObj: AnyObject): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xml = builder.create(jsonObj, { encoding: 'utf-8' });
    const xml_file = xml.end({ pretty: true });
    console.log(xml_file);
    resolve(xml_file);
  });
};

/* xmlFromJson({
  nombre: 'Juan',
  apellido: 'Perez',
  edad: 30,
  direccion: {
    calle: 'Av. Siempre Viva',
    numero: 742,
    barrio: 'Springfield'
  }
});
*/