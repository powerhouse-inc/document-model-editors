import {
    createEmptyExtendedScopeFrameworkState,
    ExtendedScopeFrameworkState,
    reducer,
    ScopeFrameworkAction,
    types,
} from '@acaldas/document-model-libs/browser/scope-framework';
import { useDocumentReducer } from '../common';

export default function useScopeFrameworkReducer(
    initialState: ExtendedScopeFrameworkState = createEmptyExtendedScopeFrameworkState(),
    onError?: (error: unknown) => void
) {
    return useDocumentReducer<types.ScopeFrameworkState, ScopeFrameworkAction>(
        reducer,
        initialState,
        onError
    );
}
