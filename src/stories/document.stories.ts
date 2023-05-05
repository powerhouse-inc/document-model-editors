import { Meta, StoryObj } from '@storybook/react';
import Editor from '../document/editor';

const meta = {
    title: 'Document',
    component: Editor,
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateDocument: Story = {};
