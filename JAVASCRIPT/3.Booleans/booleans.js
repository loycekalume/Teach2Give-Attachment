import bcrypt from 'bcrypt';

// Function to verify password (synchronous)
function verifyPassword(inputPassword, storedHashedPassword) {
    return bcrypt.compareSync(inputPassword, storedHashedPassword);
}

// Function to verify MFA code
function verifyMFA(inputMfaCode, correctMfaCode) {
    return inputMfaCode === correctMfaCode;
}

// Function to check balance
function checkBalance(balance, withdrawalAmount) {
    return balance >= withdrawalAmount;
}

// Function to check daily limit
function checkDailyLimit(withdrawalAmount, dailyLimit) {
    return withdrawalAmount <= dailyLimit;
}

// Main withdrawal process (fully synchronous)
function processWithdrawal(user, inputPassword, inputMfaCode, withdrawalAmount) {
    if (!verifyPassword(inputPassword, user.hashedPassword)) {
        return "Transaction Failed: Incorrect password.";
    }
    if (!verifyMFA(inputMfaCode, user.correctMfaCode)) {
        return "Transaction Failed: MFA failed.";
    }
    if (!checkBalance(user.balance, withdrawalAmount)) {
        return "Transaction Failed: Insufficient balance.";
    }
    if (!checkDailyLimit(withdrawalAmount, user.dailyLimit)) {
        return "Transaction Failed: Amount exceeds daily limit.";
    }

    // Deduct the amount
    user.balance -= withdrawalAmount;
    return `Transaction Successful! New Balance: ${user.balance}`;
}

// Example Usage
const user = {
    hashedPassword: bcrypt.hashSync("securePassword", 10), // Synchronously hashed password
    correctMfaCode: "123456",
    balance: 1000,
    dailyLimit: 500
};

// Test different scenarios
console.log(processWithdrawal(user, "securePassword", "123456", 400)); // ✅ Success
console.log(processWithdrawal(user, "wrongPassword", "123456", 400));  // ❌ Incorrect password
console.log(processWithdrawal(user, "securePassword", "654321", 400)); // ❌ MFA failed
console.log(processWithdrawal(user, "securePassword", "123456", 1200)); // ❌ Insufficient balance
console.log(processWithdrawal(user, "securePassword", "123456", 600));  // ❌ Exceeds daily limit
