import { createStore } from "redux";

const plusbtn = document.querySelector("#add");
const minusbtn = document.querySelector("#minus");
const countSpan = document.querySelector("#countNumber");

countSpan.innerHTML = 0;

const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action) => {
  console.log(action);
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier);

const onChange = () => {
  console.log("state is changed");
  countSpan.innerHTML = countStore.getState();
};
countStore.subscribe(onChange);

plusbtn.addEventListener("click", () => {
  countStore.dispatch({ type: ADD });
});
minusbtn.addEventListener("click", () => {
  countStore.dispatch({ type: MINUS });
});
