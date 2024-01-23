
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

var valor= 107.50;

function InserirProtocolo() {
    var data= dataAtualFormatada();


   var cpf = document.getElementById("cpf").value
var horasT = 0;
var horasTotais = 0;
    var i=0;
   var databaseRef = firebase.database().ref('trator2024/');
    
   databaseRef.orderByChild("date").once('value', function (snapshot) {
       snapshot.forEach(function (childSnapshot) {
           var childData = childSnapshot.val();
               
           if(childData.cpf==cpf){
               horasT= horasT+Number(childData.horas);
            i++;
          
           }
           horasTotais=horasTotais+ Number(childData.horas);
       });
       horasT = horasT + Number(document.getElementById("horas").value);
       horasTotais = horasTotais+Number(document.getElementById("horas").value);
       console.log(horasT);
       
       var horasLimite= 1200;
       if(horasTotais>horasLimite && localStorage.getItem("user")=="wandeilsonviana@hotmail.com"){
        alert(` Horas ultrapassam o Limite do periodo (${horasLimite}hrs): ${horasFormat(horasTotais)}!!! `);

       }else if(horasT>5){

        alert(`CPF existente na base de dados e Horas ultrapassam o Limite: ${horasFormat(horasT)}!!! `);
        
       }else {

        let protocolo_id = false;


        const protocolo = {
    
            
            nomeProdutor: nomeProdutor = document.getElementById("produtor").value.toUpperCase(),
            cpf: cpf = document.getElementById("cpf").value,
            localidade: localidade = document.getElementById ("localidade").value.toUpperCase(),
            rg: rg = document.getElementById("rg").value,
            dataAtual:data,
            horas: horas = document.getElementById("horas").value,
            valorTotal:valorTotal = horas*valor,
            date:new Date()*-1,
            telefone:telefone =document.getElementById("tel").value,
            status:".",
            user:localStorage.getItem("user")
            
        };
    
        if (!protocolo_id) {
            protocolo_id = firebase.database().ref().child('trator2024').push().key;
        }
        let updates = {}
        updates["/trator2024/" + protocolo_id] = protocolo;
        let protocolo_ref = firebase.database().ref();
        firebase.database().ref().update(updates);
        window.location.reload();
       }
    
   
   });
  
  
    
}

