import $ from "jquery";
import Rx from "rxjs/Rx";

const $title = $("#title");
const $results = $("#results");

//const keyups$ = Rx.Observable.fromEvent($title, "keyup");
const queries$ = Rx.Observable
  .fromEvent($title, "keyup")
  .map(e => e.target.value)
  .distinctUntilChanged();


//keyups$.subscribe( e => {
queries$.subscribe( queries => {
  getItems(queries)
    .then(items => {
      $results
        .empty()
        .append(items.map(r => $('<li />').text(r)));
    })
})

// ---------------
function getItems(title){
  console.log(`Querying ${title}`);
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve([title, "Item 2", `Another ${Math.random()}`]);
    }, 500 + (Math.random() * 1000))
  })
}