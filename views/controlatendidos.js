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




function listar() {
	
	
    if(!localStorage.getItem("auth")){
        alert("Necessario fazer login");
      window.location.href = "loguin.html";

    }

    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('solicitacao/');
    var rowIndex = 1;
    
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
if(childData.atendido==1){
            var row = tblUsers.insertRow(rowIndex);
            var cellSecretaria = row.insertCell(0);
            var cellData = row.insertCell(1);
            var cellHora = row.insertCell(2);  
            var cellPercurso = row.insertCell(3);          
            var cellMotivo = row.insertCell(4);
            var cellMotorista = row.insertCell(5)
            var cellTel=row.insertCell(6);
            var cellAtender = row.insertCell(7);
            
            
            
            cellSecretaria.appendChild(document.createTextNode(childData.secretaria));
            cellData.appendChild(document.createTextNode(childData.data));
            cellHora.appendChild(document.createTextNode(childData.horario));
            cellPercurso.appendChild(document.createTextNode(childData.percurso));
            cellMotivo.appendChild(document.createTextNode(childData.motivo));
            cellMotorista.appendChild(document.createTextNode(childData.motorista));
            cellTel.appendChild(document.createTextNode(childData.telefone));

           

            rowIndex = rowIndex + 1;
}
        });

        document.getElementById("inf").innerHTML=`<h6>SOLICITAÇÕES ATENDENDIDAS:&nbsp ${rowIndex-1}</h6>`;
    });
    
}





function sair(){

    localStorage.clear();
    window.location.href="loguin.html";
}
