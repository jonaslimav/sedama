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

// window.onload = listar;




function InserirProtocolo() {



   let residencia_id = false;




   
// receber atributos do formulario

var nome= document.getElementById("nome").value;
var cpf = document.getElementById("cpf").value;
var escolaridade= document.getElementById("escolaridade").value;
var rg = document.getElementById("rg").value;
var profissao = document.getElementById("profissao").value;
var localidade = document.getElementById("localidade").value;
var filiacao  = document.getElementById("filiacao").value;
var dtnasc = document.getElementById("dtnasc").value;
var telefone = document.getElementById("telefone").value;
var renda = document.getElementById("renda").value;
var nomeConj = document.getElementById("nomeConj").value;
var cpfConj = document.getElementById("cpfConj").value;
var rgConj = document.getElementById("rgConj").value;
var profissaoConj = document.getElementById("profissaoConj").value;
var filiacaoConj = document.getElementById("filiacaoConj").value;
var escolaridadeConj = document.getElementById("escolaridadeConj").value;
var dtnascConj = document.getElementById("dtnascConj").value;
var rendaConj = document.getElementById("rendaConj").value;
var banheiros = document.getElementById("banheiros").value;
var material = document.getElementById("material").value;
var qualificacao = document.getElementById("qualificacao").value;
var aluguel = document.getElementById("aluguel").value;
var prestacao = document.getElementById("prestacao").value;
var terreno = document.getElementById("terreno").value;
var npessoas =  document.getElementById("npessoas").value;
var tempo = document.getElementById("tempo").value;
var moradia = document.getElementById("moradia").value;
var obs =  document.getElementById("obs").value;
var especiais = document.getElementById("especiais").value;
var orgSocial = document.getElementById("orgSocial").value;
var cor = document.getElementById("cor").value;
var estCivil = document.getElementById("estCivil").value;

if(moradia=="1"){
    aluguel=0,
    prestacao=0;
}

if(estCivil=="1"||estCivil=="4"){
nomeConj = "";
 cpfConj = "";
 rgConj = "";
 profissaoConj = "";
 filiacaoConj = "";
 escolaridadeConj = "";
 dtnascConj = "";
 rendaConj = "";

}
var i=0;
var databaseRef = firebase.database().ref('trator2023/');
    
   databaseRef.orderByChild("date").once('value', function (snapshot) {
       snapshot.forEach(function (childSnapshot) {
           var childData = childSnapshot.val();
               
           if(childData.cpf==cpf||childData.cpfConj==cpf){
               
            i++;
          
           }
       });
       if(i>0){
           alert("Residencia ja cadastrada!")
       }else{
        const residencia = {
    
            
            nome: nome= nome.toUpperCase(),
            cpf: cpf = cpf,
            escolaridade: escolaridade= escolaridade,
            rg: rg=rg,
            estCivil:estCivil=estCivil,
            cor:cor=cor,
            profissao: profissao =profissao.toUpperCase(),
            localidade: localidade.toUpperCase(),
            filiacao:filiacao=filiacao.toUpperCase(),
            dtnasc: formatarData(dtnasc),
            date:new Date()*-1,
            data: dataAtualFormatada(),
            telefone:telefone= telefone,
            renda:renda= renda,
            nomeConj:nomeConj=nomeConj.toUpperCase(),
            cpfConj: cpfConj= cpfConj,
            rgConj:rgConj=rgConj,
            profissaoConj: profissaoConj =profissaoConj.toUpperCase(),
            filiacaoConj: filiacaoConj= filiacaoConj.toUpperCase(),
            escolaridadeConj:escolaridadeConj= escolaridadeConj,
            dtnascConj: formatarData(dtnascConj),
            rendaConj: rendaConj= rendaConj,
            banheiros: banheiros= banheiros,
            qualificacao:qualificacao= qualificacao,
            aluguel:aluguel=aluguel,
            prestacao: prestacao=prestacao,
            terreno: terreno= terreno.toUpperCase(),
            npessoas:npessoas=npessoas,
            tempo:tempo= tempo,
            moradia:moradia= moradia,
            especiais:especiais=especiais.toUpperCase(),
            obs:obs =document.getElementById("obs").value,
            orgSocial: orgSocial=orgSocial.toUpperCase(),
            user:localStorage.getItem("user")

        
            
            
        };
    
        if (!residencia_id) {
            residencia_id = firebase.database().ref().child('cadastro').push().key;
        }
        let updates = {}
        updates["/residencia/" + residencia_id] = residencia;
        let residencia_ref = firebase.database().ref();
        firebase.database().ref().update(updates);
        alert("Cadastrado");

        window.location.reload();
       }});
    
    }
    
   
  









