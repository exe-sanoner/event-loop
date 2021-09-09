// AHORA USANDO FETCH!!!!

const url = "https://jsonplaceholder.typicode.com";

const btnClick = document.getElementById("btn-click");
const numClicks = document.getElementById("num-clicks");
const btnSlow = document.getElementById("btn-slow");
const content = document.getElementById("content");

let clicks = 0;
btnClick.onclick = () => numClicks.innerHTML = `Number of clicks: ${++clicks}`;

btnSlow.onclick = () => getUserInfo(1);

// const getUserInfo = (id) => {
//   fetch(`${url}/users?id=${id}`)
//     .then(res => res.json())  
//     .then(users => content.innerHTML += `<h3>User Info</h3><p>${users[0].email}</p>`)
//     .then(() => fetch(`${url}/posts?userId=${id}&_limit=3`))
//     .then(res => res.json())
//     .then(posts => {
//       content.innerHTML += posts.map(post =>
//         `<div class="post"><h4>${post.title}</h4></div>`
//       ).join('');
//       return Promise.all(posts.map(post => 
//         fetch(`${url}/comments?postId=${post.id}&_limit=2`)
//       ));
//     })
//     .then(responses => Promise.all(responses.map(res => res.json())))
//     .then(comments => {
//       document.querySelectorAll('.post').forEach((post, i) => {
//         post.innerHTML += comments[i].map(comment => 
//           `<p><span>${comment.email}</span>: ${comment.body}</p>`
//         ).join('');
//       });
//     })
//     .catch(err => console.log(err));
// }

const getUser = (id) => (
  fetch(`${url}/users?id=${id}`)
    .then(res => res.json())    // es como hacer JSON.parse --> corre en otro hilo, no bloquea mas!!!!
    .then(users => {
      content.innerHTML += `<h3>User Info</h3><p>${users[0].email}</p>` // email del 1er user
      return users[0]
    })
)

const getPosts = (user) => {
  return fetch(`${url}/posts?userId=${user.id}&_limit=3`)
    .then(res => res.json())
    .then(posts => {
      content.innerHTML += posts.map(post =>
        `<div class="post"><h4>${post.title}</h4></div>`  
      ).join('')

      return posts;
    })
}

// Promise.all()  -->  Cuando mapeo cada post a un fetch, y voy a terminar con un Array de Promises. Si todas las promesas tienen exito, lo que hace el Promise.all es generar una microtask con los resultados de esas Promises. Si una falla, me da una Promise fallada

const getComments = (posts) => {
  Promise.all(posts.map(post => 
    fetch(`${url}/comments?postId=${post.id}&_limit=2`)  
  ))
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(comments => {
      console.log(comments);
      // uso querySelector para seleccionar los posts, porque no tengo acceso al parametro post anterior porque es otro callback aparte!!!!
      document.querySelectorAll(".post").forEach((div, i) => { 
        div.innerHTML += comments[i].map(comment =>
          `<p><span>${comment.email}</span>: ${comment.body}</p>`  
        ).join('')

        return comments;
      })
    })
}

const getUserInfo = (id) => {
  getUser(id)
    .then(user => getPosts(user))
    .then(posts => getComments(posts))
    .catch(e => console.log(e))
}
