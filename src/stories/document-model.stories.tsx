import {
    reducer,
    utils,
} from '@acaldas/document-model-libs/browser/document-model';
import Editor from '../documents/document-model/editor';
import { createDocumentStory } from './utils';

const { meta, CreateDocumentStory } = createDocumentStory(
    Editor,
    reducer,
    utils.createExtendedState()
);

export default { ...meta, title: 'Document Model' };

export { CreateDocumentStory };
