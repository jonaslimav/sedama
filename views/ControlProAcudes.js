
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

var valor= 100;

function InserirProtocolo() {
    var data= dataAtualFormatada();


   var cpf = document.getElementById("cpf").value
var horasT = 0;
    var i=0;
   var databaseRef = firebase.database().ref('proacudes2022/');
    
   databaseRef.orderByChild("date").once('value', function (snapshot) {
       snapshot.forEach(function (childSnapshot) {
           var childData = childSnapshot.val();
               
           if(childData.cpf==cpf){
<<<<<<< HEAD
             //  horasT= horasT+Number(childData.horas);
=======
               horasT= horasT+Number(childData.horas);
>>>>>>> 2366a746da433f575eea4c551e2079337d7ea6d3
            i++;
          
           }
       });
<<<<<<< HEAD
      // horasT = horasT + Number(document.getElementById("horas").value);
=======
       horasT = horasT + Number(document.getElementById("horas").value);
>>>>>>> 2366a746da433f575eea4c551e2079337d7ea6d3
       console.log(horasT);
       if(horasT>5){

        alert(`CPF existente na base de dados e Horas ultrapassam o Limite: ${horasFormat(horasT)}!!! `);
       }else{

        let protocolo_id = false;


        const protocolo = {
    
            
            nomeProdutor: nomeProdutor = document.getElementById("produtor").value.toUpperCase(),
            cpf: cpf = document.getElementById("cpf").value,
            localidade: localidade = document.getElementById ("localidade").value.toUpperCase(),
            rg: rg = document.getElementById("rg").value,
            dataAtual:data,
<<<<<<< HEAD
            horas: 0,
            valorTotal:0,
=======
            horas: horas = document.getElementById("horas").value,
            valorTotal:valorTotal = horas*valor,
>>>>>>> 2366a746da433f575eea4c551e2079337d7ea6d3
            date:new Date()*-1,
            telefone:telefone =document.getElementById("tel").value,
            status:"",
            user:localStorage.getItem("user")

            
        };
    
        if (!protocolo_id) {
            protocolo_id = firebase.database().ref().child('trator2022').push().key;
        }
        let updates = {}
        updates["/proacudes2022/" + protocolo_id] = protocolo;
        let protocolo_ref = firebase.database().ref();
        firebase.database().ref().update(updates);
        window.location.reload();
       }
    
   
   });
  
  
    
}

