var schemas = exports;

schemas.World = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: true,
      maxLength: 50,
    },
    workInProgress: {
        type: [
            'boolean',
            null,
        ],
    },
    history:{
        type: "array",
        items: {
            type: "object",
            properties:{
                timeStamp: {
                    type: [
                        'string',
                        null,
                    ],
                },                    
                name:{
                    type: "string",
                    required: true,
                },   
                descript: {
                    type: [
                        'string',
                        null,
                    ],
                },                    
            },
        },
    },
  },
};

schemas.Character = {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        required: true,
        maxLength: 50,
      },
      lastName: {
        type: [
          'string',
          null,
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
      status: {
        type: 'string',
        required: true,
        enum: [
          'Alive',
          'Dead',
        ],
      },
    },
  };

schemas.Culture = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        required: true,
        maxLength: 50,
      },
      believes:{
        type: "array",
        items: {
            type: "object",
            properties:{                    
                name:{
                    type: "string",
                    required: true,
                },   
                descript: {
                    type: [
                        'string',
                        null,
                    ],
                },                
            },
        },
    },
        holiday:{
            type: "array",
            items: {
                type: "object",
                properties:{                  
                    name:{
                        type: "string",
                        required: true,
                    },   
                    descript: {
                        type: [
                            'string',
                            null,
                        ],
                    },                    
                },
            },
        },
        value:{
            type: "array",
            items: {
                type: "object",
                properties:{                
                    name:{
                        type: "string",
                        required: true,
                    },   
                    descript: {
                        type: [
                            'string',
                            null,
                        ],
                    },                    
                },
            },
        },      
    },
};

schemas.Country = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        required: true,
        maxLength: 50,
      },
      system:{
          type: 'string',
      },
      cultures:{
        type: "array",
        items: {
            type: "number",
        },     
      },
      neighbours:{
        type: "array",
        items: {
            type: "number",
        },
      },
      holiday:{
            type: "array",
            items: {
                type: "object",
                properties:{                  
                    name:{
                        type: "string",
                        required: true,
                    },   
                    descript: {
                        type: [
                            'string',
                            null,
                        ],
                    },                    
                },
            },
        },
        value:{
            type: "array",
            items: {
                type: "object",
                properties:{                
                    name:{
                        type: "string",
                        required: true,
                    },   
                    descript: {
                        type: [
                            'string',
                            null,
                        ],
                    },                   
                },
            },
        },      
    },
  };
