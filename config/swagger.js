import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TS Academy Library API",
      version: "1.0.0",
      description: "API documentation for TS Academy Library System"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: ["./routes/*.js"] // where annotations live
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;