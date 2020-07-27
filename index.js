console.log('hello');
let parametersBox=document.getElementById('parametersBox');
parametersBox.style.display='none'
//initialise param variable

//initially json is selected so display json request
document.getElementById('requestJson').style.display='block'
//parametersBox.style.display='none';

//when custom para clicked hide jsonbox box
let paramsRadio=document.getElementById('paramsRadio');
paramsRadio.addEventListener('click',()=>{
 document.getElementById('requestJson').style.display='none';

 parametersBox.style.display='block';

})

//when clicked on json hide requesst json
let jsonRadio=document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('requestJson').style.display='block'
    
    parametersBox.style.display='none';
})
let addParamCount=0;

function getElementFromString(string){
  let div=document.createElement('div');
  div.innerHTML=string;
  return div.firstElementChild;
}



//add more parameters to parameter box when + is clicked
let addParam=document.getElementById('addParam');
addParam.addEventListener('click',()=>{
    let params=document.getElementById('params');
    let string=`<div class="form-group row ">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addParamCount+2}</label>
    

    <div class="row">
        <div class="col-5">
          <input type="text" class="form-control" id='parameterKey${addParamCount+2}' placeholder="enter parameter ${addParamCount+2} key">
        </div>
        <div class="col">
          <input type="text" class="form-control" id='parameterValue${addParamCount+2}' placeholder="enter parameter ${addParamCount+2} value">
        </div>
        <div class="col-auto">
            <button id="addParam" class="btn btn-primary deleteParam">-</button>
        </div>
      </div>

</div>`
let paramElement=getElementFromString(string);
console.log(paramElement);
params.appendChild(paramElement);
let deleteParam=document.getElementsByClassName('deleteParam');
for(i of deleteParam){
  console.log(i);
  i.addEventListener('click',(e)=>{
    console.log(i)
   e.target.parentElement.parentElement.parentElement.remove(); 
  })
}
addParamCount++;
})

let submit=document.getElementById('submit');
submit.addEventListener('click',()=>{
document.getElementById('responseJsonText').value='fetching the result please wait...'
  let url=document.getElementById('url').value;
let requestType=document.querySelector("input[name='exampleRadios']:checked").value;
let contentType=document.querySelector("input[name='Radios']:checked").value;
console.log(url,requestType,contentType);



if(contentType=='json'){
data={};

for(i=0;i<addParamCount+1;i++){
  if(document.getElementById('parameterKey'+(i+1)) !=undefined){
  let key=document.getElementById('parameterKey'+(i+1)).value;
  
  let val=document.getElementById('parameterValue'+(i+1)).value;
  data[key]=val;
}
}
data=JSON.stringify(data);
}
else {
  data=document.getElementById('requestJsonText').value;
}
console.log(url,requestType,contentType,data);

if(requestType=='GET'){
  fetch(url,{
    method:'GET',  
  }).then(response=>response.text())
  .then((text)=>{
    document.getElementById('responseJsonText').value=text;
  });
}
else {
  fetch(url,{
    method:'POST',
    body:data,
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    
  }).then(response=>response.text())
  .then((text)=>{
    document.getElementById('responseJsonText').value=text;
  });
}
  

})