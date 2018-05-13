export interface World {
  type: 'object',
    _id: {
      type: "number"
    },
    name: {
      type: 'string',
      required: true,
      maxLength: 50,
    },
    WorkInProgress: {
      type: [
        'boolean',
        null
      ],
    },
    history: {
      type: "array",
      items: {
        type: "object",
        properties: {
          timeStamp: {
            type: [
              'string',
              null
            ],
          },
          name: {
            type: "string",
            required: true,
          },
          description: {
            type: [
              'string',
              null
            ],
          },
        },
      },
    },
};

export interface Character {
  type: 'object',
    worldID: {
      type: 'number',
      required: true
    },
    _id: {
      type: 'number'
    },
    firstName: {
      type: 'string',
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: [
        'string',
        null
      ],
      maxLength: 50,
    },
    age: {
      type: 'number',
      maxLength: 3,
    },
    culture: {
      type: "number",
    },
    country: {
      type: "number",
    },
    status: {
      type: 'string',
      required: true,
      enum: [
        'Alive',
        'Dead'
      ],
    },
};

export interface Culture {
  type: 'object',
    worldID: {
      type: 'number',
      required: true
    },
    _id: {
      type: 'number',
      required: true
    }
  name: {
      type: 'string',
      required: true,
      maxLength: 50,
    },
    believes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            required: true,
          },
          descript: {
            type: [
              'string',
              null
            ],
          },
        },
      },
    },
    holiday: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            required: true,
          },
          descript: {
            type: [
              'string',
              null
            ],
          },
        },
      },
    },
    value: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            required: true,
          },
          descript: {
            type: [
              'string',
              null
            ],
          },
        },
      },
    },
};

export interface Country {
  type: 'object',
    worldID: {
      type: 'number',
      required: true
    },
    _id: {
      type: 'number',
      required: true
    }
  name: {
      type: 'string',
      required: true,
      maxLength: 50,
    },
    system: {
      type: 'string',
    },
    neighbours: {
      type: "array",
      items: {
        type: "number",
      },
    },
    value: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            required: true,
          },
          descript: {
            type: [
              'string',
              null
            ],
          },
        },
      },
    },
};
