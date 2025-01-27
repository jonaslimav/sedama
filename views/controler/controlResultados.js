var firebaseConfig = {
    apiKey: "AIzaSyDAsi3ULLpIlf7b5KdJ3up3PjKnvasrSJQ",
    authDomain: "sedama-fc903.firebaseapp.com",
    databaseURL: "https://sedama-fc903-default-rtdb.firebaseio.com",
    projectId: "sedama-fc903",
    storageBucket: "sedama-fc903.appspot.com",
    messagingSenderId: "790456121465",
    appId: "1:790456121465:web:eb031215f43a8c35953ca8"
  };

firebase.initializeApp(firebaseConfig);

window.onload = listar;



function InserirProtocolo() {


   var cpf = document.getElementById("cpf").value
    var i=0;
    var databaseRef = firebase.database().ref('protocolo/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
                
            if(childData.cpf==cpf && i==0){
          alert("CPF ja consta em RECIBOS!!")
           i=1;
            } 



            });
            if(i==0){

                let protocolo_id = false;


                const protocolo = {
            
                    
                    nomeProdutor: nomeProdutor = document.getElementById("produtor").value.toUpperCase(),
                    cpf: cpf = document.getElementById("cpf").value,
                    localidade: localidade = document.getElementById ("localidade").value.toUpperCase(),
                    rg: rg = document.getElementById("rg").value,
                    date:new Date()*-1,
                    user:localStorage.getItem("user")
        
                    
                    
                };
            
                if (!protocolo_id) {
                    protocolo_id = firebase.database().ref().child('protocolo').push().key;
                }
                let updates = {}
                updates["/protocolo/" + protocolo_id] = protocolo;
                let protocolo_ref = firebase.database().ref();
                firebase.database().ref().update(updates);
                window.location.reload();
               
    }});
  

       
   
   
  
  
    
}
function deletar(cpf){

    var databaseRef = firebase.database().ref('protocolo/');

    databaseRef.orderByChild("date").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
              var key =childSnapshot.key;  
            if(childData.cpf==cpf ){
                firebase.database().ref('protocolo').child(key).remove();
                
            } 
        });
        window.location.reload();
    })
 

}
function listar() {
	

    console.log(localStorage.getItem("user"));
    if(localStorage.getItem("user")=="kalitianne1@gmail.com"){
        window.location.href="PROTRATOR2025.html";



           }
    const ctx = document.getElementById('myChart').getContext('2d');
    const ctx2 = document.getElementById('myChart2').getContext('2d');

    const ctx3 = document.getElementById('myChart3').getContext('2d');

    const ctx4 = document.getElementById('myChart4').getContext('2d');

    
    
    // Dados iniciais do gráfico
    const data = {
        labels: ['2021', '2022', '2023', '2024', '2025'],
        datasets: [{
            
                label: 'Produtores',
                data: [359,1047,455,399,0],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Horas',
                data: [996,2865,1382,1121,0],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            
            
        }]
    };
    const data1 = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai','Jun', 'Jul','Ago','Set', 'Out', 'Nov','Dez'],
        datasets: [{
            
                label: 'Produtores',
                data: [359,1047,455,399,0],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Horas',
                data: [996,2865,1382,1121,0],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            
            
        }]
    };

    const data2 = {
        labels: ['2021', '2022', '2023', '2024', '2025'],
        datasets: [{
            
                label: 'Produtores',
                data: [359,1047,455,399,0],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Horas',
                data: [996,2865,1382,1121,0],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            
            
        }]
    };

    const data3 = {
        labels: ['2021', '2022', '2023', '2024', '2025'],
        datasets: [{
            
                label: 'Produtores',
                data: [359,1047,455,399,0],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Horas',
                data: [996,2865,1382,1121,0],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            
            
        }]
    };

    const data4 = {
        labels: ['2021', '2022', '2023', '2024', '2025'],
        datasets: [{
            
                label: 'Produtores',
                data: [359,1047,455,399,0],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Horas',
                data: [996,2865,1382,1121,0],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            
            
        }]
    };


    const myChart = new Chart(ctx, {
        type: 'bar', // Alterar para 'line' ou outro tipo de gráfico, se necessário
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Gráfico de Horas de trator'
                }
            }
        }
    });

    const myChart2 = new Chart(ctx2, {
        type: 'bar', // Alterar para 'line' ou outro tipo de gráfico, se necessário
        data: data1,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Gráfico de Horas de trator'
                }
            }
        }
    });

    const myChart3 = new Chart(ctx3, {
        type: 'bar', // Alterar para 'line' ou outro tipo de gráfico, se necessário
        data: data2,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Gráfico de Horas de trator'
                }
            }
        }
    });
    const myChart4 = new Chart(ctx4, {
        type: 'pie', // Alterar para 'line' ou outro tipo de gráfico, se necessário
        data: data3,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Gráfico de Horas de trator'
                }
            }
        }
    });

    
    // Lógica para filtrar os dados com base no intervalo de datas
    document.getElementById('filterButton').addEventListener('click', () => {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        if (!startDate || !endDate) {
            alert('Por favor, selecione ambas as datas!');
            return;
        }

        // Simular novo filtro de dados (aqui você pode implementar lógica real)
        alert(`Filtrando dados de ${startDate} a ${endDate}`);
        
        // Atualizar o gráfico (exemplo: alterar valores)
        myChart.data.datasets[0].data = [200, 150, 400, 450, 250, 500, 300];
        myChart.update();
    });
}





