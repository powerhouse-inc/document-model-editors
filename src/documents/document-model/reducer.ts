import {
    reducer,
    utils,
} from '@acaldas/document-model-libs/browser/document-model';
import { createUseDocumentReducer } from '../../common';

export default createUseDocumentReducer(reducer, utils.createDocument);
