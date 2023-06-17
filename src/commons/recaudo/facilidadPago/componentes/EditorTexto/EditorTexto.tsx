import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { Placeholder } from '../EditorTexto/placeholder/placeholder';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditorTexto: React.FC = () => {

  return (
    <CKEditor
      editor={ ClassicEditor }
      data="<p></p>"
      onReady={ editor => {
        console.log( 'Editor is ready to use!', editor );
      } }
      onChange={ ( event, editor ) => {
        const data = editor.getData();
        console.log( { event, editor, data } );
      } }
      onBlur={ ( event, editor ) => {
        console.log( 'Blur.', editor );
      } }
      onFocus={ ( event, editor ) => {
      console.log( 'Focus.', editor );
      } }
      config={ {
        placeholder: 'Redacte aquí el contenido del mensaje o cargue una plantilla predefinida.',
      } }
    />
  )
}
