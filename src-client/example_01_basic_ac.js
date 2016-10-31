import $ from "jquery";

const $title = $("#title");
const $results = $("#results");

let lastQuery = null;
let lastTimeout = null;
let newxtQueryId = 0;
$title.on("keyup", e => {
  const title = e.target.value;
  if (lastQuery == title) {
    return;
  }

  lastQuery = title;
  if (lastTimeout) {
    window.clearTimeout(lastTimeout)
  }

  let outQueryId = ++newxtQueryId;

  lastTimeout = window.setTimeout(() => {
    getItems(title)
      .then(items => {
        // we only show the result from the last query
        if (outQueryId != newxtQueryId) {
          return;
        }
        $results.empty();
        const $items = items.map(item => $(`<li />`).text(item));
        $results.append($items);
      })
  }, 500)
})

function getItems(title){
  console.log(`Querying ${title}`);
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve([title, "Item 2", `Another ${Math.random()}`]);
    }, 500 + (Math.random() * 1000))
  })
}