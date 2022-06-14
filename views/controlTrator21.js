
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

var valor= 71.74;


function listar() {
    //     console.log(localStorage.getItem("user"));
	// if(localStorage.getItem("user")!="jlvieira248@gmail.com"){

    //     var x = document.getElementById("form");
    //     var y = document.getElementById("menu2")
    //     x.innerHTML="<br>";
    //     y.innerHTML ="<br>";

    // }
    if(!localStorage.getItem("auth")){
        alert("Necessario fazer login");
      window.location.href = "loguin.html";

    }

    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('trator2021/');
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
            var cellHoras = row.insertCell(4);
            var cellValor = row.insertCell(5);
            var cellData = row.insertCell(6);
            var cellTel=row.insertCell(7);
            var cellImprimir = row.insertCell(8);
            var cellDelete = row.insertCell(9);
            
            if(childData.telefone==undefined ){
                childData.telefone="-";
            }
            if(childData.rg==undefined ){
                childData.rg="-";
            }
            
            cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
            cellCPF.appendChild(document.createTextNode(childData.cpf));
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            cellRG.appendChild(document.createTextNode(childData.rg));
            cellHoras.appendChild(document.createTextNode(horasFormat(childData.horas)));
            cellValor.appendChild(document.createTextNode(childData.valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellTel.appendChild(document.createTextNode(childData.telefone));
            cellImprimir.innerHTML='<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimir(this)"}/>';
          //  cellDelete.innerHTML=`<input type="button" class="btn btn-danger" value="DELETE." onclick="deletar('${childKey}')"}/>`;

           if(dataAnt!=childData.dataAtual){
               dias++;
               dataAnt=childData.dataAtual;
           }

            rowIndex = rowIndex + 1;
            horasTr = horasTr+Number(childData.horas);
        });

        document.getElementById("inf").innerHTML=`<h6>PRODUTORES:&nbsp ${rowIndex-1} &nbsp &nbsp &nbsp QUANT. HORAS:&nbsp ${horasTr.toFixed(2)} &nbsp &nbsp &nbsp DIAS:&nbsp${dias}&nbsp &nbsp &nbsp VALOR TOTAL&nbsp:${(horasTr*valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h6>`;
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
var horaPr = data[4].innerHTML;
var valorPr = data[5].innerHTML;
var dataPr =data[6].innerHTML;


var x = document.getElementById("geral");

x.innerHTML = `
            ________________________________________________________________________________________________________________________________
				<h3> Via Produtor</h3> <img src="../logPrefeitura.png" height=220 width=95%><h1> 
				<h1>
                <br> <strong> PRODUTOR:</strong>&nbsp ${nomePr} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${cpfPr}<br><br>
                <strong>RG Nº:</strong>&nbsp   ${rgPr} &nbsp &nbsp &nbsp &nbsp
                <strong> DATA:</strong>  &nbsp ${dataPr} &nbsp&nbsp&nbsp&nbsp&nbsp <strong> QUANT. HORAS:  </strong>  ${horaPr} &nbsp&nbsp <br> <br>
                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  ${valorPr}<br><br>
				<strong> TRATORISTA:______________________________________ <br><br>  DATA SERVIÇO:______/______/__________</strong><br>
				<br>	<img src="../logotrator.png" alt="some text" height=200 width=90%>

                    <h1>_____________________________________________________________________________________________________________________<br>
		

					_______________________________________________________________________________________________________________________<br>
					<h3> Via Tratorista</h3><img src="../logPrefeitura.png" height=220 width=95%><h1>
                    <br> <strong> PRODUTOR:</strong>&nbsp ${nomePr} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${cpfPr}<br><br>
                    <strong>RG:</strong>&nbsp   ${rgPr} &nbsp &nbsp &nbsp &nbsp
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

function deletar(key){
    
    var x = window.confirm("Deseja realmente Excluir esta solicitacao?");
    if (x) {
        firebase.database().ref('trator2022').child(key).remove();
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
    <td scope="col">RG</td>
    <td scope="col">HORAS</td>
    <td scope="col">VALOR TOTAL</td>
    <td scope="col">DATA</td>
    <td scope="col"> TELEFONE</td>
    <td scope="col">IMPRIMIR</td>
   
    
</tr> `;
    var databaseRef = firebase.database().ref('trator2022/');
    var rowIndex=1;
    var horasTr=0;
    var dias=0;
    var dataAnt;
   
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            if(String(childData.cpf).includes(String(item).toUpperCase())||String(childData.nomeProdutor).includes(String(item).toUpperCase())||String(childData.localidade).includes(String(item).toUpperCase())){
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
            var cellDelete = row.insertCell(9);
            
          
            
            cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
            cellCPF.appendChild(document.createTextNode(childData.cpf));
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            cellRG.appendChild(document.createTextNode(childData.rg));
            cellHoras.appendChild(document.createTextNode(horasFormat(childData.horas)));
            cellValor.appendChild(document.createTextNode(childData.valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellTel.appendChild(document.createTextNode(childData.telefone));
            cellImprimir.innerHTML='<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimir(this)"}/>';
          //  cellDelete.innerHTML=`<input type="button" class="btn btn-danger" value="DELETE." onclick="deletar('${childKey}')"}/>`;

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