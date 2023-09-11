/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Plugin } from '@ckeditor/ckeditor5-core';
import {
    Widget,
    toWidget,
    viewToModelPositionOutsideModelElement
} from '@ckeditor/ckeditor5-widget';
import { PlaceholderCommand } from './placeholdercommand';
import { type Element, type DowncastWriter } from '@ckeditor/ckeditor5-engine';

export class PlaceholderEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {

        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'placeholder', new PlaceholderCommand( this.editor ) );

        this.editor.editing.mapper.on(
          'viewToModelPosition',
          viewToModelPositionOutsideModelElement( this.editor.model, viewElement => viewElement.hasClass( 'placeholder' ) )
      );

        this.editor.config.define( 'placeholderConfig', {
          types: [ 'Nombre', 'Nro Resolución' ]
      } );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'placeholder', {
            // Behaves like a self-contained inline object (e.g. an inline image)
            // allowed in places where $text is allowed (e.g. in paragraphs).
            // The inline widget can have the same attributes as text (for example linkHref, bold).
            inheritAllFrom: '$inlineObject',

            // The placeholder can have many types, like date, name, surname, etc:
            allowAttributes: [ 'name' ]
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'span',
                classes: [ 'placeholder' ]
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                // Extract the "name" from "{name}".
                const name = (viewElement.getChild( 0 ) as any)?.data.slice( 1, -1 ); // ERROR EN VIEWELEMENT

                return modelWriter.createElement( 'placeholder', { name } );
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'placeholder',
            view: ( modelItem, { writer: viewWriter } ) => {
                const widget_element = createPlaceholderView( modelItem, viewWriter );

                // Enable widget handling on a placeholder element inside the editing view.
                return toWidget( widget_element, viewWriter );
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'placeholder',
            view: ( modelItem, { writer: viewWriter } ) => createPlaceholderView( modelItem, viewWriter )
        } );

        // Helper method for both downcast converters.
        function createPlaceholderView( modelItem: Element, viewWriter: DowncastWriter ) {
            const name = modelItem.getAttribute( 'name' );

            const placeholder_view = viewWriter.createContainerElement( 'span', {
                class: 'placeholder'
            } );

            // Insert the placeholder name (as a text).
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            const inner_text = viewWriter.createText( '{' + name + '}' );
            viewWriter.insert( viewWriter.createPositionAt( placeholder_view, 0 ), inner_text );

            return placeholder_view;
        }
    }
}
