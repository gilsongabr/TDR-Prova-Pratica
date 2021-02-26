var selectedRow = null;

function onFormSubmit() {
    if(validate()){
        var formData = readFormData();
        if(selectedRow == null)
            addNovoUsuario(formData);
        else
            atualizarUsuario(formData);
        resetarCampos();
    }    
}

function readFormData() {
    var formData = {};
    formData["id"] = document.getElementById("id").value;
    formData["nome"] = document.getElementById("nome").value;
    formData["datanasc"] = document.getElementById("datanasc").value;
    formData["cpf"] = document.getElementById("cpf").value;
    return formData;
}

function addNovoUsuario(data) {
    var table = document.getElementById("listadeusuarios").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.id;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.nome;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.datanasc;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.cpf;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetarCampos(){
    document.getElementById("id").value ="";
    document.getElementById("nome").value ="";
    document.getElementById("datanasc").value ="";
    document.getElementById("cpf").value ="";
    selectedRow = null;
}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("nome").value = selectedRow.cells[1].innerHTML;
    document.getElementById("datanasc").value = selectedRow.cells[2].innerHTML;
    document.getElementById("cpf").value = selectedRow.cells[3].innerHTML;
}

function atualizarUsuario(formData){
    selectedRow.cells[0].innerHTML = formData.id;
    selectedRow.cells[1].innerHTML = formData.nome;
    selectedRow.cells[2].innerHTML = formData.datanasc;
    selectedRow.cells[3].innerHTML = formData.cpf;
}

function onDelete(td){
    row = td.parentElement.parentElement;
    document.getElementById("listadeusuarios").deleteRow(row.rowIndex);
    resetarCampos();
}

function validate(){
    isValed = true;
    if (document.getElementById("id").value === ""){
        isValed = false;
        document.getElementById("valida_erro_id").classList.remove("hide");
    } 
    else if (document.getElementById("nome").value === ""){
        isValed = false;
        document.getElementById("valida_erro_nome").classList.remove("hide");
    }
    else if (document.getElementById("datanasc").value === ""){
        isValed = false;
        document.getElementById("valida_erro_datanasc").classList.remove("hide");
    } 
    else if (document.getElementById("cpf").value === ""){
        isValed = false;
        document.getElementById("valida_erro_cpf").classList.remove("hide");
    }
    else if (parseInt(document.getElementById("id").value) < 0 || parseInt(document.getElementById("id").value) > 10000000){
        isValed = false;
        alert('Insira um ID num intervalo entre 0 a 10^7');
    }
    else if((document.getElementById("nome").value.length) > 60){
        isValed = false;
        alert('Esse nome é muito grande, favor digita um numero menor :)');
    }
    else if(validarData() == false){
        isValed = false;
        alert('Essa data não é valida, favor inserir uma data anterior que a atual');
    }
    else if((document.getElementById("cpf").value.length) != 11){
        isValed = false;
        alert('Esse CPF não contém 11 digitos')
    }
    else if(TestaCPF() == false){
        isValed = false;
        alert('Esse cpf não é válido');
    }
    else {
        isValed = true;
        if(!document.getElementById("valida_erro_id").classList.contains("hide"))
            document.getElementById("valida_erro_id").classList.add("hide");
    }
    return isValed;
}

function validarData(){
    var partesData = (document.getElementById("datanasc").value).split("-");
    var dataatual = new Date();
    var dia = dataatual.getDate() ;
    var mes = dataatual.getMonth() +1;
    var ano = dataatual.getFullYear();
    
    if(parseInt(partesData[0]) < parseInt(ano)){
        return true;        
    }

    if(parseInt(partesData[0]) == parseInt(ano) && parseInt(partesData[1]) < parseInt(mes)){
        return true;
    } 

    if(parseInt(partesData[0]) == parseInt(ano) && parseInt(partesData[1]) == mes && parseInt(partesData[2]) < parseInt(dia)){
        return true;
    }
    
    return false;
}

function TestaCPF() {
    var Soma;
    var Resto;
    var strCPF = document.getElementById("cpf").value;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}