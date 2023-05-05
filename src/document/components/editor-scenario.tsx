import { Editor } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { useRef, useState } from 'react';
import { z } from 'zod';

export default function EditorScenario({
    operationName,
    operationValidator,
    validator,
    onCreate,
}: {
    operationName: string;
    operationValidator: () => z.ZodObject<any>;
    validator: () => z.ZodObject<any>;
    onCreate: (create: { scenario: string }) => void;
}) {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const actionType = operationName
        .split('')
        .map((l, i) => (i > 0 && l.toUpperCase() === l ? `_${l}` : l))
        .join('')
        .toUpperCase();

    const [code, setCode] = useState(`{
        "initial": {},
        "operation": {
            "type": "${actionType}",
            "input": {}
        },
        "state": {}\n}`);

    // useEffect(() => {
    //     setTimeout(() => {
    //         editorRef.current?.setPosition({ lineNumber: 11, column: 9 });
    //         editorRef.current?.focus();
    //     });
    // }, []);

    let errorMessage = '';
    let valid = false;
    try {
        const scenario = JSON.parse(code);
        const validInitial = validator()
            .strict()
            .safeParse(scenario.initial).success;
        const validOperation = operationValidator()
            .strict()
            .safeParse(scenario.operation).success;
        const validState = validator()
            .strict()
            .safeParse(scenario.state).success;
        valid = validOperation && validInitial && validState;
        errorMessage = !validInitial
            ? 'Invalid initial state'
            : !validOperation
            ? 'Invalid operation input'
            : !validState
            ? 'Invalid state'
            : '';
    } catch (error) {
        errorMessage = 'Invalid JSON';
    }

    function create() {
        onCreate({ scenario: code });
    }

    return (
        <div>
            <h3>Define Scenario:</h3>
            <p style={{ marginTop: 10, fontSize: '1.1rem', color: 'red' }}>
                {errorMessage}
            </p>
            <Editor
                theme="vs-dark"
                width="100%"
                height="60vh"
                language="json"
                options={{ minimap: { enabled: false } }}
                value={code}
                onChange={value => setCode(value ?? '')}
                onMount={editor => {
                    editorRef.current = editor;
                }}
            />
            <button
                onClick={create}
                disabled={!valid}
                style={{ width: '100%', height: 30, marginTop: 10 }}
            >
                Create
            </button>
        </div>
    );
}
