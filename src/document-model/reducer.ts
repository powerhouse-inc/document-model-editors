import {
    createEmptyExtendedDocumentModelState,
    DocumentModelAction,
    DocumentModelState,
    reducer,
} from '@acaldas/document-model-libs/browser/document-model';

import { Document, utils } from '@acaldas/document-model-libs/document';
import { useDocumentReducer } from '../common';

export default function useDocumentModelReducer(
    document?: Document<DocumentModelState, DocumentModelAction>,
    onError?: (error: unknown) => void
) {
    return useDocumentReducer(
        reducer,
        document ??
            utils.createDocument(createEmptyExtendedDocumentModelState()),
        onError
    );
}
