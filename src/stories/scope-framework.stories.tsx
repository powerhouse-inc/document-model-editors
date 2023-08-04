import { utils } from '@acaldas/document-model-libs/browser/scope-framework';
import { useScopeFrameworkReducer } from '../documents/scope-framework';
import Editor from '../documents/scope-framework/editor';
import { createDocumentStory } from './utils';

const { meta, CreateDocumentStory } = createDocumentStory(
    Editor,
    useScopeFrameworkReducer,
    utils.createExtendedState()
);

export default { ...meta, title: 'Scope Framework' };

export { CreateDocumentStory };
