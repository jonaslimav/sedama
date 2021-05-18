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


        const anuencia = {
    
            
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

    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('anuencia/');
    var rowIndex = 1;
    var valor=0;
    
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var row = tblUsers.insertRow(rowIndex);
            var cellNome = row.insertCell(0);
            var cellCPF = row.insertCell(1);
            var cellLocalidade = row.insertCell(2);
            var cellProprie= row.insertCell(3);            
            var cellValor = row.insertCell(4);
            var cellData = row.insertCell(5);
            var cellAtv= row.insertCell(6);
            var cellImprimir = row.insertCell(7);
            var cellUpload=row.insertCell(8);

            
          
            
            cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
            cellCPF.appendChild(document.createTextNode(childData.cpf));
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            cellProprie.appendChild(document.createTextNode(childData.proprietario));
            cellValor.appendChild(document.createTextNode(Number(childData.valorTotal).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
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
var nomePr = data[0].innerHTML;
var cpfPr = data[1].innerHTML;
var localPr = data[2].innerHTML;
var Propri = data[3].innerHTML;
var valorFin = data[4].innerHTML;
var dataPr =data[5].innerHTML;
var atividade =data[6].innerHTML;

var condicao;

if(Propri.length<5){
    condicao ='Proprietario'
}else{
    condicao = `Arrendatario à ${Propri} `;
}
var x = document.getElementById("geral");

x.innerHTML = `
                <img src="../PARTECIMA.png" height=300 width=100%><h1 style="
                text-align: center;"> 
               <strong> TERMO DE ANUENCIA AMBIENTAL</strong></h1>
                <h2 style="
                align-content: center;
                margin-left: 100px;
                margin-right: 100px;
                text-align: justify;
            ">
                            
                <br>
                <br>
                <br>
               A <strong> PREFEITURA MUNICIPAL DE QUIXELO/CE</strong>, através da Secretaria de Desenvolvimento Agrário e Meio Ambiente, representada neste ato pelo Secretário Francisco Silva Lima, no uso de sua competência legal, obedecidas as disposições constantes na 
                Lei Municipal nº 150, de 15 de julho de 2013, resolve conceder, a
                <strong>  ${nomePr}</strong> &nbsp inscrito no CPF sob nº
                 <strong> ${cpfPr}</strong>, localizada em ${localPr} - Quixelô - 
                 Ceará, na condição de   ${condicao} , CEP 63.515-000, 
                 <strong>ANUÊNCIA AMBIENTAL</strong> para a atividade de ${atividade}.\n\n
                 <br> <br><br>Quixelô/CE,${dataPr}</strong><br>
                 <div> </h2>
                 <img src="../lima.png" alt="some text" height=610 width=100% >
					
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