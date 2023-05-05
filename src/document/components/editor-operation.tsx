import { GraphQLSchema } from 'graphql';
import { editor } from 'monaco-editor';
import 'monaco-graphql';
import { useRef, useState } from 'react';
import { z } from 'zod';
import codegen from '../codegen';
import Editor from './editor-graphql';

export default function EditorOperation({
    onCreate,
}: {
    onCreate: (create: {
        operationName: string;
        operationSchema: string;
        operationValidator: () => z.ZodObject<any>;
    }) => void;
}) {
    const [name, setName] = useState('');
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const actionType = name
        ? name
              .split('')
              .map((l, i) => (i > 0 && l.toUpperCase() === l ? `_${l}` : l))
              .join('')
              .toUpperCase()
        : '';
    const defaultCode = `enum ${actionType} {\n\t${actionType}\n}\n\ninput ${name}Action {\n\ttype: ${actionType}!\n\tinput: ${name}Input!\n}\n\ninput ${name}Input {\n\t\n}`;

    const [code, setCode] = useState('');
    const [operation, setOperation] = useState<GraphQLSchema>();
    const [validationSchema, setValidationSchema] =
        useState<() => z.ZodObject<any> | null>();

    async function generateSchema() {
        // using callbacks instead of await due to rollup error
        codegen(code).then(result => {
            import(/* @vite-ignore */ result).then(validators => {
                const validationSchema = validators[`${name}ActionSchema`];
                setValidationSchema(validationSchema);
                onCreate({
                    operationName: name,
                    operationSchema: code,
                    operationValidator: validationSchema,
                });
            });
        });
    }

    function focusEditor() {
        setCode(defaultCode);
        setTimeout(() => {
            editorRef.current?.setPosition({ lineNumber: 11, column: 9 });
            editorRef.current?.focus();
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
                    <h3 style={{ display: 'inline' }}>Operation name: </h3>
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
            <h3>Define operation input:</h3>
            <Editor
                theme="vs-dark"
                onSchemaChange={schema => setOperation(schema)}
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
                disabled={!operation}
                style={{ width: '100%', height: 30, marginTop: 10 }}
            >
                Create
            </button>
        </div>
    );
}
