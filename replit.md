# Log Proof DApp

## Overview

This is a decentralized application (DApp) built on the Aptos blockchain that provides immutable log storage and proof functionality. The application allows users to store log data with cryptographic proof hashes on-chain and retrieve them later, ensuring data integrity and verifiability. It serves as a blockchain-based audit trail system where log entries cannot be tampered with once stored.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla HTML, CSS, and JavaScript for simplicity and direct blockchain interaction
- **Component Structure**: Modular design with separate forms for storing and reading log proofs
- **State Management**: Simple global variables to track wallet connection status and user account information
- **UI Design**: Glass-morphism design with gradient backgrounds and responsive layout

### Blockchain Integration
- **Aptos Blockchain**: Uses Aptos devnet as the blockchain platform for smart contract deployment
- **Move Smart Contract**: Leverages a Move module named "LogProof" for on-chain data storage and retrieval
- **Wallet Integration**: Direct integration with Aptos wallet for transaction signing and account management
- **Data Encoding**: Custom utility functions for converting between different data formats (hex, string, Uint8Array)

### Data Storage Pattern
- **On-Chain Storage**: Log data and proof hashes are stored directly on the Aptos blockchain
- **Key-Value Structure**: Uses owner addresses as keys to retrieve associated log proof data
- **Immutable Records**: Once stored, log proofs cannot be modified, ensuring data integrity

### Security Model
- **Cryptographic Proofs**: Requires proof hashes for log validation
- **Wallet Authentication**: All transactions require wallet signature approval
- **Address-Based Access**: Log proofs are tied to specific wallet addresses

## External Dependencies

### Blockchain Services
- **Aptos Devnet**: Primary blockchain network for smart contract execution
- **Aptos Fullnode API**: RESTful API endpoint for blockchain interaction and transaction submission

### Client Libraries
- **Aptos SDK**: JavaScript SDK for Aptos blockchain interaction and transaction building
- **Web3 Wallet**: Browser-based wallet integration for transaction signing

### Smart Contract Dependencies
- **Move Framework**: Aptos Move language runtime for smart contract execution
- **LogProof Module**: Custom Move module deployed at address `0x1` for log storage functionality

### Browser APIs
- **TextEncoder/TextDecoder**: Native browser APIs for string-to-bytes conversion
- **Crypto APIs**: Browser's built-in cryptographic functions for data encoding