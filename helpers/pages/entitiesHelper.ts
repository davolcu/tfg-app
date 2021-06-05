// Custom imports
import Input from '@/components/Generic/Input';
import RichTextarea from '@/components/Generic/RichTextarea';

export const constants = {
    ENTITIES_ATTRIBUTES_MAPPING: {
        text: Input,
        editor: RichTextarea,
    },
};

export const strings = {
    // List component strings
    entities_count: (count: number, name: string) => `Showing ${count} saved ${name}`,
    empty_title: (name: string) => `You don't have any ${name} created!`,
    empty_text1: (name: string) => `To create one click on the Create A New ${name} button.`,
    empty_text2: (name: string) => `The ${name} you create will be shown here.`,
    empty_button: (name: string) => `Create A New ${name}`,
    // Form component strings
    name_label: 'Name',
    name_placeholder: 'Introduce the name',
    link_label: 'Link',
    link_placeholder: 'Introduce target url or anchor',
    style_label: 'CSS Style',
    style_placeholder: 'Introduce CSS styles. For example: display: block; margin-top: 20px ',
    content_label: 'Content',
    content_placeholder: 'Introduce the content here',
    // Toast messages
    entity_deleted_successfully: 'The entity has been deleted successfully',
};
