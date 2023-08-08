import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { Placeholder } from '../EditorTexto/placeholder/placeholder';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditorTexto: React.FC = () => {

  return (
    <CKEditor
      editor={ ClassicEditor }
      data="<p></p>"
      onChange={ ( event, editor ) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data = editor.getData();
      } }
      config={ {
        placeholder: 'Redacte aquí el contenido del mensaje o cargue una plantilla predefinida.',
      } }
    />
  )
}
