import type {
    Action,
    BaseAction,
    Document,
    ExtendedState,
    Reducer,
} from '@acaldas/document-model-libs/browser/document';
import { useReducer } from 'react';

type ResetAction = {
    type: '_REACT_RESET';
    input: unknown;
};

const wrapReducer = <State, A extends Action>(
    reducer: Reducer<State, A>,
    onError?: (error: unknown) => void
): Reducer<State, A | ResetAction> => {
    return (state, action) => {
        if (action.type === '_REACT_RESET') {
            return action.input as Document<State, A>;
        }
        try {
            return reducer(state, action as A);
        } catch (error) {
            onError?.(error);
            return state;
        }
    };
};

export function createUseDocumentReducer<State, A extends Action>(
    reducer: Reducer<State, A>,
    createDocument: (
        document?: Partial<ExtendedState<Partial<State>>>
    ) => Document<State, A>
) {
    return (
        document?: Partial<ExtendedState<Partial<State>>>,
        onError?: (error: unknown) => void
    ) => useDocumentReducer(reducer, createDocument(document), onError);
}

export function useDocumentReducer<State, A extends Action>(
    reducer: Reducer<State, A>,
    initialState: Document<State, A>,
    onError?: (error: unknown) => void
): readonly [
    Document<State, A>,
    (action: A | BaseAction) => void,
    (state: Document<State, A>) => void
] {
    const [state, dispatch] = useReducer(
        wrapReducer(reducer, onError),
        initialState
    );

    return [
        state as Document<State, A>,
        action => dispatch(action),
        state => dispatch({ type: '_REACT_RESET', input: state }),
    ] as const;
}
