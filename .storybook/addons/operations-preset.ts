function managerEntries(entry = []) {
    return [...entry, require.resolve("./operations.tsx")]; //👈 Addon implementation
}

export default { managerEntries };
