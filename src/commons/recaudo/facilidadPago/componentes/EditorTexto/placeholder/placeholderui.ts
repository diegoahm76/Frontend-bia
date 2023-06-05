/* eslint-disable @typescript-eslint/explicit-function-return-type */
/*
import { Plugin } from '@ckeditor/ckeditor5-core';
import { Model, addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui';
import { Collection } from '@ckeditor/ckeditor5-utils';

export class PlaceholderUI extends Plugin {
    init() {
        const editor = this.editor;
        const t = editor.t;
        const placeholder_names = editor.config.get( 'placeholderConfig.types' );

        // The "placeholder" dropdown must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'placeholder', locale => {
            const dropdown_view = createDropdown( locale );

            // Populate the list in the dropdown with items.
            addListToDropdown( dropdown_view, getDropdownItemsDefinitions( placeholder_names ) ); // ERROR EN GETDROPDOWN

            dropdown_view.buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label: t( 'Placeholder' ),
                tooltip: true,
                withText: true
            } );

            // Disable the placeholder button when the command is disabled.
            const command = editor.commands.get( 'placeholder' );
            dropdown_view.bind( 'isEnabled' ).to( command ); // ERROR COMMAND

            // Execute the command when the dropdown item is clicked (executed).
            this.listenTo( dropdown_view, 'execute', evt => {
                editor.execute( 'placeholder', { value: evt.source.commandParam } ); // ERROR EN VALUE
                editor.editing.view.focus();
            } );

            return dropdown_view;
        } );
    }
}

function getDropdownItemsDefinitions( placeholder_names: string[] ) {
    const item_definitions = new Collection();

    for ( const name of placeholder_names ) {
        const definition = {
            type: 'button',
            model: new Model( {
                commandParam: name,
                label: name,
                withText: true
            } )
        };

        // Add the item definition to the collection.
        item_definitions.add( definition );
    }

    return item_definitions;
}
*/
