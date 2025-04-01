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




function InserirProtocolo() {

// receber atributos do formulario
var data= dataAtualFormatada();
var nome= document.getElementById("nome").value;
var cpf = document.getElementById("cpf").value;
var localidade = document.getElementById("localidade").value;
var telefone = document.getElementById("telefone").value;
var producao = document.getElementById("producao").value;
var funcionarios = document.getElementById("funcionarios").value;
var derivados =  document.getElementById("derivados").value;


var i=0;
var databaseRef = firebase.database().ref('queijeiras/');

   databaseRef.orderByChild("date").once('value', function (snapshot) {
       snapshot.forEach(function (childSnapshot) {
           var childData = childSnapshot.val();
           databaseRef.orderByChild("date").once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                    
                if(childData.cpf==cpf){
                 i++;
               
                }
            
            });
           })
        })
            
            
             if(i>0){
     
             alert(`CPF ja existe na base`);
             
            }else {
     
             let protocolo_id = false;
     
     
             const queijeira = {
         
                 
                 nomeProdutor: nome,
                 cpf: cpf ,
                 localidade: localidade,
                 derivados: derivados= document.getElementById("derivados").value,
                 dataAtual:data,
                 producao: producao ,
                 producaoInicial: producao,
                 funcionarios: funcionarios,
                 date:new Date()*-1,
                 telefone:telefone ,
                 status:".",
                 user:localStorage.getItem("user")
                 
             };
         
             if (!protocolo_id) {
                 protocolo_id = firebase.database().ref().child('queijeiras').push().key;
             }
             let updates = {}
             updates["/queijeiras/" + protocolo_id] = queijeira;
            
             let protocolo_ref = firebase.database().ref();
             firebase.database().ref().update(updates);
             window.location.reload();
            }
         
        })
   
  



}





 function listar() {

    console.log(localStorage.getItem("user"));
    if(localStorage.getItem("user")=="kalitianne1@gmail.com"){
        window.location.href="PROTRATOR2025.html";



           }


        console.log(localStorage.getItem("user"));
 if(localStorage.getItem("user")=="kalitianne1@gmail.com"){

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
    var databaseRef = firebase.database().ref('queijeiras/');
    var rowIndex=1;
   
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var row = tblUsers.insertRow(rowIndex);
            var cellNome = row.insertCell(0);
            var cellCPF = row.insertCell(1);
             var cellLocalidade = row.insertCell(2);
            var cellData = row.insertCell(3);            
            var cellProducao= row.insertCell(4);
            var cellFuncionarios = row.insertCell(5);
            var cellDerivados = row.insertCell(6);

            var cellTel=row.insertCell(7);
            var cellAddProducao = row.insertCell(8);

           var cellImprimir = row.insertCell(9);
          
            cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
            cellCPF.innerHTML=`<input type="button" class="btn btn" value="${childData.cpf}" onclick="deletar('${childKey}')"}/>`;
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
             cellProducao.appendChild(document.createTextNode(childData.producao));
             cellFuncionarios.appendChild(document.createTextNode(childData.funcionarios));
            cellDerivados.appendChild(document.createTextNode(childData.derivados));
            cellTel.appendChild(document.createTextNode(childData.telefone));


            cellImprimir.innerHTML=`<input type="button" class="btn btn-danger" value="IMPR." onclick="listarfiltro('${childKey}')"}/>`;
            cellAddProducao.innerHTML=`<input type="button" class="btn btn-danger" value="ADD PRODUCAO." onclick="addProducao('${childKey}')"}/>`;
 rowIndex++;
          
      });

    });
    
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
    
                    document.getElementById("nome").value =childData.nomeProdutor;
                    document.getElementById ("localidade").value =childData.localidade;
                     document.getElementById("telefone").value = childData.telefone;
                     
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
    
                    document.getElementById("nome").value =childData.nomeProdutor;
                    document.getElementById ("localidade").value =childData.localidade;
                     document.getElementById("telefone").value = childData.telefone;
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
    
                    document.getElementById("nome").value =childData.nomeProdutor;
                    document.getElementById ("localidade").value =childData.localidade;
                     document.getElementById("telefone").value = childData.telefone;
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
    
                    document.getElementById("nome").value =childData.nomeProdutor;
                    document.getElementById ("localidade").value =childData.localidade;
                     document.getElementById("telefone").value = childData.telefone;
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
    
                    document.getElementById("nome").value =childData.nomeProdutor;
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
    
                    document.getElementById("nome").value =childData.nomeProdutor;
                    document.getElementById ("localidade").value =childData.localidade;
                    document.getElementById("telefone").value = childData.telefone;

                   rowIndex ++;
              
                }

            });
    
        });
    }
    
    



    

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
function formatarData(dt){

    var ano = String(dt).slice(0,4);
    var mes =String(dt).slice(5,7);
    var dia =String(dt).slice(-2);

    return dia+"/"+mes+"/"+ano;
}




