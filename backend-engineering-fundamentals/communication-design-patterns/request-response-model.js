// RESQUEST - RESPONSE MODEL
//  1). The clients (browser) sends a Request ⏩
//  2). The Server parse the Request to understand the context of the request
//      - where does the request begin and where does it end 🪡
//  3). The Server processes the Request 🧪
//  4). The Server then sends a Response ⏎
//  5). The Client parses the Response and consume 🥣

// Anatomy of a Resquest/Response
//  -- The request structure must be defined by both the client and server
//  -- Request must have a boundary (where it starts and where it ends)
//  -- Defined by a protocol and message format
//  -- Same for the response
//  -- """
//        GET / HTTP/1/1
//        Headers
//        <CRLF>
//        BODY
//     """
