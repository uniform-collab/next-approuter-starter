import { uniformConfig } from '@uniformdev/cli/config';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.local` });

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