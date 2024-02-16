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

## The following comes from jsDemo.js ##

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

### More array functions ###
#### Spread ####
let input = [1,2,3];
input = [...input, 4, 5, 6];

### variadic ###
Spread something out in place

const sumAndMultiply = (multiplier, ...numbers) => {
  console.log(numbers);
  return numbers.reduce((a,n) => a + multiplier * n)
}

### Iterators and Tables ###
let beaches = [
  { name: 'sunset', shore: 'north' },
  { name: 'sunrise', shore: 'south' },
];

for (const beach of beaches) {
  if (beach.shore === 'west') break;
  console.log(beach);
}

create a new object and modify it because the old one it immutable
console.table(beaches.map((n) => ({ ...n, island: 'oahu'}));

### Optional Chain ###
console.log(x.r?.() || fallback())

Does X have a function r? if not, do fallback. If r is not defined, don't call it

### Iterators and generators ###
You can create your own iterator

### Destructuring arrays ###
const a = [1,2]
[x] = a (yields 1)
[x, y, z] = a (1 2 undefined)
[x, ,y, ...z] = [1,2,3,4,5,6,7]
console.log(x,y,z); (1, 3, [4,5,6,7])

### destructuring parameters ###
function af([a = 3, b = 'taco'] = []) {
  console.log(a,b);
}
af();
af([20]);

### JSON ###
JSON.stringify(object);
- yields the json string of an object
- functions are lost this way 

JSON.parse(objectText);
- this is how you turn a string to an object

### Javascript DOM manipulation ###
passing in `document` allows you to manipulate the dom

for example this prints the entire dom
``` 
function displayElement(el){
  console.log(el.tagName);
  for (const child of el.children) {
    displayElement(child);
  }
}
```

```
const listElements = document.querySelectorAll('p');

for (const el of listElements) {
  console.log(el.textContent);
}
```

Injecting HTML
```
const el = document.querySelector('#t');
el.innterHTML = '<div class="injected"><b>Hello</b>!</div>';
```

textContent makes sure text does not get executed like javascript, keeps you safe from injection attacks

### Event Handlers ###
<button onclick = 'alert("clicked")'>click me</button>

### local storage ###
allows you to save user data temprarily in the browser
localStorage.setItem
localStorage.getItem