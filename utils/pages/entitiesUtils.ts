// Out of the box imports
import pluralize from 'pluralize';
// Interfaces for the file
import {
    IEntityQuery,
    IEntitiesData,
    IMetadata,
    IParserFunctionComponent,
    IParserString,
    IAttribute,
    IEntity,
} from '@/interfaces/instances';
// Custom imports
import { constants, strings } from '@/helpers/pages/entitiesHelper';

/**
 * Method to get the active entitiy if possible
 * @param {Object} query: Request query
 * @param {Object} entities: List of Entities
 */
export const getActiveEntity = (query: IEntityQuery, entities: IEntity[]) => {
    if (!query?.slug) {
        return undefined;
    }

    return { ...entities.find(({ id }) => id === query.slug) };
};

/**
 * Method to generate the page data for the given entity type
 * @param {Object} data: Entities data structure
 * @param {String} mode: View mode
 * @param {Object} entity: Current active entity
 */
export const getEntitiesPageData = (data: IEntitiesData, mode: string = '', entity?: IEntity) => {
    const metadata: IMetadata = data.Metadata;
    const isList = isListMode(mode);
    // Extract the data for the page instance
    const breadcrumbs = getBreadcrumbs(data, entity);
    const pageProps = getPageProps(metadata);
    const title = isList ? '' : getTitle(metadata);
    const subtitle = isList ? '' : getSubtitle(metadata);

    return { breadcrumbs, pageProps, title, subtitle };
};

/**
 * Method to generate the breadcrumbs for the given entity
 * @param {Object} data: Entitiy data structure
 * @param {Object} entity: Active Entitiy instance
 */
export const getBreadcrumbs = (data: IEntitiesData, entity?: IEntity) => {
    const { id, name } = data.Metadata;
    const value = pluralize.plural(name);

    if (!!entity) {
        return [
            { id, value, link: `/entities/${id}` },
            { id: entity.id as string, value: entity.name as string },
        ];
    }

    return [{ id, value }];
};

/**
 * Method to generate the page props for the given entity
 * @param {Object} metadata: Entitiy metadata structure
 */
export const getPageProps = ({ name }: IMetadata) => {
    const title = pluralize.plural(name);
    return { title };
};

/**
 * Method to generate the container title for the given entity
 * @param {Object} metadata: Entitiy metadata structure
 */
export const getTitle = ({ name }: IMetadata) => {
    const title = pluralize.plural(name);
    return title;
};

/**
 * Method to generate the container subtitle for the given entity
 * @param {Object} metadata: Entitiy metadata structure
 */
export const getSubtitle = ({ description }: IMetadata) => {
    return description;
};

/**
 * Method to check if the mode is list
 * @param {String} mode: Mode of the entities view
 */
export const isListMode = (mode: string) => {
    return mode === 'list';
};

/**
 * Method to check if the component to render is editor type
 * @param {String} type: Type of the entity
 */
export const isEditorType = (type: string) => {
    return type === 'editor';
};

/**
 * Method to get the initial form data of the form view
 * @param {Object} data: Entitiy data structure
 * @param {Object} entity: Active Entitiy instance
 */
export const getInitialFormData = (data: IEntitiesData, entity?: IEntity) => {
    const { attributeList } = data.Metadata;
    return attributeList.reduce((acc, { name }) => {
        acc[name] = (entity && entity[name]) ?? '';
        return acc;
    }, {} as { [key: string]: string | number });
};

/**
 * Method to get the form attributes component of the form view
 * @param {Object} data: Entity data structure
 * @param {Function} callback: Callback function to persist the data
 */
export const getFormAttributes = (data: IEntitiesData, callback: Function) => {
    const parser: IParserFunctionComponent = constants.ENTITIES_ATTRIBUTES_MAPPING;
    const stringParser: IParserString = strings;
    const { attributeList } = data.Metadata;

    return attributeList.map(({ name, type, required = false }, index) => {
        const key = `${name}-form-component`;
        const placeholder = stringParser[`${name}_placeholder`];
        const label = `${stringParser[`${name}_label`]}${required ? ' *' : ''}`;
        const props = { key, placeholder, label, setter: (value: string) => callback(name, value) };

        if (isEditorType(type)) {
            Object.assign(props, { config: { placeholder, language: 'en' } });
        }

        if (attributeList.length - 1 === index && index % 2 === 0) {
            Object.assign(props, { style: { gridColumn: 'span 2' } });
        }

        const component = parser[type];
        return { Component: component, props, name };
    });
};

/**
 * Method to check if the current status of the form is a valid one
 * @param {Object} form: Form data
 * @param {Object} data: Entity data structure
 */
export const isFormValid = (form: IEntity, data: IEntitiesData, loaded: Boolean) => {
    const { attributeList } = data.Metadata;
    return loaded && !attributeList.every(({ name, required = false }) => !required || (required && !!form[name]));
};
