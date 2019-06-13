let open;
if (process.env.IS_ELECTRON) {
  open = require('open');
}

// default _blank

export function openUrl(url, type = '_blank') {
  if (process.env.IS_ELECTRON) {
    (async () => {
      await open(url);
    })();
  } else {
    window.open(url, type);
  }

}
