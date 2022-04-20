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


function InserirTecnico() {
    var data= dataAtualFormatada();
   var cpf = document.getElementById("cpf").value

    
   var databaseRef = firebase.database().ref('tecnico/');
    
        let tecnico_id = false;
        
    
    
        
        const tecnico = {
    
          nomeTecnico: nomeTecnico = document.getElementById("produtor").value.toUpperCase(),
            cpf: cpf = document.getElementById("cpf").value,
            localidade: localidade = document.getElementById ("localidade").value.toUpperCase(),
            dataAtual:data,
            especialidade: especialidade = document.getElementById("atv").value,
            date:new Date()*-1,
            user:localStorage.getItem("user")

            
        };
    
        if (!tecnico_id) {
            tecnico_id = firebase.database().ref().child('tecnico').push().key;
        }
        let updates = {}
        updates["/tecnico/" + tecnico_id] = tecnico;
        let tecnico_ref = firebase.database().ref();
        firebase.database().ref().update(updates);
        window.location.reload();
       
    
   
   
  
  
    
}

function listar() {

	var dataIni = document.getElementById('datainicial').value;
            var dataFim =document.getElementById('datafinal').value;
            console.log(dataIni);
            localStorage.setItem("dataIni",dataIni);
            localStorage.setItem("dataFim", dataFim);
    if(!localStorage.getItem("auth")){
        alert("Necessario fazer login");
      window.location.href = "loguin.html";

    }
    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('tecnico/');
    var rowIndex = 1;
    
    
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var row = tblUsers.insertRow(rowIndex);

            var cellNome = row.insertCell(0);
            var cellCPF = row.insertCell(1);
            var cellLocalidade = row.insertCell(2);
            var cellData = row.insertCell(3);
            var cellAtv= row.insertCell(4);
            var cellImprimir = row.insertCell(5);
            var cellUser = row.insertCell(6);
            
          
            cellNome.appendChild(document.createTextNode(childData.nomeTecnico));
            cellCPF.appendChild(document.createTextNode(childData.cpf));
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellAtv.appendChild(document.createTextNode(childData.especialidade));
            cellImprimir.innerHTML='<input type="button" class="btn btn-danger" value="RELATORIO" onclick="imprimir(this)"}/>';
            cellUser.appendChild(document.createTextNode(childData.user?childData.user:""));


            rowIndex = rowIndex + 1;
         
        });

        document.getElementById("inf").innerHTML=`<h6>TECNICOS:&nbsp ${rowIndex-1} </h6>`;
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


function dataEstaEntre(data,dataIni,dataFim){
    var anoD = String(data).slice(-4);
    var mesD =String(data).slice(3,5);
    var diaD =String(data).slice(0,2);
    var anoI = String(dataIni).slice(-4);
    var mesI =String(dataIni).slice(3,5);
    var diaI =String(dataIni).slice(0,2);
    var anoF = String(dataFim).slice(-4);
    var mesF =String(dataFim).slice(3,5);
    var diaF =String(dataFim).slice(0,2);

  data= Number(anoD+""+mesD+""+diaD);
  dataIni = Number(anoI+""+mesI+""+diaI);
  dataFim = Number(anoF+""+mesF+""+diaF);
  console.log(data + "-"+ dataIni+"-"+dataFim);
    if(data>=dataIni && data<=dataFim){
        return true;


    }
    else{
        return false;
    }

}
function salvarFiltro(){
    var dataIni = document.getElementById('datainicial').value;
            var dataFim =document.getElementById('datafinal').value;
            console.log(dataIni);
            localStorage.setItem("dataIni",dataIni);
            localStorage.setItem("dataFim", dataFim);
            alert("SALVO FILTRO");

}

function receberVisitasTecnico(tecnico){
    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('visita/');
   let  listVisitas = "";

   
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            var dataIni = localStorage.getItem("dataIni");
            var dataFim =localStorage.getItem("dataFim");
           if(childData.tecnico ==tecnico && dataEstaEntre(childData.dataAtual,formatarData(dataIni),formatarData(dataFim))){
            
            listVisitas +=`${childData.dataAtual}<br>${childData.produtor}<br>${childData.atividade}<br><br>`;




           }

            
          
           

        });
        var x = document.getElementById("list");
       x.innerHTML = listVisitas;
    });
    console.log(listVisitas);
    return listVisitas;

}


function imprimir(dt){

var data=dt.parentNode.parentNode.children;
var nomePr = data[0].innerHTML;
var cpfPr = data[1].innerHTML;
var localPr = data[2].innerHTML;
var dataPr =data[3].innerHTML;
var atividade =data[4].innerHTML;

var list = receberVisitasTecnico(`${cpfPr} - ${nomePr}`);

var x = document.getElementById("geral");



x.innerHTML = `
                <img src="../PARTECIMA.png" height=300 width=100%><h2 style="
                text-align: center;"> 
               <strong> Relatorio Tecnico <br></strong></h2>
                <h3 style="
                line-height: 1.75;
                align-content: center;
                margin-left: 100px;
                margin-right: 100px;
                text-align: justify;
            ">
                            
                <br>
                <br>
                
                <strong>NOME:  </strong>${nomePr}<br> 
                <strong> CPF nº: </strong>${cpfPr}<br><br>
                <strong> RESUMO DAS VISITAS</strong><br><br>
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

function formatarData(dt){

    var ano = String(dt).slice(0,4);
    var mes =String(dt).slice(5,7);
    var dia =String(dt).slice(-2);

    return dia+"/"+mes+"/"+ano;
}