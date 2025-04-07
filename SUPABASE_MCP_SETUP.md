# Supabase MCP Server Setup for Diamond Bakes

This guide explains how to set up and use the Supabase Model Context Protocol (MCP) server with your Diamond Bakes project.

## What is MCP?

The Model Context Protocol (MCP) standardizes how Large Language Models (LLMs) like Claude talk to external services like Supabase. It connects AI assistants directly with your Supabase project and allows them to perform tasks like managing tables, fetching config, and querying data.

## Setup Instructions

### 1. Create a Supabase Personal Access Token (PAT)

1. Go to your [Supabase settings](https://supabase.com/dashboard/account/tokens)
2. Create a personal access token
3. Give it a name like "Diamond Bakes MCP Server"
4. Copy the token (you won't be able to see it again)

### 2. Update Your MCP Configuration

The MCP configuration has been updated in your `.roo/mcp.json` file. You need to replace `YOUR_PERSONAL_ACCESS_TOKEN` with the token you created in step 1.

```json
{
  "mcpServers": {
    "mongodb": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-mongo-server",
        "mongodb+srv://abdul977:salis977@cluster0.s6mmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      ]
    },
    "mongodb-readonly": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-mongo-server",
        "mongodb+srv://abdul977:salis977@cluster0.s6mmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        "--read-only"
      ]
    },
    "supabase": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--access-token",
        "sbp_acbc6847d87d4240d5ea6b1fe95e13113eb7ded2"
      ]
    }
  }
}
```

### 3. Make Sure Node.js is in Your PATH

Make sure Node.js is available in your system `PATH` environment variable:

1. Get the path to `npm`:
   ```
   npm config get prefix
   ```
2. Add the directory to your PATH:
   ```
   setx PATH "%PATH%;<path-to-dir>"
   ```
3. Restart your MCP client (like Claude Desktop).

## Available Supabase Tools

Once set up, the following Supabase tools will be available to the AI assistant:

### Project Management
- `list_projects`: Lists all Supabase projects for the user.
- `get_project`: Gets details for a project.
- `create_project`: Creates a new Supabase project.
- `pause_project`: Pauses a project.
- `restore_project`: Restores a project.
- `list_organizations`: Lists all organizations that the user is a member of.
- `get_organization`: Gets details for an organization.

### Database Operations
- `list_tables`: Lists all tables within the specified schemas.
- `list_extensions`: Lists all extensions in the database.
- `list_migrations`: Lists all migrations in the database.
- `apply_migration`: Applies a SQL migration to the database.
- `execute_sql`: Executes raw SQL in the database.
- `get_logs`: Gets logs for a Supabase project by service type.

### Project Configuration
- `get_project_url`: Gets the API URL for a project.
- `get_anon_key`: Gets the anonymous API key for a project.

### Development Tools
- `generate_typescript_types`: Generates TypeScript types based on the database schema.

## Testing the Connection

To test if the MCP server is working correctly, ask your AI assistant (like Claude) to:

1. List your Supabase projects
2. List tables in your Supabase database
3. Execute a simple SQL query

## Troubleshooting

If you encounter issues:

1. Make sure your Supabase Personal Access Token is correct
2. Check that Node.js is properly installed and in your PATH
3. Restart your AI assistant client
4. Check for any error messages in the AI assistant's response
