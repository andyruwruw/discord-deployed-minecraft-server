// Local Imports
import { Component } from './component';
import { BUTTON_STYLE } from '../../../config';

const BUTTON_COMPONENT_TYPE = 2;

/**
 * Embeded button in Discord message.
 */
export class Button implements Component {
    id: string;

    label: string;

    disabled: boolean;

    style: number;

    url: string | null;

    /**
     * Instantiates a button component.
     *
     * @param {string} id The unique id of the button.
     * @param {string} label The label of the button.
     * @param {boolean} disabled Whether the button is disabled.
     * @param {number} style Style of the button component.
     * @param {string | null} [url = null] Optional url to link to. 
     */
    constructor(
        id: string,
        label: string,
        disabled: boolean = false,
        style: number = BUTTON_STYLE.PRIMARY,
        url: string | null = null,
    ) {
        this.id = id;
        this.label = label;
        this.disabled = disabled;
        this.style = style;
        this.url = url;
    }

    /**
     * Builds the component to be sent to Discord.
     * 
     * @returns {object} Discord accepted component object.
     */
    build(): object {
        const button: Record<string, any> = {
            type: BUTTON_COMPONENT_TYPE,
            custom_id: this.id,
            label: this.label,
            disabled: this.disabled,
            style: this.style,
        };

        if (this.url) {
            button.url = this.url;
        }

        return button;
    }
}
