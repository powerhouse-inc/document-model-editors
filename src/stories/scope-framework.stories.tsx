import {
    reducer,
    utils,
} from '@acaldas/document-model-libs/browser/scope-framework';
import Editor from '../documents/scope-framework/editor';
import { createDocumentStory } from './utils';

const { meta, CreateDocumentStory } = createDocumentStory(
    Editor,
    reducer,
    utils.createExtendedState()
);

export default { ...meta, title: 'Scope Framework' };

export { CreateDocumentStory };
