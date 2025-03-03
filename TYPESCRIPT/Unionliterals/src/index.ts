function getUsername(username: string | null): string{
    if (username !== null) {
      return `User: ${username}`
    } else {
      return 'Guest'
    }
  }

  const result = getUsername('Alice')
  console.log(result)


  
  const result2 = getUsername(null)

  
//if you dont form a type of the specific directions then it accepts any string like below
function move(direction: string, distance: number) {
    return `The direction is: ${direction} and the distance is ${distance}`
  }
 console.log(move('up', 10)) 

  move('left', 5)
  move('up-right',10)
  
  move('down-left',20)
  console.log(move('food',20))

  
// this only accepts the specific directions that are in the type
  type Direction = 'up' | 'down-left' | 'left' | 'up-right'

  function move1(direction: Direction, distance: number) {
    return `the direction ${direction} and the distance is ${distance}`
  }
  move1('left', 5)
  move1('up-right',10)
  
  console.log(move1('down-left',20))


  //narrowing

  function logId(id: number | string) {
    return `id: ${id}`
    
  }
  
  type User = {
    id: string | number
  }
  
  const user:User = {
    id: 123,
  }
  
  console.log(logId(45))
//   console.log(`The id is ${id}`)


export function validateUsername(username: string | null): boolean { 
    if (typeof username === 'string') {
        return username.length > 5;
    } else {
        return false;
    }
}

// Example test run
console.log(validateUsername("Loyce mapenzi"));
console.log(validateUsername("Bob"));

// export const appElement = document.getElementById('app') as HTMLElement | null

//unknown-anything is assignabble to unknown
const fn = (input: unknown) => {
  
}

// Anything is assignable to unknown!
console.log(fn('hello'))
fn(42)
fn(true)
fn({})
fn([])
fn(() => {})


//never a function never returns anything
//You cannot assign anything to never, except for never itself.
// @errors: 2345
const getNever = () => {
  throw new Error('This function never returns')
}
// ---cut---
const fn1 = (input: never) => {}

fn('hello')
fn(42)
fn(true)
fn({})
fn([])
fn(() => {})

// no error here, since we're assigning `never` to `never`

fn(getNever())


//unknown
const somethingDangerous = () => {
  if (Math.random() > 0.5) {
    throw new Error('Something went wrong')
  }

  return 'all good'
}

try {
  somethingDangerous()
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message)
  }
}

