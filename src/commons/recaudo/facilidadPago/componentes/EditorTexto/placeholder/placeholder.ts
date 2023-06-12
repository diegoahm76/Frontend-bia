import { Plugin } from '@ckeditor/ckeditor5-core';
import { PlaceholderEditing } from './placeholderediting';
import { PlaceholderUI } from './placeholderui';

export class Placeholder extends Plugin {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    static get requires() {
        return [ PlaceholderEditing, PlaceholderUI ];
    }
}