function listar() {




        console.log(localStorage.getItem("user"));
 if(localStorage.getItem("user")=="wandeilsonviana@hotmail.com"){

         var x = document.getElementById("navbarNavDropdown");
         var y = document.getElementById("menu2")
         x.innerHTML=` <ul class="navbar-nav">
         <li class="nav-item active">
           <a class="nav-link" href="PROTRATOR2024.html">PROTRATOR <span class="sr-only">(current)</span></a>
         </li>       
         <li class="nav-item">
             <a class="nav-link" onclick="sair()">   SAIR  </a>   
         </li>
       </ul>`;
        y.innerHTML ="<br>";

    }
    if(!localStorage.getItem("auth")){
        alert("Necessario fazer login");
      window.location.href = "views/loguin.html";

    }


    
    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('trator2024/');
    var rowIndex = 1;
    var horasTr=0;
    var dias=0;
    var dataAnt;
    var val=0;


    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            if(childData.status ==undefined){
                childData.status = "";
            }

            var row = tblUsers.insertRow(rowIndex);
            var cellNome = row.insertCell(0);
            var cellCPF = row.insertCell(1);
            var cellLocalidade = row.insertCell(2);
            var cellRG = row.insertCell(3);            
            var cellHoras = row.insertCell(4);
            var cellValor = row.insertCell(5);
            var cellData = row.insertCell(6);
            var cellTel=row.insertCell(7);
            var cellStatus = row.insertCell(8);
            var cellImprimir = row.insertCell(9);
          
            var cellUser =row.insertCell(10);
            
            if(childData.telefone==undefined ){
                childData.telefone="-";
            }
            if(childData.rg==undefined ){
                childData.rg="-";
            }
            if(childData.status ==undefined){
                childData.status = "";
            }

           
            cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
            cellCPF.innerHTML=`<input type="button" class="btn btn" value="${childData.cpf}" onclick="deletar('${childKey}')"}/>`;
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            cellRG.appendChild(document.createTextNode(childData.rg));
            cellHoras.appendChild(document.createTextNode(horasFormat(childData.horas)));
            cellValor.appendChild(document.createTextNode(childData.valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellTel.appendChild(document.createTextNode(childData.telefone));
            cellImprimir.innerHTML=`<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimir(this,'${childData.cpf}')"}/>`;
            localStorage.getItem("user")=="jlvieira248@gmail.com"||localStorage.getItem("user")=="francisco.limaigt@hotmail.com"?cellStatus.innerHTML=`<input type="button" class="btn btn" value="${childData.status}." onclick="editStatus('${childKey}')"}/>`:"";
          
            cellUser.appendChild(document.createTextNode(childData.user?childData.user:""));

           if(dataAnt!=childData.dataAtual){
               dias++;
               dataAnt=childData.dataAtual;
           }
       
           val = val +childData.valorTotal;
            rowIndex = rowIndex + 1;
            horasTr = horasTr+Number(childData.horas);
        });

        document.getElementById("inf").innerHTML=`<h6>PRODUTORES:&nbsp ${rowIndex-1} &nbsp &nbsp &nbsp QUANT. HORAS A EXECUTAR:&nbsp ${horasTr.toFixed(2)} &nbsp &nbsp &nbsp DIAS:&nbsp${dias}&nbsp &nbsp &nbsp VALOR TOTAL&nbsp:${(val).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h6>`;
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

function imprimir(dt,cpf){

var data=dt.parentNode.parentNode.children;
var nomePr = data[0].innerHTML;
var cpfPr = data[1].innerHTML;
var localPr = data[2].innerHTML;
var rgPr = data[3].innerHTML;
var horaPr = data[4].innerHTML;
var valorPr = data[5].innerHTML;
var dataPr =data[6].innerHTML;


var x = document.getElementById("geral");

x.innerHTML = `
            ________________________________________________________________________________________________________________________________
				<h3> Via Produtor</h3> <img src="../logPrefeitura.png" height=220 width=95%><h1> 
				<h1>
                <br> <strong> PRODUTOR:</strong>&nbsp ${nomePr} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${cpf}<br><br>
                <strong>RG Nº:</strong>&nbsp  ${rgPr}  &nbsp &nbsp &nbsp &nbsp
                <strong> DATA:</strong>  &nbsp ${dataPr} &nbsp&nbsp&nbsp&nbsp&nbsp <strong> QUANT. HORAS:  </strong>  ${horaPr} &nbsp&nbsp <br> <br>
                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  ${valorPr}<br><br>
				<strong> TRATORISTA:______________________________________ <br><br>  DATA SERVIÇO:______/______/__________</strong><br>
				<br>	<img src="../logotrator.png" alt="some text" height=200 width=90%>

                    <h1>_____________________________________________________________________________________________________________________<br>
		

					_______________________________________________________________________________________________________________________<br>
					<h3> Via Tratorista</h3><img src="../logPrefeitura.png" height=220 width=95%><h1>
                    <br> <strong> PRODUTOR:</strong>&nbsp ${nomePr} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${cpf}<br><br>
                    <strong>RG:</strong>&nbsp ${rgPr}   &nbsp &nbsp &nbsp &nbsp
                    <strong> DATA:</strong>  &nbsp ${dataPr}<br><br>
                    <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp &nbsp &nbsp &nbsp 
                    <strong> QUANT. HORAS:  </strong>  ${horaPr}<br><br>
                    <strong> VALOR TOTAL:  </strong>  ${valorPr}&nbsp&nbsp&nbsp
					 <strong>DATA SERVIÇO:______/______/__________</strong><br><br>
					<strong> ASS. PRODUTOR: _____________________________________</strong><br><br>
					<img src="../logotrator.png" alt="some text" height=200 width=90% >
                        </h1>`; 
                    
                    
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
function completaDados(){
   
    var rowIndex = 0;
    if(rowIndex==0){

        var databaseRef = firebase.database().ref('demanda22/');
       
       
        var cpf = document.getElementById("cpf").value
    
        databaseRef.orderByChild("date").once('value', function (snapshot) {
            
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
               
                if((childData.cpf == cpf)&& rowIndex==0){
    
                    document.getElementById("produtor").value =childData.nomeProdutor;
                    document.getElementById ("localidade").value =childData.localidade;
                     document.getElementById("rg").value= childData.rg;
                     document.getElementById("telefone").value = childData.telefone;
                     document.getElementById("dap").value = childData.dap;
                     
                   rowIndex ++;
              
                }
             
                
               
              
              
            });
    
        });
    } 
    if(rowIndex==0){

        var databaseRef = firebase.database().ref('trator2021/');
       
       
        var cpf = document.getElementById("cpf").value
    
        databaseRef.orderByChild("date").once('value', function (snapshot) {
            
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
               
                if((childData.cpf == cpf)&& rowIndex==0){
    
                    document.getElementById("produtor").value =childData.nomeProdutor;
                    document.getElementById ("localidade").value =childData.localidade;
                     document.getElementById("rg").value= childData.rg;
                     document.getElementById("tel").value = childData.telefone;
                   rowIndex ++;
              
                }
             
                
               
              
              
            });
    
        });
    } 
    if(rowIndex==0){

        var databaseRef = firebase.database().ref('trator2022/');
       
       
        var cpf = document.getElementById("cpf").value
    
        databaseRef.orderByChild("date").once('value', function (snapshot) {
            
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
               
                if((childData.cpf == cpf)&& rowIndex==0){
    
                    document.getElementById("produtor").value =childData.nomeProdutor;
                    document.getElementById ("localidade").value =childData.localidade;
                     document.getElementById("tel").value = childData.telefone;
                   rowIndex ++;

                   if(Number(childData.rg) > 0 ){
                    document.getElementById("rg").value= childData.rg;

                }
              
                }
             
                
               
              
              
            });
    
        });
    } 
    if(rowIndex==0){

        var databaseRef = firebase.database().ref('anuencia2022/');
       
       
        var cpf = document.getElementById("cpf").value
    
        databaseRef.orderByChild("date").once('value', function (snapshot) {
            
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
               
                if((childData.cpf == cpf)&& rowIndex==0){
    
                    document.getElementById("produtor").value =childData.nomeProdutor;
                    document.getElementById ("localidade").value =childData.localidade;
                     document.getElementById("rg").value= childData.rg;
                     document.getElementById("tel").value = childData.telefone;
                   rowIndex ++;
              
                }
             
                
               
              
              
            });
    
        });
    } 
    if(rowIndex==0){
       
        var databaseRef = firebase.database().ref('anuencia/');
        databaseRef.orderByChild("date").once('value', function (snapshot) {
        
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                console.log(`${cpf} == ${childData.cpf}`);
                if((childData.cpf == cpf)&& rowIndex==0){
    
                    document.getElementById("produtor").value =childData.nomeProdutor;
                    document.getElementById ("localidade").value =childData.localidade;
                   rowIndex ++;
              
                }

            });
    
        });
    }
    

    if(rowIndex==0){
       
        var databaseRef = firebase.database().ref('produtor/');
        databaseRef.orderByChild("date").once('value', function (snapshot) {
        
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                console.log(`${cpf} == ${childData.cpf}`);
                if((childData.cpf == cpf)&& rowIndex==0){
    
                    document.getElementById("produtor").value =childData.nomeProdutor;
                    document.getElementById ("localidade").value =childData.localidade;
                    document.getElementById("tel").value = childData.telefone;

                   rowIndex ++;
              
                }

            });
    
        });
    }

    

}
function deletar(key){
    
    var x = window.confirm("Deseja realmente Excluir esta solicitacao?");
    if (x) {
        firebase.database().ref('trator2024').child(key).remove();
        window.location.reload();
    }
}



