import { uniformConfig } from '@uniformdev/cli/config';

module.exports = uniformConfig({
    preset: 'none',
    config: {
        serialization: {
            entitiesConfig: {
                component: {},
                composition: { publish: true },
                componentPattern: {},
                projectMapNode: {},
                projectMapDefinition: {},
            },
        },
    },
});