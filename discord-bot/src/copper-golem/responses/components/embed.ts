// Local Imports
import { DEFAULT_COLOR } from '../../../config';

/**
 * Class for Discord embeds.
 */
export class Embed {
    color: number = DEFAULT_COLOR;

    title: string;

    fields: Array<{ name: string, value: string, inline: boolean }>;

    description: string | null;

    url: string | null;

    thumbnail: string | null;

    image: string | null;

    hasAuthor: boolean;

    authorName: string;

    authorIcon: string;

    authorUrl: string;

    hasFooter: boolean;

    footerText: string;

    footerIcon: string;

    hasTimestamp: boolean;

    /**
     * Instantiates a new embed.
     *
     * @param title 
     * @param fields 
     * @param description 
     * @param url 
     * @param thumbnail 
     * @param image 
     * @param hasAuthor 
     * @param authorName 
     * @param authorIcon 
     * @param authorUrl 
     * @param hasFooter 
     * @param footerText 
     * @param footerIcon 
     * @param hasTimestamp 
     */
    constructor(
        title: string,
        fields: Array<{ name: string, value: string, inline: boolean }> = [],
        description: string | null = null,
        url: string | null = null,
        thumbnail: string | null = null,
        image: string | null = null,
        hasAuthor: boolean = false,
        authorName: string = '',
        authorIcon: string = '',
        authorUrl: string = '',
        hasFooter: boolean = false,
        footerText: string = '',
        footerIcon: string = '',
        hasTimestamp: boolean = false,
    ) {
        this.title = title;
        this.fields = fields;
        this.description = description;
        this.url = url;
        this.thumbnail = thumbnail;
        this.image = image;
        this.hasAuthor = hasAuthor
        this.authorName = authorName;
        this.authorIcon = authorIcon;
        this.authorUrl = authorUrl;
        this.hasFooter = hasFooter;
        this.footerText = footerText;
        this.footerIcon = footerIcon;
        this.hasTimestamp = hasTimestamp;
    }

    /**
     * Builds the component to be sent to Discord.
     * 
     * @returns {object} Discord accepted component object.
     */
    build(): object {
        const embed: Record<string, any> = {
            color: this.color,
            title: this.title,
            fields: this.fields,
        };

        if (this.description) {
            embed.description = this.description;
        }
        if (this.url !== null) {
            embed.url = this.url;
        }
        if (this.thumbnail !== null) {
            embed.thumbnail = {
                url: this.thumbnail,
            };
        }
        if (this.image !== null) {
            embed.image = {
                url: this.image,
            };
        }
        if (this.hasAuthor) {
            embed.author = {
                name: this.authorName,
                icon_url: this.authorIcon,
                url: this.authorUrl,
            };
        }
        if (this.hasTimestamp) {
            embed.timestamp = new Date();
        }
        if (this.hasFooter) {
            embed.footer = {
                text: this.footerText,
                icon_url: this.footerIcon,
            };
        }

        return embed;
    }
}
