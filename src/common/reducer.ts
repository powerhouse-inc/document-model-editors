import {
    Action,
    Document,
    Reducer,
} from '@acaldas/document-model-libs/document';
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

export function useDocumentReducer<State, A extends Action>(
    reducer: Reducer<State, A>,
    initialState: Document<State, A>,
    onError?: (error: unknown) => void
) {
    const [state, dispatch] = useReducer(
        wrapReducer(reducer, onError),
        initialState
    );

    return [
        state as Document<State, A>,
        (action: A) => dispatch(action),
        (state: Document<State, A>) =>
            dispatch({ type: '_REACT_RESET', input: state }),
    ] as const;
}
