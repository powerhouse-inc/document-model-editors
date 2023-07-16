import React, {PropsWithChildren} from "react";

interface ToolbarButtonProps {
    onClick?: () => void
}

function ToolbarButton(props: PropsWithChildren<ToolbarButtonProps>) {
    const handleClick = props.onClick || (()=>{
        console.log('No onClick handler attached to button.');
    });

    return (
        <div 
            onClick={handleClick}
            className="toolbar-button">
            {props.children}
        </div>
    );
}

export default ToolbarButton;