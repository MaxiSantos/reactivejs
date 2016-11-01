import Rx from "rxjs/Rx";
import { createSubscriber } from "./lib/util";

// const promise = new Promise((resolve, reject) => {
//   console.log("In promise");
//   resolve("hey");
// })
// promise.then(item => console.log(item));

// Part 1
function observables1(){
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

  simple$.subscribe(
  //error$.subscribe(
    item => console.log(`one.next ${item}`),
    error => console.log(`one.error ${error}`),
    () => console.log(`one.complete`)
  );

  //creating a second subscription
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
}

function observables1b(){
  var observable$ = new Rx.Observable(
    observer => {
      console.log("this observable has done something, edditing lines.");
      observer.next('yeah');
      observer.complete()
    }
  )
  observable$.subscribe(
    item => console.log(`items ${item}`),
    error => console.log(`items ${error}`),
    () => console.log(`on complete`)
  );
}

//observables1b();

// Part 2
function observables2(){

  function createInterval$(time) {
    return new Rx.Observable(observer => {
      let index = 0;
      let interval = setInterval(() => {
        observer.next(index++);
      }, time);

      // observables can cleaned up later
      // rgwt clan clean up to free memory to use
      return () => {
        console.log("closing observable")
        clearInterval(interval);
      }
    });
  }

  const everySecond$ = createInterval$(1000);
  const subscription = everySecond$.take(4).subscribe(createSubscriber("native take"));

  const everySecond2$ = createInterval$(1000);
  const firstFiveSecond$ = take$(everySecond2$, 5);
  const subscription2 = firstFiveSecond$.subscribe(createSubscriber("custom take"))


  // setTimeout(() => {
  //   subscription.unsubscribe();
  // }, 3500)

  function take$(sourceObservable$, amount) {
    return new Rx.Observable(observer => {
      let count = 0;
      const subscription = sourceObservable$.subscribe({
        next(item) {
          observer.next(item);
          if (++count >= amount) {
            observer.complete()
          }
        },
        error(error) {observer.error(error)},
        complete() {observer.complete()}
      });
      return () => subscription.unsubscribe();
    });
  }
}

observables2();
