/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* import { Command } from '@ckeditor/ckeditor5-core';

export class PlaceholderCommand extends Command {
    execute( { value } ) {  // ERROR EN VALUE
        const editor = this.editor;
        const selection = editor.model.document.selection;

        editor.model.change( writer => {
            // Create a <placeholder> element with the "name" attribute (and all the selection attributes)...
            const placeholder = writer.createElement( 'placeholder', {
                ...Object.fromEntries( selection.getAttributes() ),
                name: value
            } );

            // ... and insert it into the document. Put the selection on the inserted element.
            editor.model.insertObject( placeholder, null, null, { setSelection: 'on' } );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;

        const is_allowed = model.schema.checkChild( selection.focus.parent, 'placeholder' ); // ERROR EN SELECTION

        this.isEnabled = is_allowed;
    }
}
*/
