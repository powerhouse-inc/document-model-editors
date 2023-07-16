import { Meta, StoryObj } from '@storybook/react';
import Editor from '../scope-framework/editor';

const meta = {
    title: 'ScopeFrameworkEditor',
    component: Editor,
    argTypes: {
        mode: {
            options: ['light', 'dark'],
            control: { type: 'radio' }
        },
        debug: {
            name: 'show state',
            control: {type: 'boolean'}
        }
    },
    args: {
        mode: 'light',
        debug: false
    }
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateDocumentType: Story = {
    name: "New document"
};