#! /usr/bin/env node

import toJsonSchema from "@openapi-contrib/openapi-schema-to-json-schema";

let schema = {
    "properties": {
        "apiVersion": {
            "description": "APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources",
            "type": "string"
        },
        "kind": {
            "description": "Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
            "type": "string"
        },
        "metadata": {
            "type": "object"
        },
        "spec": {
            "description": "Spec describes the suppply chain. More info: https://cartographer.sh/docs/latest/reference/workload/#clustersupplychain",
            "properties": {
                "params": {
                    "description": "Additional parameters. See: https://cartographer.sh/docs/latest/architecture/#parameter-hierarchy",
                    "items": {
                        "properties": {
                            "default": {
                                "description": "DefaultValue of the parameter. Causes the parameter to be optional; If the Owner does not specify this parameter, this value is used.",
                                "x-kubernetes-preserve-unknown-fields": true
                            },
                            "name": {
                                "description": "Name of the parameter. Should match a template parameter name.",
                                "type": "string"
                            },
                            "value": {
                                "description": "Value of the parameter. If specified, owner properties are ignored.",
                                "x-kubernetes-preserve-unknown-fields": true
                            }
                        },
                        "required": [
                            "name"
                        ],
                        "type": "object"
                    },
                    "type": "array"
                },
                "resources": {
                    "description": "Resources that are responsible for bringing the application to a deliverable state.",
                    "items": {
                        "properties": {
                            "configs": {
                                "description": "Configs is a list of references to other 'config' resources in this list. A config resource has the kind ClusterConfigTemplate \n In a template, configs can be consumed as: $(configs.<name>.config)$ \n If there is only one image, it can be consumed as: $(config)$",
                                "items": {
                                    "properties": {
                                        "name": {
                                            "type": "string"
                                        },
                                        "resource": {
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "name",
                                        "resource"
                                    ],
                                    "type": "object"
                                },
                                "type": "array"
                            },
                            "images": {
                                "description": "Images is a list of references to other 'image' resources in this list. An image resource has the kind ClusterImageTemplate \n In a template, images can be consumed as: $(images.<name>.image)$ \n If there is only one image, it can be consumed as: $(image)$",
                                "items": {
                                    "properties": {
                                        "name": {
                                            "type": "string"
                                        },
                                        "resource": {
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "name",
                                        "resource"
                                    ],
                                    "type": "object"
                                },
                                "type": "array"
                            },
                            "name": {
                                "description": "Name of the resource. Used as a reference for inputs, as well as being the name presented in workload statuses to identify this resource.",
                                "type": "string"
                            },
                            "params": {
                                "description": "Params are a list of parameters to provide to the template in TemplateRef Template params do not have to be specified here, unless you want to force a particular value, or add a default value. \n Parameters are consumed in a template with the syntax: $(params.<name>)$",
                                "items": {
                                    "properties": {
                                        "default": {
                                            "description": "DefaultValue of the parameter. Causes the parameter to be optional; If the Owner does not specify this parameter, this value is used.",
                                            "x-kubernetes-preserve-unknown-fields": true
                                        },
                                        "name": {
                                            "description": "Name of the parameter. Should match a template parameter name.",
                                            "type": "string"
                                        },
                                        "value": {
                                            "description": "Value of the parameter. If specified, owner properties are ignored.",
                                            "x-kubernetes-preserve-unknown-fields": true
                                        }
                                    },
                                    "required": [
                                        "name"
                                    ],
                                    "type": "object"
                                },
                                "type": "array"
                            },
                            "sources": {
                                "description": "Sources is a list of references to other 'source' resources in this list. A source resource has the kind ClusterSourceTemplate \n In a template, sources can be consumed as: $(sources.<name>.url)$ and $(sources.<name>.revision)$ \n If there is only one source, it can be consumed as: $(source.url)$ and $(source.revision)$",
                                "items": {
                                    "properties": {
                                        "name": {
                                            "type": "string"
                                        },
                                        "resource": {
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "name",
                                        "resource"
                                    ],
                                    "type": "object"
                                },
                                "type": "array"
                            },
                            "templateRef": {
                                "description": "TemplateRef identifies the template used to produce this resource",
                                "properties": {
                                    "kind": {
                                        "description": "Kind of the template to apply",
                                        "enum": [
                                            "ClusterSourceTemplate",
                                            "ClusterImageTemplate",
                                            "ClusterTemplate",
                                            "ClusterConfigTemplate"
                                        ],
                                        "type": "string"
                                    },
                                    "name": {
                                        "description": "Name of the template to apply",
                                        "minLength": 1,
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "kind",
                                    "name"
                                ],
                                "type": "object"
                            }
                        },
                        "required": [
                            "name",
                            "templateRef"
                        ],
                        "type": "object"
                    },
                    "type": "array"
                },
                "selector": {
                    "additionalProperties": {
                        "type": "string"
                    },
                    "description": "Specifies the label key-value pairs used to select workloads See: https://cartographer.sh/docs/v0.1.0/architecture/#selectors",
                    "type": "object"
                },
                "serviceAccountRef": {
                    "description": "ServiceAccountName refers to the Service account with permissions to create resources submitted by the supply chain. \n If not set, Cartographer will use serviceAccountName from supply chain. \n If that is also not set, Cartographer will use the default service account in the workload's namespace.",
                    "properties": {
                        "name": {
                            "description": "Name of the service account being referred to",
                            "type": "string"
                        },
                        "namespace": {
                            "description": "Namespace of the service account being referred to if omitted, the Owner's namespace is used.",
                            "type": "string"
                        }
                    },
                    "required": [
                        "name"
                    ],
                    "type": "object"
                }
            },
            "required": [
                "resources",
                "selector"
            ],
            "type": "object"
        },
    },
    "required": [
        "metadata",
        "spec"
    ],
    "type": "object"
};

let convertedSchema = toJsonSchema(schema);

console.log(convertedSchema);