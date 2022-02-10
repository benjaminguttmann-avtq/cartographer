<script>
    import mermaid from 'mermaid';
    import { onMount } from 'svelte';

    let graph = null;
    let gantt = null;

    mermaid.initialize({
        startOnLoad: false,

        theme: 'forest',
        gantt: { axisFormatter: [
                ['%Y-%m-%d', (d) => {
                    return d.getDay() === 1
                }]
            ] }
    });

    onMount(() => {
        mermaid.init([ graph ]);
    });
</script>

    <pre bind:this={graph}>
        <slot></slot>
    </pre>
