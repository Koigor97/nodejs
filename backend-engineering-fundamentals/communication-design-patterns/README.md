# [Communication Design Pattern](/backend-engineering-fundamentals/communication-design-patterns/index.js)

## Resquest - Response model

- The clients (browser) sends a Request ⏩
- The Server parse the Request to understand the context of the request where does the request begin and where does it end 🪡
- The Server processes the Request 🧪
- The Server then sends a Response ⏎
- The Client parses the Response and consume 🥣

The **Anatomy of a Request/Response** is:

- The request structure must be defined by both the client and the server.
- The request must have a boundary (where it starts and where it ends).
- It is defined by a protocol and message format.
- Same for teh response. Example:

  > GET / HTTP/1/1  
  > Headers  
  > CRLF  
  > BODY

  The command:

  ```
    curl -v --trace out.txt http://google.com
  ```

  The result: [out.txt](/backend-engineering-fundamentals/communication-design-patterns/out.txt)