function listar() {
        console.log(localStorage.getItem("user"));
<<<<<<< HEAD
	if((localStorage.getItem("user")!="jlvieira248@gmail.com")&& (localStorage.getItem("user")!="francisco.limaigt@hotmail.com")){
=======
	if(localStorage.getItem("user")!="jlvieira248@gmail.com"){
>>>>>>> 2366a746da433f575eea4c551e2079337d7ea6d3

        var x = document.getElementById("form");
        var y = document.getElementById("menu2")
        x.innerHTML="<br>";
        y.innerHTML ="<br>";

    }
    if(!localStorage.getItem("auth")){
        alert("Necessario fazer login");
      window.location.href = "loguin.html";

    }

    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('proacudes2022/');
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
if(childData.status!="execultado"){
            var row = tblUsers.insertRow(rowIndex);
            var cellNome = row.insertCell(0);
            var cellCPF = row.insertCell(1);
            var cellLocalidade = row.insertCell(2);
            var cellRG = row.insertCell(3);            
            var cellHoras = row.insertCell(4);
            var cellValor = row.insertCell(5);
            var cellData = row.insertCell(6);
            var cellTel=row.insertCell(7);
            var cellImprimir = row.insertCell(8);
            var cellExec = row.insertCell(9);
                var cellDel = row.insertCell(10);
            var cellUser= row.insertCell(11);
            
            if(childData.telefone==undefined ){
                childData.telefone="-";
            }
            if(childData.rg==undefined ){
                childData.rg="-";
            }
            if(childData.status ==undefined){
                childData.status = "";
            }
<<<<<<< HEAD
            if(childData.valorTotal ==undefined){
                childData.valorTotal = 0;
            }
            if(childData.horas ==undefined){
                childData.horas = 0;
            }
=======
>>>>>>> 2366a746da433f575eea4c551e2079337d7ea6d3

           
            cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
            cellCPF.appendChild(document.createTextNode(childData.cpf));
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            localStorage.getItem("user")=="jlvieira248@gmail.com"? cellRG.appendChild(document.createTextNode(childData.rg)):"";
<<<<<<< HEAD
            localStorage.getItem("user")=="jlvieira248@gmail.com"||localStorage.getItem("user")=="francisco.limaigt@hotmail.com"? cellHoras.innerHTML=`<input type="button" class="btn btn" value="${childData.horas}" onclick="editHoras('${childKey}')"}/>`:"";
            localStorage.getItem("user")=="jlvieira248@gmail.com"||localStorage.getItem("user")=="francisco.limaigt@hotmail.com"? cellValor.innerHTML=`<input type="button" class="btn btn" value="${childData.valorTotal}" onclick="editValor('${childKey}')"}/>`:"";
            localStorage.getItem("user")=="jlvieira248@gmail.com"||localStorage.getItem("user")=="francisco.limaigt@hotmail.com"? cellRG.innerHTML=`<input type="button" class="btn btn" value="${childData.rg}" onclick="editObs('${childKey}')"}/>`:"";

            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellTel.appendChild(document.createTextNode(childData.telefone));
            cellImprimir.innerHTML=`<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimirProj('${childKey}')"}/>`;
          localStorage.getItem("user")=="jlvieira248@gmail.com"||localStorage.getItem("user")=="francisco.limaigt@hotmail.com"? cellDel.innerHTML=`<input type="button" class="btn btn-danger" value="DELETE" onclick="deletar('${childKey}')"}/>`:"";
=======
            cellHoras.appendChild(document.createTextNode(horasFormat(childData.horas)));
            cellValor.appendChild(document.createTextNode(childData.valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellTel.appendChild(document.createTextNode(childData.telefone));
            cellImprimir.innerHTML='<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimir(this)"}/>';
          localStorage.getItem("user")=="jlvieira248@gmail.com"&&childData.status==""? cellExec.innerHTML=`<input type="button" class="btn btn-danger" value="EXEC." onclick="execultar('${childKey}')"}/>`:"";
          localStorage.getItem("user")=="jlvieira248@gmail.com"? cellDel.innerHTML=`<input type="button" class="btn btn-danger" value="DELETE" onclick="deletar('${childKey}')"}/>`:"";
>>>>>>> 2366a746da433f575eea4c551e2079337d7ea6d3
          cellUser.appendChild(document.createTextNode(childData.user?childData.user:""));

           if(dataAnt!=childData.dataAtual){
               dias++;
               dataAnt=childData.dataAtual;
           }
       
           val = val +childData.valorTotal;
            rowIndex = rowIndex + 1;
            horasTr = horasTr+Number(childData.horas);}
        });

<<<<<<< HEAD
        document.getElementById("inf").innerHTML=`<h6>PRODUTORES:&nbsp ${rowIndex-1} &nbsp &nbsp &nbsp QUANT. HORAS A EXECULTAR:&nbsp ${horasTr.toFixed(2)} &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp VALOR TOTAL&nbsp:${(val).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </h6>`;
=======
        document.getElementById("inf").innerHTML=`<h6>PRODUTORES:&nbsp ${rowIndex-1} &nbsp &nbsp &nbsp QUANT. HORAS A EXECULTAR:&nbsp ${horasTr.toFixed(2)} &nbsp &nbsp &nbsp DIAS:&nbsp${dias}&nbsp &nbsp &nbsp VALOR TOTAL&nbsp:${(val).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h6>`;
>>>>>>> 2366a746da433f575eea4c551e2079337d7ea6d3
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
var nomePr = data[0].innerHTML;
var cpfPr = data[1].innerHTML;
var localPr = data[2].innerHTML;
var rgPr = data[3].innerHTML;
<<<<<<< HEAD
//var horaPr = data[4].innerHTML;
//var valorPr = data[5].innerHTML;
var dataPr =data[4].innerHTML;
=======
var horaPr = data[4].innerHTML;
var valorPr = data[5].innerHTML;
var dataPr =data[6].innerHTML;
>>>>>>> 2366a746da433f575eea4c551e2079337d7ea6d3


var x = document.getElementById("geral");

x.innerHTML = `
            ________________________________________________________________________________________________________________________________
				<h3> Via Produtor</h3> <img src="../logPrefeitura.png" height=220 width=95%><br><h1> 
				<h1>&nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp<strong>CONSTRUÇÃO E REFORMA DE AÇUDES </strong><br>
                <br> <strong> PRODUTOR:</strong>&nbsp ${nomePr} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${cpfPr}<br><br>
<<<<<<< HEAD
                <strong>OBS:</strong>&nbsp ${rgPr}   &nbsp &nbsp &nbsp &nbsp
                <strong> DATA ENTREGA DOCUMENTOS:</strong>  &nbsp ${dataPr} &nbsp&nbsp&nbsp&nbsp&nbsp  <br> <br>
                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> <br><br>
				<strong> SERVIDOR:______________________________________ <br><br>  </strong><br>
=======
                <strong>RG Nº:</strong>&nbsp    &nbsp &nbsp &nbsp &nbsp
                <strong> DATA:</strong>  &nbsp ${dataPr} &nbsp&nbsp&nbsp&nbsp&nbsp <strong> QUANT. HORAS:  </strong>  ${horaPr} &nbsp&nbsp <br> <br>
                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  ${valorPr}<br><br>
				<strong> TRATORISTA:______________________________________ <br><br>  DATA SERVIÇO:______/______/__________</strong><br>
>>>>>>> 2366a746da433f575eea4c551e2079337d7ea6d3
				<br>	<img src="../logotrator.png" alt="some text" height=200 width=90%>

                    <h1>_____________________________________________________________________________________________________________________<br>
		

					_______________________________________________________________________________________________________________________<br>
<<<<<<< HEAD
					<h3> Via SEDAMA</h3><img src="../logPrefeitura.png" height=220 width=95%><br><h1> 
                    <h1>&nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp<strong>CONSTRUÇÃO E REFORMA DE AÇUDES </strong><br>
                    <br> <strong> PRODUTOR:</strong>&nbsp ${nomePr} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${cpfPr}<br><br>
                    <strong>:</strong>&nbsp   ${rgPr}&nbsp &nbsp &nbsp &nbsp
                    <strong> DATA ENTREGA DOCUMENTOS:</strong>  &nbsp ${dataPr}<br><br>
                    <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp &nbsp &nbsp &nbsp 
                    <strong> <br><br>
=======
					<h3> Via Tratorista</h3><img src="../logPrefeitura.png" height=220 width=95%><br><h1> 
                    <h1>&nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp<strong>CONSTRUÇÃO E REFORMA DE AÇUDES </strong><br>
                    <br> <strong> PRODUTOR:</strong>&nbsp ${nomePr} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${cpfPr}<br><br>
                    <strong>RG:</strong>&nbsp   &nbsp &nbsp &nbsp &nbsp
                    <strong> DATA:</strong>  &nbsp ${dataPr}<br><br>
                    <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp &nbsp &nbsp &nbsp 
                    <strong> QUANT. HORAS:  </strong>  ${horaPr}<br><br>
                    <strong> VALOR TOTAL:  </strong>  ${valorPr}&nbsp&nbsp&nbsp
					 <strong>DATA SERVIÇO:______/______/__________</strong><br><br>
>>>>>>> 2366a746da433f575eea4c551e2079337d7ea6d3
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
                     document.getElementById("rg").value= childData.rg;
                     document.getElementById("tel").value = childData.telefone;
                   rowIndex ++;
              
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
        firebase.database().ref('proacudes2022').child(key).remove();
        window.location.reload();
    }
}



<<<<<<< HEAD
// function listarfiltro() {
	
	
//     var item = document.getElementById("atvfiltro").value;
//     var tblUsers = document.getElementById('tbl_users_list');
//     tblUsers.innerHTML = `<tr>
//     <td scope="col">PRODUTOR</td>
//     <td scope="col">CPF</td>
//     <td scope="col">LOCALIDADE</td>
//     <td scope="col">OBS</td>
//     <td scope="col">HORAS</td>
//     <td scope="col">VALOR TOTAL</td>
//     <td scope="col">DATA</td>
//     <td scope="col"> TELEFONE</td>
//     <td scope="col">IMPRIMIR</td>
    
   
    
// </tr> `;
//     var databaseRef = firebase.database().ref('acudes2022/');
//     var rowIndex=1;
//     var horasTr=0;
//     var dias=0;
//     var dataAnt;
   
//     databaseRef.orderByChild("date").once('value', function (snapshot) {
        
//         snapshot.forEach(function (childSnapshot) {
//             var childKey = childSnapshot.key;
//             var childData = childSnapshot.val();

//             if((String(childData.cpf).includes(String(item).toUpperCase())||String(childData.nomeProdutor).includes(String(item).toUpperCase())||String(childData.localidade).includes(String(item).toUpperCase())&&childData.status!="execultado")){
//                 var row = tblUsers.insertRow(rowIndex);
//             var cellNome = row.insertCell(0);
//             var cellCPF = row.insertCell(1);
//             var cellLocalidade = row.insertCell(2);
//             var cellRG = row.insertCell(3);            
//             var cellHoras = row.insertCell(4);
//             var cellValor = row.insertCell(5);
//             var cellData = row.insertCell(6);
//             var cellTel=row.insertCell(7);
//             var cellImprimir = row.insertCell(8);
            
//             var cellExec = row.insertCell(9);
//                 var cellDel = row.insertCell(10);
            
          
            
//             cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
//             cellCPF.appendChild(document.createTextNode(childData.cpf));
//             cellLocalidade.appendChild(document.createTextNode(childData.localidade));
//             cellRG.appendChild(document.createTextNode(childData.rg));
//             cellHoras.appendChild(document.createTextNode(horasFormat(childData.horas)));
//             cellValor.appendChild(document.createTextNode(childData.valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
//             cellData.appendChild(document.createTextNode(childData.dataAtual));
//             cellTel.appendChild(document.createTextNode(childData.telefone));
//             cellImprimir.innerHTML='<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimir(this)"}/>';
//             localStorage.getItem("user")=="jlvieira248@gmail.com"&&childData.status==""? cellExec.innerHTML=`<input type="button" class="btn btn-danger" value="EXEC." onclick="execultar('${childKey}')"}/>`:"";

//             localStorage.getItem("user")=="jlvieira248@gmail.com"?cellDel.innerHTML=`<input type="button" class="btn btn-danger" value="DELETE." onclick="deletar('${childKey}')"}/>`:"";

//            if(dataAnt!=childData.dataAtual){
//                dias++;
//                dataAnt=childData.dataAtual;
//            }

//             rowIndex = rowIndex + 1;
//             horasTr = horasTr+Number(childData.horas);
//             }
//             });
    
//         document.getElementById("inf").innerHTML=`<h6>PRODUTORES:&nbsp ${rowIndex-1} &nbsp &nbsp &nbsp QUANT. HORAS:&nbsp ${horasTr.toFixed(2)} &nbsp &nbsp &nbsp DIAS:&nbsp${dias}&nbsp &nbsp &nbsp VALOR TOTAL&nbsp:${(horasTr*valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h6>`;
//     });
    
// }
function execultar(key){
    var databaseRef = firebase.database().ref('trator2022/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
             
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childKey){

        
                       childData.status= "execultado";
                       let updates = {}
                       updates["/trator2022/" + childKey] = childData;
                       let produtor_ref = firebase.database().ref();
                       firebase.database().ref().update(updates);
                      
                         
                       
                
             
            }
                 
              
          
            }); 
   window.location.reload();
      });
  
}
function editValor(key){

    
    var databaseRef = firebase.database().ref('proacudes2022/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
             
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childKey){

              
              var atv2 =prompt("Insira o valor do projeto?");
              
                  
        
                       childData.valorTotal= Number(atv2);
                       childData.user= localStorage.getItem("user");

                       let updates = {}
                       updates["/proacudes2022/" + childKey] = childData;
                       let produtor_ref = firebase.database().ref();
                       firebase.database().ref().update(updates);
                      
                         
                       
                
             
            }
                 
              
          
            }); 
            window.location.reload();
      });
  
}

