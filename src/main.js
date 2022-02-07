import App from './App.svelte'
import {setDiagnosticsOptions} from "./monaco-yaml/index.js";
import YamlWorker from './monaco-yaml/yaml.worker?worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

window.MonacoEnvironment = {
    getWorker(moduleId, label) {
        switch (label) {
            case 'yaml':
                return new YamlWorker();
            case 'javascript':
                return new TsWorker();
            default:
                return new EditorWorker();
        }
    },
};

// https://github.com/remcohaszing/monaco-yaml/blob/f42c5e97e02e3355a5002bb54a6efbf29174a855/index.d.ts#L29
setDiagnosticsOptions({
    enableSchemaRequest: true,
    hover: true,
    completion: true,
    validate: true,
    format: true,
    schemas: [
        {
            uri: 'http://cartographer.sh/foo-schema.json',
            // Associate with our model
            fileMatch: ["*.yaml"],
            schema: {
                properties: {
                    apiVersion: {
                        description: 'APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources',
                        type: 'string'
                    },
                    kind: {
                        description: 'Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds',
                        type: 'string'
                    },
                    metadata: {type: 'object'},
                    spec: {
                        description: 'Spec describes the suppply chain. More info: https://cartographer.sh/docs/latest/reference/workload/#clustersupplychain',
                        type: 'object'
                    }
                },
                required: ['metadata', 'spec'],
                type: 'object',
            },
        },
    ],
});


const app = new App({
    target: document.getElementById('app')
})

export default app
