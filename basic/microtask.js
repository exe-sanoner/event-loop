console.log("Hello");

setTimeout(() => console.log("Time"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("World");


/* ORDEN DE EJECUCION:
Hello   
World   
Promise
Time
*/

// LOS MICROSTASKS SON LOS QUE MAS PRIORIDAD TIENEN! MAS QUE EL RENDERIZADO!!!

// Empezando el codigo:

// Se apila en callstack la funcion anonima anonymus()
// Se apila la funcion log(), se ejecuta, y aparece el Hello en pantalla. Y sale el log del stack
// setTimeout() entra en callstack, sale del stack y queda en WEBAPIs como timer(ct) con su callback
// Este termina rapido xq tiene 0 segundos, sale del webapis, y va al task queue, se pone primero pero no podemos ejectuarlo porque stack no esta vacio
// Tenemos luego una Promise que se resuelve inmediatamente, no genera un callback, genera un Microtask y se coloca alli primero porque no hay ningun otro
// Se apila la ultima funcion log(), se ejecuta, y aparece el World en pantalla. Y sale el log del stack 
// Sale anonymus() del stack tambien y queda vacio

// AHORA: queda 1 MICROTASK y 1 TASK QUEUE a la espera
// LA MICROTASK tiene mas prioridad que todo, incluido el Render!!!!

// Por lo tanto, se apila este cp() que sale del microtask en el callstack, que llama a un log(), devuelve lo que tenga el console q devolver en pantalla. Luego se va cp() y luego log() del call stack
// Ya ahora si por ultimo, sale ct() del task queue va al call stack y ejecuta un log(), devuelve en pantalla lo que tenga, sale log() y ct() del stack y queda todo ok