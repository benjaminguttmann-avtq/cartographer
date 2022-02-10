import {languages, Range} from "monaco-editor";

export const AddSupplyChainLang = () => {

    languages.registerHoverProvider(
        'yaml',
        {
            provideHover: (model, position, token) => {
                return {
                    range: new Range(1, 1, 2, 1),
                    contents: [{value: "foo"}],
                }
            }
        },
    )

}

export default AddSupplyChainLang