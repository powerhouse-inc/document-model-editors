import {
    createEmptyExtendedDocumentModelState,
    reducer,
} from '@acaldas/document-model-libs/browser/document-model';

import { useDocumentReducer } from '../common';

export default function useDocumentModelReducer() {
    return useDocumentReducer(
        reducer,
        createEmptyExtendedDocumentModelState(),
        createEmptyExtendedDocumentModelState
    );
}