function listarfiltro() {
	
	
    var item = document.getElementById("atvfiltro").value;
    var tblUsers = document.getElementById('tbl_users_list');
    tblUsers.innerHTML = `<tr>
    <td scope="col">PRODUTOR</td>
    <td scope="col">CPF</td>
    <td scope="col">LOCALIDADE</td>
    <td scope="col">OBS</td>
    <td scope="col">HORAS</td>
    <td scope="col">VALOR TOTAL</td>
    <td scope="col">DATA</td>
    <td scope="col"> TELEFONE</td>
    <td scope="col"> STATUS EXEC.</td>
    <td scope="col">IMPRIMIR</td>
    
   
    
</tr> `;
    var databaseRef = firebase.database().ref('trator2024/');
    var rowIndex=1;
    var horasTr=0;
    var dias=0;
    var dataAnt;
   
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            if((String(childData.cpf).includes(String(item).toUpperCase())||String(childData.nomeProdutor).includes(String(item).toUpperCase())||String(childData.localidade).includes(String(item).toUpperCase())||String(childData.status).includes(String(item).toUpperCase()))){
                var row = tblUsers.insertRow(rowIndex);
            var cellNome = row.insertCell(0);
            var cellCPF = row.insertCell(1);
            var cellLocalidade = row.insertCell(2);
            var cellRG = row.insertCell(3);            
            var cellHoras = row.insertCell(4);
            var cellValor = row.insertCell(5);
            var cellData = row.insertCell(6);
            var cellTel=row.insertCell(7);
            var cellStatus= row.insertCell(8);
            var cellImprimir = row.insertCell(9);
            
            var cellExec = row.insertCell(10);
                var cellDel = row.insertCell(11);
            
          
            
            cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
            cellCPF.appendChild(document.createTextNode(childData.cpf));
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            cellRG.appendChild(document.createTextNode(childData.rg));
            cellHoras.appendChild(document.createTextNode(horasFormat(childData.horas)));
            cellValor.appendChild(document.createTextNode(childData.valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellTel.appendChild(document.createTextNode(childData.telefone));
            localStorage.getItem("user")=="jlvieira248@gmail.com"||localStorage.getItem("user")=="francisco.limaigt@hotmail.com"?cellStatus.innerHTML=`<input type="button" class="btn btn" value="${childData.status}." onclick="editStatus('${childKey}')"}/>`:"";

            cellImprimir.innerHTML='<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimir(this)"}/>';
            (localStorage.getItem("user")=="jlvieira248@gmail.com"||localStorage.getItem("user")=="francisco.limaigt@hotmail.com")&&childData.status==""? cellExec.innerHTML=`<input type="button" class="btn btn-danger" value="EXEC." onclick="execultar('${childKey}')"}/>`:"";

            localStorage.getItem("user")=="jlvieira248@gmail.com"||localStorage.getItem("user")=="francisco.limaigt@hotmail.com"?cellDel.innerHTML=`<input type="button" class="btn btn-danger" value="DELETE." onclick="deletar('${childKey}')"}/>`:"";

           if(dataAnt!=childData.dataAtual){
               dias++;
               dataAnt=childData.dataAtual;
           }

            rowIndex = rowIndex + 1;
            horasTr = horasTr+Number(childData.horas);
            }
            });
    
        document.getElementById("inf").innerHTML=`<h6>PRODUTORES:&nbsp ${rowIndex-1} &nbsp &nbsp &nbsp QUANT. HORAS:&nbsp ${horasTr.toFixed(2)} &nbsp &nbsp &nbsp DIAS:&nbsp${dias}&nbsp &nbsp &nbsp VALOR TOTAL&nbsp:${(horasTr*valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h6>`;
    });
    
}
function execultar(key){
    var databaseRef = firebase.database().ref('trator2024/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
             
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childKey){

        
                       childData.status= "execultado";
                       let updates = {}
                       updates["/trator2024/" + childKey] = childData;
                       let produtor_ref = firebase.database().ref();
                       firebase.database().ref().update(updates);
                      
                         
                       
                
             
            }
                 
              
          
            }); 
   window.location.reload();
      });
  
}


function editStatus(key){
    var databaseRef = firebase.database().ref('trator2024/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
             
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childKey){

              
              var atv2 =prompt("Insira o status da execução EX. FEV TRATORISTA ");
              
                  
        
                       childData.status= atv2?atv2:" ";
                       childData.user= localStorage.getItem("user");

                       let updates = {}
                       updates["/trator2024/" + childKey] = childData;
                       let produtor_ref = firebase.database().ref();
                       firebase.database().ref().update(updates);
                      
                         
                       
                
             
            }
                 
              
          
            }); 
          window.location.reload();
      });
  
}
