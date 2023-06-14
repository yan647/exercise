interface Animal{
  age:number;
}

interface Dog {
  age:number;
  bark:()=>{}
}

let animals: Animal[]=[{age:3}];
let dogs: Dog[]=[{age:4,bark:()=>({})}];

//协变。 Animal=Dog为真，animals=dogs为真，在同一方向
animals = dogs // ok
animals[0].age // ok


let visitAnimal = (animal: Animal) => {
  animal.age
}
let visitDog = (dog: Dog) => {
  dog.age
  dog.bark()
}

//逆变。Animal=Dog为真，visitAnimal = visitDog为假，但visitDog = visitAnimal为真，在相反方向
visitAnimal = visitDog;// Type '(dog: Dog) => void' is not assignable to type '(animal: Animal) => void'.   Types of parameters 'dog' and 'animal' are incompatible.     Property 'bark' is missing in type 'Animal' but required in type 'Dog'.
let animal = { age: 5 }
visitAnimal(animal) //error

class Animal {
}

class Cat extends Animal {
  miao() {
    console.log('cat miao');
  }
}

class Dog extends Animal {
  wang() {
    console.log('dog wang');
  }
}

let catList: Cat[] = [new Cat()];
let animalList: Animal[] = [new Animal()];
let dog = new Dog();

// 协变不安全
animalList = catList;
animalList.push(dog);
catList.forEach(cat => cat.miao()); // 应该报错但没有报

// 假设这里存在逆变，逆变不安全
catList = animalList;
animalList.push(dog);
catList.forEach(cat => cat.miao()); // 应该报错但没有报
