import {
    reducer,
    utils,
} from '@acaldas/document-model-libs/browser/budget-statement';
import { createUseDocumentReducer } from '../../common';

export default createUseDocumentReducer(reducer, utils.createDocument);
