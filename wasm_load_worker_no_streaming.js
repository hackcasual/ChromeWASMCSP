var importObject = {
  imports: {
    imported_func: arg => console.log(arg)
  }
};

fetch('simple.wasm').then(function (response) {
  return response.arrayBuffer();
})
  .then(function (buffer) {
    WebAssembly
      .compile(buffer)
      .then(obj => postMessage(obj));
  });
