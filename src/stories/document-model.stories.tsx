import { Meta, StoryObj } from '@storybook/react';
import Editor from '../document-model/editor';

const meta = {
    title: 'DocumentModel',
    component: Editor,
    argTypes: {
        mode: {
            options: ['light', 'dark'],
            control: { type: 'radio' }
        }
    },
    args: {
        mode: 'light'
    }
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateDocumentType: Story = {
    name: "New document"
};