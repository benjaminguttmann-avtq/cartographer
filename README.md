
# Notes

Grab the schema with: 
```
cat config/crd/bases/carto.run_clustersupplychains.yaml | yq '.spec.versions[] | select(.name="v1alpha1") | .schema.openAPIV3Schema'
```

paste into [`./hack/schema.js`](./hack/schema.js)

then run 
```
./hack/schema.js  | pbcopy
```

and paste final schema into [`./src/main.js`](./src/main.js)