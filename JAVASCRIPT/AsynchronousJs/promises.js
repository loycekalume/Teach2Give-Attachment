// Function returns a Promise
function orderPizza() {
    return new Promise((resolve, reject) => {
      console.log(" Placing order...");
  
      setTimeout(() => {
        let isAvailable = Math.random() > 0.5; // Random success or failure
  
        if (isAvailable) {
          resolve("Pizza is ready!"); // Fulfilled
        } else {
          reject("Sorry, we ran out of ingredients."); // Rejected
        }
      }, 3000);
    });
  }
  
  // Using the Promise
  orderPizza()
    .then((message) => console.log(message)) // If successful
    .catch((error) => console.log(error)); // If rejected
  