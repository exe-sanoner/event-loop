// PROMISE: Valor que existe en el futuro (para ser futuro, deberia usar setTimeout)
// resolve: ha tenido exito
// reject: rechazarla porque hubo un error
// then: luego de que haya sido rechazada o resulta, determino que hago con el value

const f = () => new Promise((resolve, reject) => {
  const err = true;   // hubo un error si es true
  if (err) {
    setTimeout(() => reject('Error aqui!'), 0);
  } else {
    setTimeout(() => resolve('any value'), 0);
  }
});

const p = f(); // la promesa va a ser la ejecucion de f()
p.then(v => console.log(v)).catch(e => console.log(e));   // Error aqui! o any value
console.log(p);   //  Promise {<pending>}

// -------------------------------------------------


// PROMESA envolviendo el REQUEST

const url = "https://jsonplaceholder.typicode.com";

const getUser = (id) =>
  new Promise((resolve, reject) => {
    request({ uri: `${url}/users?id=${id}` }, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });

const getPosts = (id) =>
  new Promise((resolve, reject) => {
    request({ uri: `${url}/posts?userId=${id}&_limit=3` }, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });


// muchos metodos de callbacks metidos en una promesa
// mucho mas legible!!
// Pero ATENCION... son callbacks????
// NO!!! LOS CALLBACKS DE LAS PROMESAS SON MICROTASKS!!!!
// Y SON LOS MAS PRIORITARIOS!!!

getUser(1)  // con id = 1
  .then((users) => {
    const user = users[0]; // el primer usuario
    console.log(user);  // retorno los datos del usuario en un object
    return user;
  })
  .then((user) => getPosts(user.id))
  .then((posts) => {
    console.log(posts); // retorno los posts del usuario en un array de objects
  })
  .catch(e => console.error(e)); // un solo metodo catch capturo todos los errores juntos
