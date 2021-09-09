const url = "https://jsonplaceholder.typicode.com";

const btnClick = document.getElementById("btn-click");
const numClicks = document.getElementById("num-clicks");
const btnSlow = document.getElementById("btn-slow");
const content = document.getElementById("content");

let clicks = 0;
btnClick.onclick = () => numClicks.innerHTML = `Number of clicks: ${++clicks}`;

btnSlow.onclick = () => getUserInfo(1); // devuelve la info para el usuario 1

// asi es como la libreria dice que hay que armar el cod
const getUserInfo = (id) => {
  request({ uri: `${url}/users?id=${id}` }, (err, res, body) => {
    if (err) {
      console.log(err);   // primero imprimo error
    } else {
      const user = JSON.parse(body)[0];
      // console.log(user)
      content.innerHTML += `<h3>User Info</h3><p>${user.email}</p>`;
      // Todos los posts que tiene ese usuario (&_limit=3` lo limite solo a 3 posts), hago otra peticion request:
      request({ uri: `${url}/posts?userId=${user.id}&_limit=3` }, (err, res, body) => {
        if (err) {
          console.log(err);
        } else {
          const posts = JSON.parse(body);
          // console.log(posts);
          posts.forEach(post => {
            // todo esto me devuelve los comentarios de los posts, hago otra request!:
            request({ uri: `${url}/comments?postId=${post.id}&_limit=3` }, (err, res, body) => {
              if (err) {
                console.log(err);
              } else {
                const comments = JSON.parse(body);
                // console.log(comments);
                const html = comments.map(comment => 
                  `<p><span>${comment.email}</span>: ${comment.body}</p>`
                ).join('');
                // este ultimo me devuelve cada titulo:
                content.innerHTML += `<div class="post"><h4>${post.title}</h4>${html}</div>`;
              }
            });
          });
        }
      });
    }
  });
}


// REFACTORIZAR ESTE CODIGO HORRIBLE:
// pero si hiciera esto tendria un problema (el problema de los callbacks)
// Sino por ej si retornara el usuario en getUser me devolveria undefined
// Necesito una cadena de callbacks ya que cuando se me devuelve uno, lo uso para el otro!

const getUser = (id) => {}

const getPosts = (user) => {}

const getComments = (post) => {}
