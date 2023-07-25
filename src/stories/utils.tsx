import {
    Action,
    BaseAction,
    Document,
} from '@acaldas/document-model-libs/document';
import { useArgs, useChannel } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import { EditorProps } from '../common';

export function createDocumentStory<S, A extends Action>(
    Editor: (props: EditorProps<S, A | BaseAction>) => React.JSX.Element,
    reducer: (
        document: Document<S, A | BaseAction>,
        onError?: (error: unknown) => void
    ) => readonly [
        Document<S, A | BaseAction>,
        (action: A | BaseAction) => void,
        (state: Document<S, A | BaseAction>) => void
    ],
    document: Document<S, A | BaseAction | BaseAction>
) {
    const meta = {
        component: Editor,
        render: () => {
            const [args, setArgs] = useArgs<EditorProps<S, A>>();
            const emit = useChannel({});

            const [state, dispatch] = reducer(args.document, console.error);

            //  resets the budget state in the reducer when the prop changes
            useEffect(() => {
                if (state) {
                    setArgs({ document: state });
                    emit('DOCUMENT', state);
                }
            }, [state]);

            const darkTheme = args.editorContext.theme === 'dark';
            return (
                <div
                    style={{
                        padding: '0',
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
            document: {
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
        },
    } satisfies Meta<typeof Editor>;

    const CreateDocumentStory: StoryObj<typeof meta> = {
        name: 'New document',
        args: {
            document,
            editorContext: {
                theme: 'light',
            },
        },
    };

    return { meta, CreateDocumentStory };
}
