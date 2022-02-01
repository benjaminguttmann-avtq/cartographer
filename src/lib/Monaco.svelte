<script>

    import {onMount} from "svelte";
    import * as monaco from 'monaco-editor'

    const defaultText = ["---",
        "hi: there",
        "test: syntax",
        "  - this: should",
        "    be: an",
        "    be: error",
    ]

    let inst
    let editor
    onMount(() => {
        inst = monaco.editor.create(
            editor,
            {value: defaultText.join("\n"), language: "yaml"}
        )

        // todo: destructor
    })

</script>

<div class="monaco-editor-container" bind:this={editor} style="height: 400px"></div>

<style>
    .monaco-editor-container {
        outline: lightgray solid 1px;
    }
</style>