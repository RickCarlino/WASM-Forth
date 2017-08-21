// STEP 0: Initial setup
// =====================
// This is the initial input to the interpreter:
var inputbuffer = "2 2 + .\n ".split("").map(x => x.charCodeAt(0));
//
var count = 0;
// LF is "line feed". It lets the Forth interpreter know the user pressed enter.
const LF = 10;
// As the program calls `putch()` in C land, I shall fill this array with the
// ASCII codes it emits.
var outputbuffer = [];
// ======================

// STEP 1: DOWNLOAD THE BINARY
fetch('./program.wasm')
  // STEP2: Convert binary to an array buffer.
  .then(response => response.arrayBuffer())
  // STEP 3: Instantiate the binary into a WASM instance.
  //         I create a `getchar()` and `putchar()` function that get exposed
  //         to the C code. See forth.c source code for more details.
  .then(bytes => WebAssembly.instantiate(bytes, {
    env: {
      // This function is called by the Forth interpreter to get a single
      // character from the text input buffer.
      getchar() {
        if (count++ < inputbuffer.length) {
          return inputbuffer[count - 1];
        } else {
          inputbuffer = [];
          count = 0;
          return 10;
        }
      },
      // This is how the interpreter can print to "screen" from the C
      // source code.
      putchar(n) {
        if (n === LF) {
          let output = outputbuffer.join("");
          console.log(output);
          outputbuffer = [];
        } else {
          outputbuffer.push(String.fromCharCode(n));
        }
        return n;
      }
    }
  }))
  // STEP 4: Run the `main()` function.
  .then(results => results.instance.exports.main());
