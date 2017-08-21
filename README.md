# Forth on WASM

This repo (sort of) runs a [Forth interpreter](https://en.wikipedia.org/wiki/Forth_(programming_language)) natively (no transpilation!) in any browser that supports [Web Assembly](http://webassembly.org/). The Forth interpreter (the part written in C) was originally authored by [Leif Bruder](http://defineanswer42.wordpress.com) in 2014 under a public domain license. Thanks, Leif!

It sort of works, but unfortunately, causes the browser to hang. I would really like to know why, but have yet to find a cause.

# Issues

 1. `forth.c` runs great on Linux x64 via `gcc`. See `forth_native_exe` to try it on your own machine. The source was compiled via `gcc forth_native.c -o forth_native_exe`. I only had to change the original source in two places to compile native vs. WASM (relates to cell size).
 2. When compiling `forth_wasm.c` to binary (see: `program.wasm` and `index.html`) via [WASM Fiddle](https://wasdk.github.io/WasmFiddle/), the program sort-of-kind-of runs. The problem is that it does not pause and freezes the browser tab on both Chrome and Firefox.

# How to Replicate

1. (optional) Run `forth_native_exe` on a Linux machine. Notice that it does not crash.
2. Open `index.html` in Chrome. Notice that it crashes. [This link will cause your tab to hang, probably.](https://rawgit.com/RickCarlino/WASM-Forth/master/index.html)
3. Open `index.html` in Firefox. Notice that it crashes.  [This link will cause your tab to hang, probably.](https://rawgit.com/RickCarlino/WASM-Forth/master/index.html)


...doe anyone have any ideas as to why?

# License

`forth.c` is licensed as public domain software. All other code is licensed under the MIT license.
