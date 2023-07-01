import { CSSProperties } from "react";

type ColorTheme = 'light' | 'dark';

const colorScheme = {
    light: {
        color: "#222222",
        bgColor: "#FFFFFF",
        border: "#EEEEEE",
        shadow: "rgba(128,128,128,0.65)",
        inputColor: "#222222",
        inputBg: "#F6F6F6",
    },
    dark: {
        color: "#E6E6E6",
        bgColor: "#181818",
        border: "#181818",
        shadow: "rgba(0, 0, 0, 0.25)",
        inputColor: "#E6E6E6",
        inputBg: "#222222"
    }
} 

const inputStyle = (mode='light', focus=false) => {
    const scheme = colorScheme[mode];

    return {
        width: "100%",
        border: "none",
        padding: "0.5em",
        boxSizing: "border-box",
        backgroundColor: focus ? scheme.inputBg : scheme.bgColor,
        outline: "none",
        fontSize: "18pt",
        fontWeight: "bold",
        color: scheme.inputColor,
        margin: "0.5em 0",
        resize: "none",
        fontFamily: "Roboto, sans-serif",
        overflow: "hidden",
        lineHeight: "1.5"
    } satisfies CSSProperties
};

export { ColorTheme, colorScheme, inputStyle };