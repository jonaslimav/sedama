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

window.onload = listar;


function InserirVisita() {
    var data= dataAtualFormatada();
   

    
   var databaseRef = firebase.database().ref('visita/');
    
        let visita_id = false;
        



        
        const visita= {
    
            ordemN : ordemNum = localStorage.getItem("ordem"),
            produtor: nomeProdutor = document.getElementById("Produtores").value.toUpperCase(),
            tecnico: tecnico = document.getElementById ("Tecnicos").value.toUpperCase(),
            dataAtual:data,
            atividade: atividade = document.getElementById("atv").value,
            date:new Date()*-1,
            
            
        };
    
        if (!visita_id) {
            visita_id = firebase.database().ref().child('visita').push().key;
        }
        let updates = {}
        updates["/visita/" + visita_id] = visita;
        let visita_ref = firebase.database().ref();
        firebase.database().ref().update(updates);
        window.location.reload();
       
    
   
   
  
  
    
}

function listar() {

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
         

            
          
            cellOrdem.appendChild(document.createTextNode(childData.ordemN));
            cellProdutor.appendChild(document.createTextNode(childData.produtor));
            cellTecnico.appendChild(document.createTextNode(childData.tecnico));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellImprimir.innerHTML='<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimir(this)"}/>';


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



var x = document.getElementById("geral");

x.innerHTML = `
                <img src="../PARTECIMA.png" height=300 width=100%><h2 style="
                text-align: center;"> 
               <strong> Relatorio de Visitas <br>00${numeral}</strong>
                            
                <br>
                <br>
                <strong> PRODUTOR :</strong>${nomePr}<br>
                <strong> TECNICO :</strong>${nomeTec}<br>
                <strong> DATA :</strong>${dataPr}<br>

                <VISITA: <strong><br><br>
                
                    AQUI VAI SER O RESUMO DA VISITA REALIZADA
</h2>
              <h3 style= "text-align:center; line-height:1.75;">
                 <strong>Francisco Silva Lima <br> Secretario de Desenvolvimento<br>
                 Agrário e Meio Ambiente - SEDAMA</h3>
                 <div class="footer" style="position:absolute;
                 bottom:0;
                 width:100%;">
                 <img src="../logPref.png" alt="some text"  width=100% ></div>
					
                       `;
                    
                    
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
