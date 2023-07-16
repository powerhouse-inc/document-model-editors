import React from "react";
import { ScopeFramework } from "@acaldas/document-model-libs/scope-framework";
import TextInput from "../../common/textInput";

interface AtlasElementProps {
    element: {
        id: string,
        path: string,
        version: number,
        name?: string, 
        type?: 'Scope' | 'Article' | 'Section' | 'Core' | 'TypeSpecification',
        components?: {
            content?: string
        }
    }
}

function AtlasElement(props: AtlasElementProps) {
    return (
        <div className="atlas-element" onFocus={() => console.log('FOCUS')} onBlur={() => console.log('BLUR')}>
            <div className="atlas-element--header">
                <div className="atlas-element--header-component atlas-element--path">{props.element.path}</div>
                <div className="atlas-element--header-component atlas-element--type">
                    <TextInput value={props.element.type} theme="dark"/>
                </div>
                <div className="atlas-element--header-component atlas-element--name">
                    <TextInput value={props.element.name} size="large" theme="dark"/>
                </div>
                <div className="atlas-element--header-component atlas-element--version">Rev {props.element.version}</div>
                <div className="atlas-element--header-component atlas-element--icons">...</div>
            </div>
            <div className="atlas-element--componentsList">
                <div className="atlas-element--component">
                    <div className="atlas-element--componentLabel">Content</div>
                    <div className="atlas-element--componentInput">
                        <TextInput value={props.element.components?.content} theme="dark"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AtlasElement;