function editHoras(key){
    var databaseRef = firebase.database().ref('proacudes2022/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
             
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childKey){

              
              var atv2 =prompt("Insira a quantidade de horas?");
              
                  
        
                       childData.horas= Number(atv2);
                       childData.user= localStorage.getItem("user");

                       let updates = {}
                       updates["/proacudes2022/" + childKey] = childData;
                       let produtor_ref = firebase.database().ref();
                       firebase.database().ref().update(updates);
                      
                         
                       
                
             
            }
                 
              
          
            }); 
          window.location.reload();
      });
  
}

function editObs(key){
    var databaseRef = firebase.database().ref('proacudes2022/');
=======
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
    <td scope="col">IMPRIMIR</td>
    
   
    
</tr> `;
    var databaseRef = firebase.database().ref('acudes2022/');
    var rowIndex=1;
    var horasTr=0;
    var dias=0;
    var dataAnt;
   
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            if((String(childData.cpf).includes(String(item).toUpperCase())||String(childData.nomeProdutor).includes(String(item).toUpperCase())||String(childData.localidade).includes(String(item).toUpperCase())&&childData.status!="execultado")){
                var row = tblUsers.insertRow(rowIndex);
            var cellNome = row.insertCell(0);
            var cellCPF = row.insertCell(1);
            var cellLocalidade = row.insertCell(2);
            var cellRG = row.insertCell(3);            
            var cellHoras = row.insertCell(4);
            var cellValor = row.insertCell(5);
            var cellData = row.insertCell(6);
            var cellTel=row.insertCell(7);
            var cellImprimir = row.insertCell(8);
            
            var cellExec = row.insertCell(9);
                var cellDel = row.insertCell(10);
            
          
            
            cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
            cellCPF.appendChild(document.createTextNode(childData.cpf));
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            cellRG.appendChild(document.createTextNode(childData.rg));
            cellHoras.appendChild(document.createTextNode(horasFormat(childData.horas)));
            cellValor.appendChild(document.createTextNode(childData.valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellTel.appendChild(document.createTextNode(childData.telefone));
            cellImprimir.innerHTML='<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimir(this)"}/>';
            localStorage.getItem("user")=="jlvieira248@gmail.com"&&childData.status==""? cellExec.innerHTML=`<input type="button" class="btn btn-danger" value="EXEC." onclick="execultar('${childKey}')"}/>`:"";

            localStorage.getItem("user")=="jlvieira248@gmail.com"?cellDel.innerHTML=`<input type="button" class="btn btn-danger" value="DELETE." onclick="deletar('${childKey}')"}/>`:"";

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
    var databaseRef = firebase.database().ref('trator2022/');
>>>>>>> 2366a746da433f575eea4c551e2079337d7ea6d3

    databaseRef.orderByChild("date").once('value', function (snapshot) {
             
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childKey){

<<<<<<< HEAD
              
              var atv2 =prompt("Insira uma observacao do projeto ex: 2 horas Esteira, 3 Retro?");
              
                  
        
                       childData.rg= atv2;
                       childData.user= localStorage.getItem("user");

                       let updates = {}
                       updates["/proacudes2022/" + childKey] = childData;
=======
        
                       childData.status= "execultado";
                       let updates = {}
                       updates["/trator2022/" + childKey] = childData;
>>>>>>> 2366a746da433f575eea4c551e2079337d7ea6d3
                       let produtor_ref = firebase.database().ref();
                       firebase.database().ref().update(updates);
                      
                         
                       
                
             
            }
                 
              
          
            }); 
<<<<<<< HEAD
          window.location.reload();
      });
  
}


function imprimirProj(key){
    var databaseRef = firebase.database().ref('proacudes2022/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
             
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childKey){

                var x = document.getElementById("geral");

                x.innerHTML = `
                            ________________________________________________________________________________________________________________________________
                                <h3> Via Produtor</h3> <img src="../logPrefeitura.png" height=220 width=95%><h1> 
                                <h1>&nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp<strong>CONSTRUÇÃO E REFORMA DE AÇUDES </strong><br>

                                <h1>
                                <br> <strong> PRODUTOR:</strong>&nbsp ${childData.nomeProdutor} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${childData.cpf}<br><br>
                                <strong>OBS:</strong>&nbsp  ${childData.rg}  &nbsp &nbsp &nbsp &nbsp
                                <strong> DATA:</strong>  &nbsp ${childData.dataAtual} &nbsp&nbsp&nbsp&nbsp&nbsp <strong> QUANT. HORAS:  </strong>  ${childData.horas??0} &nbsp&nbsp <br> <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${childData.localidade} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  ${childData.valorTotal??0}<br><br>
                                <strong> TRATORISTA:______________________________________ <br><br>  DATA SERVIÇO:______/______/__________</strong><br>
                                <br>	<img src="../logotrator.png" alt="some text" height=200 width=90%>
                
                                    <h1>_____________________________________________________________________________________________________________________<br>
                        
                
                                    _______________________________________________________________________________________________________________________<br>
                                    <h3> Via Tratorista</h3><img src="../logPrefeitura.png" height=220 width=95%><h1>
                                    <h1>&nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp<strong>CONSTRUÇÃO E REFORMA DE AÇUDES </strong><br>

                                    <br> <strong> PRODUTOR:</strong>&nbsp ${childData.nomeProdutor} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${childData.cpf}<br><br>
                                    <strong>OBS:</strong>&nbsp  ${childData.rg} &nbsp &nbsp &nbsp &nbsp
                                    <strong> DATA:</strong>  &nbsp ${childData.dataAtual}<br><br>
                                    <strong>LOCALIDADE:</strong>  &nbsp ${childData.localidade} &nbsp &nbsp &nbsp &nbsp 
                                    <strong> QUANT. HORAS:  </strong>  ${childData.horas??0}<br><br>
                                    <strong> VALOR TOTAL:  </strong>  ${childData.valorTotal??0}&nbsp&nbsp&nbsp
                                     <strong>DATA SERVIÇO:______/______/__________</strong><br><br>
                                    <strong> ASS. PRODUTOR: _____________________________________</strong><br><br>
                                    <img src="../logotrator.png" alt="some text" height=200 width=90% >
                                        </h1>`; 
                                    
                                    
                  //  printDiv();
                
             
                         
                       
                
             
            }
                 
              
          
            }); 
         
=======
   window.location.reload();
>>>>>>> 2366a746da433f575eea4c551e2079337d7ea6d3
      });
  
}