const user = {
    id: "USER-123456",
    name: {
        first: "Alice",
        last: "Liddell"
    },
    email: "alice@example.com",
    address: {
        shipping: {
            street: "123 Rabbit Hole",
            city: "Wonderland",
            state: "Fantasy",
            postalCode: "12345",
            country: "WL"
        },
        billing: {
            street: "456 Mad Hatter Lane",
            city: "Tea Party",
            state: "Fantasy",
            postalCode: "67890",
            country: "WL"
        }
    },
    payment: {
        total: "100.00",
        currency: "USD",
        details: {
            subtotal: "75.00",
            tax: "15.00",
            shipping: "10.00"
        },
        transactions: [
            {
                id: "TXN-123", amount: "50.00", description: "Magic Potion"
            },
            {
                id: "TXN-456", amount: "50.00", description: "Enchanted Sword"
            }
        ]
    }
};


//destructuring
const { id: userId,
    name: { first, last },
    email: userEmail,
    address: { shipping: { street, city, state, postalCode, country },
        billing: { street: street1, city: city1, state: state1 } },
    payment: { total, currency, details: { subtotal, shipping, tax },
        transactions: [
            { id: transactionId, amount, description },
            { id: transactionId1, amount:amount1, description: description1 },
        ], }, 
} = user

console.log(street1)

const personalInfo = document.getElementById("personal-info")
personalInfo.innerHTML=(`
    <p><strong>User Id: </strong>${userId}</p> 
    <p><strong>First Name: </strong>${first}</p> 
    <p><strong>Last Name: </strong>${last}</p> 
    <p><strong>Email: </strong> ${userEmail}</p> 
    `)

//loading transaction
const userTransactions = document.getElementById("transactions");

// Inject transactions into the UI
userTransactions.innerHTML = user.payment.transactions.map(transaction => `
    <p><strong>Transaction ID:</strong> ${transaction.id}</p>
    <p><strong>Amount:</strong> ${transaction.amount}</p>
    <p><strong>Description:</strong> ${transaction.description}</p>
    <hr>
`).join("") // Join the array into a single HTML string
 

const shippingAddress = document.getElementById("shipping-address");
shippingAddress.innerHTML =(`
    <p><strong>Street: </strong> ${street}</p>
    <p><strong>City: </strong> ${city}</p>
    <p><strong>Description: </strong> ${state}</p> 
    <hr>
    `);

    const billingAddress = document.getElementById("billing-address");
    billingAddress.innerHTML =(`
        <p><strong>Street: </strong> ${street1}</p>
        <p><strong>City: </strong> ${city1}</p>
        <p><strong>Description: </strong> ${state1}</p> 
        <hr>
        `);