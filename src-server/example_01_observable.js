import Rx from "rxjs/Rx";

// const promise = new Promise((resolve, reject) => {
//   console.log("In promise");
//   resolve("hey");
// })

// promise.then(item => console.log(item));


const simple$ = new Rx.Observable(observer => {
  console.log("Generating observable");
  setTimeout(() => {
    observer.next("An item");
    setTimeout(() => {
      observer.next("Another item!");
      observer.complete();
    }, 500 + (Math.random() * 2000));
  }, 1000 + (Math.random() * 2000))
});

const error$ = new Rx.Observable(observer => {
  observer.error(new Error("Ops !"));
})

//simple$.subscribe(
error$.subscribe(
  item => console.log(`one.next ${item}`),
  error => console.log(`one.error ${error}`),
  () => console.log(`one.complete`)
);

// creating a second subscription

setTimeout(() => {
  simple$.subscribe({
    next: item => console.log(`two.next ${item}`), //this use current context with arrow key
    error(error){
      console.log(`two.error: ${error}`)
    },
    complete(){
      console.log("two.complete")
    }
  })
}, 3000);