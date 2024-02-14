# Class Notes #

### Git ###
- Here are some of the main git functions:
  - git push
  - git pull
  - git commit -am "merge(notes) combined both edits"
  - git clone
  - git add (before commit and push)
  - git fetch 
  - git status

### Arrays ###
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

#### Maps ####
console.log(
'map', numbers.map((n) => n * 100)
);

Takes the numbers, multiplies each entry by 100, prints it and adds
it to a map

#### Reduce ####
console.log(
'reduce', numbers.reduce((a, c) => a + c)
);

accumulates all numbers in the array then prints them out

#### forEach ####
console.log(
'forEach', numbers.forEach((n) => n % 2)
);

determines what is a mod 2 in the array

#### filter ####
console.log(
'filter', numbers.filter((n) => n % 2)
);

#### some ####
console.log(
'some', numbers.some((n) => n > 2)
);

there is at least one thing where an element is greater than 5


### Exceptions ###
try {
} catch (error) {
} finally {
}

### Template literals ###
console.log(\`Template ${'lite' + 'rals'}! ${hello(name)}\`);

### Logical Operators
nullsih - means undefined, null, 0, NaN, "logical OR"
let z;
z ?? (z = x)

### Objects ###
let obj = { obj = {animal: 'fish', count:3}
obj.location = {
  cities: ['utah', 'new york'],
  origin: 'ocean'
};