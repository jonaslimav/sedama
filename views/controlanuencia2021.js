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
            var cellDelete=row.insertCell(9);

            
          
            cellOrdem.appendChild(document.createTextNode(childData.ordemN));
            cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
            cellCPF.appendChild(document.createTextNode(childData.cpf));
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            cellProprie.appendChild(document.createTextNode(childData.proprietario));
            cellValor.appendChild(document.createTextNode(Number(childData.valorFin).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellAtv.appendChild(document.createTextNode(childData.atividade));
            cellDelete.innerHTML=`<input type="button" class="btn btn-danger" value="DELETE." onclick="deletar('${childKey}')"}/>`;
            cellImprimir.innerHTML='<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimir(this)"}/>';


            rowIndex = rowIndex + 1;
         valor= valor+Number(childData.valorFin);
        });

        document.getElementById("inf").innerHTML=`<h6>PRODUTORES:&nbsp ${rowIndex-1} &nbsp &nbsp &nbsp VALOR TOTAL&nbsp:${valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h6>`;
    });
    
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
                <img src="../PARTECIMA.png" height=300 width=100%><h4 style="
                text-align: center;"> 
               <strong> Termo De Anuência Ambiental <br>${numeral}</strong></h4>
                <h5 style="
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
                 Ceará, CEP 63.515-000, na condição de   ${condicao} ,  
                 <strong>ANUÊNCIA AMBIENTAL</strong> para a atividade de ${atividade}.
                 <br><br> <br>Quixelô/CE,${dataPr}</strong><br> </h5>
                 <br><br><br><h5 style= "text-align:center; line-height:1.5;">
                 <strong>Francisco Silva Lima <br> Secretario de Desenvolvimento<br>
                 Agrário e Meio Ambiente - SEDAMA</h5>
                 <div class="footer" style="position:absolute;
                 bottom:20px;
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

function deletar(key){
    
    var x = window.confirm("Deseja realmente Excluir esta demanda?");
    if (x) {
        firebase.database().ref('anuencia').child(key).remove();
        window.location.reload();
    }
}
function listarfiltro() {
	
	
    var item = document.getElementById("atvfiltro").value;
    var tblUsers = document.getElementById('tbl_users_list');
    tblUsers.innerHTML = `<tr>
    <td scope="col">Nº</td>
                <td scope="col">PRODUTOR</td>
                <td scope="col">CPF</td>
                <td scope="col">LOCALIDADE</td>
                <td scope="col">PROPRIETARIO</td>
                <td scope="col">VALOR FIN.</td>
                <td scope="col">DATA</td>
                <td scope="col">ATIVIDADE</td>
                <td scope="col">IMPRIMIR</td>
                <td scope="col">UPLOAD</td>
    
   
    
</tr> `;
    var databaseRef = firebase.database().ref('anuencia/');
    var rowIndex=1;
    var valor=0;
    var dias=0;
    var dataAnt;
   
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            if((String(childData.cpf).includes(String(item).toUpperCase())||String(childData.nomeProdutor).includes(String(item).toUpperCase())||String(childData.localidade).includes(String(item).toUpperCase())||String(childData.atividade).includes(String(item).toUpperCase()))){
               
               
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
                var cellDelete=row.insertCell(9);
    
                
              
                cellOrdem.appendChild(document.createTextNode(childData.ordemN));
                cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
                cellCPF.appendChild(document.createTextNode(childData.cpf));
                cellLocalidade.appendChild(document.createTextNode(childData.localidade));
                cellProprie.appendChild(document.createTextNode(childData.proprietario));
                cellValor.appendChild(document.createTextNode(Number(childData.valorFin).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
                cellData.appendChild(document.createTextNode(childData.dataAtual));
                cellAtv.appendChild(document.createTextNode(childData.atividade));
                cellDelete.innerHTML=`<input type="button" class="btn btn-danger" value="DELETE." onclick="deletar('${childKey}')"}/>`;
                cellImprimir.innerHTML='<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimir(this)"}/>';
    
    
                rowIndex = rowIndex + 1;
             valor= valor+Number(childData.valorFin);}
            });
    
            document.getElementById("inf").innerHTML=`<h6>PRODUTORES:&nbsp ${rowIndex-1} &nbsp &nbsp &nbsp VALOR TOTAL&nbsp:${valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h6>`;
              });
            
    
}