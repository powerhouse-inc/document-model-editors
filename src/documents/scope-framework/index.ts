import {
    ScopeFrameworkAction,
    ScopeFrameworkState,
} from '@acaldas/document-model-libs/browser/scope-framework';
import { EditorModule } from '../../common';
import Editor from './editor';

const Module: EditorModule<ScopeFrameworkState, ScopeFrameworkAction> = {
    Component: Editor,
    documentTypes: ['powerhouse/scope-framework'],
};

export default Module;
