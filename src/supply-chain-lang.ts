import {editor, IPosition, languages, Range} from "monaco-editor";
import {CompletionItemKind, integer} from "vscode-languageserver-types";
import ITextModel = editor.ITextModel;

import {parse, stringify} from 'yaml'

const isInResource = (model: ITextModel, lineNumber: integer) => {
    let line = model.getLineContent(lineNumber)
    return line.search(/\s+resource:/) >= 0
}


const getSuggestions = (model: ITextModel, type: string) => {
    let doc = model.getValue()

    try {
        let obj = parse(doc)

        let typedResources = obj.spec.resources.filter(resource => resource.templateRef.kind === type)
        let mappedResources = typedResources.map(resource => ({
            insertText: resource.name,
            kind: CompletionItemKind.Reference,
            range: undefined,
            label: resource.name
        }))
        return mappedResources

    } catch (e) {
        // no-op, don't care
    }
    return []
};

export const AddSupplyChainLang = () => {

    languages.registerCompletionItemProvider(
        'yaml',
        {
            // triggerCharacters: [' ', ':'],
            triggerCharacters: [' '],
            provideCompletionItems(model, position) {
                let inResource = isInResource(model, position.lineNumber)
                if (inResource) {
                    return {
                        incomplete: false,
                        suggestions: getSuggestions(model, "ClusterConfigTemplate"),
                    };
                } else {
                    return null
                }
            },
        }
    )
}

export default AddSupplyChainLang