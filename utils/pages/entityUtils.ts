// Out of the box imports
import pluralize from 'pluralize';
// Interfaces for the file
import { IEntity, IEntityData, IMetadata, IParserFunctionComponent, IParserString } from '@/interfaces/instances';
// Custom imports
import { constants } from '@/helpers/pages/entitiesHelper';
import { strings } from '@/helpers/pages/entityHelper';

/**
 * Method to generate the page data for the given entity instance
 * @param {Object} query: Request query
 * @param {Object} data: Entitiies data structure
 * @param {String} mode: View mode
 */
export const getEntityPageData = (data: IEntityData) => {
    const metadata: IMetadata = data.Metadata;
    const entity: IEntity = data.Item;
    // Extract the data for the page instance
    const breadcrumbs = getBreadcrumbs(metadata, entity);
    const pageProps = getPageProps(metadata, entity);
    const title = getTitle(metadata, entity);

    return { breadcrumbs, pageProps, title };
};

/**
 * Method to generate the breadcrumbs for the given entity
 * @param {Object} metadata: Entitiy metadata structure
 * @param {Object} entity: Entitiy instance
 */
export const getBreadcrumbs = ({ id, name }: IMetadata, entity: IEntity) => {
    const value = pluralize.plural(name);

    return [
        { id, value, link: `/entities/${id}` },
        { id: entity.id as string, value: entity.name as string },
    ];
};

/**
 * Method to generate the page props for the given entity
 * @param {Object} metadata: Entitiy metadata structure
 * @param {Object} entity: Entitiy instance
 */
export const getPageProps = ({ name }: IMetadata, entity: IEntity) => {
    return { title: `${name} - ${entity.name}` };
};

/**
 * Method to generate the container title for the given entity
 * @param {Object} metadata: Entitiy metadata structure
 * @param {Object} entity: Entitiy instance
 */
export const getTitle = ({ name }: IMetadata, entity: IEntity) => {
    return `${name} - ${entity.id}`;
};

/**
 * Method to check if the component to render is editor type
 * @param {String} type: Type of the entity
 */
export const isEditorType = (type: string) => {
    return type === 'editor';
};

/**
 * Method to get the form attributes component of the view and their value
 * @param {Object} data: Entity data structure
 */
export const getFormData = (data: IEntityData) => {
    const parser: IParserFunctionComponent = constants.ENTITIES_ATTRIBUTES_MAPPING;
    const stringParser: IParserString = strings;
    const { attributeList } = data.Metadata;

    return attributeList.map(({ name, type }, index) => {
        const key = `${name}-form-component`;
        const placeholder = stringParser[`${name}_placeholder`];
        const label = stringParser[`${name}_label`];
        const props = { key, placeholder, label, value: data.Item[name] };

        if (isEditorType(type)) {
            Object.assign(props, { config: { placeholder, language: 'en' } });
        }

        if (attributeList.length - 1 === index && index % 2 === 0) {
            Object.assign(props, { style: { gridColumn: 'span 2' } });
        }

        const component = parser[type];
        return { Component: component, props };
    });
};
