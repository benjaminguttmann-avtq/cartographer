<script type="module">

    import {onMount} from "svelte";
    import {setDiagnosticsOptions} from '../monaco-yaml';
    import {editor, Uri} from 'monaco-editor'
    import YamlWorker from '../monaco-yaml/yaml.worker?worker';
    import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
    import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

    let inst
    let editorContainer

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

    // The uri is used for the schema file match.
    const modelUri = Uri.parse('a://b/foo.yaml');

    setDiagnosticsOptions({
        enableSchemaRequest: true,
        hover: true,
        completion: true,
        validate: true,
        format: true,
        schemas: [
            {
                // Id of the first schema
                uri: 'http://myserver/foo-schema.json',
                // Associate with our model
                fileMatch: [String(modelUri)],
                schema: {
                    type: 'object',
                    properties: {
                        p1: {
                            enum: ['v1', 'v2'],
                        },
                        p2: {
                            // Reference the second schema
                            $ref: 'http://myserver/bar-schema.json',
                        },
                    },
                },
            },
            {
                // Id of the first schema
                uri: 'http://myserver/bar-schema.json',
                schema: {
                    type: 'object',
                    properties: {
                        q1: {
                            enum: ['x1', 'x2'],
                        },
                    },
                },
            },
        ],
    });

    const defaultText = ["---",
        "hi: there",
        "test: syntax",
        "  - this: should",
        "    be: an",
        "    be: error",
    ]

    onMount(() => {
        inst = editor.create(editorContainer,
            {
                automaticLayout: true,
                // value: defaultText.join("\n"),
                // language: "yaml",
                model: editor.createModel(defaultText.join("\n"), 'yaml', modelUri),
            },
        )

        // todo: destructor
    })


</script>

<div class="monaco-editor-container" bind:this={editorContainer} style="height: 400px"></div>

<style>
    .monaco-editor-container {
        outline: lightgray solid 1px;
    }
</style>