function imprimir(key){



    var databaseRef = firebase.database().ref('protocolo/');
    var rowIndex = 1;
    var horasTr=0;
    var dias=0;
    var dataAnt;
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            
            if(key == childKey){


                var nomePr = childData.nomeProdutor;
                var cpfPr = childData.cpf;
                var localPr = childData.localidade;
                var rgPr = childData.rg; 
                
                
                
                var x = document.getElementById("geral");
                
                x.innerHTML = `<h1>______________________________________________________________________________________________________________________
                <img src="../logPrefeitura.png" height=220 width=95%><h1> 
                <h3 style="
                line-height: 1.75;
                align-content: center;
                text-align: justify;">
                
                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,27)}/${getRandomInt(1,2)}/2024 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 134,40<br>
                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2024 </strong><br><br>
                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                <br>	<img src="../logotrator.png" alt="some text" height=200 width=90%>
                
                    </h3>
                    
                    <h1>______________________________________________________________________________________________________________________
                <img src="../logPrefeitura.png" height=220 width=95%><h1> 
                <h3 style="
                line-height: 1.75;
                align-content: center;
                text-align: justify;">
                
                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,27)}/${getRandomInt(1,2)}/2023 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 134,40<br>
                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2023 </strong><br><br>
                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                <br>	<img src="../logotrator.png" alt="some text" height=200 width=90%>
                
                    </h3>
                
                
                
                    <h1>_____________________________________________________________________________________________________________________<br>
                <h1>______________________________________________________________________________________________________________________
                <img src="../logPrefeitura.png" height=220 width=95%><h1> 
                <h3 style="
                line-height: 1.75;
                align-content: center;
                text-align: justify;">
                
                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2022 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 134,40<br>
                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2022 </strong><br><br>
                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                <br>	<img src="../logotrator.png" alt="some text" height=200 width=90%>
                
                    </h3>
                
                
                
                    <h1>_____________________________________________________________________________________________________________________<br>
                    
                            ________________________________________________________________________________________________________________________________
                             <img src="../logPrefeitura.png" height=220 width=95%><h1> 
                                <h3 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2021 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 134,40<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2021 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                <br>	<img src="../logotrator.png" alt="some text" height=200 width=90%>
                
                                    </h3>
                
                
                
                                    <h1>_____________________________________________________________________________________________________________________<br>
                                    _____________________________________________________________________________________________________________________<br>
                                    <img src="../pref2020.png" height=300 width=100%><h1> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2020</strong><br></h1>
                                   <h3 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2020 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 160,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2020 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h3><br><br><br>
                    
                                    
                                    
                                    <h1>_____________________________________________________________________________________________________________________<br>
                                    <h1>_____________________________________________________________________________________________________________________<br>
                        
                                    <img src="../pref2020.png" height=300 width=100%><h1> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp 
                                    &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2019</strong><br></h1>
                                   <h3 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2019 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 160,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2019 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h3><br><br><br>
                    
                                    
                                    
                                    <h1>_____________________________________________________________________________________________________________________<br>
                                    <h1>_____________________________________________________________________________________________________________________<br>
                                    <img src="../pref2020.png" height=300 width=100%><h1> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                     &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp
                                      &nbsp &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2018</strong><br></h1>
                                   <h3 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2018 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 160,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2018 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h3><br><br><br>
                    
                                    
                                    
                                    <h1>_____________________________________________________________________________________________________________________<br>
                                    <h1>_____________________________________________________________________________________________________________________<br>
                                    <h3 style="
                                    line-height: 1.75;
                                    align-content: center;
                                    text-align: justify;"> <img src="../pref2017.png" height=350 width=100%></h3><h1> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp
                                    &nbsp &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp
                                    &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2017</strong><br></h1>
                                   <h3 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2017 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 140,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2017 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h3><br><br><br>
                    
                                    
                                    
                                    <h1>_____________________________________________________________________________________________________________________<br>
                                    <h1>_____________________________________________________________________________________________________________________<br>
                                    <img src="../pref2017.png" height=350 width=100%><h1> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                     &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp 
                                     &nbsp &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2016</strong><br></h1>
                                   <h3 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2016 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 140,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2016 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h3><br><br><br>
                    
                                    
                                    
                                    <h1>_____________________________________________________________________________________________________________________<br>
                                    <h1>_____________________________________________________________________________________________________________________<br>
                                    <img src="../pref2017.png" height=350 width=100%><h1> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                     &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp 
                                     &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2015</strong><br></h1>
                                   <h3 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2015 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 120,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2015 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h3><br><br><br>
                    
                                    
                                    
                                    <h1>_____________________________________________________________________________________________________________________<br>
                                    <h1>_____________________________________________________________________________________________________________________<br>
                                    <img src="../pref2013.png" height=300 width=90%><h1> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                     &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp &nbsp
                                      &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2014</strong><br></h1>
                                   <h3 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2014 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 112,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2014 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h3><br><br><br>
                    
                                    
                                    
                                    <h1>_____________________________________________________________________________________________________________________<br>
                                    <h1>_____________________________________________________________________________________________________________________<br>
                                    <img src="../pref2013.png" height=300 width=90%><h1> 
                                    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                     &nbsp &nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp
                                      &nbsp &nbsp&nbsp &nbsp &nbsp <strong> HORA DE PRODUZIR - 2013</strong><br></h1>
                                   <h3 style="
                                line-height: 1.75;
                                align-content: center;
                                text-align: justify;">
                
                                <br> <strong> AGRICULTOR:</strong>&nbsp ${nomePr} <br>
                                <strong>CPF:</strong> &nbsp  ${cpfPr}&nbsp &nbsp &nbsp &nbsp <strong>RG Nº:</strong>&nbsp   ${rgPr} <br>
                                <strong> DATA PAGAMENTO:</strong> ${getRandomInt(1,29)}/${getRandomInt(1,5)}/2013 &nbsp&nbsp <strong> QUANT. HORAS:  </strong>  2 HORAS &nbsp&nbsp <br>
                                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  R$ 100,00<br>
                                <br><strong> TRATORISTA:____________________________ DATA SERVIÇO: ___/___/2013 </strong><br><br>
                                <strong> ASS.AGRICULTOR:_________________________________________SERVIDOR:______________________</strong><br>
                
                                
                
                                    </h3>
                                    
                                    <br>br>
                                    
                                    `; 
                                    


            }
           
        });

    });

                    
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
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }