# Peopler

The longitudinal community simulator [built with React](https://github.com/facebookincubator/create-react-app).

```javascript
let grid = [];

let wrapper =  document.getElementById("wrapper");

for(let i = 0; i < 20; ++i){
let row = [];
  for(let j = 0; j < 20; ++j){
  row.push(i !== 0 && j !== 0 ? Math.floor(Math.random() * 9) : 0)
}
grid.push(row)
}
alert(grid.length, grid[99].length);
for(let i = 0; i < 20; ++i){
  for(let j = 0; j < 20; ++j){
  wrapper.innerHTML += "<div class="cell" style='backgroundColor: blue'></div>"
  }
}
```

```css
.cell {
display: inline-flex;
flex-direction: column;
justify-content: flex-start;
margin: 0;
padding: 0;
background: #CCEE33;
width: 5%;
height : 5%;
flex-wrap: wrap;
margin-left -3px;
margin-top: -3.9px;
}
body {
  margin: 0;
padding: 0;
}
#wrapper {
  height: 500px;
  width: 500px;
  position: fixed;
  background: #000;
}
```
https://jsfiddle.net/zzvyqkaz/58/