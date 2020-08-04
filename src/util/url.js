
//let open = null;
if (process.env.IS_ELECTRON) {
//  open = require('open');
}

// default _blank
export function openUrl(url, type = '_blank') {

  /*
  (async () => {
    await open(url);
  })();
   */

  window.open(url, type);
  /*
  if (process.env.IS_ELECTRON) {
    open(url)
  } else {
    window.open(url, type);
  }

   */

}
