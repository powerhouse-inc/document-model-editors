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

const wrapReducer = <State, A extends Action>(reducer: Reducer<State, A>) => {
    return (
        state: Document<State, A>,
        action: A | ResetAction<Document<State, A>>
    ) => {
        if (action.type === '_REACT_RESET') {
            return action.input as Document<State, A>;
        }
        return reducer(state, action as A);
    };
};

export function useDocumentReducer<State, A extends Action>(
    reducer: Reducer<State, A | BaseAction>,
    initialState: Document<State, A | BaseAction>
) {
    const [state, dispatch] = useReducer(wrapReducer(reducer), initialState);

    return [
        state,
        (action: A | BaseAction | ResetAction<Document<State, A>>) =>
            dispatch(action),
        (state: Document<State, A | BaseAction>) =>
            dispatch({ type: '_REACT_RESET', input: state }),
    ] as const;
}
