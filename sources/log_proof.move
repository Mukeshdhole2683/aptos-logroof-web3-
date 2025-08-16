module MyModule::LogProof {

    /// Struct representing a fast log proof
    struct LogProof has store, key {
        data: vector<u8>,       // Raw log data (faster than String)
        proof_hash: vector<u8>, // Cryptographic proof hash
        timestamp: u64,         // When the log was created
    }

    /// Function to create and store a new log proof
    public fun store_log_proof(
        account: &signer, 
        data: vector<u8>, 
        proof_hash: vector<u8>, 
        timestamp: u64
    ) {
        move_to(account, LogProof { data, proof_hash, timestamp });
    }

    /// Function to read an existing log proof
    public fun read_log_proof(owner_addr: address): (vector<u8>, vector<u8>, u64) acquires LogProof {
        let log_proof = borrow_global<LogProof>(owner_addr);
        (log_proof.data, log_proof.proof_hash, log_proof.timestamp)
    }
}
