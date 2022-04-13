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


function InserirProdutor() {
    var data= dataAtualFormatada();
   var cpf = document.getElementById("cpf").value

    
   var databaseRef = firebase.database().ref('produtor/');
    
        let produtor_id = false;
        var ordemNum=Number(localStorage.getItem("id"));
var i=0;

      databaseRef.orderByChild("date").once('value', function (snapshot) {
             
          snapshot.forEach(function (childSnapshot) {
      
              var childData = childSnapshot.val();
              var childKey = childSnapshot.key;

              console.log(cpf+","+childData.cpf);
              if(cpf == childData.cpf ){

                  alert("PRODUTOR CADASTRADO");
                  var atv2= " ";
                 atv2 =prompt("Produtor ja cadastrado, deseja adicionar outra Atividade a ele?");
                
                 if (atv2 == null || atv2 == "") {
                    i++;
                    window.location.reload();
                  } else {
                 childData.atividade=childData.atividade+"/"+ atv2;
                 let updates = {}
                 updates["/produtor/" + childKey] = childData;
                 let produtor_ref = firebase.database().ref();
                 firebase.database().ref().update(updates);
                }
                    i++;
                 window.location.reload();
            
                } 
        });
              
if(i==0){

     
        const produtor = {
    
            numero:ordemNum,
            nomeProdutor: nomeProdutor = document.getElementById("produtor").value.toUpperCase(),
            cpf: cpf = document.getElementById("cpf").value,
            localidade: localidade = document.getElementById ("localidade").value.toUpperCase(),
            dataAtual:data,
            atividade: atividade = document.getElementById("atv").value,
            date:new Date()*-1,
            telefone:document.getElementById("tel").value,
            
            
        };
    
        if (!produtor_id) {
            produtor_id = firebase.database().ref().child('produtor').push().key;
        }
        let updates = {}
        updates["/produtor/" + produtor_id] = produtor;
        let produtor_ref = firebase.database().ref();
        firebase.database().ref().update(updates);
        window.location.reload();
       
}
   
   
    });
  
    
}

function listar() {
	
	
    if(!localStorage.getItem("auth")){
        alert("Necessario fazer login");
      window.location.href = "loguin.html";

    }

    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('produtor/');
    var rowIndex = 1;
    var valor=0;
    
    databaseRef.orderByChild("nomeProdutor").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var row = tblUsers.insertRow(rowIndex);

           // var cellNmber = row.insertCell(0)
            var cellNome = row.insertCell(0);
            var cellCPF = row.insertCell(1);
            var cellLocalidade = row.insertCell(2);
            var cellData = row.insertCell(3);
            var cellAtv= row.insertCell(4);
            var cellTel=row.insertCell(5);
            var cellImprimir = row.insertCell(6);
            var cellEdit = row.insertCell(7);
            var cellExc=row.insertCell(8);

            
            //cellNmber.appendChild(document.createTextNode(childData.numero));
            cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
            cellCPF.appendChild(document.createTextNode(childData.cpf));
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellAtv.appendChild(document.createTextNode(childData.atividade));
           cellTel.appendChild(document.createTextNode(childData.telefone));
            cellImprimir.innerHTML='<input type="button" class="btn btn-danger" value="RELATORIO" onclick="imprimir(this)"}/>';
            cellEdit.innerHTML= `<input type="button" class="btn btn-danger" value="EDIT." onclick="editPr('${childKey}')"}/>`;
            localStorage.getItem("user")=="jlvieira248@gmail.com"? cellExc.innerHTML=`<input type="button" class="btn btn-danger" value="DELETE" onclick="deletar('${childKey}')"}/>`:"";


            rowIndex = rowIndex + 1;
        });
        localStorage.setItem("id",rowIndex);
        document.getElementById("inf").innerHTML=`<h6>PRODUTORES:&nbsp ${rowIndex-1} </h6>`;
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
function receberVisitasTecnico(produtor){
    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('visita/');
   let  listVisitas = "";
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
           
           if(childData.produtor == produtor){
            console.log(`${produtor} = ${childData.produtor}`);
            listVisitas +=`${childData.dataAtual}<br>${childData.tecnico}<br>${childData.atividade}<br><br>`;




           }

            
          
           

        });
        var x = document.getElementById("list");
       x.innerHTML = listVisitas;
    });
    

}


