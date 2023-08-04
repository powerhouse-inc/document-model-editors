import { utils } from '@acaldas/document-model-libs/browser/document-model';
import Editor from '../documents/document-model/editor';
import useDocumentModelReducer from '../documents/document-model/reducer';
import { createDocumentStory } from './utils';

const { meta, CreateDocumentStory } = createDocumentStory(
    Editor,
    useDocumentModelReducer,
    utils.createExtendedState()
);

export default { ...meta, title: 'Document Model' };

export { CreateDocumentStory };
