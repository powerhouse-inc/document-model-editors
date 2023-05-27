import {
    Action,
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
    reducer: Reducer<State, A>,
    initialState: Partial<
        Omit<Document<State, A>, 'data'> & {
            data: Partial<State>;
        }
    >,
    initializer: (
        initialState?:
            | Partial<
                  Omit<Document<State, A>, 'data'> & {
                      data: Partial<State>;
                  }
              >
            | undefined
    ) => Document<State, A>
) {
    const [state, dispatch] = useReducer(
        wrapReducer(reducer),
        initialState,
        initializer
    );

    return [
        state,
        (action: A | ResetAction<Document<State, A>>) => dispatch(action),
        (state: Document<State, A>) =>
            dispatch({ type: '_REACT_RESET', input: state }),
    ] as const;
}
