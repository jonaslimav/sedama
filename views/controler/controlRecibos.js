var firebaseConfig = {
    apiKey: "AIzaSyDAsi3ULLpIlf7b5KdJ3up3PjKnvasrSJQ",
    authDomain: "sedama-fc903.firebaseapp.com",
    databaseURL: "https://sedama-fc903-default-rtdb.firebaseio.com",
    projectId: "sedama-fc903",
    storageBucket: "sedama-fc903.appspot.com",
    messagingSenderId: "790456121465",
    appId: "1:790456121465:web:eb031215f43a8c35953ca8"
  };

firebase.initializeApp(firebaseConfig);

window.onload = listar;



function InserirProtocolo() {


   var cpf = document.getElementById("cpf").value
    var i=0;
    var databaseRef = firebase.database().ref('protocolo/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
                
            if(childData.cpf==cpf && i==0){
          alert("CPF ja consta em RECIBOS!!")
           i=1;
            } 



            });
            if(i==0){

                let protocolo_id = false;


                const protocolo = {
            
                    
                    nomeProdutor: nomeProdutor = document.getElementById("produtor").value.toUpperCase(),
                    cpf: cpf = document.getElementById("cpf").value,
                    localidade: localidade = document.getElementById ("localidade").value.toUpperCase(),
                    rg: rg = document.getElementById("rg").value,
                    date:new Date()*-1,
                    user:localStorage.getItem("user")
        
                    
                    
                };
            
                if (!protocolo_id) {
                    protocolo_id = firebase.database().ref().child('protocolo').push().key;
                }
                let updates = {}
                updates["/protocolo/" + protocolo_id] = protocolo;
                let protocolo_ref = firebase.database().ref();
                firebase.database().ref().update(updates);
                window.location.reload();
               
    }});
  

       
   
   
  
  
    
}
function deletar(cpf){

    var databaseRef = firebase.database().ref('protocolo/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
              var key =childSnapshot.key;  
            if(childData.cpf==cpf ){
                firebase.database().ref('protocolo').child(key).remove();
                
            } 
        });
        window.location.reload();
    })
 

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
    var databaseRef = firebase.database().ref('protocolo/');
    var rowIndex = 1;
    var horasTr=0;
    var dias=0;
    var dataAnt;
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var row = tblUsers.insertRow(rowIndex);
            var cellNome = row.insertCell(0);
            var cellCPF = row.insertCell(1);
            var cellLocalidade = row.insertCell(2);
            var cellRG = row.insertCell(3);            
            var cellImprimir = row.insertCell(4);
            var cellUser =row.insertCell(5);

            
            
            cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
            cellCPF.innerHTML=`<input type="button" class="btn btn" value="${childData.cpf}" onclick="deletar('${childData.cpf}')"}/>`;
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            cellRG.appendChild(document.createTextNode(childData.rg));
            cellImprimir.innerHTML=`<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimir('${childKey}')"}/>`;
            cellUser.appendChild(document.createTextNode(childData.user?childData.user:""));

           

            rowIndex = rowIndex + 1;
        });

        document.getElementById("inf").innerHTML=`<h6>PRODUTORES:&nbsp ${rowIndex-1} &nbsp &nbsp &nbsp </h6>`;
    });
    
}





