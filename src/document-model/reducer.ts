import { createEmptyExtendedDocumentModelState, reducer, actions, DocumentModel } 
    from '@acaldas/document-model-libs/browser/document-model';

import { useDocumentReducer } from '../base';

export default function useDocumentModelReducer() {
    return useDocumentReducer(
        reducer,
        createEmptyExtendedDocumentModelState(),
        createEmptyExtendedDocumentModelState
    );
}