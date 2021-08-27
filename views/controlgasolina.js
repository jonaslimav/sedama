
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

window.onload = listar;

function formatarData(dt){

    var ano = String(dt).slice(0,4);
    var mes =String(dt).slice(5,7);
    var dia =String(dt).slice(-2);

    return dia+"/"+mes+"/"+ano;
}

function InserirProtocolo() {
    

        let gasolina_id = false;


        const gasolina = {
    
            
            secretaria: secretaria = document.getElementById("secretaria").value,
            data: formatarData(document.getElementById("data").value),
            percurso: percurso = document.getElementById ("percurso").value.toUpperCase(),
            horario: horario = document.getElementById("hora").value,
            veiculolitros: veiculolitros= "",
            motivo: motivo = document.getElementById("motivo").value.toUpperCase(),
            date:new Date()*-1,
            telefone:telefone =document.getElementById("tel").value,
            atendido: atendido = 0,
            
            
        };
    
        if (!gasolina_id) {
            gasolina_id = firebase.database().ref().child('gasolina').push().key;
        }
        let updates = {}
        updates["/gasolina/" + gasolina_id] = gasolina;
        let gasolina_ref = firebase.database().ref();
        firebase.database().ref().update(updates);
        window.location.reload();
  
    
}

function listar() {
	
	
    if(!localStorage.getItem("auth")){
        alert("Necessario fazer login");
      window.location.href = "loguin.html";

    }

    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('gasolina/');
    var rowIndex = 1;
    
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
if(childData.atendido==0){
            var row = tblUsers.insertRow(rowIndex);
            var cellSecretaria = row.insertCell(0);
            var cellData = row.insertCell(1);
            var cellHora = row.insertCell(2);  
            var cellPercurso = row.insertCell(3);          
            var cellMotivo = row.insertCell(4);
            var cellVeiculo = row.insertCell(5)
            var cellTel=row.insertCell(6);
            var cellAtender = row.insertCell(7);
            
            
            
            cellSecretaria.appendChild(document.createTextNode(childData.secretaria));
            cellData.appendChild(document.createTextNode(childData.data));
            cellHora.appendChild(document.createTextNode(childData.horario));
            cellPercurso.appendChild(document.createTextNode(childData.percurso));
            cellMotivo.appendChild(document.createTextNode(childData.motivo));
            cellVeiculo.appendChild(document.createTextNode(childData.veiculolitros));
            cellTel.appendChild(document.createTextNode(childData.telefone));
            cellAtender.innerHTML=`${localStorage.getItem("usuario")?`<input type="button" class="btn btn-danger" value="ATENDER." onclick="atender(${childData.date})"}/>`:""}`;

           

            rowIndex = rowIndex + 1;
}
        });

        document.getElementById("inf").innerHTML=`<h6>SOLICITAÇÕES A ATENDER:&nbsp ${rowIndex-1}</h6>`;
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

function atender(dt){

  
    var proto;
    
    
    var databaseRef = firebase.database().ref('gasolina/');
   
        
        databaseRef.orderByChild("date").once('value', function (snapshot) {
            var key;
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                    
                if(childData.date===dt){
                 
                    key=childSnapshot.key;
                    proto=childData;
               
                }
            });

           proto.veiculolitros = prompt("Qual o veiculo e quantidade autorizadas? Ex. CARRO QOU1502 / 10l").toLocaleUpperCase();
           if (proto.veiculolitros == null || proto.veiculolitros == "") {
            
            window.location.reload();
          }else{
            proto.atendido=1;
          }
           
            
            let updates = {}
  updates["/gasolina/" + key] = proto;;
  firebase.database().ref().update(updates);
  window.location.reload();
  
        });





}

function sair(){

    localStorage.clear();
    window.location.href="loguin.html";
}
