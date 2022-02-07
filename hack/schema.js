#! /usr/bin/env node

import toJsonSchema from "@openapi-contrib/openapi-schema-to-json-schema";

let schema = {
    type: 'string',
    format: 'date-time',
    nullable: true
};

let convertedSchema = toJsonSchema(schema);

console.log(convertedSchema);