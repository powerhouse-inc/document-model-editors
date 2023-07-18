import {
    Action,
    BaseAction,
    Document,
    Reducer,
} from '@acaldas/document-model-libs/document';
import { useReducer } from 'react';

type ResetAction<T> = {
    type: '_REACT_RESET';
    input: T;
};

const wrapReducer = <State, A extends Action>(
    reducer: Reducer<State, A>,
    onError?: (error: unknown) => void
) => {
    return (
        state: Document<State, A>,
        action: A | ResetAction<Document<State, A>>
    ) => {
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

export function useDocumentReducer<State, A extends Action>(
    reducer: Reducer<State, A | BaseAction>,
    initialState: Document<State, A | BaseAction>,
    onError?: (error: unknown) => void
) {
    const [state, dispatch] = useReducer(
        wrapReducer(reducer, onError),
        initialState
    );

    return [
        state,
        (action: A | BaseAction | ResetAction<Document<State, A>>) =>
            dispatch(action),
        (state: Document<State, A | BaseAction>) =>
            dispatch({ type: '_REACT_RESET', input: state }),
    ] as const;
}
