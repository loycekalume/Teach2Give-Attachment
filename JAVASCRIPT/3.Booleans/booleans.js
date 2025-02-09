import bcrypt from 'bcrypt';

// Function to verify password
async function verifyPassword(inputPassword, storedHashedPassword) {
    return await bcrypt.compare(inputPassword, storedHashedPassword);
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

// Main withdrawal process
async function processWithdrawal(user, inputPassword, inputMfaCode, withdrawalAmount) {
    if (!(await verifyPassword(inputPassword, user.hashedPassword))) {
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

// test case
(async () => {
    const user = {
        hashedPassword: await bcrypt.hash("securePassword", 10), // Simulated hashed password
        correctMfaCode: "123456",
        balance: 1000,
        dailyLimit: 500
    };

    console.log(await processWithdrawal(user, "securePassword", "123456", 400)); //  Success
    console.log(await processWithdrawal(user, "wrongPassword", "123456", 400));  //  Incorrect password
    console.log(await processWithdrawal(user, "securePassword", "654321", 400)); //  MFA failed
    console.log(await processWithdrawal(user, "securePassword", "123456", 1200)); //  Insufficient balance
    console.log(await processWithdrawal(user, "securePassword", "123456", 600));  //  Exceeds daily limit
})();



//Challenge Questions:

//1. Password Authentication:
 //Why is it important to store passwords in a hashed format? What security advantage does this provide over plain text passwords?
 //Hashing ensures one-way encryption, making it difficult for attackers to retrieve the original password.
//Security advantage- Protects against database leaks, brute force, and rainbow table attacks.


// 2. Multi-Factor Authentication (MFA):
// How does implementing MFA enhance the security of the transaction process?
//MFA adds an extra layer of security beyond just the password, making it significantly harder for attackers to gain unauthorized access.

// What types of attacks does it help prevent?
//Credential Theft: Prevents unauthorized access even if a password is leaked.
// Phishing Attacks: Even if a user is tricked into revealing their password, the attacker still needs the MFA code.
// Brute Force Attacks: Limits unauthorized login attempts since passwords alone are not enough.


// 3. Balance Verification:
//  Why is it necessary to check the account balance before allowing a withdrawal?
//Checking the balance ensures that users cannot withdraw more money than they have, preventing overdrafts and financial losses.

//What risks are involved if this step is skipped?
// Negative Balance (Overdrafts): If withdrawals exceed the balance, it can cause bank losses.
// Financial Fraud: Malicious users could exploit the system to withdraw unlimited funds.
// Transaction Failures: Insufficient balance could lead to incomplete transactions, frustrating customers.


// 4. Daily Transaction Limit:
//  What purpose does the daily transaction limit serve?
// Prevents large unauthorized withdrawals if an account is compromised.
//Limits financial losses in case of fraud.
//Encourages responsible spending.

//  How does it help in preventing fraudulent or excessive withdrawals?
// Attackers who gain access to an account cannot empty it immediately.
//Banks can detect abnormal activity if a user suddenly reaches their daily limit.


// 5. Improvement:
// If you were to add extra features, such as fraud detection (e.g., detecting
// abnormal withdrawal patterns), how would you go about doing this? What
// additional data would you track to detect fraud

// Steps to Detect Fraud:
// Track withdrawal history: Detect sudden spikes in withdrawals.
// Monitor device and location: If a transaction is requested from a new device or unusual location, trigger additional verification.
// Set withdrawal frequency limits: Limit the number of withdrawals per day/hour.
// Use machine learning models: Identify anomalies in spending behavior.

// Additional Data to Track:
// Geolocation Data: Unusual logins from a different country.
// Device ID & IP Address: Detect logins from unrecognized devices.
// Time of Transaction: Multiple withdrawals in a short time may indicate fraud.
// Transaction Amount History: Compare current withdrawals to past transactions.
