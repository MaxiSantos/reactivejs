import Rx from "rxjs/Rx";
import { createSubscriber } from "./lib/util";

// Rx.Observable
//   .interval(500) // set timeout
//   .take(5)
//   .subscribe(createSubscriber("interval"));

// Rx.Observable.timer(4000) // set timeout with a potencially
//   .subscribe(createSubscriber("timer"))

// Rx.Observable.timer(2000, 500) plis secon aniim
//   .take(3)
//   .subscribe(createSubscriber("timer"))

//
// of and from
//

// Rx.Observable.of("Hello, world", 42, "whoa")
//   .subscribe(createSubscriber("of"))

// Rx.Observable.of(["Hello, world", 42, "whoa"])
//   .subscribe(createSubscriber("of"))

Rx.Observable.from(["Hello, world", 42, "whoa"])
  .subscribe(createSubscriber("from"))

// SubecerstcnaInalahoar de n livaaaae<
// s
// When to use subscribe
// to brong non reactive and rsvyivr gosl.q

// rxmost ñ
const apiCall$ = new Rx.AsyncSubject();
apiCall$.next(1);

apiCall$.subscribe(createSubscriber("one"));
apiCall$.next(2);
apiCall$.complete();

setTimeout(
  () => {
    apiCall$.subscribe(createSubscriber("two"))
  }
)
