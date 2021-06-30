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


function InserirDispensa() {
    var data= dataAtualFormatada();
   var cpf = document.getElementById("cpf").value

    
   var databaseRef = firebase.database().ref('dispensa/');
    
        let dispensa_id = false;
        var ordemNum;
    var dt= new Date();
       ordemNum = document.getElementById("tbl_users_list").getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerHTML;
  ;
       
       if(String(ordemNum).slice(-4) == String(dt.getFullYear())){
           ordemNum = (Number(String(ordemNum).slice(0,-5))+1)+'/'+dt.getFullYear();
        
       }else{
           ordemNum = '001/'+ dt.getFullYear();
       }



        
        const dispensa = {
    
            ordemN : ordemNum,
            nomeProdutor: nomeProdutor = document.getElementById("produtor").value.toUpperCase(),
            cpf: cpf = document.getElementById("cpf").value,
            localidade: localidade = document.getElementById ("localidade").value.toUpperCase(),
            dataAtual:data,
            atividade: atividade = document.getElementById("atv").value,
            date:new Date()*-1,
            valorFin:valorFin =Number(document.getElementById("vlr").value),
            
            
        };
    
        if (!dispensa_id) {
            dispensa_id = firebase.database().ref().child('dispensa').push().key;
        }
        let updates = {}
        updates["/dispensa/" + dispensa_id] = dispensa;
        let dispensa_ref = firebase.database().ref();
        firebase.database().ref().update(updates);
        window.location.reload();
       
    
   
   
  
  
    
}

function listar() {
	
	
    if(!localStorage.getItem("auth")){
        alert("Necessario fazer login");
      window.location.href = "loguin.html";

    }

    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('dispensa/');
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
            var cellValor = row.insertCell(4);
            var cellData = row.insertCell(5);
            var cellAtv= row.insertCell(6);
            var cellImprimir = row.insertCell(7);
            var cellUpload=row.insertCell(8);

            
          
            cellOrdem.appendChild(document.createTextNode(childData.ordemN));
            cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
            cellCPF.appendChild(document.createTextNode(childData.cpf));
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
                  cellValor.appendChild(document.createTextNode(Number(childData.valorFin).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellAtv.appendChild(document.createTextNode(childData.atividade));
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

function imprimir(dt){

var data=dt.parentNode.parentNode.children;
var numeral = data[0].innerHTML;
var nomePr = data[1].innerHTML;
var cpfPr = data[2].innerHTML;
var localPr = data[3].innerHTML;
var valorFin = data[4].innerHTML;
var dataPr =data[5].innerHTML;
var atividade =data[6].innerHTML;

var x = document.getElementById("geral");



x.innerHTML = `
                <img src="../PARTECIMA.png" height=200 width=100%><h5 style="
                text-align: center;"><br>
               <strong> DECLARAÇÃO DE ISENÇÃO DE LICENCIAMENTO AMBIENTAL <br>${numeral}</strong></h5>
                <h5 style="
                line-height: 1.50;
                align-content: center;
                margin-left: 100px;
                margin-right: 100px;
                text-align: justify;
            ">
                            
                <br>
               
                
                Declaro para os devindo fins, de acordo com a Resolução COEMA de nº 02, de 11 de abril de 2019, que disciplina os critérios, 
                parâmetros e custos operacionais de concessão de licença/autorização e de análise de estudos ambientais, 
                referentes ao licenciamento ambiental das obras e atividades modificadoras do meio ambiente no território do Estado do Ceará, 
                a Isenção de Licenciamento Ambiental, ao Empreendedor &nbsp<strong>  ${nomePr}</strong>, inscrito no CPF sob o nº&nbsp<strong> ${cpfPr}</strong>, com a atividade de ${atividade}, 
                com localização no (a) ${localPr} - 63515-000, Quixelô/CE. <br><br>
                
                A ISENÇÃO DE LICENCIAMENTO NÃO IMPLICA NA AUTORIZAÇÃO DE GERAR POLUIÇÃO, DISPOR RESÍDUOS INADEQUADAMENTE BEM COMO COMPROMETER A
                QUALIDADE DOS RECURSOS HÍDRICOS. <br><br>
                
                Esta declaração é válida por tempo indeterminado, possibilitando-se sua revisão e/ou revogação, 
                caso haja mudança nos procedimentos apresentados na atividade. <br><br>
                
                Outrossim, informamos que a presente declaração não dispensa nem substitui quaisquer alvarás ou certidões de qualquer natureza. <br><br>
                
                Este documento também perderá a validade caso os dados fornecidos pelo empreendedor não correspondam à realidade.


                
                 <br>Quixelô/CE,${dataPr}</strong><br> </h5>
                 <br><br><br><h5 style= "text-align:center; line-height:1.40;">
                 <strong>Francisco Silva Lima <br> Secretario de Desenvolvimento
                 Agrário e Meio Ambiente - SEDAMA</h5>
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
