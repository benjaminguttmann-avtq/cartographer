<script>
    import Mermaid from "./Mermaid.svelte";
    import * as YAML from "yaml";

    export let document

    const process = doc => {
        // fixme  we need to memoize the graph for when the doc is invalid.
        let obj = YAML.parse(doc)
        let lines = [
            "flowchart RL"
        ]
        if (obj.spec.resources) {
            obj.spec.resources.forEach(resource => {
                lines.push(`res-${resource.name}["${resource.name}"]`)
            })
        }
        return lines.join("\n")
    }

    $: processedDocument = process(document)

</script>
<pre>
    {processedDocument}
</pre>
<Mermaid>
    {processedDocument}

<!--    flowchart RL-->
<!--    classDef sourceNode stroke:#66f,stroke-width:2px;-->
<!--    subgraph res_source-provider[source-provider]-->
<!--    direction RL-->
<!--    opt_0_source-from-git-repo["source-from-git-repo\n#8226; source-kind=source-repository"]-->
<!--    class opt_0_source-from-git-repo sourceNode;-->
<!--    opt_1_source-from-image-registry["source-from-image-registry\n#8226; source-kind=source-registry"]-->
<!--    class opt_1_source-from-image-registry sourceNode;-->
<!--    end-->
<!--    subgraph res_source-tester[source-tester]-->
<!--    direction RL-->
<!--    opt_0_test-source-with-tekton["test-source-with-tekton\n#8226; has-tests=true"]-->
<!--    end-->
<!--    subgraph res_image-provider[image-provider]-->
<!--    direction RL-->
<!--    opt_0_image-from-image-registry["image-from-image-registry\n#8226; source-kind=image-registry"]-->
<!--    class opt_0_image-from-image-registry sourceNode;-->
<!--    end-->
<!--    subgraph res_image-tester[image-tester]-->
<!--    direction RL-->
<!--    opt_0_test-image-with-tekton["test-image-with-tekton\n#8226; has-tests=true"]-->
<!--    end-->
<!--    subgraph res_image-builder[image-builder]-->
<!--    direction RL-->
<!--    opt_0_build-image["build-image\n"]-->
<!--    opt_1_build-image["build-image\n"]-->
<!--    end-->
<!--    subgraph res_configure[configure]-->
<!--    direction RL-->
<!--    opt_0_configure["configure\n"]-->
<!--    opt_1_configure["configure\n"]-->
<!--    opt_2_configure["configure\n"]-->
<!--    end-->
<!--    subgraph res_gitops[gitops]-->
<!--    direction RL-->
<!--    opt_0_git-pusher["git-pusher\n#8226; target=gitops\n#8226; language In java,ruby,go"]-->
<!--    opt_1_registry-pusher["registry-pusher\n#8226; target=repostiory"]-->
<!--    end-->
<!--    opt_0_test-source-with-tekton &ndash;&gt; res_source-provider-->
<!--    opt_0_test-image-with-tekton &ndash;&gt; res_image-provider-->
<!--    opt_0_build-image &ndash;&gt; res_source-tester-->
<!--    opt_1_build-image &ndash;&gt; res_source-provider-->
<!--    opt_0_configure &ndash;&gt; res_image-builder-->
<!--    opt_1_configure &ndash;&gt; res_image-tester-->
<!--    opt_2_configure &ndash;&gt; res_image-provider-->
<!--    opt_0_git-pusher &ndash;&gt; res_configure-->
<!--    opt_1_registry-pusher &ndash;&gt; res_configure-->
</Mermaid>
