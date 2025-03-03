 type IngridientsType = {
    name:string;
    quantity:string;
  }



type Recipe = {
    title: string;
    instructions: string;
    ingredients:Array<IngridientsType>
  };

  
  const processRecipe = (recipe: Recipe) => {
    // Do something with the recipe in here
  };
  
  processRecipe({
    title: "Chocolate Chip Cookies",
    ingredients: [
      { name: "Flour", quantity: "2 cups" },
      { name: "Sugar", quantity: "1 cup" },
    ],
    instructions: "...",
  });


  function multiply(a: number, b: number) {
    return a * b;
  }
// the `?` operator here marks parameter `c` as optional
function add(a: number, b: number, c?: number) {
    return a + b + (c || 0);
  }
  
  console.log(add(2,5))
