let myWorker = new Worker('wasm_load_worker_no_streaming.js');
myWorker.onmessage = (e) => {
  console.log(e);

  let theAnswer = ":(";

  var importObject = {
    imports: {
      imported_func: arg => {
        theAnswer = arg;
        console.log(arg)
      }

    }
  };

  WebAssembly
    .instantiate(e.data, importObject)
    .then(obj => {
      obj
        .exports
        .exported_func();
      document
        .getElementById('output')
        .innerHTML = `<div class="status good">instantiateStreaming ok. WASM executed and returned ${theAnswer}</div>`;
    }, err => {
      document
        .getElementById('output')
        .innerHTML = `<div class="status bad">instantiateStreaming failed ${err}.</div>`;
    });

};