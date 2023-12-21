/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/naming-convention */
import builder from 'xmlbuilder';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';

export type AnyObject = Record<string, any>;


export function xmlFromJson(json: any, rootElementName: string = 'root'): any {
  const root = builder.create(rootElementName);

  function buildXml(parent: any, data: any) {
    if (data === null || data === undefined) {
      return;
    }

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