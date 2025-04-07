MCP Servers
MCP.so
Explore
Playground
Feed
User Cases
Server Hosting

English


Submit
Sign In
Home
Servers
MCP MongoDB Server
MCP MongoDB Server
MCP MongoDB Server
Created By
MCP MongoDB Server
kiliczsh
4 months ago
A Model Context Protocol Server for MongoDB
# mongo
# mongodb
twitter-white sharing buttonreddit-white sharing buttonfacebook-white sharing buttonthreads-white sharing buttonbluesky-white sharing buttonemail-white sharing button
MCP MongoDB Server
Overview
Content
Content
MCP MongoDB Server
NPM Version NPM Downloads NPM License smithery badge

A Model Context Protocol server that provides access to MongoDB databases. This server enables LLMs to inspect collection schemas and execute MongoDB operations.

Demo
MCP MongoDB Server Demo | Claude Desktop

Features
Read-Only Mode
Connect to MongoDB in read-only mode with --read-only or -r flag
Prevents write operations (update, insert, createIndex)
Uses MongoDB's secondary read preference for optimal read performance
Provides additional safety for production database connections
Resources
List and access collections via mongodb:// URIs
Each collection has a name, description and schema
JSON mime type for schema access
Tools
query

Execute MongoDB queries with optional execution plan analysis
Input: Collection name, filter, projection, limit, explain options
Returns query results or execution plan
aggregate

Execute MongoDB aggregation pipelines with optional execution plan analysis
Input: Collection name, pipeline stages, explain options
Returns aggregation results or execution plan
update

Update documents in a collection
Input: Collection name, filter, update operations, upsert/multi options
Returns update operation results
serverInfo

Get MongoDB server information and status
Input: Optional debug info flag
Returns version, storage engine, and server details
insert

Insert documents into a collection
Input: Collection name, documents array, write options
Returns insert operation results
createIndex

Create indexes on a collection
Input: Collection name, index specifications, write options
Returns index creation results
count

Count documents matching a query
Input: Collection name, query filter, count options
Returns document count
Prompts
analyze_collection - Analyze collection structure and contents
Input: Collection name
Output: Insights about schema, data types, and statistics
Development
Install dependencies:

npm install
Build the server:

npm run build
For development with auto-rebuild:

npm run watch
Installation for Development
Using Claude Desktop
To use with Claude Desktop, add the server config:

On MacOS: ~/Library/Application Support/Claude/claude_desktop_config.json

On Windows: %APPDATA%/Claude/claude_desktop_config.json

{
  "mcpServers": {
    "mongodb": {
      "command": "node",
      "args": [
        "~/mcp-mongo-server/build/index.js",
        "mongodb://muhammed:kilic@mongodb.localhost/namespace"
      ]
    },
    "mongodb-readonly": {
      "command": "node",
      "args": [
        "~/mcp-mongo-server/build/index.js",
        "mongodb://muhammed:kilic@mongodb.localhost/namespace",
        "--read-only"
      ]
    }
  }
}
Debugging
Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the MCP Inspector, which is available as a package script:

npm run inspector
The Inspector will provide a URL to access debugging tools in your browser.

Components
Resources
The server provides schema information for each collection in the database:

Collection Schemas (mongodb://<host>/<collection>/schema)
JSON schema information for each collection
Includes field names and data types
Automatically inferred from collection documents
Usage with Claude Desktop
To use this server with the Claude Desktop app, add the following configuration to the "mcpServers" section of your claude_desktop_config.json:

{
  "mcpServers": {
    "mongodb": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-mongo-server",
        "mongodb://muhammed:kilic@mongodb.localhost/sample_namespace"
      ]
    },
    "mongodb-readonly": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-mongo-server",
        "mongodb://muhammed:kilic@mongodb.localhost/sample_namespace",
        "--read-only"
      ]
    },
    "mongodb-github": {
      "command": "npx",
      "args": [
        "-y",
        "github:kiliczsh/mcp-mongo-server",
        "mongodb://muhammed:kilic@mongodb.localhost/sample_namespace",
        "--read-only"
      ]
    }
  }
}
Installing via Smithery
To install MCP MongoDB Server for Claude Desktop automatically via Smithery:

npx -y @smithery/cli install mcp-mongo-server --client claude
Installing via mcp-get
You can install this package using mcp-get:

