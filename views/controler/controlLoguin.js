
var firebaseConfig = {
    apiKey: "AIzaSyCalbx4hqCxrVt500RKGIb-ENwIHs9stAU",
    authDomain: "sedama-4dd5c.firebaseapp.com",
    databaseURL: "https://sedama-4dd5c-default-rtdb.firebaseio.com",
    projectId: "sedama-4dd5c",
    storageBucket: "sedama-4dd5c.appspot.com",
    messagingSenderId: "492670080550",
    appId: "1:492670080550:web:42ad24f36c7f5cd578b8e7"
  };

firebase.initializeApp(firebaseConfig);

function cadastrar() {

    var auth = null;

    firebase.auth().createUserWithEmailAndPassword(document.getElementById("email").value, document.getElementById("senha").value).then(function (user) {
        alert("Cadastrado com sucesso");
        auth = user;
    }).catch(function (error) {
        alert("Falha ao cadastrar");
    });
}

function deletar() {
   
        var user = firebase.auth().currentUser;
    
        if (user) {
            user.delete().then(function () {
                alert("Usuário deletado com sucesso.");
            }).catch(function (error) {
                alert("Erro ao deletar o usuário: " + error.message);
            });
        } else {
            alert("Nenhum usuário está autenticado.");
        }
    }
    


function login() {

    var auth = null;


    firebase.auth().signInWithEmailAndPassword(document.getElementById("email").value, document.getElementById("senha").value)
        .then(function (user) {
            alert("Logado com sucesso");
            auth = user;
          
            localStorage.setItem("auth",true);
            localStorage.setItem("user",document.getElementById("email").value);
            window.location.href = "PROTRATOR2025.html";
        }).catch(function (error) {
            alert("Falha ao logar");


        });
}
