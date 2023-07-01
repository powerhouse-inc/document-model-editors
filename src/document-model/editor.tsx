import React from "react";

const colorScheme = {
    light: {
        color: "#222222",
        bgColor: "#FFFFFF",
        border: "#EEEEEE",
        shadow: "rgba(128,128,128,0.65)"
    },
    dark: {
        color: "#E6E6E6",
        bgColor: "#181818",
        border: "#181818",
        shadow: "rgba(0, 0, 0, 0.25)"
    }
}

interface EditorProps {
    mode?: 'light' | 'dark'
}

function Editor(props: EditorProps) {
    const scheme = colorScheme[props.mode || 'light'];

    return (
        <div style={{
            backgroundColor: scheme.bgColor, 
            color: scheme.color, 
            maxWidth: "60em", 
            margin:"1em auto", 
            padding:"5em",
            border: "2px solid " + scheme.border,
            boxShadow: "2px 2px 2px " + scheme.shadow,
            fontFamily: "Roboto, sans-serif"
            }}>
            <h1>Header 1</h1>
            <h2>Header 2</h2>
            <h3>Header 3</h3>
            <h4>Header 4</h4>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at lectus 
                neque. Vestibulum at iaculis lorem. Etiam sed fringilla arcu, eu convallis 
                magna. Etiam volutpat convallis lobortis. Phasellus fermentum laoreet quam 
                eu gravida. Vestibulum ultrices mi eu orci pretium lobortis. Nunc dictum 
                molestie pellentesque.
            </p>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
            <p><label>mode: </label>{props.mode}</p>
        </div>
    );
}

export default Editor;