type ButtonAttributes = {
    type: "button" | "submit" | "reset";
};

const modifyButtons = (attributes: ButtonAttributes[]) => { };

const buttonsToChange: ButtonAttributes[] = [
    {
        type: "button",
    },
    {
        type: "submit",
    },
];

modifyButtons(buttonsToChange);

//or pass the strings directly
modifyButtons([
    {
      type: "button",
    },
    {
      type: "submit",
    },
  ]);



function printNames(names: readonly string[]) {
    for (const name of names) {
        console.log(name);
    }


    // names.push("John");


    // names[0] = "Billy";
}

//or use Array<>
function printNames1(names: ReadonlyArray<string>) {
    
  }


  

const dangerousFunction = (arrayOfNumbers: number[]) => {
    arrayOfNumbers.pop();
    arrayOfNumbers.pop();
};
type Coordinate =readonly [number, number];
const myHouse: Coordinate = [0, 0];
// dangerousFunction(
 
//     // myHouse,
//   );