function imprimir(key){



    var databaseRef = firebase.database().ref('protocolo/');
    var rowIndex = 1;
    var horasTr=0;
    var dias=0;
    var dataAnt;
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            
            if(key == childKey){


                var nomePr = childData.nomeProdutor;
                var cpfPr = childData.cpf;
                var localPr = childData.localidade;
                var rgPr = childData.rg; 
                
                
                
                var x = document.getElementById("geral");
                
                x.innerHTML = `<h1>______________________________________________________________________________________________________________________
                <img src="../logPrefeitura.png" height=150 width=95%><h1> 
                <h5 style="
                line-height: 1.75;
                align-content: center;
                text-align: justify;">
                
                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,27)}/${getRandomInt(1,2)}/2025 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 134,40<br>
                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2025 </strong><br><br>
                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                <br>	<img src="../logotrator.png" alt="some text" height=150 width=90%>
                
                    </h5>
                    <h1>_____________________________________________________________________________________________________________________<br>

                    <h1>______________________________________________________________________________________________________________________
                <img src="../logPrefeitura.png" height=150 width=95%><h1> 
                <h5 style="
                line-height: 1.75;
                align-content: center;
                text-align: justify;">
                
                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,27)}/${getRandomInt(1,2)}/2024 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 134,40<br>
                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2024 </strong><br><br>
                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                <br>	<img src="../logotrator.png" alt="some text" height=150 width=90%>
                
                    </h5>
                    

                    <h3>______________________________________________________________________________________________________________________
                <img src="../logPrefeitura.png" height=150 width=95%><h1> 
                <h5 style="
                line-height: 1.75;
                align-content: center;
                text-align: justify;">
                
                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,27)}/${getRandomInt(1,2)}/2023 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 134,40<br>
                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2023 </strong><br><br>
                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                <br>	<img src="../logotrator.png" alt="some text" height=150 width=90%>
                
                    </h5>
                
                
                
                    <h3>_____________________________________________________________________________________________________________________<br>
                <h3>______________________________________________________________________________________________________________________
                <img src="../logPrefeitura.png" height=150 width=95%><h3> 
                <h5 style="
                line-height: 1.75;
                align-content: center;
                text-align: justify;">
                
                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2022 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 134,40<br>
                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2022 </strong><br><br>
                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                <br>	<img src="../logotrator.png" alt="some text" height=150 width=90%>
                
                    </h5>
                
                
                
                    
                            
                             <img src="../logPrefeitura.png" height=150 width=95%><h3> 
                                <h5 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2021 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 134,40<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2021 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                <br>	<img src="../logotrator.png" alt="some text" height=150 width=90%>
                
                                    </h5>
                
                
                
                                    <h3>_____________________________________________________________________________________________________________________<br>
                                    _____________________________________________________________________________________________________________________<br>
                                    <img src="../pref2020.png" height=300 width=100%><h3> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2020</strong><br></h1>
                                   <h5 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2020 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 160,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2020 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h5><br><br>
                    
                                    
                                    
                                 
                                    <img src="../pref2020.png" height=300 width=100%><h3> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp 
                                    &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2019</strong><br></h3>
                                   <h5 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2019 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 160,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2019 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h5><br><br><br>
                    
                                    
                                    
                                    <h3>_____________________________________________________________________________________________________________________<br>
                                    <h3>_____________________________________________________________________________________________________________________<br>
                                    <img src="../pref2020.png" height=300 width=100%><h3> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                     &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp
                                      &nbsp &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2018</strong><br></h3>
                                   <h5 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2018 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 160,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2018 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h5><br><br><br>
                    
                                    
                                   <h5 style="
                                    line-height: 1.75;
                                    align-content: center;
                                    text-align: justify;"> <img src="../pref2017.png" height=300 width=100%></h5><h3> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp
                                    &nbsp &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp
                                    &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2017</strong><br></h3>
                                   <h5 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2017 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 140,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2017 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h5><br><br>
                    
                                    
                                    
                                    <h3>_____________________________________________________________________________________________________________________<br>
                                    <h3>_____________________________________________________________________________________________________________________<br>
                                    <img src="../pref2017.png" height=300 width=100%><h3> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                     &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp 
                                     &nbsp &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2016</strong><br></h3>
                                   <h5 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2016 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 140,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2016 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h5><br><br>
                    
                                    
                                    
                                  <img src="../pref2017.png" height=350 width=100%><h3> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                     &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp 
                                     &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2015</strong><br></h3>
                                   <h5 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2015 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 120,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2015 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h5><br><br><br>
                    
                                    
                                    
                                    <h3>_____________________________________________________________________________________________________________________<br>
                                    <h3>_____________________________________________________________________________________________________________________<br>
                                    <img src="../pref2013.png" height=300 width=90%><h3> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                     &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp
                                      &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2014</strong><br></h3>
                                   <h5 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2014 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 112,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2014 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h5><br><br>
                    
                                    
                                  <img src="../pref2013.png" height=300 width=90%><h3> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                     &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp
                                      &nbsp &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2013</strong><br></h3>
                                   <h5 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2013 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 100,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2013 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h5>
                                    
                                    <br>br>
                                    
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

function horasFormat(horas){

  var hora= String(horas).substring(0,1);
    var minutos= ((Number(horas)-Number(hora))*60).toFixed(0);
    if(minutos==0){
        minutos="";
    }else{
        minutos=minutos+" Min";
    }
    return hora+' Hr '+ minutos;
}
function sair(){

    localStorage.clear();
    window.location.href="PROTRATOR.html";
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }