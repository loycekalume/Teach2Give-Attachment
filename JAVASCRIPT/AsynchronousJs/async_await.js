// Function that returns a Promise
function orderPizza() {
    return new Promise((resolve, reject) => {
      console.log(" Placing order...");
  
      setTimeout(() => {
        let isAvailable = Math.random() > 0.5; // Random success or failure
  
        if (isAvailable) {
          resolve(" Pizza is ready!");
        } else {
          reject(" Sorry, we ran out of ingredients.");
        }
      }, 3000);
    });
  }
  
  // Using async/await
  async function getPizza() {
    try {
      let message = await orderPizza(); // Wait until the Promise resolves
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  }
  
  getPizza();
  