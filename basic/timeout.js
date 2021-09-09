console.log("Hello");

setTimeout(() => console.log("Time"), 2000);
// setTimeout se apila en callstack con su callback, y el callback se apila en WebAPIs como Timer(cb) a la espera, luego pasa al Task queue en la cola de tareas, como no hay ninguno en cola pasa primero a la espera, pero hasta q no se termine de ejecutar toda la pila del callstack el event loop no lo saca del task queue para mandarlo al callstack

console.log("World");


// Ejemplo de otra Web API, no tiene xq ser solo Timers, puede ser una Peticion de red http como esta (el navegador no la tiene pero la libreria instalada aqui si):

console.log("Hello");

url = "http://example.com";

request(url, (data) => {
    console.log(data);
});
console.log("World");
