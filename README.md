
# Notes

Grab the schema with: 
```
cat config/crd/bases/carto.run_clustersupplychains.yaml | yq '.spec.versions[] | select(.name="v1alpha1") | .schema.openAPIV3Schema'
```