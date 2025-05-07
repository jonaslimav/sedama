var firebaseConfig = {
    apiKey: "AIzaSyDoxvGgx4Q9r6wNIFX1bBKAK59xVkQifyc",
    authDomain: "sedama-quixelo.firebaseapp.com",
    databaseURL: "https://sedama-quixelo-default-rtdb.firebaseio.com",
    projectId: "sedama-quixelo",
    storageBucket: "sedama-quixelo.firebasestorage.app",
    messagingSenderId: "390225225988",
    appId: "1:390225225988:web:3ddb0a6af191729af40851",
  };

firebase.initializeApp(firebaseConfig);

window.onload = listar;


function InserirVisita() {
    var data= document.getElementById("Datavisita").value;
   

    
   var databaseRef = firebase.database().ref('visita/');
    
        let visita_id = false;
        let num;


        databaseRef.orderByChild("date").limitToFirst(1).once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
    
    
                 num =childData.ordemN;
                
            });
           
          
    
        
       
        var ordemNum = num;
        var dt= new Date();
           ordemNum = document.getElementById("tbl_users_list").getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerHTML;
      ;
           
           if(String(ordemNum).slice(-4) == String(dt.getFullYear())){
               ordemNum = (Number(String(ordemNum).slice(0,-5))+1)+'/'+dt.getFullYear();
            
           }else{
               ordemNum = '001/'+ dt.getFullYear();
           }


        
        const visita= {
    
            ordemN : ordemNum,
            localidade: document.getElementById("Localidade").value,
            produtor: nomeProdutor = document.getElementById("produtor").value.toUpperCase(),
            tecnico: tecnico = document.getElementById ("tecnico").value.toUpperCase(),
            dataAtual:formatarData(data),
            atividade: atividade = document.getElementById("atv").value,
            date:new Date()*-1,
            user:localStorage.getItem("user")

            
        };
    
        if (!visita_id) {
            visita_id = firebase.database().ref().child('visita').push().key;
        }
        let updates = {}
        updates["/visita/" + visita_id] = visita;
        let visita_ref = firebase.database().ref();
        firebase.database().ref().update(updates);
        window.location.reload();
       
    
    });
   
  
  
    
}

function listar() {

    if(!localStorage.getItem("auth")){
        alert("Necessario fazer login");
      window.location.href = "loguin.html";

    }
    
    console.log(localStorage.getItem("user"));
    if(localStorage.getItem("user")=="kalitianne1@gmail.com"){
        window.location.href="PROTRATOR2025.html";


           }
    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('visita/');
    var rowIndex = 1;
    listarProdutores();
    listarTecnicos();
    
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var row = tblUsers.insertRow(rowIndex);

            var cellOrdem=row.insertCell(0);
            var cellProdutor = row.insertCell(1);
            var cellTecnico = row.insertCell(2);
            var cellData = row.insertCell(3);
            var cellImprimir = row.insertCell(4);
            var cellUser =row.insertCell(5);


            
          
            cellOrdem.appendChild(document.createTextNode(childData.ordemN));
            cellProdutor.appendChild(document.createTextNode(childData.produtor));
            cellTecnico.appendChild(document.createTextNode(childData.tecnico));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellImprimir.innerHTML='<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimir(this)"}/>';
            cellUser.appendChild(document.createTextNode(childData.user?childData.user:""));


            rowIndex = rowIndex + 1;
        });
        localStorage.setItem("ordem", rowIndex);
        document.getElementById("inf").innerHTML=`<h6>VISITAS:&nbsp ${rowIndex-1} </h6>`;
    });
   
}



function dataAtualFormatada() {
    var data = new Date(),
        dia = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
}



function imprimir(dt){

var data=dt.parentNode.parentNode.children;
var numeral = data[0].innerHTML;
var nomePr = data[1].innerHTML;
var nomeTec = data[2].innerHTML;
var dataPr =data[3].innerHTML;
let visita= "";
var databaseRef = firebase.database().ref('visita/');
databaseRef.orderByChild("date").once('value', function (snapshot) {
        
    snapshot.forEach(function (childSnapshot) {

        var childData = childSnapshot.val();
        if(String(numeral) == childData.ordemN ){
            
        


var x = document.getElementById("geral");

x.innerHTML = `
                <img src="../views/PARTECIMA.png" height=300 width=100%><h2 style="
                text-align: center;"> 
               <strong> Relatorio de Visitas <br>00${numeral}</strong>
                            </h2><h4 style="
                            text-align: justify; margin-left:35px; margin-right:35px;"> 
                           
                                        
                <br>
                <br>
                <strong> PRODUTOR :</strong>${nomePr}<br>
                <strong> TECNICO :</strong>${nomeTec}<br>
                <strong> DATA :</strong>${dataPr}<br>
                <strong> LOCALIDADE:</strong>${childData.localidade!=undefined?childData.localidade:""}
                    <br>

                <strong>RESUMO DA VISITA: </strong><br><br>
                
                    ${childData.atividade}
</h4>
              <h5 style= "text-align:center; line-height:1.75;">
                 
                 <div class="footer" style="position:absolute;
                 bottom:0;
                 width:100%;">
                 <img src="../logPref.png" alt="some text"  width=100% ></div>
					
                       `;
                    
                    } 
                });
            }); 
  //  printDiv();

}

function printDiv() {
   var conteudo = document.getElementById("geral").innerHTML;
    var win = window.open();
    win.document.write(conteudo);
    win.print();
    win.close();//Fecha após a impressão.  
	
}


function sair(){

    localStorage.clear();
    window.location.href="loguin.html";
}

function listarProdutores(){


    var databaseRef = firebase.database().ref('produtor/');
    var s = document.getElementById("Produtores");
    
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            s.insertAdjacentHTML("beforeend",`<option id="${childData.cpf}" value="${childData.cpf} - ${childData.nomeProdutor}">${childData.cpf} - ${childData.nomeProdutor}</option>`);
           
        });});



}


function listarTecnicos(){
    var databaseRef = firebase.database().ref('tecnico/');
    var s = document.getElementById("Tecnicos");
    
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            s.insertAdjacentHTML("beforeend",`<option id=${childData.cpf} value="${childData.cpf} - ${childData.nomeTecnico}">${childData.cpf} - ${childData.nomeTecnico}</option>`);
           
        });});



}

function formatarData(dt){

    var ano = String(dt).slice(0,4);
    var mes =String(dt).slice(5,7);
    var dia =String(dt).slice(-2);

    return dia+"/"+mes+"/"+ano;
}
function link(){
    window.location.href="https://forms.gle/ewq4qRsA2jAt38Ey7";
}
