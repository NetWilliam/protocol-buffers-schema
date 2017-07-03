# protocol-buffers-schema

No nonsense [protocol buffers](https://developers.google.com/protocol-buffers) schema parser written in Javascript

``` js
npm install protocol-buffers-schema
```

[![build status](http://img.shields.io/travis/mafintosh/protocol-buffers-schema.svg?style=flat)](http://travis-ci.org/mafintosh/protocol-buffers-schema)

## Usage

First save the following file as `example.proto`

```proto
// example file

//- this is test input
message Test
{
  //- this is map extended data
  map<string, string> data = 1;
  required string hello = 2;
  oneof test {
    uint32 age = 3;
    uint32 year = 4;
  }
  message Nested {
    optional bytes thing = 1;
  }
}
```

The run the following example

``` js
Parsed schema:
{
  "syntax": 3,
  "package": null,
  "imports": [],
  "enums": [],
  "messages": [
    {
      "name": "Test",
      "description": " this is test input",
      "enums": [],
      "extends": [],
      "messages": [
        {
          "name": "Nested",
          "description": "",
          "enums": [],
          "extends": [],
          "messages": [],
          "fields": [
            {
              "name": "thing",
              "description": "",
              "type": "bytes",
              "tag": 1,
          "oneof": null,
          "required": false,
          "repeated": false,
          "options": {}
        },
        {
          "name": "hello",
          "description": "",
          "type": "string",
          "tag": 2,
          "map": null,
          "oneof": null,
          "required": true,
          "repeated": false,
          "options": {}
        },
        {
          "name": "age",
          "type": "uint32",
          "tag": 3,
          "map": null,
          "oneof": "test",
          "required": false,
          "repeated": false,
          "options": {}
        },
        {
          "name": "year",
          "type": "uint32",
          "tag": 4,
          "map": null,
          "oneof": "test",
          "required": false,
          "repeated": false,
          "options": {}
        }
      ],
      "extensions": null
    }
  ],
  "options": {},
  "description": "",
  "extends": []
}

Stringified schema:
syntax = "proto3";

message Test {
  message Nested {
    optional bytes thing = 1;
  }

  map<string,string> map data = 1;
  required string hello = 2;
  oneof test {
    uint32 age = 3;
    uint32 year = 4;
  }
}
```

## API

#### `schema.parse(protobufSchemaBufferOrString)`

Parses a .proto schema into a javascript object

#### `schema.stringify(schema)`

Stringifies a parsed schema back into .proto format

## License

MIT
