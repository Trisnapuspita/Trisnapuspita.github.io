window.onload = function () {
    setTimeout(function () {
      document.querySelector(".that").style.display = "none";
    }, 2000);
  }
  // REGISTER SERVICE WORKER
  if ("serviceWorker" in navigator) {
      window.addEventListener("load", function() {
          navigator.serviceWorker
              .register("/service-worker.js")
              .then(function() {
              console.log("Pendaftaran ServiceWorker berhasil");
          })
              .catch(function() {
              console.log("Pendaftaran ServiceWorker gagal");
          });
      });
  } else {
      console.log("ServiceWorker belum didukung browser ini.");
  }

  document.addEventListener("DOMContentLoaded", function() {
  let urlParams = new URLSearchParams(window.location.search);
  let teamId = Number(urlParams.get("id"));

  let btnSave = document.getElementById("save");
  let btnDel = document.getElementById("delete");

  let item = getTeamById();

  checkFav(teamId).then((msg)=> {
    btnSave.style.display = 'none';
    btnDel.style.display = 'block';
  }).catch((msg) => {
    console.log(msg)
    btnSave.style.display = 'block';
    btnDel.style.display = 'none';
  })
  
  btnSave.onclick = function() {
    console.log("Tombol fav di klik.");
    item.then(function (team) {
      saveForLater(team);
    btnSave.style.display = 'none';
    btnDel.style.display = 'block';
    M.toast({
        html: 'Favorite team added successfully!'
    });
    });
  };

  btnDel.onclick = function() {
    console.log("Tombol hapus di klik.");
    deleteFavInside(teamId);
    btnSave.style.display = 'block';
    btnDel.style.display = 'none';
    M.toast({
        html: 'Favorite team deleted successfully!'
    });
  };
  });


