# Pure Redux

## 1. basic setting

```js
const plusbtn = document.querySelector("#add");
const minusbtn = document.querySelector("#minus");
const countSpan = document.querySelector("#countNumber");

let count = 0;

countSpan.innerHTML = count;

const updateText = () => {
  countSpan.innerHTML = count;
};
const handlePlus = () => {
  count += 1;
  updateText();
};
const handleMinus = () => {
  count -= 1;
  updateText();
};
plusbtn.addEventListener("click", handlePlus);
minusbtn.addEventListener("click", handleMinus);
```
