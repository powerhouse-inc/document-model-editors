import type { StorybookConfig } from '@storybook/react-vite';
const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        './addons/operations-preset.ts',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    core: {
        builder: '@storybook/builder-vite', // 👈 The builder enabled here.
    },
    docs: {
        autodocs: 'tag',
    },
    babel: async options => ({
        ...options,
        presets: [
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic',
                },
                'preset-react-jsx-transform',
            ],
        ],
    }),
};
export default config;
