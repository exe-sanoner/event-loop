const btnClick = document.getElementById("btn-click");
const numClicks = document.getElementById("num-clicks");
const btnSlow = document.getElementById("btn-slow");

let clicks = 0;
btnClick.onclick = () => {
  numClicks.innerHTML = `Number of clicks: ${++clicks}`;
};

// los onclicks son WEB APIs tambien. Lo maneja el navegador !!!
// El click(cb) con el callback se guarda en WebAPIs a la espera que le de click

// El RENDER se ejecuta solo cuando el callstack esta vacio!!
// En el RENDER se almacena el CSS, el Layout de mi HTML y Pixels por pixels donde yo toque
// Si tengo 60fps, se hace 1 render cada 16ms aprox!!!
// Cuando hago click en el button, se apila en mi taskqueue, como no hay nada pasa primero, el event loop nos apila el cb() en el call stack, el cb se ejecuta, que es un console.log(compute(4)), por lo que se apila ahora la funcion compute() que tarda un monton!!
// Que es lo que pasa con el render?? No puedo renderizar porque para renderizar, el callstack tiene que estar VACIO!!
// Cuando termina esa funcion compute() y salimos del cb, se llama a la funcion log() que me imprime en consola, luego sale de esta, sale del cb(), queda vacio el call stack y recien ahi renderiza nuevamente... 
// Entonces, en vez de hacer un render cada 16ms, lo hicimos luego de 2seg o lo que demoro la funcion compute()
// CONCLUSION: Una funcion muy lenta puede BLOQUEARME EL RENDERIZADO!!!

// Funcion lenta que simule un bloqueo
const compute = (num) => {
  const limit = 7_000;
  for (let i = 0; i < limit; i++) {
    for (let j = 0; j < limit; j++) {
      num **= 2;
      num = Math.sqrt(num);
    }
  }
  return num;
};

// btnSlow.onclick = () => {
//   console.time();      //   para ver cuanto tarda todo
//   console.log(compute(4));
//   console.timeEnd();
// }

// cuanto intento clickear en Click me! despuies de presionar Slow Operation, demora en sumarme los clicks


// EVENT LOOP y RENDERIZADO ( Render + taskqueue )
// Ahora hagamoslo pero para un array entero

btnSlow.onclick = () => {
  const nums = [1.5, 2.5, 3.5, 4.5];
  for (const n of nums) {
    setTimeout(() => {
      console.log(compute(n));
    }, 0);
    // Promise.resolve().then(() => console.log(compute(n)));
  }
};

// Si NO tuviera el setTimeout dentro del bucle:
// En este caso, cuando hago click en btnSlow y el cb() pasa al callstack, compute() se ejecuta para 1 elemento del array (es un bucle), luego se ejecuta el log() con el resultado de este, y vuelve a apilarse nuevamente compute() para el siguiente valor..... SIGO SIN PODER RENDERIZAR HASTA QUE TERMINE EL BUCLE!


// Que pasa si ahora lo pongo dentro:
// Ahora SI puedo meter un Render mientras se ejecuta todo!
// Ahora voy a tener en mi WEB Apis apilados: click(Cb), y 4 timers que salieron del bucle!
// El callstack queda vacio, ya se puede hacer un render mientras 
// El primer timer termina, va al taskqueue queda primero y va al callstack, llama a compute(1,5) con ese valor, y queda a la espera del resultado para luego devolverlo con el log()
// Los demas se van apilando en el taskqueue a la espera que se desocupe el callstack
// Pero cuando se desocupa el callstack, EL RENDERIZADO TIENE PRIORIDAD!!!!!
// ENTRE CADA ELEMENTO DEL ARRAY HAY UN RENDER!!!
