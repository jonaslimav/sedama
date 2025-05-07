
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


function InserirProtocolo() {
    var data= dataAtualFormatada();


   var cpf = document.getElementById("cpf").value

   var databaseRef = firebase.database().ref('inseminar2022/');
    
   databaseRef.orderByChild("date").once('value', function (snapshot) {
       snapshot.forEach(function (childSnapshot) {
           var childData = childSnapshot.val();
               
           if(childData.cpf==cpf){
           alert("CPF ja cadastrado!")
          
           }
       });
    

        let protocolo_id = false;


        const protocolo = {
    
            
            nome: nomeProdutor = document.getElementById("produtor").value.toUpperCase(),
            cpf: cpf = document.getElementById("cpf").value,
            localidade: localidade = document.getElementById ("localidade").value.toUpperCase(),
            obs: obs = document.getElementById("rg").value,
            dataAtual:data,
            femeas: femeas = document.getElementById("femeas").value,
            cExames:cExames = document.getElementById("Cexames").value,
            cVacina:cVacina = document.getElementById("Cbrucelose").value,

            date:new Date()*-1,
            telefone:telefone =document.getElementById("tel").value,
            status:"",
            user:localStorage.getItem("user")

            
        };
    
        if (!protocolo_id) {
            protocolo_id = firebase.database().ref().child('inseminar2022').push().key;
        }
        let updates = {}
        updates["/inseminar2022/" + protocolo_id] = protocolo;
        let protocolo_ref = firebase.database().ref();
        firebase.database().ref().update(updates);
        window.location.reload();
       
    
   
   });
  
  
    
}

function listar() {
        console.log(localStorage.getItem("user"));
	
    if(!localStorage.getItem("auth")){
        alert("Necessario fazer login");
      window.location.href = "loguin.html";

    }
    console.log(localStorage.getItem("user"));
    if(localStorage.getItem("user")=="kalitianne1@gmail.com"){
        window.location.href="PROTRATOR2025.html";
 



           }

    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('inseminar2022/');
    var rowIndex = 1;
   var vlr=0
   var animais=0;
   
     databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            if(childData.status ==undefined){
                childData.status = "";
            }

            var row = tblUsers.insertRow(rowIndex);
            var cellCPF = row.insertCell(0);
            var cellNome = row.insertCell(1);
            var cellLocalidade = row.insertCell(2);
            var cellRG = row.insertCell(3);            
            var cellFemeas = row.insertCell(4);
            var cellCexames = row.insertCell(5);
            var cellCvacinas = row.insertCell(6);
            var cellTel=row.insertCell(7);
            var cellImprimir = row.insertCell(8);
            var cellUser= row.insertCell(9);
            
          
            

            cellCPF.innerHTML=`<input type="button" class="btn btn" value="${childData.cpf}" onclick="deletar('${childKey}')"}/>`;

            cellNome.appendChild(document.createTextNode(childData.nome));
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
        cellRG.appendChild(document.createTextNode(childData.rg));
            cellFemeas.innerHTML=`<input type="button" class="btn btn" value="${childData.femeas}" onclick="editFemeas('${childKey}')"}/>`;
            cellCexames.innerHTML=`<input type="button" class="btn btn" value="${childData.cExames}" onclick="editCexames('${childKey}')"}/>`;
            cellCvacinas.innerHTML=`<input type="button" class="btn btn" value="${childData.cVacina}" onclick="editCvacina('${childKey}')"}/>`;

            cellRG.innerHTML=`<input type="button" class="btn btn" value="${childData.obs}" onclick="editObs('${childKey}')"}/>`;
            //cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellTel.appendChild(document.createTextNode(childData.telefone));
            cellImprimir.innerHTML=`<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimirProj('${childKey}')"}/>`;
          cellUser.appendChild(document.createTextNode(childData.user?childData.user:""));
animais+=Number(childData.femeas);
vlr+= (Number(childData.cExames) +Number(childData.cVacina));
            rowIndex = rowIndex + 1;
        });

        document.getElementById("inf").innerHTML=`<h6>PRODUTORES:&nbsp ${rowIndex-1} &nbsp &nbsp &nbsp ANIMAIS:&nbsp ${animais} &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp VALOR TOTAL&nbsp:${(vlr).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </h6>`;
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
var cpf= data[0].innerHTML;
var nome = data[1].innerHTML;
var localPr = data[2].innerHTML;
var rgPr = data[3].innerHTML;
var femeas = data[4].innerHTML;
var exames = data[5].innerHTML;
var brucelose =data[4].innerHTML;