function listarfiltro(key) {

    var rowIndex=1;

    var nomeProdutor ;
    var cpf;
    var localidade;
    var producaoInicial;
    var dataCadastro;
    var derivados;
    var funcionarios;
    var telefone;
    var user;
    var databaseRef2 = firebase.database().ref('queijeiras/');

    databaseRef2.orderByChild("date").once('value', function (snapshot) {

    snapshot.forEach(function (childSnapshot) {
    
        var childData = childSnapshot.val();
        var childKey = childSnapshot.key;

        if(key == childKey){



                nomeProdutor = childData.nomeProdutor;
                 cpf = childData.cpf 
                 localidade = childData.localidade;
                 derivados = childData.derivados;
                 dataCadastro = childData.dataAtual;
                 producaoInicial = childData.producaoInicial;
                 funcionarios = childData.funcionarios;
                 telefone = childData.telefone;
                user= childData.user;
          
                   
        }
        });
});

var form = document.getElementById('form');
form.innerHTML=`<br><h2 style='
text-align: center;'> <strong>CADASTRO DE PRODUCOES</strong>`;

   
    var databaseRef = firebase.database().ref('producoes/');
   
   
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        var rowIndex=1;

        var tblUsers = document.getElementById('tbl_users_list');
        tblUsers.innerHTML = `<tr>
        <td scope="col">DATA</td>
        <td scope="col">VALOR TOTAL</td>
        <td scope="col">USUARIO</td>
       
        
       
        
    </tr> `;
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
           
            if(key==childData.key){
            var row = tblUsers.insertRow(rowIndex);
            var cellData = row.insertCell(0);
            var cellValor = row.insertCell(1);
            var cellUsuario = row.insertCell(2);
        

            
            cellValor.appendChild(document.createTextNode(childData.producaoAtual));
            cellData.appendChild(document.createTextNode(childData.data));
            cellUsuario.appendChild(document.createTextNode(childData.user));


            rowIndex = rowIndex + 1;
          
            }
            
            });
           

            
        document.getElementById("inf").innerHTML=`<h6><br><strong>PRODUTOR:</strong>&nbsp ${nomeProdutor} &nbsp &nbsp &nbsp <strong>CPF:</strong>&nbsp ${cpf} <br><strong>LOCALIDADE:</strong>&nbsp${localidade}<br> <strong>DERIVADOS&nbsp:</strong>${(derivados)}<br>
        <strong>PRODUCAO INICIAL:</strong> &nbsp ${producaoInicial} &nbsp &nbsp &nbsp <strong>DATA CADASTRO:</strong>&nbsp ${dataCadastro}</h6>`;
    });
    
}
 function imprimir(dt){

    
    var databaseRef = firebase.database().ref('queijeiras/');
    var databaseRef2 = firebase.database().ref('producoes/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
            
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            if(childSnapshot.key == dt ){
                
            
    
    
     var x = document.getElementById("geral");
    
     x.innerHTML = `
                     <img src="../PARTECIMA.png" height=300 width=100%><h2 style="
                     text-align: center;"> 
                   <strong> FICHA DE INSCRIÇÃO <br></strong>
                                </h2><h4 style="text-align: justify; margin-left:35px; margin-right:35px;"> 
                               
                                            
                    <br>
                    <br>
                    <strong> NOME :</strong>${childData.nome}<br>
                    <strong> CPF :</strong>${childData.cpf}<br>
                    <strong> LOCALIDADE:</strong>${childData.dtnasc}<br>
                        <br>
                    <strong> CONTATO:</strong>${childData.contato}
                        <br>
    
                   <strong>DERIVADOS: </strong><br><br>
                    
                        ${childData.obs}
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
    
   }







function addProducao(key){
    let protocolo_id = false;

    var databaseRef = firebase.database().ref('producoes/');
    var databaseRef2 = firebase.database().ref('queijeiras/');
    var atv2 =prompt("Insira a Producao atual");

    databaseRef2.orderByChild("date").once('value', function (snapshot) {
             
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childKey){

              
            
                       childData.producao= atv2;
                       childData.user= localStorage.getItem("user");

                       let updates = {}
                       updates["/queijeiras/" + childKey] = childData;
                       let produtor_ref = firebase.database().ref();
                       firebase.database().ref().update(updates);
            
            }
   
              
                        var producao = { 
                            key:key,
                            data :dataAtualFormatada(),
                            producaoAtual : atv2 ,
                            user: localStorage.getItem("user")
                        }

                        if (!protocolo_id) {
                            protocolo_id = firebase.database().ref().child('producoes').push().key;
                        }
                        let updates = {}
                        updates["/producoes/" + protocolo_id] = producao;
                        let protocolo_ref = firebase.database().ref();
                        firebase.database().ref().update(updates);
                        window.location.reload();
  
                    }); 
                });
}



function listarProducao(key){


    var nomeProdutor ;
    var cpf;
    var localidade;
    var producaoInicial;
    var dataCadastro;
    var derivados;
    var funcionarios;
    var telefone;
    var databaseRef2 = firebase.database().ref('queijeiras/');

    databaseRef2.orderByChild("date").once('value', function (snapshot) {

    snapshot.forEach(function (childSnapshot) {
    
        var childData = childSnapshot.val();
        var childKey = childSnapshot.key;

        if(key == childKey){



                nomeProdutor = childData.nomeProdutor;
                 cpf = childData.cpf 
                 localidade = childData.localidade;
                 derivados = childData.derivados;
                 dataCadastro = childData.dataAtual;
                 producaoInicial = childData.producao;
                 funcionarios = childData.funcionarios;
                 telefone = childData.telefone;

          
                   
        }
        });
});

    var databaseRef = firebase.database().ref('producoes/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
             
        snapshot.forEach(function (childSnapshot) {
    
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childData.key){              
                  
        

                       
                
             
            }
                 
              
          
            }); 
      });
  
}

function ultimaProducao(key){

    

    var databaseRef = firebase.database().ref('queijeiras/');
    localStorage.setItem("producao" ,"0")
    var producao = 0;
    var i= 0;


    databaseRef.orderByChild("date").once('value', function (snapshot) {

        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            var childKey = childSnapshot.key;

            if(key == childKey && i==0){

                localStorage.setItem("producao" ,""+childData.producao)
                console.log(  localStorage.getItem("producao"))
                i++
           
            }
              
          
            }); 

      });
  
      return Number(localStorage.getItem("producao"));

    }

    function deletar(key){
    
        var x = window.confirm("Deseja realmente Excluir esta solicitacao?");
        if(localStorage.getItem("user")=="kalitianne1@gmail.com"){
            x=false;
        }
        if (x) {
            firebase.database().ref('queijeiras').child(key).remove();
            window.location.reload();
        }
    }

