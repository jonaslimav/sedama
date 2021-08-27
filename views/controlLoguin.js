var firebaseConfig = {
    apiKey: "AIzaSyD-i43m5nv53zJfucUX5lKVVLQ03ZRrd9U",
    authDomain: "transportesquixelo.firebaseapp.com",
    databaseURL: "https://transportesquixelo-default-rtdb.firebaseio.com",
    projectId: "transportesquixelo",
    storageBucket: "transportesquixelo.appspot.com",
    messagingSenderId: "397542307745",
    appId: "1:397542307745:web:de4e51af76cc3d8cb93de0"
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


function login() {

    var auth = null;


    firebase.auth().signInWithEmailAndPassword(document.getElementById("email").value, document.getElementById("senha").value)
        .then(function (user) {
            alert("Logado com sucesso");
            console.log(user);
            var email = document.getElementById("email").value;
           
            auth = user;
            if(email =="sistematransportesqxl@gmail.com"){
                localStorage.setItem("usuario",true);
            }
          
            localStorage.setItem("auth",true);
            window.location.href = "solicitacao.html";
        }).catch(function (error) {
            alert("Falha ao logar");


        });
}