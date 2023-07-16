import React, {PropsWithChildren} from "react";

interface EditorWorksheetProps {
    onClick?: () => void
}

function EditorWorksheet(props: PropsWithChildren<EditorWorksheetProps>) {
    const handleClick = props.onClick || (()=>{
        console.log('No onClick handler attached to button.');
    });

    return (
        <div className="editor-worksheet">
            <div className="editor-worksheet--page">
                {props.children}
            </div>
        </div>
    );
}

export default EditorWorksheet;