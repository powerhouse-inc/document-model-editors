import {
    reducer,
    ScopeFrameworkAction,
    ScopeFrameworkState,
    utils,
} from '@acaldas/document-model-libs/browser/scope-framework';
import { createUseDocumentReducer } from '../../common';

export default createUseDocumentReducer<
    ScopeFrameworkState,
    ScopeFrameworkAction
>(reducer, utils.createDocument);
