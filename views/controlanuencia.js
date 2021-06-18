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


function InserirAnuencia() {
    var data= dataAtualFormatada();
   var cpf = document.getElementById("cpf").value

    
   var databaseRef = firebase.database().ref('anuencia/');
    
        let anuencia_id = false;
        var ordemNum;
    var dt= new Date();
       ordemNum = document.getElementById("tbl_users_list").getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerHTML;
  ;
       
       if(String(ordemNum).slice(-4) == String(dt.getFullYear())){
           ordemNum = (Number(String(ordemNum).slice(0,-5))+1)+'/'+dt.getFullYear();
        
       }else{
           ordemNum = '001/'+ dt.getFullYear();
       }



        
        const anuencia = {
    
            ordemN : ordemNum,
            nomeProdutor: nomeProdutor = document.getElementById("produtor").value.toUpperCase(),
            cpf: cpf = document.getElementById("cpf").value,
            localidade: localidade = document.getElementById ("localidade").value.toUpperCase(),
            dataAtual:data,
            atividade: atividade = document.getElementById("atv").value,
            proprietario:proprietario = document.getElementById("prop").value,
            date:new Date()*-1,
            valorFin:valorFin =Number(document.getElementById("vlr").value),
            
            
        };
    
        if (!anuencia_id) {
            anuencia_id = firebase.database().ref().child('anuencia').push().key;
        }
        let updates = {}
        updates["/anuencia/" + anuencia_id] = anuencia;
        let anuencia_ref = firebase.database().ref();
        firebase.database().ref().update(updates);
        window.location.reload();
       
    
   
   
  
  
    
}

function listar() {
	
	
    if(!localStorage.getItem("auth")){
        alert("Necessario fazer login");
      window.location.href = "loguin.html";

    }

    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('anuencia/');
    var rowIndex = 1;
    var valor=0;
    
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var row = tblUsers.insertRow(rowIndex);

            var cellOrdem=row.insertCell(0);
            var cellNome = row.insertCell(1);
            var cellCPF = row.insertCell(2);
            var cellLocalidade = row.insertCell(3);
            var cellProprie= row.insertCell(4);            
            var cellValor = row.insertCell(5);
            var cellData = row.insertCell(6);
            var cellAtv= row.insertCell(7);
            var cellImprimir = row.insertCell(8);
            var cellUpload=row.insertCell(9);

            
          
            cellOrdem.appendChild(document.createTextNode(childData.ordemN));
            cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
            cellCPF.appendChild(document.createTextNode(childData.cpf));
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            cellProprie.appendChild(document.createTextNode(childData.proprietario));
            cellValor.appendChild(document.createTextNode(Number(childData.valorFin).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellAtv.appendChild(document.createTextNode(childData.atividade));
            cellUpload.innerHTML='<input type= "button" class="btn btn-primary"value="UPLOAD"onclick="link()"}/>';
            cellImprimir.innerHTML='<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimir(this)"}/>';


            rowIndex = rowIndex + 1;
         valor= valor+Number(childData.valorFin);
        });

        document.getElementById("inf").innerHTML=`<h6>PRODUTORES:&nbsp ${rowIndex-1} &nbsp &nbsp &nbsp VALOR TOTAL&nbsp:${valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h6>`;
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
function link(){
    window.location.href="https://forms.gle/F1Vunx3W1rgjqUSa9";
}
function imprimir(dt){

var data=dt.parentNode.parentNode.children;
var numeral = data[0].innerHTML;
var nomePr = data[1].innerHTML;
var cpfPr = data[2].innerHTML;
var localPr = data[3].innerHTML;
var Propri = data[4].innerHTML;
var valorFin = data[5].innerHTML;
var dataPr =data[6].innerHTML;
var atividade =data[7].innerHTML;

var condicao;

if(Propri.length<5){
    condicao ='Proprietario'
}else{
    condicao = `Arrendatario de ${Propri} `;
}
var x = document.getElementById("geral");



x.innerHTML = `
                <img src="../PARTECIMA.png" height=300 width=100%><h2 style="
                text-align: center;"> 
               <strong> Termo De Anuência Ambiental <br>${numeral}</strong></h2>
                <h3 style="
                line-height: 1.75;
                align-content: center;
                margin-left: 100px;
                margin-right: 100px;
                text-align: justify;
            ">
                            
                <br>
                <br>
                
               A <strong> PREFEITURA MUNICIPAL DE QUIXELO/CE</strong>, através da Secretaria de Desenvolvimento Agrário e Meio Ambiente, representada neste ato pelo Secretário Francisco Silva Lima, no uso de sua competência legal, obedecidas as disposições constantes na 
                Lei Municipal nº 150, de 15 de julho de 2013, resolve conceder, a
                <strong>  ${nomePr}</strong> &nbsp inscrito no CPF sob nº
                 <strong> ${cpfPr}</strong>, localizada em ${localPr} - Quixelô - 
                 Ceará, na condição de   ${condicao} , CEP 63.515-000, 
                 <strong>ANUÊNCIA AMBIENTAL</strong> para a atividade de ${atividade}.
                 <br> <br>Quixelô/CE,${dataPr}</strong><br> </h3>
                 <br><br><br><h3 style= "text-align:center; line-height:1.75;">
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
