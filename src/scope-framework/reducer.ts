import {
    createEmptyExtendedScopeFrameworkState,
    reducer,
} from '@acaldas/document-model-libs/browser/scope-framework';

import { useDocumentReducer } from '../base';

export default function useScopeFrameworkReducer() {
    return useDocumentReducer(
        reducer,
        createEmptyExtendedScopeFrameworkState(),
        createEmptyExtendedScopeFrameworkState
    );
}
