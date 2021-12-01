// Local Imports
import { Options } from 'discord.js';
import { Component } from './component';

const MENU_COMPONENT_TYPE = 3;

/**
 * Menu options.
 */
export class SelectOption {
    label: string;

    value: string;

    description: string | null;

    isDefault: boolean;

    /**
     * Instantiates a SelectMenu option.
     *
     * @param {string} label Label displayed to user.
     * @param {string} value Value of this option.
     * @param {string | null} [description = null] Description of this option.
     * @param {boolean} [isDefault = false] Whether this option is default.
     */
    constructor(
        label: string,
        value: string,
        description: string | null = null,
        isDefault: boolean = false,
    ) {
        this.label = label;
        this.value = value;
        this.description = description;
        this.isDefault = isDefault;
    }

    /**
     * Builds the option object for the select menu.
     *
     * @returns Option object.
     */
    build(): object {
        const option: Record<string, any> = {
            label: this.label,
            value: this.value,
            default: this.isDefault,
        };

        if (this.description) {
            option.description = this.description;
        }

        return Options;
    }
}

/**
 * Select menu component for Discord messages.
 */
export class Menu implements Component {
    id: string;

    placeholder: string;

    disabled: boolean;

    options: Array<SelectOption>;

    minValues: number;

    maxValues: number;

    /**
     * Instantiates a new menu component.
     * 
     * @param {string} id The unique id of the button.
     * @param {string} placeholder The placeholder of the button.
     * @param {boolean} disabled Whether the button is disabled.
     */
    constructor(
        id: string,
        placeholder: string,
        options: Array<SelectOption> = [],
        disabled: boolean = false,
        minValues: number = 1,
        maxValues: number = 1,
    ) {
        this.id = id;
        this.placeholder = placeholder;
        this.options = options;
        this.disabled = disabled;
        this.minValues = minValues;
        this.maxValues = maxValues;
    }

    /**
     * Builds the component to be sent to Discord.
     * 
     * @returns {object} Discord accepted component object.
     */
    build(): object {
        return {
            type: MENU_COMPONENT_TYPE,
            custom_id: this.id,
            disabled: this.disabled,
            options: this.options,
            placeholder: this.placeholder,
            min_values: this.minValues,
            max_values: this.maxValues,
        };
    };
}
