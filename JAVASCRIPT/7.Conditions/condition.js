let age = 18

if (age >= 18) {
    console.log("You are eligible to vote.");
} else {
   console.log("You are a minor, you cannot vote.");
}

function averageMarks(marks){
    let total = 0
    for (const mark of marks){
        total = total + mark
    }
    let avg = 0
    avg = total/(marks.length)
    return avg

}
console.log(averageMarks([23,4,5]))


const circleArea = (radius) =>{
    return `The area of a circle is: ${Math.PI *radius**2}`
}
console.log(circleArea(14))