// function listar() {
	
//     if(!localStorage.getItem("auth")){
//         alert("Necessario fazer login");
//       window.location.href = "loguin.html";

//     }

//     var tblUsers = document.getElementById('tbl_users_list');
//     var databaseRef = firebase.database().ref('cadastro/');
//     var rowIndex=1;
   
//     databaseRef.orderByChild("date").once('value', function (snapshot) {
        
//         snapshot.forEach(function (childSnapshot) {
//             var childKey = childSnapshot.key;
//             var childData = childSnapshot.val();

//             var row = tblUsers.insertRow(rowIndex);
//             var cellNome = row.insertCell(0);
//             var cellCPF = row.insertCell(1);
//             var cellLocalidade = row.insertCell(2);
//             var cellData = row.insertCell(3);            
//             var cellRg= row.insertCell(4);
//             var cellNis = row.insertCell(5);
//             var cellEmail = row.insertCell(6);
//             var cellTel=row.insertCell(7);
//             var cellNpessoas = row.insertCell(8)
            
//            var cellProfissao = row.insertCell(9);
//            var cellImprimir = row.insertCell(10);
          
//             cellNome.appendChild(document.createTextNode(childData.nome));
//             cellCPF.appendChild(document.createTextNode(childData.cpf));
//             cellLocalidade.appendChild(document.createTextNode(childData.endereco));
//             cellData.appendChild(document.createTextNode(childData.dtnasc));
//             cellRg.appendChild(document.createTextNode(childData.rg));
//             cellNis.appendChild(document.createTextNode(childData.nis));
//             cellEmail.appendChild(document.createTextNode(childData.email));
//             cellTel.appendChild(document.createTextNode(childData.contato));
//             cellNpessoas.appendChild(document.createTextNode(childData.npessoas));
//             cellProfissao.appendChild(document.createTextNode(childData.profissao))

//             cellImprimir.innerHTML=`<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimir('${childKey}')"}/>`;
//           //  cellDelete.innerHTML=`<input type="button" class="btn btn-danger" value="DELETE." onclick="deletar('${childKey}')"}/>`;
// rowIndex++;
          
//         });

//     });
    
// }






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

// function imprimir(dt){

    
//     var databaseRef = firebase.database().ref('cadastro/');
//     databaseRef.orderByChild("date").once('value', function (snapshot) {
            
//         snapshot.forEach(function (childSnapshot) {
    
//             var childData = childSnapshot.val();
//             if(childSnapshot.key == dt ){
                
            
    
    
//     var x = document.getElementById("geral");
    
//     x.innerHTML = `
//                     <img src="../PARTECIMA.png" height=300 width=100%><h2 style="
//                     text-align: center;"> 
//                    <strong> FICHA DE INSCRIÇÃO <br></strong>
//                                 </h2><h4 style="
//                                 text-align: justify; margin-left:35px; margin-right:35px;"> 
                               
                                            
//                     <br>
//                     <br>
//                     <strong> NOME :</strong>${childData.nome}<br>
//                     <strong> CPF :</strong>${childData.cpf}<br>
//                     <strong> DATA NASCIMENTO:</strong>${childData.dtnasc}<br>
//                     <strong> LOCALIDADE:</strong>${childData.endereco}
//                         <br>
//                         <strong> PROFISSAO :</strong>${childData.profissao}<br>
//                     <strong> RG :</strong>${childData.rg}<br>
//                     <strong> NIS:</strong>${childData.nis}
//                     <strong> CONTATO:</strong>${childData.contato}
//                         <br>
    
//                     <strong>OBSERVAÇÕES: </strong><br><br>
                    
//                         ${childData.obs}
//     </h4>
//                   <h5 style= "text-align:center; line-height:1.75;">
                     
//                      <div class="footer" style="position:absolute;
//                      bottom:0;
//                      width:100%;">
//                      <img src="../logPref.png" alt="some text"  width=100% ></div>
                        
//                            `;
                        
//                         } 
//                     });
//                 }); 
//       //  printDiv();
    
//     }