var x = document.getElementById("geral");

x.innerHTML = `
            ________________________________________________________________________________________________________________________________
				<h3> Via Produtor</h3> <img src="../logPrefeitura.png" height=220 width=95%><br><h1> 
				<h1>&nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp<strong>PROGRAMA DE INSEMINAÇÃO ARTIFICIAL </strong><br>
                <br> <strong> PRODUTOR:</strong>&nbsp ${nome} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${cpf}<br><br>
                <strong>OBS:</strong>&nbsp ${rgPr}   &nbsp &nbsp &nbsp &nbsp
                <strong> QNT. FEMEAS:</strong>  &nbsp ${femeas} &nbsp&nbsp&nbsp&nbsp&nbsp <strong> CUSTO EXAMES:</strong>  &nbspR$ ${exames}  <br> <br>
                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong>  <strong> VC BRUCELOSE:</strong>  &nbspR$ ${brucelose}<br><br>
				<strong> SERVIDOR:______________________________________ <br><br>  </strong><br>
				<br>	<img src="../logotrator.png" alt="some text" height=200 width=90%>

                    <h1>_____________________________________________________________________________________________________________________<br>
		

					_______________________________________________________________________________________________________________________<br>
					<h3> Via SEDAMA</h3><img src="../logPrefeitura.png" height=220 width=95%><br><h1> 
                    <h1>&nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp<strong>CONSTRUÇÃO E REFORMA DE AÇUDES </strong><br>
                    <br> <strong> PRODUTOR:</strong>&nbsp ${nomePr} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${cpfPr}<br><br>
                    <strong>OBS:</strong>&nbsp ${rgPr}   &nbsp &nbsp &nbsp &nbsp
                <strong> QNT. FEMEAS:</strong>  &nbsp ${femeas} &nbsp&nbsp&nbsp&nbsp&nbsp <strong> CUSTO EXAMES:</strong>  &nbspR$ ${exames}  <br> <br>
                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong>  <strong> VC BRUCELOSE:</strong>  &nbspR$ ${brucelose}<br><br>
                    <strong> <br><br>
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
        firebase.database().ref('inseminar2022').child(key).remove();
        window.location.reload();
    }
}



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

function editFemeas(key){
    var databaseRef = firebase.database().ref('inseminar2022/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
             
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childKey){

              
              var atv2 =prompt("Insira a quantidade de femeas?");
              
                  
        
                       childData.femeas= Number(atv2);
                       childData.user= localStorage.getItem("user");

                       let updates = {}
                       updates["/inseminar2022/" + childKey] = childData;
                       let produtor_ref = firebase.database().ref();
                       firebase.database().ref().update(updates);
                      
                         
                       
                
             
            }
                 
              
          
            }); 
          window.location.reload();
      });
  
}


function editCexames(key){
    var databaseRef = firebase.database().ref('inseminar2022/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
             
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childKey){

              
              var atv2 =prompt("Insira o custo com exames?");
              
                  
        
                       childData.cExames= Number(atv2);
                       childData.user= localStorage.getItem("user");

                       let updates = {}
                       updates["/inseminar2022/" + childKey] = childData;
                       let produtor_ref = firebase.database().ref();
                       firebase.database().ref().update(updates);
                      
                         
                       
                
             
            }
                 
              
          
            }); 
          window.location.reload();
      });
  
}


function editCvacina(key){
    var databaseRef = firebase.database().ref('inseminar2022/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
             
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childKey){

              
              var atv2 =prompt("Insira o custo com vacina brucelose?");
              
                  
        
                       childData.cVacina= Number(atv2);
                       childData.user= localStorage.getItem("user");

                       let updates = {}
                       updates["/inseminar2022/" + childKey] = childData;
                       let produtor_ref = firebase.database().ref();
                       firebase.database().ref().update(updates);
                      
                         
                       
                
             
            }
                 
              
          
            }); 
          window.location.reload();
      });
  
}


function editObs(key){
    var databaseRef = firebase.database().ref('inseminar2022/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
             
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childKey){

              
              var atv2 =prompt("Insira uma observacao");
              
                  
        
                       childData.obs= atv2;
                       childData.user= localStorage.getItem("user");

                       let updates = {}
                       updates["/inseminar2022/" + childKey] = childData;
                       let produtor_ref = firebase.database().ref();
                       firebase.database().ref().update(updates);
                      
                         
                       
                
             
            }
                 
              
          
            }); 
          window.location.reload();
      });
  
}


function imprimirProj(key){
    var databaseRef = firebase.database().ref('inseminar2022/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
             
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childKey){


                var cpf= childData.cpf;
                var nome = childData.nome;
                var localPr = childData.localidade;
                var rgPr = childData.obs;
                var femeas = childData.femeas;
                var exames = childData.cExames;
                var brucelose =childData.cVacina;
                
                
                var x = document.getElementById("geral");
                
                x.innerHTML = `
                                <img src="../PARTECIMA.png" height=200 width=100%><br><h1> 
                                <h1>&nbsp &nbsp&nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp<strong>PROGRAMA DE INSEMINAÇÃO ARTIFICIAL </strong><br>
                                <br> <strong> PRODUTOR:</strong>&nbsp ${nome} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${cpf}<br><br>
                                <strong>OBS:</strong>&nbsp ${rgPr}   &nbsp &nbsp &nbsp &nbsp
                                <strong> QNT. FEMEAS:</strong>  &nbsp ${femeas} &nbsp&nbsp&nbsp&nbsp&nbsp <strong> CUSTO EXAMES:</strong>  &nbspR$ ${exames}  <br> <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong>  <strong> VC BRUCELOSE:</strong>  &nbspR$ ${brucelose}<br><br>
                                <strong> SERVIDOR:______________________________________ <br><br>  </strong><br>
                                <br>	<img src="../logotrator.png" alt="some text" height=200 width=90%>
                
                                    <h1>_____________________________________________________________________________________________________________________<br>
                        
                
                                    _______________________________________________________________________________________________________________________<br>
                                    <h3> Via SEDAMA</h3><img src="../PARTECIMA.png" height=220 width=100%><br><h1> 
                                    <h1>&nbsp &nbsp&nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp<strong>PROGRAMA DE INSEMINAÇÃO ARTIFICIAL </strong><br>
                                    <br> <strong> PRODUTOR:</strong>&nbsp ${nome} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${cpf}<br><br>
                                    <strong>OBS:</strong>&nbsp ${rgPr}   &nbsp &nbsp &nbsp &nbsp
                                <strong> QNT. FEMEAS:</strong>  &nbsp ${femeas} &nbsp&nbsp&nbsp&nbsp&nbsp <strong> CUSTO EXAMES:</strong>  &nbspR$ ${exames}  <br> <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong>  <strong> VC BRUCELOSE:</strong>  &nbspR$ ${brucelose}<br><br>
                                    <strong> <br><br>
                                    <strong> ASS. PRODUTOR: _____________________________________</strong><br><br>
                                    <img src="../logotrator.png" alt="some text" height=200 width=90% >
                                        </h1>`; 
                                    
                                    
                                    
                                    
                  //  printDiv();
                
             
                         
                       
                
             
            }
                 
              
          
            }); 
         
      });
  
}