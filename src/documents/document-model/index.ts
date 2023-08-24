import {
    DocumentModelAction,
    DocumentModelState,
} from '@acaldas/document-model-libs/browser/document-model';
import { EditorModule } from '../../common';
import Editor from './editor';

const Module: EditorModule<DocumentModelState, DocumentModelAction> = {
    Component: Editor,
    documentTypes: ['powerhouse/document-model'],
};

export default Module;
