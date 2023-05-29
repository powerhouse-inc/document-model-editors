# Powerhouse Document Model Editors

This repository contains the React components that implement the UI to edit a [Document Model](https://github.com/acaldas/document-model-libs/).
These components are to be used inside a container app in a desktop or web environment.

Documention for the Document Model is available at: https://acaldas.github.io/document-model-libs/

## Getting started

Install the library:

-   `yarn add document-model-editors`

## Editors

A Document Model Editor is a React [controlled component](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components) that allows an user to edit a Document Model instance, respecting the predefined business logic.

## Storybook

Each Editor has a self contained story to ease development and testing.
To use the storybook run
- `yarn storybook`

The stories have a `Operations` addon that will list all the operations performed on the document model instance.
The controls also allow changing the document directly and the edictor theme from `light` to `dark`.

### Budget Statement

A dummy implementation of a Budget Statement UI can be found at [src/budget-statement/editor.tsx](src/budget-statement/editor.tsx). It makes use of the hook [useBudgetStatementReducer](src/budget-statement/reducer.ts) to dispatch actions and apply changes to the budget statement.

The available actions can be seen at https://acaldas.github.io/document-model-libs/modules/BudgetStatement.actions.html.

It has the following props:

-   `initialBudget` - The BudgetStatement instance to apply the changes to. The component should reset its state whenever this prop changes.
-   `onChange` - A callback function to call with a new version of the budget statement.
-   `editorContext` - The context from the container app. `{ theme: "light" | "dark" }`
