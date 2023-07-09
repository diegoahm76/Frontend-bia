/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/naming-convention */
import builder from 'xmlbuilder';
// import convert  from 'xml-js';

export type AnyObject = Record<string, any>;

/* export const xmlFromJson = async (jsonObj: AnyObject): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const xml = builder.create(jsonObj, { encoding: 'utf-8' });
    


    const xml_file = xml.end({ pretty: true });
    console.log(xml_file);
    resolve(xml_file);
  });
};
*/

/* export function xmlFromJson(json: any, rootElementName: string = 'root'): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const xml = convert.js2xml(json, { compact: true, spaces: 4 });
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const wrappedXml = `<${rootElementName}>${xml}</${rootElementName}>`;
      resolve(wrappedXml);
    } catch (error) {
      reject(error);
    }
  });
} */



export function xmlFromJson(json: any, rootElementName: string = 'root'): any {
  const root = builder.create(rootElementName);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function buildXml(parent: any, data: any) {
    if (Array.isArray(data)) {
      for (const item of data) {
        buildXml(parent, item);
      }
    } else if (typeof data === 'object') {
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
          buildXml(parent.ele(key), value);
        } else if (typeof value === 'object') {
          buildXml(parent.ele(key), value);
        } else {
          parent.ele(key, value);
        }
      }
    }
  }

  buildXml(root, json);

  return root.end({ pretty: true });
}


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