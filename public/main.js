let name = localStorage.getItem("welcome_name");

if (name === null || name === "") {
    name = prompt("Enter your name");

    if (name) {
        localStorage.setItem("welcome_name", name);
    }
}

alert("Note: To create a project you must have a title, category, and price , and use desktop or laptop for better experience");

document.getElementById("welcomeName").textContent = `${name}!`;
//reading the inputs
let light = document.getElementById("lightmode");
let dark = document.getElementById("darkmode");
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let descount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category")
let submit = document.getElementById("submit");
let update = document.getElementById("update");
let deletebtn = document.getElementById("delete");
let deleteAll = document.getElementById("deleteAll");
let search = document.getElementById("search");
let mode = "create";
let tmp;
//coding for light/dark mode
document.body.style.background = localStorage.background;
document.body.style.color = localStorage.color;

if (localStorage.background == "white")
    light.classList.add("hide");

else
    dark.classList.add("hide");



light.onclick = function () {
    dark.classList.remove("hide");
    light.classList.add("hide");
    document.body.style.background = "white";
    document.body.style.color = "black";
    localStorage.setItem("background", "white");
    localStorage.setItem("color", "black");

}

dark.onclick = function () {
    light.classList.remove("hide");
    dark.classList.add("hide");
    document.body.style.background = "#222";
    document.body.style.color = "#fff";
    localStorage.setItem("background", "#222");
    localStorage.setItem("color", "#fff");
}
////////////////////////////////////////////////////////////////////////////////////////////////////
//calculating the total price
function get_total() {
    if (price.value != "") {
        let result = +price.value + +taxes.value + +ads.value + -descount.value;
        total.innerHTML = result;
        total.style.background = "green";
    }
    else {
        total.innerHTML = "zero"
        total.style.background = "#a00d02";
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//create object and push in arrat

if (localStorage.data != null) {
    dataarr = JSON.parse(localStorage.data);
}
else {
    dataarr = [];
}


submit.onclick = function () {

    let data = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        descount: descount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }
     

if(title.value != "" && category.value != "" && price.value != "")
{   
      if(mode === "create")
      {     
      if(data.count > 1)
      {
        for(let i=0; i<data.count; i++)
        {
          dataarr.push(data);
        }
        
      }

      else
     {
          dataarr.push(data);

     }

    }


    else 
    {
    dataarr[tmp] = data;
    submit.innerHTML = "Create";
    mode = "create";
    count.style.display = "block";
    }


    localStorage.setItem("data", JSON.stringify(dataarr));

    clearData();
    showData();
    



}

}
//clear inputs
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    descount.value = "";
    total.innerHTML = "zero";
    count.value = "";
    category.value = "";
    total.style.background = "#a00d02";
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
//show data in table
function showData() {
    let table = "";
    for (let i = 0; i < dataarr.length; i++) {
        table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataarr[i].title}</td>
                        <td>${dataarr[i].price}</td>
                        <td>${dataarr[i].taxes}</td>
                        <td>${dataarr[i].ads}</td>
                        <td>${dataarr[i].descount}</td>
                        <td>${dataarr[i].total}</td>
                        <td>${dataarr[i].category}</td>
                        <td><button id="update" onclick="update_data(${i})">update</button></td>
                        <td><button id="delete" onclick = "delete_data(${i})">delete</button></td>
                    </tr>
    `
    }
   
    
    if (dataarr.length != 0)
    {
        deleteAll.style.display = "block";
    }
    else
    {
        deleteAll.style.display = "none";
    }

    
    document.getElementById("tbody").innerHTML = table;
    deleteAll.innerHTML = `Delete All (${dataarr.length})`;
    }
    

/////////////////////////////////////////////////////////////////////////////////////////////////////
//delete data
function delete_data(i)
{
     dataarr.splice(i, 1);
     localStorage.data = JSON.stringify(dataarr);
     showData();
}

function delete_All_data()
{
   dataarr.splice(0, dataarr.length);
   localStorage.data = JSON.stringify(dataarr);
   showData();
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
//update data

function update_data(i)
{
title.value = dataarr[i].title;
price.value = dataarr[i].price;
taxes.value = dataarr[i].taxes;
ads.value = dataarr[i].ads;
descount.value = dataarr[i].descount;
get_total();
count.style.display = "none";
category.value = dataarr[i].category;
submit.innerHTML = "Update";
mode = "update";
tmp = i;
scroll({
    top: 0,
    behavior: "smooth"
})

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//search data

let method = "title";
function search_data(id)
{
    search.focus();
     if(id === "searchTitle")
     {
       method = "title";
         search.placeholder = "Search By Title";
     }

     else
     {
         search.placeholder = "Search By Category"; 
       method = "category";
     }

     search.value = "";
    showData(); 
}



function get_search(value)
{ 
    let table = "";
     if(method == "title")
     {
        for(let i=0; i < dataarr.length; i++)
        {
            if(dataarr[i].title.includes(value))
            {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataarr[i].title}</td>
                        <td>${dataarr[i].price}</td>
                        <td>${dataarr[i].taxes}</td>
                        <td>${dataarr[i].ads}</td>
                        <td>${dataarr[i].descount}</td>
                        <td>${dataarr[i].total}</td>
                        <td>${dataarr[i].category}</td>
                        <td><button id="update" onclick="update_data(${i})">update</button></td>
                        <td><button id="delete" onclick = "delete_data(${i})">delete</button></td>
                    </tr>
    ` 
            }
        }
     }

     else{
         for (let i = 0; i < dataarr.length; i++) {
             if (dataarr[i].category.includes(value)) {
                 table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataarr[i].title}</td>
                        <td>${dataarr[i].price}</td>
                        <td>${dataarr[i].taxes}</td>
                        <td>${dataarr[i].ads}</td>
                        <td>${dataarr[i].descount}</td>
                        <td>${dataarr[i].total}</td>
                        <td>${dataarr[i].category}</td>
                        <td><button id="update" onclick="update_data(${i})">update</button></td>
                        <td><button id="delete" onclick = "delete_data(${i})">delete</button></td>
                    </tr>
    `
             }
         }
     }

    document.getElementById("tbody").innerHTML = table;
    search.placeholder = "search"

}