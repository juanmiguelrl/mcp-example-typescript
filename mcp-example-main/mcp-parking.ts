import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFile } from "fs/promises";
import { resolve } from "path";

// Create an MCP server
const server = new McpServer({
  name: "Parking Camera Server",
  version: "1.0.0"
});


server.tool(
"get-parking-camera-image",
"Devuelve una foto de la cámara de seguridad de una planta del parking (dummy, imágenes locales)",
{
    floor: z.enum(["1", "2", "3"]).describe("Planta del parking: 1, 2 o 3")
},
async ({ floor }) => {
    try {
    // Hardcode the path to the parking images directory
    const imagePath = resolve("G:\\mcp-example\\mcp-example\\parking images", `planta${floor}.jpeg`);
    const imageBuffer = await readFile(imagePath);
    const base64 = imageBuffer.toString("base64");
    return {
        content: [
        {
            type: "image",
            mimeType: "image/jpeg",
            data: base64
        }
        ]
    };
    } catch (e) {
    return {
        content: [
        {
            type: "text",
            text: `No se pudo encontrar la imagen para la planta ${floor} error: ${e.message}`
        }
        ]
    };
    }
}
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
