import {
    createEmptyExtendedDocumentModelState,
    ExtendedDocumentModelState,
    reducer,
} from '@acaldas/document-model-libs/browser/document-model';

import { useDocumentReducer } from '../common';

export default function useDocumentModelReducer(
    initialState: ExtendedDocumentModelState = createEmptyExtendedDocumentModelState(),
    onError?: (error: unknown) => void
) {
    return useDocumentReducer(reducer, initialState, onError);
}
