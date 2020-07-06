# Pure Redux

## 1. basic setting

- objective : +,- counter with redux

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

- dispath
- subscribe
- getState
- replaceReducer

## 2. Redux Counter

- action : 변수룰 수정하는 행위, action.type별로 다르게 수정가능
- dispath: 정의한 action을 execaution
- subscribe : 변수가 바뀌면 작동하는 side effect