npx @michaellatman/mcp-get@latest install mcp-mongo-server
Replace /sample_namespace with your database name.

Using Read-Only Mode
You can connect to MongoDB in read-only mode by adding the --read-only or -r flag when starting the server. This is recommended when you need to protect your data from accidental writes or when connecting to production databases.

# Connect in read-only mode using the command line
npx mcp-mongo-server mongodb://user:password@mongodb.example.com/database --read-only
When in read-only mode:

All write operations (update, insert, createIndex) will be blocked
The server connects using MongoDB's secondary read preference
The connection status indicates read-only mode is active
The ping and serverInfo responses include read-only status information
License
This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.


Recommend Servers
HyperChat
HyperChat
HyperChat is a Chat client that strives for openness, utilizing APIs from various LLMs to achieve the best Chat experience, as well as implementing productivity tools through the MCP protocol.
Redis
Redis
A Model Context Protocol server that provides access to Redis databases. This server enables LLMs to interact with Redis key-value stores through a set of standardized tools.
Amap Maps
Amap Maps
高德地图官方 MCP Server
y-cli 🚀
y-cli 🚀
A Tiny Terminal Chat App for AI Models with MCP Client Support
Firecrawl MCP Server
Firecrawl MCP Server
Official Firecrawl MCP Server - Adds powerful web scraping to Cursor, Claude and any other LLM clients.
Fetch
Fetch
Web content fetching and conversion for efficient LLM usage
Roo Code (prev. Roo Cline)
Roo Code (prev. Roo Cline)
Roo Code (prev. Roo Cline) gives you a whole dev team of AI agents in your code editor.
Blender
Blender
BlenderMCP connects Blender to Claude AI through the Model Context Protocol (MCP), allowing Claude to directly interact with and control Blender. This integration enables prompt assisted 3D modeling, scene creation, and manipulation.
Aws Kb Retrieval Server
Aws Kb Retrieval Server
An MCP server implementation for retrieving information from the AWS Knowledge Base using the Bedrock Agent Runtime.
Perplexity Ask MCP Server
Perplexity Ask MCP Server
A Model Context Protocol Server connector for Perplexity API, to enable web search without leaving the MCP ecosystem.
AgentQL MCP Server
AgentQL MCP Server
Model Context Protocol server that integrates AgentQL's data extraction capabilities.
Baidu Map
Baidu Map
百度地图核心API现已全面兼容MCP协议，是国内首家兼容MCP协议的地图服务商。
Sequential Thinking
Sequential Thinking
An MCP server implementation that provides a tool for dynamic and reflective problem-solving through a structured thinking process.
Tavily MCP Server 🚀
Tavily MCP Server 🚀
Time MCP Server
Time MCP Server
A Model Context Protocol server that provides time and timezone conversion capabilities. This server enables LLMs to get current time information and perform timezone conversions using IANA timezone names, with automatic system timezone detection.
Playwright Mcp
Playwright Mcp
Playwright MCP server
Framelink Figma MCP Server
Framelink Figma MCP Server
MCP server to provide Figma layout information to AI coding agents like Cursor
Continue
Continue
⏩ Create, share, and use custom AI code assistants with our open-source IDE extensions and hub of models, rules, prompts, docs, and other building blocks
Y Gui
Y Gui
A web-based graphical interface for AI chat interactions with support for multiple AI models and MCP (Model Context Protocol) servers.
Cherry Studio
Cherry Studio
New version of cherry studio is supporting MCP https://github.com/CherryHQ/cherry-studio/releases/tag/v1.1.1
MCP Servers
MCP Servers

The largest collection of MCP Servers, featuring Awesome MCP Servers and Claude MCP integration.

Explore

MCP Servers
MCP Clients
MCP Categories
MCP Tags
MCP Posts
Community

Telegram
Discord
Twitter
GitHub
Friends

ThinkAny
HeyBeauty
CopyWeb
Raphael AI
© 2025 • mcp.so All rights reserved.build with ShipAny

Privacy Policy
Terms of Service
facebook-white sharing buttontwitter-white sharing buttonprint-white sharing buttonwhatsapp-white sharing buttonpinterest-white sharing buttonemail-white sharing buttonreddit-white sharing buttonrenren-white sharing buttonarrow_right sharing button