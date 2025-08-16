# EduChain - Student Assignment Verification System

A blockchain-based platform for secure assignment submission and verification using Aptos Move smart contracts.

## 🎯 Overview

EduChain provides tamper-proof assignment submission with cryptographic verification. Students can submit assignments that are permanently recorded on the Aptos blockchain, ensuring academic integrity and transparent verification.

## ✨ Features

- **Secure Submission**: Store assignment data with cryptographic proof hashes
- **Immutable Records**: Blockchain-based storage prevents tampering
- **Student Interface**: Modern, responsive UI with dark/light mode
- **Fast & Optimized**: 24-line Move contract with minimal gas usage
- **Mock Testing**: Demo system for testing without real wallets

## 🏗️ Architecture

### Smart Contract (Move)
- **Module**: `MyModule::LogProof`
- **Functions**: 
  - `store_log_proof()` - Submit assignment with proof
  - `read_log_proof()` - Retrieve assignment data
- **Storage**: On-chain data with vector&lt;u8&gt; for performance

### Frontend (Vanilla JS)
- **Design**: Modern glassmorphism with CSS custom properties
- **Features**: Dark mode, responsive design, mock wallet system
- **Integration**: Direct Aptos blockchain interaction

## 📁 Project Structure

```
├── sources/
│   └── log_proof.move       # Move smart contract
├── index.html               # Main UI
├── style.css               # Styling with dark mode
├── app.js                  # Frontend logic
├── Move.toml               # Move package config
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Compile Contract
```bash
aptos move compile --package-dir .
```

### 2. Deploy to Testnet
```bash
# Initialize Aptos CLI
aptos init --network testnet

# Fund account (visit faucet)
# https://aptos.dev/network/faucet

# Deploy contract
aptos move publish --package-dir . --named-addresses MyModule=<YOUR_ADDRESS>
```

### 3. Run UI
```bash
# Simple HTTP server
python3 -m http.server 5000

# Or use any web server
# Navigate to http://localhost:5000
```

## 🛠️ Development

### Prerequisites
- Aptos CLI
- Web browser with modern JS support
- HTTP server for local development

### Smart Contract Development
```bash
# Compile and test
aptos move compile --package-dir .
aptos move test --package-dir .

# Deploy to devnet for testing
aptos move publish --package-dir . --named-addresses MyModule=_ --profile devnet
```

### Frontend Development
The UI uses vanilla JavaScript for simplicity and direct blockchain interaction:
- Modern CSS with custom properties for theming
- Responsive design for mobile/desktop
- Mock data system for testing

## 🎓 Usage

1. **Connect Wallet**: Click "Connect Student Wallet" (or use mock system)
2. **Submit Assignment**: Enter assignment details and generate hash
3. **View History**: Check previous submissions by address
4. **Verify Records**: All data is cryptographically verified on-chain

## 🔧 Configuration

### Move.toml
```toml
[package]
name = "LogProof"
version = "1.0.0"

[addresses]
MyModule = "_"  # Will be replaced during deployment

[dependencies.AptosFramework]
git = "https://github.com/aptos-labs/aptos-core.git"
rev = "aptos-node-v1.13.1"
subdir = "aptos-move/framework/aptos-framework"
```

## 🌐 Live Demo

**Testnet Deployment**: [View on Aptos Explorer](https://explorer.aptoslabs.com/)

**UI Demo**: Includes mock student data for testing

## 📝 License

MIT License - Built for educational blockchain development

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

Built with ❤️ for secure academic verification on Aptos blockchain