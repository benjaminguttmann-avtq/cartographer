<script>
    import mermaid from 'mermaid';
    import { onMount } from 'svelte';

    let graph = null;

    mermaid.initialize({
        startOnLoad: false,
        theme: 'forest',
    });

    onMount(() => {
        mermaid.init([ graph ]);
    });
</script>

<pre bind:this={graph}>
        <slot></slot>
</pre>
