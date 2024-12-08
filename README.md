# Jina Proxy Server

A lightweight proxy server for making authenticated requests to the Jina AI API. This server helps handle CORS issues and securely manages API keys when making requests to Jina's services.

## Features

- Proxies requests to Jina AI API
- Handles CORS
- Secure API key management
- JSON and text response handling
- Docker support

## Prerequisites

- Node.js 18 or higher
- Docker (optional)
- Jina AI API key

## Setup

1. Clone the repository
2. Create a `.env` file in the root directory with:
   ```
   JINA_API_KEY=your_api_key_here
   PORT=3000 # optional, defaults to 3000
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Server

### Local Development

```bash
npm start
```

### Using Docker

Build and run with Docker:
```bash
npm run docker:start
```

Or build and run separately:
```bash
npm run docker:build
npm run docker:run
```

## API Usage

### Read Endpoint

`GET /read?url=<encoded-url>`

Makes a proxied request to the Jina AI API. The Jina AI API can be used for various document processing tasks:

#### Common Use Cases:

1. **Document Reading & Analysis**
   - Extract text from PDFs, Word documents, and images
   - Parse structured data from documents
   - Convert documents to different formats

2. **Web Scraping & Processing**
   - Extract content from web pages
   - Process HTML content
   - Parse news articles and blog posts

3. **Content Extraction**
   - Extract tables from documents
   - Pull specific sections or paragraphs
   - Identify headers and metadata

4. **Document Intelligence**
   - Analyze document layout
   - Extract key-value pairs
   - Identify document types

Example Request:
```bash
# Extract content from a PDF
curl "http://localhost:3000/read?url=https://example.com/document.pdf"

# Process a webpage
curl "http://localhost:3000/read?url=https://news-article.com/story"

# Extract tables from a document
curl "http://localhost:3000/read?url=https://example.com/report.xlsx"
```

Response formats vary based on the document type and processing requested. The server handles both JSON and text responses appropriately.

## Error Handling

The server provides appropriate error responses for:
- Missing URL parameters
- API authentication issues
- Invalid responses
- Server errors

## Security

- API keys are stored securely in environment variables
- CORS is enabled for cross-origin requests
- Sensitive information is not exposed to clients

## License

MIT