function imprimir(dt){

var data=dt.parentNode.parentNode.children;

var nomePr = data[1].innerHTML;
var cpfPr = data[2].innerHTML;
var localPr = data[3].innerHTML;





var x = document.getElementById("geral");

receberVisitasTecnico(`${cpfPr} - ${nomePr}`);

x.innerHTML = `
                <img src="../PARTECIMA.png" height=300 width=100%><h2 style="
                text-align: center;"> 
               <strong> Relatorio de Visitas <br></strong></h2>
                <h3 style="
                line-height: 1.75;
                align-content: center;
                margin-left: 100px;
                margin-right: 100px;
                text-align: justify;
            ">
                            
                <br>
                <br>
                
                <strong> PRODUTOR :</strong>${nomePr}<br>
                <strong> LOCALIDADE:</strong>${localPr!=undefined? localPr:""}
                    <br>

                <strong>RESUMO DAS VISITAS: </strong><br><br>
                
                   <div id="list"></div>
</h3>
                 <br><br><br><h3 style= "text-align:center; line-height:1.75;">
                 <strong>Francisco Silva Lima <br> Secretario de Desenvolvimento<br>
                 Agrário e Meio Ambiente - SEDAMA</h3>
                 <div class="footer" style="position:absolute;
                 bottom:0;
                 width:100%;">
                 <img src="../logPref.png" alt="some text"  width=100% ></div>
					
                       `;
                    
                    
 

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
function listarfiltro() {
	
	
    var item = document.getElementById("atvfiltro").value;
    var tblUsers = document.getElementById('tbl_users_list');
    tblUsers.innerHTML = ` <tr>
                <td scope ="col">Nº</td>
                <td scope="col">PRODUTOR</td>
                <td scope="col">CPF</td>
                <td scope="col">LOCALIDADE</td>
                <td scope="col">DATA CAD.</td>
                <td scope="col">ATIVIDADE</td>
                <td scope= "col">TELEFONE</td>
                <td scope="col">RELATORIO</td>
   
    
</tr> `;
    var databaseRef = firebase.database().ref('produtor/');
    var rowIndex=1;
    var quant =0;
   
    databaseRef.orderByChild("nomeProdutor").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            if(String(childData.atividade).includes(String(item).toUpperCase())){
                quant = quant + childData.quant;
                var row = tblUsers.insertRow(rowIndex);

                var cellNome = row.insertCell(0);
                var cellCPF = row.insertCell(1);
                var cellLocalidade = row.insertCell(2);
                var cellData = row.insertCell(3);
                var cellAtv= row.insertCell(4);
                var cellTel=row.insertCell(5);
                var cellImprimir = row.insertCell(6);
                var cellEdit = row.insertCell(7);
                var cellExc=row.insertCell(8);
    
                
                //cellNmber.appendChild(document.createTextNode(childData.numero));
                cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
                cellCPF.appendChild(document.createTextNode(childData.cpf));
                cellLocalidade.appendChild(document.createTextNode(childData.localidade));
                cellData.appendChild(document.createTextNode(childData.dataAtual));
                cellAtv.appendChild(document.createTextNode(childData.atividade));
               cellTel.appendChild(document.createTextNode(childData.telefone));
                cellImprimir.innerHTML='<input type="button" class="btn btn-danger" value="RELATORIO" onclick="imprimir(this)"}/>';
                cellEdit.innerHTML= `<input type="button" class="btn btn-danger" value="EDIT." onclick="editPr('${childKey}')"}/>`;
                localStorage.getItem("user")=="jlvieira248@gmail.com"? cellExc.innerHTML=`<input type="button" class="btn btn-danger" value="DELETE" onclick="deletar('${childKey}')"}/>`:"";
    
    rowIndex++;}
          
        });
        document.getElementById("inf").innerHTML=`<h6>PRODUTORES:&nbsp ${rowIndex-1} </h6>`;
    });       
   
    
}
function editPr(key){
    var databaseRef = firebase.database().ref('produtor/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
             
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childKey){

              
              var atv2 =prompt("Insira o TELEFONE, se nao possuir, coloque NAO TEM?");
              
                  
        
                       childData.telefone= atv2;
                       let updates = {}
                       updates["/produtor/" + childKey] = childData;
                       let produtor_ref = firebase.database().ref();
                       firebase.database().ref().update(updates);
                      
                         
                       
                
             
            }
                 
              
          
            }); 
           window.location.reload();
      });
  
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
    
    var x = window.confirm("Deseja realmente Excluir ?");
    if (x) {
        firebase.database().ref('produtor').child(key).remove();
        window.location.reload();
    }
}
