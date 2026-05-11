const db = require('./db');

async function createOTPTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS otp_codes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                otp VARCHAR(255) NOT NULL,
                expires_at DATETIME NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `;
        await db.query(query);
        console.log("✅ otp_codes table created successfully");
    } catch (err) {
        console.error("❌ Error creating table:", err);
    }
    process.exit();
}

createOTPTable();
