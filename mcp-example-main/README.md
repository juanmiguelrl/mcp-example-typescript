# MCP Example

Este proyecto es un ejemplo de servidor MCP que expone una herramienta para consultar el tiempo en una ciudad.  

Y otro servidor MCP que expone una herramienta "dummy" para mostrar imágenes de cámaras de seguridad de un parking.  

## Configuración en VS Code

Para ejecutar el servidor MCP desde VS Code, añade lo siguiente en tu archivo de configuración `settings.json`:

```json
{
    "mcp": {
        "inputs": [],
        "servers": {
            "fetch-weather": {
                "command": "npx",
                "args": [
                    "-y",
                    "tsx",
                    "G:\\mcp-example\\mcp-example\\mcp.ts"
                ]
            },
            "fetch-camera-garage-images": {
                "command": "npx",
                "args": [
                    "-y",
                    "tsx",
                    "G:\\mcp-example\\mcp-example\\mcp-parking.ts"
                ]
            }
        }
    }
}
```

Esto permitirá lanzar el servidor MCP directamente desde VS Code.

## Requisitos previos de instalación  

Para poder ejecutar este ejemplo es necesario tener instalado node:  
https://nodejs.org/es/download  

E instalar los módulos de node para ejecutar el mcp y para el inspector con el que probar nuestros servidores MCP:  

```sh
npm install @modelcontextprotocol/sdk
npm install @modelcontextprotocol/inspector
npx -y @modelcontextprotocol/inspector npx -y tsx mcp.ts
```

## Inspeccionar el servidor MCP

Puedes inspeccionar el servidor MCP desde la línea de comandos ejecutando:

```sh
npx -y @modelcontextprotocol/inspector npx -y tsx mcp.ts
```

Esto abrirá el inspector para depurar y probar el servidor MCP.
