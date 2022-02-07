
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




# Final Plans (for blog post)

1. Create tool to generate and update schema's from a particular tag/sha of our CRDs
   1. schema's should be posted with in the site next to the blog post 
   2. Also support using current, unpublished schemas for local testing
