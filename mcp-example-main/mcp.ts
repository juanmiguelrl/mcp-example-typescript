import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// Add an addition tool
server.tool(
    "fetch-weather",
    "Tool to fetch weather information of a given place",
  {
    place: z.string().describe("The place to fetch weather for")
  },

  
  async ({ place }) => {

    const placeCode = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=10&language=en&format=json`)

    const placeData = await placeCode.json();

    if (placeData.results.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No se encuentra información para ${place}`
          }
        ]
      }
    }

    const {latitude, longitude} = placeData.results[0];

    const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,weather_code,wind_speed_10m,rain,snowfall,apparent_temperature,showers,surface_pressure,pressure_msl,cloud_cover,wind_direction_10m,wind_gusts_10m&forecast_days=1`
        );

    const weatherData = await weatherResponse.json();

    return {
    content: [
                {
                    type: "text",
                    text: JSON.stringify(weatherData, null, 2) 
                }
            ]
    }},
);

/*
// Add a dynamic greeting resource
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
);
*/
// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);