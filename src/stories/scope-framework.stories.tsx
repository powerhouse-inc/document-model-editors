import { createEmptyExtendedScopeFrameworkState } from '@acaldas/document-model-libs/browser/scope-framework';
import { useArgs, useChannel } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useScopeFrameworkReducer } from '../scope-framework';
import Editor, { IProps } from '../scope-framework/editor';

const scopeFramework = createEmptyExtendedScopeFrameworkState();

const meta = {
    title: 'ScopeFrameworkEditor',
    component: Editor,
    render: () => {
        const [args, setArgs] = useArgs<IProps>();
        const emit = useChannel({});

        const [state, dispatch, reset] = useScopeFrameworkReducer(
            args.scopeFramework,
            console.error
        );

        //  resets the budget state in the reducer when the prop changes
        useEffect(() => {
            if (state) {
                reset(state);
                setArgs({ scopeFramework: state });
                emit('BUDGET_STATEMENT', state);
            }
        }, [state]);

        const darkTheme = args.editorContext.theme === 'dark';
        return (
            <div
                style={{
                    padding: '1em',
                    height: '100vh',
                    color: darkTheme ? 'white' : 'black',
                    backgroundColor: darkTheme ? '#1A1D1F' : 'white',
                }}
            >
                <Editor {...args} dispatch={dispatch} />
            </div>
        );
    },
    argTypes: {
        scopeFramework: {
            control: 'object',
        },
        dispatch: {
            table: {
                disable: true,
            },
        },
        editorContext: {
            name: 'Theme',
            options: ['light', 'dark'],
            mapping: {
                light: {
                    theme: 'light',
                },
                dark: {
                    theme: 'dark',
                },
            },
            defaultValue: {
                theme: 'light',
            },
            control: 'inline-radio',
        },
        debug: {
            name: 'show state',
            control: { type: 'boolean' },
        },
    },
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateDocumentType: Story = {
    name: 'New document',
    args: {
        scopeFramework,
        editorContext: {
            theme: 'light',
        },
    },
};
