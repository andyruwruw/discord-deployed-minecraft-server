// Local Imports
import { Component } from './component';
import { ACTION_ROW_TYPE } from '../../../config';

/**
 * Row of interactable components for Discord response.
 */
export class ActionRow {
    components: Array<Component>;

    /**
     * Instantiates an ActionRow.
     *
     * @param {Array<Component>} components Input components to be added to the row.
     */
    constructor(components: Array<Component> = []) {
        this.components = components;
    }

    /**
     * Builds the component to be sent to Discord.
     * 
     * @returns {object} Discord accepted component object.
     */
    build(): object {
        return {
            type: ACTION_ROW_TYPE,
            components: this.components.map(component => component.build())
        };
    }
}
