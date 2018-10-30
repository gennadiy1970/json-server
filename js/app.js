const form = document.querySelector(".form");
const result = document.querySelector(".result");
const list = document.querySelector(".list");
const id = form.querySelector('input[name="id"]');
const title = form.querySelector('input[name="title"]');
const author = form.querySelector('input[name="author"]');
const submit = form.querySelector(".submit");
const update = form.querySelector(".update");
const del = form.querySelector(".delete");

submit.addEventListener("click", postJSON);
result.addEventListener("click", getJSON);
update.addEventListener("click", putJSON);
del.addEventListener("click", deleteJSON);

const url = "http://localhost:3000/posts";

/* ======================= PUT ============================  */
function putJSON(e) {
  e.preventDefault();
  const updateUrl = url + "/" + id.value;
  const option = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      title: title.value,
      author: author.value
    })
  };
  fetch(updateUrl, option)
  .then(response => {
    if (response.ok) return response.json();
    throw new Error(response.statusText);
  })
  .catch(err => console.log(err));
}
/* ======================= DELETE ============================  */
function deleteJSON(e) {
  e.preventDefault();
  const option = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };
  const deleteUrl = url + "/" + id.value;
  fetch(deleteUrl, option)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .catch(err => console.log(err));
}

/* ======================= POST ============================  */
function setPostHeader() {
  console.log(+id.value + " " + title.value + " " + author.value);
}

function postJSON(e) {
  e.preventDefault();
  const option = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      id: +id.value,
      title: title.value,
      author: author.value
    })
  };

  fetch(url, option)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .catch(err => console.log(err));
}

/* ========================== GET ======================= */

function getJSON(e) {
  e.preventDefault();

  const option = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };

  fetch(url, option)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .then(data =>
      data
        .map(
          el =>
            `<li class="text">
                <p>${el.id}</p> 
                <p>${el.title}</p>
                <p>${el.author}</p>
             </li>`
        )
        .join("")
    )
    .then(str => {
      list.innerHTML = "";
      list.insertAdjacentHTML("afterbegin", str);
    })
    .catch(err => console.log(err));
}

/* ======================= DELETE ============================  */
