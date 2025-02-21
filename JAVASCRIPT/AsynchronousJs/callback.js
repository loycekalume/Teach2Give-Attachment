// A function that accepts a callback
function processOrder(order, callback) {
    console.log(`Processing order for: ${order}`);
    setTimeout(() => {
        console.log(`Order ready: ${order}`);
        callback(); // Calling the callback when order is ready
    }, 3000); // Simulating time delay
}

// A callback function
function notifyCustomer() {
    console.log("Customer notified: Your order is ready!");
}

// Calling the function with a callback
processOrder("Pizza", notifyCustomer);
