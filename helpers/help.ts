import React from "react"
const testDoc = (document: any) => {
  // Any type
  //console.log(document)
}

function User(){
  this.name = "Bob"
}

const functionToLbs = (weight: number | string): number => { // Union operator
  if(typeof weight === 'number'){
    // number autocomplete for weight
    return weight
  }else{
    return parseInt(weight)*10;
  }
}

const calcTax = (income: number, taxYear = 2023): number => {
  //console.log(income) // If income is not read, it will throw error -- Due to noUnusedParameters

  if(taxYear>1000){
    return income
  }else{
    return income*1.2;
  }

}

const checkForVar = (): void => {
  var k: number = 10;
  function abc(){
    //console.log(k)
    var t: number = 20;
    let a: String = 'hello'
    if(a == 'hello'){
      let b: String = 'world'
      var c: String = 'aaaaa'
    }
    // //console.log(b) -- It will throw error because let is block scope
    //console.log("var function scope",c) // This will work because var in function scoped
  }
  abc()
}

const checkForMapForEachReduce = (): void => {
  
  let a = [1,2,3,4]
  let k: (Number)[] = a.map((val, index) => {
    return(val+1)
  })
  //console.log("Check for Map",k)
  // //console.log("Check for Map",a) -- Map doesnot mutate original array
  let p = []
  a.forEach((val, index) => {
    val = val+1
  })
  //console.log("Check for Foreach",a) // Foreach doesnot mutate array as well
  a.filter(x => x>3)
  //console.log("Check for filter", a) // Filter doesnot mutate array as well

  let arr = [1,2,3,4]
  let newArr = arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue // Reduce doesn't mutate array as well
  })
  //console.log("Reduce arr", newArr)
}

const checkForHositing = () : void => {
  // Hoisting is --  In other words; a variable can be used before it has been declared.

  k = 10 // Hoisting occurs with var
  var k;
  //console.log(k)

  // t = 20 // Hoisting doesn't occur with let
  // let t;
  // //console.log(t)
}

const help = (data: String) => {
  //console.log(data)
  let age: number = 20; // Statistically typed

  let sales: number = 123_456_789;
  testDoc("abc")
   
  //Arrays
  let number: (string|number)[] = [1,2,3,"abc"] // In javascript each element is of different type
  let num: number[] = [1,2,3]
  // Benefit of statiscally typing here is that we can have autocomplete feature while looping
  // For eg = num.forEach(val => val.)

  //Tuples
  let user: [number, string] = [1, 'abc']

  //Enums
  const enum Size {Small = 1, Medium, Large}
  let mySize: Size = Size.Medium
  //console.log(mySize) // 2

  //Functions
  calcTax(10_000, 2023);
  calcTax(10_000) // If we are not passing second paramenter, we have to give default value in our function parameters

  //Objects

  type Employee = { // Type alias
    readonly id: number,
    name: string,
    retire: (date: Date) => void
  }

  let employee: Employee = {id: 1,
    name: "",
    retire: (date: Date) => {
      //console.log(date)
    }
  } // If we don't want to set name: "", we can also use name?: string
  employee.name="Harsh"
  //console.log(employee)

  // Union operators
  functionToLbs(10);
   
  //Literal (exact, specefic)
  type Quantity = 50 | 100
  let quantity: Quantity = 100
  //console.log(quantity)

  // Nullables
  function greet(name: String | null){
    if(name){
      //console.log(name.toLocaleUpperCase)
    }else{
      //console.log("Hola")
    }
  }
  greet(null)

  // Assertion

  let cid: any = 1
  let customerId = <number>cid //customerId will be number

  // Interface

  interface UserInterface {
    id: number,
    name: string,
    age?: number // Optional
  }
  const user1: UserInterface = {
    id: 1,
    name: "Test"
  }
  // Difference between type and object is that, we cannot perform union in Types

  type Test = number | string
  const tt: Test = 10
  checkForVar()
  checkForHositing()
  checkForMapForEachReduce()

  // interface TestInterface = number | string This will give error

  // A constructor in javaascript is used to create object, it is done with new keyword
  var userCons = new User();
  //console.log("Contructor", userCons)
  


}
export default help; 