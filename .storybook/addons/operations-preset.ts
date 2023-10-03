function managerEntries(entry = []) {
    return [...entry, require.resolve('../../src/storybook/operations.tsx')]; //👈 Addon implementation
}

export default { managerEntries };
