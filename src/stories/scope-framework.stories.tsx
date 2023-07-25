import { createEmptyExtendedScopeFrameworkState } from '@acaldas/document-model-libs/browser/scope-framework';
import { useScopeFrameworkReducer } from '../scope-framework';
import Editor from '../scope-framework/editor';
import { createDocumentStory } from './utils';

const { meta, CreateDocumentStory } = createDocumentStory(
    Editor,
    useScopeFrameworkReducer,
    createEmptyExtendedScopeFrameworkState()
);

export default { ...meta, title: 'Scope Framework' };

export { CreateDocumentStory };
