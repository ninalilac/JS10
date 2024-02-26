"use strict";

//

let img;


//


function createImg(imagePath) {
  return new Promise((resolve, reject) => {
    const imgElement = document.createElement('img');
    imgElement.src = imagePath;

    imgElement.addEventListener('load', () => {
      resolve(imgElement);
    });

    imgElement.addEventListener('error',() => {
      reject (new Error('შეცდომა'));
    });

    document.body.appendChild(imgElement);

    img = imgElement;
  });
}



 createImg('images/image1.jpg')
  .then((image) => {
    setTimeout(() => {
      document.body.removeChild(image);
      createImg('images/image2.jpg')
        .then((image2) => {
         
          setTimeout(() => {
            document.body.removeChild(image2);
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 2000);
  })
  .catch((error) => {
    console.error(error);
  });





// post 
const divPostWraper = document.getElementById("postBlock");
const postOverlay = document.getElementById("overlay");
const contentBlock = document.getElementById("content");
const overlayClose = document.getElementById("close");
const btnAdd = document.getElementById("add");
const addOverlay = document.getElementById("addOverlay");
const form = document.getElementById("form-addOverlay");


//


function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`შეცდომა!: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('შეცდომა!:', error);
    });
}

// 


fetchData("https://jsonplaceholder.typicode.com/posts")
  .then(data => {
    data.forEach(element => {
      createPost(element);
    });
  });




function createPost(item) {
  const divContainer = document.createElement("div");
  divContainer.classList.add("post");
  divContainer.setAttribute("data-id", item.id);

  const h3Post = document.createElement("h3");
  h3Post.innerText = item.id;

  const h2Post = document.createElement("h2");
  h2Post.innerText = item.title;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete This Post";
  deleteButton.setAttribute("data-id", item.id);

  divContainer.appendChild(h3Post);
  divContainer.appendChild(h2Post);
  divContainer.appendChild(deleteButton);

  //

  deleteButton.addEventListener("click", function (e) {
    e.stopPropagation();
    console.log(e.target);
    const deleteId = e.target.getAttribute("data-id");
    deletePost(deleteId, divContainer);
  });
  //

  // 
  function deletePost(deleteId) {
    const deleteUrl = `https://jsonplaceholder.typicode.com/posts/${deleteId}`;
    console.log(deleteUrl);
    fetch(deleteUrl, {
      method: "DELETE",
    }).then(function (deletedData) {
      console.log(deletedData); //წაშლილი ინფორმაცია
      divContainer.remove();
    });
  }
  //
  //

  divContainer.addEventListener("click", function () {
    const postId = this.getAttribute("data-id");
    postOverlay.classList.add("activeOverlay");
    const newUrlPost = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    fetchData(newUrlPost)
      .then(elementNew => {
        overlayInfo(elementNew);
      });
  });

  divPostWraper.appendChild(divContainer);
}



// 
function overlayInfo(item) {
  const pDescr = document.createElement("p");
  pDescr.innerText = item.body;

  contentBlock.appendChild(pDescr);

}

// 

// psotis damateba
btnAdd.addEventListener("click", function () {
  addOverlay.classList.add("activeAdd");
});



// overlay close
overlayClose.addEventListener("click", function () {
  postOverlay.classList.remove("activeOverlay");
  contentBlock.innerHTML = " ";
});

// 

const overlayClose2 = document.createElement('i');
overlayClose2.classList.add("fa", "fa-solid", "fa-circle-xmark");
overlayClose2.setAttribute("id", "eclose");
overlayClose2.style.color = ("#C7A27C");

overlayClose.appendChild(overlayClose2);

//



btnAdd.addEventListener("click", function () {
  addOverlay.classList.add("activeAdd");

});


const addPost = document.createElement('i');
addPost.classList.add("fa-solid", "fa-square-plus")
add.style.color =  ("#C7A27C");
btnAdd.appendChild(addPost);






