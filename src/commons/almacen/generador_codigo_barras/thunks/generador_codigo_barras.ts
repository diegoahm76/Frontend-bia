import { AxiosError } from "axios";
import { api } from "../../../../api/axios";

export const get_obtener_bienes: any = (
  nombre_bien: string,
  doc_identificador_nro: string,
  codigo_bien: string,
  fecha_desde: string,
  fecha_hasta: string,
  nombre_comercial: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/busqueda-bienes-general/get/?nombre_bien=${
        nombre_bien
      }&doc_identificador_nro=${
        doc_identificador_nro
      }&codigo_bien=${
        codigo_bien
      }&fecha_desde=${
        fecha_desde
      }&fecha_hasta=${
        fecha_hasta
      }`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const generar_texto_centrado = (text: string, font_size: number, y_position: number, doc_barr_code: any) => {
  doc_barr_code.setFontSize(font_size);
  const page_width = doc_barr_code.internal.pageSize.getWidth();
  let line = "";
  // con margin establecemos el margen de la hoja para centrar el texto y dar el salto de linea
  const margin = 3;
  const text_width = page_width - 2 * margin;
  const words = text?.split(" ");

  for (let i = 0; i < words?.length; i++) {
      const test_line = line + words[i] + " ";
      const test_dimensions = doc_barr_code.getTextDimensions(test_line);

      if (test_dimensions.w > text_width) {
          const text_position = (page_width - doc_barr_code.getTextDimensions(line).w) / 2;
          doc_barr_code.text(line, text_position, y_position);
          line = words[i] + " ";
          // con esta variable se establece el alto de linea entre linea
          y_position += 2;
      } else {
          line = test_line;
      }
  }

  const last_line_position = (page_width - doc_barr_code.getTextDimensions(line).w) / 2;
  doc_barr_code.text(line, last_line_position, y_position);
};