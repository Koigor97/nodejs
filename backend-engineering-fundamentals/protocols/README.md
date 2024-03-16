# [Protocols](/backend-engineering-fundamentals/protocols/)

## Protocol Properties ⚙️

### **What is a protocol?:**

- A protocol is a system that allows two parties to communicate with it each other.
- A protocol is designed with a set of properties depending on the purpose of the protocol.
- e.g **TCP, UDP, HTTP, gRPC, FTP,** etc..

**A protocol properties includes:**

- Data format
  - Text based (plain text, JSON, XML)
  - Binary (protobuf, RESP, h2, h3)
- Transfer mode
  - Message based (UDP, HTTP)
  - Stream (TCP, WebRTC)
- Addressing system
  - DNS name, IP, MAC
- Directionality
  - Bidirectional (TCP)
  - Unidirection (HTTP)
  - Full/Half duplex
- State
  - Stateful (TCP, gRPC, apache thrift)
  - Stateless (UDP, HTTP)
- Routing
  - Proxies, Gateways
- Flow & Congestion control
  - TCP (flow & congestion)
  - UDP (No control)
- Error management
  - Error code
  - Retries and timeouts

## OSI Model

OSI (Open System Interconnection) model is really critical to understand for any software engineer who wants to interact with networking must understand the 7 layers OSI model.

**The 7 layers of the OSI model each describe a specific networking component:**

- Layer 7 - **Application** - HTTP/FTP/gRPC
- Layer 6 - **Presentation** - Encoding, Serialization
- Layer 5 - **Session** - Connection establishment, TLS
- Layer 4 - **Transport** - UDP/TCP
- Layer 3 - **Network** - IP
- Layer 2 - **Data Link** - Frames, Mac address Ethernet
- Layer 1 - **Physical** - Electric signals, fiber or radio wave
