import React, { CSSProperties, useState } from "react";
import TextInput from "./components/textInput";
import { ColorTheme, colorScheme } from "./styles";

interface EditorProps {
    mode? : ColorTheme
}

interface Entry {
    id: string,
    value: string
}

let nextEntryId = 1; 

function Editor(props: EditorProps) {
    const theme: ColorTheme = props.mode || 'light';
    const scheme = colorScheme[theme];
    const style: CSSProperties = {
        backgroundColor: scheme.bgColor, 
        color: scheme.color, 
        maxWidth: "60em", 
        margin:"1em auto",
        padding:"6em",
        border: "2px solid " + scheme.border,
        boxShadow: "2px 2px 2px " + scheme.shadow,
        fontFamily: "Roboto, sans-serif"
    };

    const [entries, setEntries] = useState([] as Entry[]);

    const createEntry = (entry:string) => {
        if (entry.length > 0) {
            setEntries(entries.concat([{
                id: '' + nextEntryId++,
                value: entry
            }]));
        }
    }

    const deleteEntry = (id: string) => {
        setEntries(entries.filter(entry => entry.id != id))
    }

    return (
        <div style={style}>
            {
                entries.map((entry) => <TextInput 
                    key={entry.id}
                    id={entry.id}
                    theme={theme} 
                    autoFocus={false} 
                    value={entry.value}
                    onEmpty={deleteEntry}
                    size="larger"
                />)
            }
            <TextInput 
                key="new"
                theme={theme} 
                placeholder="Document Model Name" 
                autoFocus={true}
                onSubmit={createEntry}
                size="larger"
                />
        </div>
    );
}

export default Editor;