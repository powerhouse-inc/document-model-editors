import { GraphQLSchema } from 'graphql';
import { editor } from 'monaco-editor';
import 'monaco-graphql';
import { useRef, useState } from 'react';
import { z } from 'zod';
import codegen from '../codegen';
import Editor from './editor-graphql';

export default function EditorSchema({
    onCreate,
}: {
    onCreate: (created: {
        documentName: string;
        schema: string;
        validator: () => z.ZodObject<any>;
    }) => void;
}) {
    const [name, setName] = useState('');
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    function focusEditor() {
        setCode(`type ${name} {\n\t\n}`);
        setTimeout(() => {
            editorRef.current?.setPosition({ lineNumber: 2, column: 2 });
            editorRef.current?.focus();
        });
    }

    // useEffect(() => {
    // setCode(defaultCode);
    // if (!name) {
    //     return;
    // }
    // const timeout = setTimeout(() => {
    //     editorRef.current?.setPosition({ lineNumber: 2, column: 2 });
    //     editorRef.current?.focus();
    // }, 500);
    // return () => {
    //     clearTimeout(timeout);
    // };
    // }, [name]);

    const [code, setCode] = useState('');
    const [schema, setSchema] = useState<GraphQLSchema>();
    const [validationSchema, setValidationSchema] =
        useState<() => z.ZodObject<any> | null>();

    // const monaco = useMonaco();
    // const [completionProvider, setCompletionProvider] =
    //     useState<IDisposable | null>(null);
    // useEffect(() => {
    //     if (!monaco || !editorRef.current) {
    //         return;
    //     }
    //     if (completionProvider) {
    //         completionProvider.dispose();
    //     }

    //     const newProvider = monaco.languages.registerCompletionItemProvider(
    //         "graphql",
    //         {
    //             triggerCharacters: [":", "$", "\n", " ", "(", "@"],
    //             provideCompletionItems: async (model, position, context) => {
    //                 // const isUriEquals = model.uri.path === editorRef.current.path;
    //                 // if (!isUriEquals) {
    //                 //   return { suggestions: [] };
    //                 // }
    //                 languageService.updateSchema({
    //                     uri: model.uri.path,
    //                     schema,
    //                 });
    //                 const completionItems = languageService.getCompletion(
    //                     model.uri.path,
    //                     model.getValue(),
    //                     position as any
    //                 );

    //                 return {
    //                     incomplete: true,
    //                     suggestions: [
    //                         ...completionItems,
    //                         {
    //                             label: "String",
    //                             kind: 24,
    //                             insertText: "String",
    //                         },
    //                         {
    //                             label: "Int",
    //                             kind: 24,
    //                             insertText: "Int",
    //                         },
    //                     ],
    //                 };
    //             },
    //         }
    //     );
    //     setCompletionProvider(newProvider);
    // }, [monaco, editorRef.current, schema]);

    async function generateSchema() {
        // using callbacks instead of await due to rollup error
        codegen(code).then(result => {
            import(/* @vite-ignore */ result).then(validators => {
                const schemaName = `${name}Schema`;
                const validator = validators[schemaName];
                setValidationSchema(validator);
                onCreate({ documentName: name, schema: code, validator });
            });
        });
    }

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    focusEditor();
                }}
            >
                <label>
                    <h3 style={{ display: 'inline' }}>Document name: </h3>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <button type="submit" style={{ marginLeft: 4 }}>
                    Submit
                </button>
            </form>
            <h3>Define schema:</h3>
            <Editor
                theme="vs-dark"
                onSchemaChange={schema => setSchema(schema)}
                width="100%"
                height="60vh"
                options={{ minimap: { enabled: false } }}
                value={code}
                onChange={value => setCode(value ?? '')}
                onMount={editor => {
                    editorRef.current = editor;
                }}
            />
            <button
                onClick={generateSchema}
                disabled={!schema}
                style={{ width: '100%', height: 30, marginTop: 10 }}
            >
                Create
            </button>
        </div>
    );
}
