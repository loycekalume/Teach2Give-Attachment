function getUsername(username: string | null): string{
    if (username !== null) {
      return `User: ${username}`
    } else {
      return 'Guest'
    }
  }

  const result = getUsername('Alice')


  
  const result2 = getUsername(null)

  

function move(direction: string, distance: number) {
    
  }
 console.log(move('up', 10)) 

  move('left', 5)
  move('up-right',10)
  
  move('down-left',20)