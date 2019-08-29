

web ="https://vocal-clone-237107.appspot.com";
//web="http://127.0.0.1:8080";
function ipapi() {
     var url ="http://ip-api.com/json"
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.open("GET", url, true); // "synchronous"
    xmlhttp.onreadystatechange = function () {
        //  console.log(req.status);
        if (xmlhttp.readyState == 4&&xmlhttp.status === 200 ) {
            jsonObj = JSON.parse(xmlhttp.responseText);
           // console.log(jsonObj.zip);
            current_zipcode = jsonObj.zip;
        }
        }
    xmlhttp.send();

}
function postData() {
    $("#progressbar").css("visibility","visible");
    $("#plan").css("width","50%");
    num = 0;
    url = "";
    // keywords
    url = url + "keywords=" + document.forms[0].keyword.value;
    //categoryId
    category = document.forms[0].category.value;
    if (category != "all")
        url = url + "&categoryId=" + category;
    if (document.forms[0].from.value == "other") {

        url = url + "&buyerPostalCode=" + document.forms[0].zipcode.value;
    } else
        url = url + "&buyerPostalCode=" + current_zipcode;

    url = url + "&itemFilter(0).name=HideDuplicateItems&itemFilter(0).value=true";

        num = num + 1;
        url = url + "&itemFilter(" + num + ").name=MaxDistance&itemFilter(" + num + ").value=";
        if (document.forms[0].distance.value == "")
            url = url + "10";
        else
            url = url + document.forms[0].distance.value;

    //console.log(document.getElementsByName("condition"))
    var id_array=new Array();
    $('input[name="condition"]:checked').each(function(){
        id_array.push($(this).val());
    });
    // console.log(id_array);
    if (id_array.length != 0) {
        // n = -1;
        num = num + 1;
        url = url + "&itemFilter(" + num + ").name=Condition";
        for (var i = 0; i < id_array.length;i++) {

            url = url + "&itemFilter(" + num + ").value(" + i + ")=" + id_array[i];
        }
    }
    var ship_array=new Array();
    $('input[name="shipping"]:checked').each(function(){
        ship_array.push($(this).val());
    });
    //   console.log(ship_array);
    if (ship_array.length != 0) {
        for (var i = 0;  i <ship_array.length;i++) {
            num = num + 1;
            url = url + "&itemFilter(" + num + ").name=" + ship_array[i] + "&itemFilter(" + num + ").value=true";
        }
    }
  //   console.log(url);
    var req = new XMLHttpRequest();
    req.open('GET', web+"/ebayproduct?" + url, true);
    req.onreadystatechange = function () {
        //  console.log(req.status);
        if (req.readyState == 4&&req.status === 200 ) {
            //  console.log(11);
            $("#plan").css("width","100%");
            $("#progressbar").css("visibility","hidden");
            req_item = JSON.parse(req.responseText);
            console.log(req_item);
         //   value = JSON.parse(req_item);
            value = JSON.parse(req.responseText);

            current_all = value;
             console.log(req.responseText);
            console.log(value);

            html_text ="";
            value.onload=generateHTML(value,1);
            $("#wish").removeClass("text-white bg-dark").addClass("text-black-50 bg-light");
            $("#results").removeClass("text-black-50 bg-light").addClass("text-white bg-dark");
            document.getElementById("res").style.display="block";
            document.getElementById("re_table").style.display="block";
            document.getElementById("wishshopcar").style.display="none";
            document.getElementById("pro_detail").style.display="none";
            if (html_text!="No records have been found") {


              //  document.getElementById("details").style.display="none";
                $("#details").css("display","block");
                document.getElementById("re_table").innerHTML = html_text;
             //   console.log(document.getElementById("re_table").scrollWidth);
            }
            else
            {
                document.getElementById("re_table").innerHTML = "<div style=' width:85%; margin:auto; background-color:  #ffe87c; color: #d39e00'> <span style='margin-left: 2%'>No Record.</span></div>";
            }
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })}

    }
    req.send(null);
}
function validinput(){
    keyword = document.getElementById("keyword");
    fro = document.forms[0].from;
    zipcode = document.forms[0].zipcode;
    reg = /^\d{5}$/;
    flag = false;
    // keyword.setCustomValidity("");
    if (keyword.value =="")
    {

        keyword.style.borderColor = "red";
        $("#keyerror").css("display","block");
        flag = true;
        // console.log($("#keyerror").css("display"));
    }
    else{
        keyword.style.borderColor = "white";

        $("#keyerror").css("display","none");
    }

    if (fro.value =="other" && zipcode.value=="")
    {
        zipcode.style.borderColor="red";
        $("#ziperror").css("display","block");
        flag = true
    }
    else{
        zipcode.style.borderColor = "white";

        $("#ziperror").css("display","none");
        if (fro.value=="other") {
            if (reg.test(zipcode.value)) {
                flag = flag || false;
            } else {
                flag = true;
            }
        }
    }
    if (flag){
        $("#search").attr("disabled","disabled");
    }
    else
    {
        $("#search").removeAttr("disabled");
    }
}
$(function(){
$("#form1").click(function(){
    validinput();

})})
$(function(){
$("#keyword").keyup(function(){
    validinput();
})})
    $(function(){
$("#zipcode").keyup(function () {
    validinput();
})})

$(function(){
    $("#photosbutton").click(function(){
        $(".buttonall").css("background-color","white");
        $(".buttonall").css("color","black");

        $("#photosbutton").css("background-color","black");
        $("#photosbutton").css("color","white");

        $(".tableall").css("display","none");
        $("#photo").css("display","block");
        $grid = $('.masonry').masonry({
            // options...
        });
// layout Masonry after each image loads
        $grid.imagesLoaded().progress( function() {

            $grid.masonry('layout');
            // document.getElementById("photo").style.display="none";
            //document.getElementById("photo").style.visibility="visible";
        });

    })})

$(function(){
    $("#shippingbutton").click(function(){
        $(".buttonall").css("background-color","white");
        $(".buttonall").css("color","black");

        $("#shippingbutton").css("background-color","black");
        $("#shippingbutton").css("color","white");

        $(".tableall").css("display","none");
        $("#ship").css("display","block");

    })})

$(function(){
    $("#sellerbutton").click(function(){
        $(".buttonall").css("background-color","white");
        $(".buttonall").css("color","black");

        $("#sellerbutton").css("background-color","black");
        $("#sellerbutton").css("color","white");

        $(".tableall").css("display","none");
        $("#seller").css("display","block");

    })})

$(function(){
    $(".similarbutton").click(function(){
        $(".buttonall").css("background-color","white");
        $(".buttonall").css("color","black");

        $(".similarbutton").css("background-color","black");
        $(".similarbutton").css("color","white");

        $(".tableall").css("display","none");
        $("#similar").css("display","block");

    })})

$(function(){
    $("#productbutton").click(function(){
        $(".buttonall").css("background-color","white");
        $(".buttonall").css("color","black");

        $("#productbutton").css("background-color","black");
        $("#productbutton").css("color","white");

        $(".tableall").css("display","none");
        $("#detail_table").css("display","block");

    })})
function  refrshtable(num) {
   // setTimeout("",1000);
    html_text ="";
    document.getElementById("wishshopcar").style.display = "none";
    document.getElementById("list_value").value=num;
     //  document.getElementById("pro_detail").style.display = "none"
    var d = $("#pro_detail");
    d.animate({
        marginLeft:'80%'
    },1000,function () {
        $(this).css("display","none");
        $(this).css("margin","auto");
        if (!(typeof current_all == "undefined")){
            document.getElementById("res").style.display = "block";

        }

    });
    $("#details").css("display", "none");

    $("#wish").removeClass("text-white bg-dark").addClass("text-black-50 bg-light");
    $("#results").removeClass("text-black-50 bg-light").addClass("text-white bg-dark");
   // console.log(typeof  current_all);
    if (!(typeof current_all == "undefined")) {

    //    document.getElementById("res").style.display = "block";
        document.getElementById("re_table").style.display = "block";

        generateHTML(current_all,num);

        if (html_text != "No records have been found") {
            $("#details").css("display", "block");
            document.getElementById("re_table").innerHTML = html_text;
        }
        else{
            document.getElementById("re_table").innerHTML="<div style=' width:85%; margin:auto; background-color:  #ffe87c; color: #d39e00'> <span style='margin-left: 2%'>No Record.</span></div>";
        }
    }
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    }

function  refrshtable1(num) {
    // setTimeout("",1000);
    html_text ="";
    document.getElementById("wishshopcar").style.display = "none";
    document.getElementById("list_value").value=num;
    document.getElementById("pro_detail").style.display = "none"
    $("#details").css("display", "none");

    $("#wish").removeClass("text-white bg-dark").addClass("text-black-50 bg-light");
    $("#results").removeClass("text-black-50 bg-light").addClass("text-white bg-dark");
 //   console.log(typeof  current_all);
    if (!(typeof current_all == "undefined")) {
        document.getElementById("res").style.display = "block";
        document.getElementById("re_table").style.display = "block";

        generateHTML(current_all,num);

        if (html_text != "No records have been found") {
            $("#details").css("display", "block");
            document.getElementById("re_table").innerHTML = html_text;
        }
        else{
            document.getElementById("re_table").innerHTML="<div style=' width:85%; margin:auto; background-color:  #ffe87c; color: #d39e00'> <span style='margin-left: 2%'>No Record.</span></div>";
        }
    }
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}

function generateHTML(jsonObj,num)   {
 //   console.log(num);
    //  html_text+="<div class='container'>";
    html_text+="<table class='table table-striped  table-dark' >"
    product= jsonObj.findItemsAdvancedResponse[0];
    if (product.ack[0] != "Success")
    {
        html_text = "No records have been found";
        return null;
    }
    if (product.searchResult[0]["@count"] == "0")
    {
        html_text = "No records have been found";
        return null;
    }
    product = product.searchResult[0].item;
    html_text+="<tbody>";

    html_text+="<tr>";
    // output the headers
    html_text += "<th>" + "#" + "</th>";
    html_text += "<th>" + "Image" + "</th>";
    html_text += "<th>" + "Title" + "</th>";
    html_text += "<th>" + "Price" + "</th>";
    html_text += "<th>" + "Shipping" + "</th>";
    html_text += "<th>" + "Zip" + "</th>";
    html_text += "<th>" + "Seller" + "</th>";
    html_text += "<th>" + "Wish List" + "</th>";

    html_text+="</tr>";
    for ( var i=10*(num-1); i<10*(num-1)+10;i++)
        if (i<product.length){
     //   console.log(product[i].itemId[0]);
        if (!(typeof current_product == "undefined") && current_product.itemId[0] == product[i].itemId[0])
        html_text+="<tr style='background-color: #adb5bd'>";
        else
            html_text+="<tr>";
        html_text+="<td>";
        html_text+=i+1;
        html_text+="</td>";
        if ( "galleryURL" in product[i]) {
            html_text += "<td>";
            html_text += "<a href='"+ product[i].galleryURL[0]+"' target='_blank'><img width='80';height='80'; src=" + product[i].galleryURL[0] + "></a>";
            html_text += "</td>";
        }
        else
        {
            html_text += "<td>";
            html_text += "N/A";
            html_text += "</td>";
        }
        if ( "title" in product[i]) {
            ti = product[i].title[0].replace(/ /g,'&#32;');
            ti = ti.replace(/"/g,'&quot;');
            html_text += "<td   style = \" white-space: nowrap; \" >";
            html_text +="<a  id=\"" +i + "\"" +"href='javascript:void(0)' onclick=\"myname(product,this.id)\" title=\""+ ti+"\" data-toggle=\"tooltip\" data-placement=\"bottom\"  " ;
            html_text+="/a>";
            if ((product[i].title[0].length) <=35) {
                html_text += product[i].title[0];
            }
            else {
                st = "";

                if (product[i].title[0][34] !=" ") {
                    //   console.log(product[i].title[0][34]);
                    for (var j = 34; j >= 0; j--) {
                        if (product[i].title[0][j] == " ") {
                            st = product[i].title[0].substring(0, j);
                            break;
                        }
                    }
                }
                else
                    st =product[i].title[0].substring(0, 35);
                html_text += st+"...";

            }
            html_text += "</td>";
        }
        else
        {
            html_text += "<td>";
            html_text += "N/A";
            html_text += "</td>";
        }
        if ( "sellingStatus" in product[i]) {
            html_text += "<td>";
            html_text += "$" + product[i].sellingStatus[0].currentPrice[0].__value__;
            html_text += "</td>";
        }
        else
        {
            html_text += "<td>";
            html_text += "N/A";
            html_text += "</td>";
        }
        if ( "shippingInfo" in product[i]) {
            html_text += "<td>";
            var sh = product[i].shippingInfo[0];
            if (!("shippingServiceCost" in sh) || sh.shippingServiceCost[0].__value__ == "0.0")
                html_text += sh.shippingType[0];
            else
                html_text += "$" + sh.shippingServiceCost[0].__value__;
            html_text += "</td>";
        }
        else
        {
            html_text += "<td>";
            html_text += "N/A";
            html_text += "</td>";
        }
        if ( "postalCode" in product[i]) {
            html_text += "<td>";
            html_text += product[i].postalCode[0];
            html_text += "</td>";
        }
        else
        {
            html_text += "<td>";
            html_text += "N/A";
            html_text += "</td>";
        }
        if ( "sellerInfo" in product[i]) {
            html_text += "<td>";
            html_text += product[i].sellerInfo[0].sellerUserName[0];
            html_text += "</td>";
        }
        else
        {
            html_text += "<td>";
            html_text += "N/A";
            html_text += "</td>";
        }
        html_text += "<td>";
        if (localStorage.getItem(product[i].itemId[0]) ==null)
        html_text += "<button class='btn' onclick='shop(this.childNodes[1],product["+i+"])'> <i class='material-icons' '>add_shopping_cart</i></button>";
        else
            html_text += "<button class='btn' onclick='shop(this.childNodes[1],product["+i+"])'> <i class='material-icons' style='color: #d39e00' '>remove_shopping_cart</i></button>";


        html_text += "</td>";





        html_text+="</tr>";

    }
    html_text+="</tbody>";
    html_text+="</table>";
    if (num!=1) {
        html_text += " <b></b><ul class=\"pagination justify-content-center \" >\n" +
            "        <li class=\"page-item pa\"><a class=\"page-link\" href='javascript:void(0)' onclick='refrshtable(" + (num - 1) + ")'> &laquo; Previous</a></li>";
    }
    else{
        html_text += "<b> <ul class=\"pagination justify-content-center \" >\n" +
            "        <li  class=\"page-item disabled pa\"><a class=\"page-link\" href='javascript:void(0)' onclick='refrshtable(" + num + ")'> &laquo; Previous</a></li>";

    }
    var page =   parseInt(product.length/10);
   // console.log(page,product.length);
    if (product.length%10 !=0)
        page+=1;
    for  (var j=1; j<=page; j++) {
        if (j==num)
            html_text += "<li class=\"page-item active pa\" >";
        else
            html_text += "<li class=\"page-item pa\">";
        html_text += "<a class=\"page-link\" href='javascript:void(0)' onclick='refrshtable("+j+")'>"+j+"</a></li>";
    }
    if (num<page) {
        html_text += " <li  class=\"page-item pa\"><a class=\"page-link\" href='javascript:void(0)' onclick='refrshtable(" + (num + 1) + ")'>Next &raquo;</a></li></ul></b>";
    }
    else{
        html_text += "<li  class=\"page-item disabled pa\"><a class=\"page-link\" href='javascript:void(0)' onclick='refrshtable(" + num + ")'>Next &raquo;</a></li></ul></b>";

    }



    //  html_text+="</div>";

}

function shop(obj,value) {
      //  console.log(value);
    if (obj.innerHTML == "add_shopping_cart")
    {
        obj.innerHTML = "remove_shopping_cart";
        obj.style.color="#d39e00";
        localStorage.setItem(value.itemId[0],JSON.stringify(value));
    }
    else{
        obj.innerHTML = "add_shopping_cart";
        obj.style.color="black";
        localStorage.removeItem(value.itemId[0]);
    }

   // console.log(JSON.parse(localStorage.getItem(value.itemId[0])));
}

function shop1(obj,value) {

    if (obj.innerHTML == "add_shopping_cart")
    {
        obj.innerHTML = "remove_shopping_cart";
        obj.style.color="#d39e00";
        localStorage.setItem(value.ItemID,JSON.stringify(value));
    }
    else{
        obj.innerHTML = "add_shopping_cart";
        obj.style.color="black";
        localStorage.removeItem(value.ItemID);
    }

    // console.log(JSON.parse(localStorage.getItem(value.itemId[0])));
}

function refreshdetail1() {
   // document.getElementById("pro_detail").style.display="block";
   // document.getElementById("res").style.display="none";
    document.getElementById("wishshopcar").style.display="none";
    document.getElementById("detailsbutton").removeAttribute("disabled");
    document.getElementById("details").style.display="none";
    if (localStorage.getItem(current_product.itemId[0]) == null)
    {
        document.getElementById("shop_detail").style.color="black";
        document.getElementById("shop_detail").innerHTML="add_shopping_cart";
    }
    else{
        document.getElementById("shop_detail").style.color="#d39e00";
        document.getElementById("shop_detail").innerHTML="remove_shopping_cart";

    }
}
function refreshdetail() {

    var d = $("#res");
    d.animate({
        marginLeft:'80%'
    },1000,function () {
        $(this).css("display","none");
        $(this).css("margin","auto");
        $('#wishshopcar').css("display","none");

        document.getElementById("pro_detail").style.display="block";
        document.getElementById("detailsbutton").removeAttribute("disabled");
        document.getElementById("details").style.display="none";
    });
    //document.getElementById("res").style.display="none";
  //  document.getElementById("wishshopcar").style.display="none";

    if (localStorage.getItem(current_product.itemId[0]) == null)
    {
        document.getElementById("shop_detail").style.color="black";
        document.getElementById("shop_detail").innerHTML="add_shopping_cart";
    }
    else{
        document.getElementById("shop_detail").style.color="#d39e00";
        document.getElementById("shop_detail").innerHTML="remove_shopping_cart";

    }
}
function myname(value1,id) {
    document.getElementById("pro_detail").style.display="block";
    var d = $("#res");
    d.animate({
        marginLeft:'80%'
    },1000,function () {
        $(this).css("display","none");
        $(this).css("margin","auto");


    });
   // document.getElementById("res").style.display="none";
    document.getElementById("wishshopcar").style.display="none";
    document.getElementById("detailsbutton").removeAttribute("disabled");
    document.getElementById("details").style.display="none";


    var req = new XMLHttpRequest();
   // console.log(value1[id]);
    value = value1[id].itemId[0];
    current_product = value1[id];
    var ti = value1[id].title[0];
    document.getElementById("titlepro").innerHTML = ti;

    getphoto(ti);
    req.open('GET', web+"/details" + "?ItemID=" + value, true);
    req.onreadystatechange = function () {
        if (req.readyState == 4&&req.status === 200) {
            req_item = req.responseText

            var jsonObj = JSON.parse(req_item);
            console.log(jsonObj);
            jsonObj = JSON.parse(req_item);

           console.log(jsonObj);
            html_text = "";
            //seller
         /*   if (jsonObj.Ack == "Success" && "Description" in jsonObj.Item)
                document.getElementById("seller").innerHTML = jsonObj.Item.Description;
            else {

            }*/
            //details
            face = "https://www.facebook.com/sharer/sharer.php?u=";
            color_shop = "";
            jsonObj.onload = genDetail(jsonObj);

            document.getElementById("detail_table").innerHTML = html_text
          //  console.log(face);
            document.getElementById("facebook").href =face;
            if (color_shop !="") {
                if (color_shop == "black") {
                    document.getElementById("shop_detail").style.color=color_shop;
                    document.getElementById("shop_detail").innerHTML="add_shopping_cart";
                } else {
                    document.getElementById("shop_detail").style.color=color_shop;
                    document.getElementById("shop_detail").innerHTML="remove_shopping_cart";
                }
            }




        }

    }
    req.send(null);
    document.getElementById("ship").innerHTML= generateship(value1[id].shippingInfo[0],value1[id])
    document.getElementById("seller").innerHTML=generateseller(value1[id]);
    $(function() {
        $('.circle').each(function(index, el) {
            var num = $(this).find('span').text() * 3.6; if (num<=180) {
                $(this).find('.right').css('transform', "rotate(" + num + "deg)");
            }
            else {
                $(this).find('.right').css('transform', "rotate(180deg)");
                $(this).find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
            };
        });
    });

    similarProduct(value);

}
function shop_change(obj) {
    if (obj.innerHTML == "add_shopping_cart")
    {
        obj.innerHTML = "remove_shopping_cart";
        obj.style.color="#d39e00";
        localStorage.setItem(current_product.itemId[0],JSON.stringify(current_product));
    }
    else{
        obj.innerHTML = "add_shopping_cart";
        obj.style.color="black";
        localStorage.removeItem(current_product.itemId[0]);
    }
  //  console.log(current_product);
    
}
function similarProduct(value) {
    var req = new XMLHttpRequest();

    req.open('GET', web+"/similar" + "?ItemID=" + value, true);
    req.onreadystatechange = function () {
        if (req.readyState == 4&&req.status === 200) {
            req_item = req.responseText

            var jsonObj = JSON.parse(req_item);

               console.log(jsonObj);
            jsonObj = JSON.parse(req_item);
         //   console.log(jsonObj);
            html_s = "";
            //seller
            /*   if (jsonObj.Ack == "Success" && "Description" in jsonObj.Item)
                   document.getElementById("seller").innerHTML = jsonObj.Item.Description;
               else {

               }*/
            //details
            mypro=new Array();
            mypro_name=new Array();
            mypro_price=new Array();
            mypro_cost=new Array();
            mypro_day=new Array();
            var  items = jsonObj.getSimilarItemsResponse.itemRecommendations.item;
            for (i=0;i<items.length;i++) {
                mypro.push(items[i]);
                mypro_name.push(items[i]);
                mypro_price.push(items[i]);
                mypro_cost.push(items[i]);
                mypro_day.push(items[i]);


            }
            mypro_name.sort(function (a,b) {
                if (a.title > b.title)
                    return 1;
                else
                    return -1;
                return 0

            });
            mypro_price.sort(function (a,b) {
                return Number(a.buyItNowPrice.__value__) - Number(b.buyItNowPrice.__value__);
               // console.log()
            }) ;
            mypro_cost.sort(function (a,b) {
                return Number(a.shippingCost.__value__) - Number(b.shippingCost.__value__);
            });
            mypro_day.sort(function (a,b) {
                return Number(a.timeLeft.split("P")[1].split("D")[0]) - Number(b.timeLeft.split("P")[1].split("D")[0]);

            });
         //   console.log(mypro_cost,mypro_day,mypro_name,mypro_price);

        similarpro("defaultp","as","less");


        }

    }
    req.send(null);

}
function similarpro(order1,ad,show) {
  //  console.log(order1,ad,mypro,mypro_name,mypro_cost);
    var text_similar= generatesimilar(order1,ad,show);
    if (text_similar!="No Similar Item found.") {
        document.getElementById("similar").innerHTML = text_similar;
        //  console.log(order1,ad);
        document.getElementById(order1).selected = true;
        document.getElementById(ad).selected = true;
    }
    else {
        document.getElementById("similar").innerHTML="<div style=' width:85%; margin:auto; background-color:  #ffe87c; color: #d39e00'> <span style='margin-left: 2%'>No Record.</span></div>";
    }
}

function generatesimilar(order1,ad,show) {

   var html_s="";
    if (order1 =="defaultp"){
            items = mypro;
        }
    if (order1 =="name"){
        items = mypro_name;
    }
    if (order1 =="price"){
        items = mypro_price;
    }
    if (order1 =="cost"){
        items = mypro_cost;
    }
    if (order1 =="day"){
        items = mypro_day;
    }

    if (ad == "de")

    {
        items1 = new Array();
        for (i=0;i<items.length;i++) {
            items1.push(items[items.length-i-1]);
        }

        items = items1;
    }
      //  items = obj.getSimilarItemsResponse.itemRecommendations.item;
        if (items.length == 0)
        {
            html_s= "No Similar Item found.";
            return html_s;
        }
        leng = items.length;

        if (leng>5 && show=="less") {
            leng = 5;
        }
      //  console.log(mypro);
        html_s+="            <select  id=\"depro\" name = \"depro\"  onchange='similarpro(this.value,\""+ad+"\",\""+show+"\")'>\n" +
            "                <option id =\"defaultp\"  value=\"defaultp\">  Default</option>\n" +
            "                <option id=\"name\" value=\"name\" >  Product Name </option>\n" +
            "                <option id=\"day\" value=\"day\" >  Days Left </option>\n" +
            "                <option id=\"price\" value=\"price\" >  Price</option>\n" +
            "                <option id=\"cost\" value=\"cost\" >  Shipping Cost  </option>\n" +
            "            </select>";

    html_s+="            <select  id=\"depr\" name = \"depr\" onchange='similarpro(\""+order1+"\",this.value,\""+show+"\")'>\n" +
        "                <option id =\"as\" value=\"as\"  >  Ascending</option>\n" +
        "                <option id=\"de\" value=\"de\" >  Descending </option>\n" +
        "            </select>";
        html_s+="<table class='table table-striped table-dark' id='sicom'>";
        html_s+="<tbody>";
        // img

        for (i=0;i<leng;i++) {
            html_s += "<tr style='border:5px white solid'>";
            html_s += "<td style='border:0'>";
            if ("imageURL" in items[i]) {
                html_s += "<img src=\"" + items[i].imageURL + "\">";
            }
            html_s += "</td>";
            html_s += "<td style='border:0'>";
            if ("title" in items[i]) {
                html_s +="<div><a  href='"+items[i].imageURL +"'  target='_blank' style='color: #0f6674' >" ;
                html_s += items[i].title;
                html_s+="</a> </div>";
            }
            if ("buyItNowPrice" in items[i]) {
                html_s += "<div style='color: #1e7e34'> Price: $"+items[i].buyItNowPrice.__value__ +"</div>";
            }
            if ("shippingCost" in items[i]) {
                html_s += "<div style='color: #d39e00'>Shipping Cost: $"+items[i].shippingCost.__value__ +"</div>";
            }
            if ("timeLeft" in items[i]) {
               // console.log(items[i].timeLeft.split("P"));
                html_s += "<div style='color: white'>Days Left: "+items[i].timeLeft.split("P")[1].split("D")[0] +"</div>";
            }
            html_s += "</td>";
            html_s+="</tr>";
        }




        html_s+="</tbody>";
        html_s+="</table>";

    html_s+="<table class='table table-dark' id='siphone'>";
    html_s+="<tbody>";
    // img

    for (i=0;i<leng;i++) {
        html_s += "<tr style='border-top:6px white solid'>";
        html_s += "<td style='border:0'>";
        if ("imageURL" in items[i]) {
            html_s += "<img src=\"" + items[i].imageURL + "\">";
        }
        html_s += "</td></tr>";
        html_s += "<tr><td style='border:0'>";
        if ("title" in items[i]) {
            html_s +="<div><a href='"+items[i].imageURL +"' style='color: #0f6674' >" ;
            html_s += items[i].title;
            html_s+="</a> </div>";
        }
        if ("buyItNowPrice" in items[i]) {
            html_s += "<div style='color: #1e7e34'> Price: $"+items[i].buyItNowPrice.__value__ +"</div>";
        }
        if ("shippingCost" in items[i]) {
            html_s += "<div style='color: #d39e00'>Shipping Cost: $"+items[i].shippingCost.__value__ +"</div>";
        }
        if ("timeLeft" in items[i]) {
            // console.log(items[i].timeLeft.split("P"));
            html_s += "<div style='color: white'>Days Left: "+items[i].timeLeft.split("P")[1].split("D")[0] +"</div>";
        }
        html_s += "</td>";
        html_s+="</tr>";
    }




    html_s+="</tbody>";
    html_s+="</table>";
        if (items.length >5) {
            if (leng > 5) {
                html_s += "<div class='text-center'><button class='btn bg-dark text-white' onclick='similarpro(\""+order1+"\",\""+ad+"\",\""+"less"+"\")'> Show less</button></div>";

            } else {
                html_s += "<div class='text-center'><button class='btn bg-dark text-white' onclick='similarpro(\""+order1+"\",\""+ad+"\",\""+"more"+"\")'> Show more</button></div>";
            }
        }

return html_s;


}
function generateseller(value) {
    var html_text="";

   var product= value;

    html_text+="<table class='table table-striped table-dark'>";

    if (("sellerUserName" in product.sellerInfo[0]) ) {
        html_text += "<tr>";
        html_text += "<td colspan='2' class='text-center'><b>";
        html_text += product.sellerInfo[0].sellerUserName[0].toUpperCase();
        html_text += "</b></td>"
        html_text += "</tr>";

    }


    if (("feedbackScore" in product.sellerInfo[0]) ) {
        html_text += "<tr>";
        html_text += "<td><b>";
        html_text += "Feedback Score";
        html_text += "</b></td>"
        html_text += "<td>";
        html_text += product.sellerInfo[0].feedbackScore[0];

        html_text += "</td>";
        html_text += "</tr>";

    }



//photo
    if ("positiveFeedbackPercent" in product.sellerInfo[0]) {
        html_text += "<tr>";
        html_text += "<td><b>";
        html_text += "Popularity";
        html_text += "</b></td>";
        html_text += "<td>";

        html_text +="\n" +
            "<div class=\"circle \" >\n" +
            "        <div class=\"pie_left\">\n" +
            "                <div class=\"left\"></div>\n" +
            "        </div>\n" +
            "        <div class=\"pie_right\">\n" +
            "                <div class=\"right\"></div>\n" +
            "        </div>\n" +
            "        <div class=\"mask \"\n" +
            "        ><span>"+product.sellerInfo[0].positiveFeedbackPercent+"</span></div>\n" +
            "</div>"
        html_text += "</td>";
        html_text += "</tr>";
    }


    //subtitle
    if ( "feedbackRatingStar" in product.sellerInfo[0]) {
        html_text += "<tr>";
        html_text += "<td><b>";
        html_text += "Feedback Rating Star";
        html_text += "</b></td>";
        html_text += "<td>";
        if (Number(product.sellerInfo[0].feedbackScore[0]) <5000) {
            html_text +=" <i class=\"material-icons\" style='color: "+product.sellerInfo[0].feedbackRatingStar[0]+"'>\n" +
                "star_border\n" +
                "</i>";
        }
        else{
           // console.log(product.sellerInfo[0].feedbackRatingStar[0].split("Sh")[0]);
            html_text +="<div id='circle' style='background:"+product.sellerInfo[0].feedbackRatingStar[0].split("Sh")[0]+"'> <i class=\"material-icons\" style='color: black'>\n" +
                "star\n" +
                "</i></div>";
        }
        html_text += "</td>";
        html_text += "</tr>";
    }
//Price
    if ( "topRatedSeller" in product.sellerInfo[0]) {
        html_text += "<tr>";
        html_text += "<td><b>";
        html_text += "Top Rated";
        html_text += "</b></td>";
        html_text += "<td>";
        if (product.sellerInfo[0].topRatedSeller[0] == "true")
            html_text += "<i class='material-icons' style='color: #1e7e34'> done </i>";
        else
            html_text += "<i class='material-icons' style='color: red'> close </i>";

        html_text += "</td>";
        html_text += "</tr>";
    }
    if ("storeInfo" in product) {
        if ("storeName" in product.storeInfo[0]) {
            html_text += "<tr>";
            html_text += "<td><b>";
            html_text += "Store Name";
            html_text += "</b></td>";
            html_text += "<td>";
            html_text += product.storeInfo[0].storeName[0];
            html_text += "</td>";
            html_text += "</tr>";
        }

        if ("storeURL" in product.storeInfo[0]) {
            html_text += "<tr>";
            html_text += "<td><b>";
            html_text += "Buy Product At";
            html_text += "</b></td>";
            html_text += "<td>";
            html_text += "<a href=\"" + product.storeInfo[0].storeURL[0] + "\" target='_blank' > Store";

            html_text += "</td>";
            html_text += "</tr>";
        }

    }

    html_text+="</table>";



    return html_text;


}
function generateship(obj,value) {

    var html_text=""
   var product= obj;
    html_text+="<table class='table table-striped table-dark'>"
    html_text += "<tr>";
    html_text += "<td><b>";
    html_text += "Shipping Cost";
    html_text += "</b></td>"
    html_text += "<td>";
        if (!("shippingServiceCost" in product) || product.shippingServiceCost[0].__value__ == "0.0")
            html_text += product.shippingType[0];
        else
            html_text += "$" + product.shippingServiceCost[0].__value__;
    html_text+="</td>";
    html_text+="</tr>";





//photo
    if ("shipToLocations" in product) {
        html_text += "<tr>";
        html_text += "<td><b>";
        html_text += "Shipping Locations";
        html_text += "</b></td>";
        html_text += "<td>";
        html_text +=product.shipToLocations[0];
        html_text += "</td>";
        html_text += "</tr>";
    }


    //subtitle
    if ( "handlingTime" in product) {
        html_text += "<tr>";
        html_text += "<td><b>";
        html_text += "Handling Time";
        html_text += "</b></td>";
        html_text += "<td>";
        if (product.handlingTime[0] <="1") {
            html_text += product.handlingTime[0] +" Day";
        }
        else{
            html_text += product.handlingTime[0] +" Days";
        }
        html_text += "</td>";
        html_text += "</tr>";
    }
//Price
    if ( "expeditedShipping" in product) {
        html_text += "<tr>";
        html_text += "<td><b>";
        html_text += "Expedited Shipping";
        html_text += "</b></td>";
        html_text += "<td>";
        if (product.expeditedShipping[0] == "true")
        html_text += "<i class='material-icons' style='color: #1e7e34'> done </i>";
        else
            html_text += "<i class='material-icons' style='color: red'> close </i>";

        html_text += "</td>";
        html_text += "</tr>";
    }

    if ( "oneDayShippingAvailable" in product) {
        html_text += "<tr>";
        html_text += "<td><b>";
        html_text += "One Day Shipping";
        html_text += "</b></td>";
        html_text += "<td>";
        if (product.oneDayShippingAvailable[0] == "true")
            html_text += "<i class='material-icons' style='color: #1e7e34'> done </i>";
        else
            html_text += "<i class='material-icons' style='color: red'> close </i>";

        html_text += "</td>";
        html_text += "</tr>";
    }

    if ( "returnsAccepted" in value) {
        html_text += "<tr>";
        html_text += "<td><b>";
        html_text += "Return Accepted";
        html_text += "</b></td>";
        html_text += "<td>";
        if (value.returnsAccepted== "true")
            html_text += "<i class='material-icons' style='color: #1e7e34'> done </i>";
        else
            html_text += "<i class='material-icons' style='color: red'> close </i>";

        html_text += "</td>";
        html_text += "</tr>";
    }



    html_text+="</table>";

    return html_text;

}

function genDetail(obj) {
    if (obj.Ack !="Success")
    {
        html_text = "This Item has gone!";
        return null;
    }

    html_text+="<table class='table table-dark table-striped' style='margin:auto; width:100%;' >";



    html_text+="<tbody>";
    var product = obj.Item;
   // console.log(face);
    face += product.ViewItemURLForNaturalSearch+
        "&quote=Buy "+ product.Title+ " at $"+  product.CurrentPrice.Value+ " from link below.";
     if (localStorage.getItem(product.ItemID) == null)
         color_shop="black";
     else
         color_shop="#d39e00";
//photo
    if ("PictureURL" in product) {
        html_text += "<tr>";
        html_text += "<td><b>";
        html_text += "Product Images";
        html_text += "</b></td>";
        html_text += "<td>";
        html_text +="<a href='#' data-toggle=\"modal\" data-target=\"#photourl\" >View Product Images Here </a>";
        html_text += "</td>";
        html_text += "</tr>";
    }


    //subtitle
    if ( "Subtitle" in product) {
        html_text += "<tr>";
        html_text += "<td><b>";
        html_text += "Subtitle";
        html_text += "</b></td>";
        html_text += "<td>";
        html_text += product.Subtitle;
        html_text += "</td>";
        html_text += "</tr>";
    }
//Price
    if ( "CurrentPrice" in product) {
        html_text += "<tr>";
        html_text += "<td><b>";
        html_text += "Price";
        html_text += "</b></td>";
        html_text += "<td>";
        html_text += "$"+product.CurrentPrice.Value;
        html_text += "</td>";
        html_text += "</tr>";
    }
//Location
    if ( "Location" in product || "PostalCode" in product) {
        html_text += "<tr>";
        html_text += "<td><b>";
        html_text += "Location"
        html_text += "</b></td>";
        html_text += "<td>";
        if ( "Location" in product) {
            html_text += product.Location;

        }
        if ("Location" in product && "PostalCode" in product) {
            html_text+=", "+product.PostalCode;
        }
        else if("PostalCode" in product) {
            html_text+=product.PostalCode;
        }
        html_text += "</td>";
        html_text += "</tr>";
    }

//  Return Policy (US)
    if ("ReturnPolicy" in product) {
        html_text += "<tr>";
        html_text += "<td><b>";
        html_text += "Return Policy (US)";
        html_text += "</b></td>";
        html_text += "<td>";
        html_text += product.ReturnPolicy.ReturnsAccepted;
        html_text += "</td>";
        html_text += "</tr>";
    }
//itemspecifics
    if ("ItemSpecifics" in product) {
        itemSpe = product.ItemSpecifics;
        if ("NameValueList" in itemSpe) {
            items = itemSpe.NameValueList;
            for (i = 0; i < items.length; i++) {
                item = items[i];
                html_text += "<tr>";
                html_text += "<td><b>";
                html_text += item.Name;
                html_text += "</b></td>";
                html_text += "<td>";
                html_text += item.Value[0];
                html_text += "</td>";
                html_text += "</tr>";
            }
        }
    }
    html_text+="</tbody>";
    html_text+="</table>";
    html_text+="<!-- 模态框（Modal） -->\n" +
        "<div class=\"modal fade\" id=\"photourl\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n" +
        "<div class=\"modal-dialog\">\n" +
        "<div class=\"modal-content\">\n" +
        "<div class=\"modal-header\">\n" +

        "<h6 class=\"modal-title\" id=\"myModalLabel\">\n" +
        "<b>Product Images</b>\n" +
        "</h6>\n" +
        "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" \n" +
        "aria-hidden=\"true\"><i class=\"material-icons\">\n" +
        "close\n" +
        "</i>\n" +
        "</button>\n" +
        "</div>\n" +
        "<div class=\"modal-body\">\n";
    photoc = product.PictureURL;
    if (product.PictureURL.length>0)
        html_text += "<a href='javascript:void(0)'><div class='bg-dark border-dark' style='position: absolute; top: 50%; left: 5%' onclick='pro_pre(photoc,\""+product.PictureURL.length+"\")'><i class=\"material-icons text-white align-middle\" >\n" +
        "navigate_before\n </i></div>" + "<div class='bg-dark border-dark' style='position: absolute; top: 50%; right: 5% ' onclick='pro_next(photoc,\""+product.PictureURL.length+"\")'><i class=\"material-icons text-white align-middle\" >\n" +
            "navigate_next\n" +
            "</i></div></a>"+
        "<a id ='aphoto' href='"+product.PictureURL[0]+"' target='_blank'> <img class ='photoid' style='border: solid black' width='100%' height='100%' id='0' src='"+product.PictureURL[0] +"'></a>"

       html_text+= "</div>\n" +
        "<div class=\"modal-footer\">\n" +
        "<button type=\"button\" class=\"btn btn-default bg-dark text-white\" \n" +
        "data-dismiss=\"modal\">close\n" +
        "</button>\n" +

        "</div>\n" +
        "</div><!-- /.modal-content -->\n" +
        "</div><!-- /.modal-dialog -->\n" +
        "</div><!-- /.modal -->"
}
function  pro_pre(p,num) {
    var current = Number(document.getElementsByClassName("photoid")[0].getAttribute("id"));
  //  console.log(current);
    if (current>0)
    {
        current=current-1;
    }
    document.getElementsByClassName("photoid")[0].src =p[current];
    document.getElementsByClassName("photoid")[0].id = current.toString();
    document.getElementById("aphoto").href =p[current];


}
function pro_next(p,num) {
    var current = Number(document.getElementsByClassName("photoid")[0].getAttribute("id"));
    //  console.log(current);
    if (current<num-1)
    {
        current=current+1;
    }
  //  console.log(p);
    document.getElementsByClassName("photoid")[0].src =p[current];
    document.getElementsByClassName("photoid")[0].id = current.toString();
    document.getElementById("aphoto").href =p[current];

}
function getphoto(value) {
    var req = new XMLHttpRequest();
   // console.log(value);
    req.open('GET', web+"/photo" + "?title=" + value, true);

    req.onreadystatechange = function () {
        if (req.readyState == 4&&req.status === 200) {
            req_item = req.responseText

            var jsonObj = JSON.parse(req_item);
            console.log(jsonObj);
            jsonObj = JSON.parse(req_item);

           // html_text = "";
           // jsonObj.onload=generatephoto(jsonObj);
            document.getElementById("photo").innerHTML=generatephoto(jsonObj);
         //   setTimeout(1000);
            $grid = $('.masonry').masonry({
                // options...
            });
// layout Masonry after each image loads
            $grid.imagesLoaded().progress( function() {

                $grid.masonry('layout');
               // document.getElementById("photo").style.display="none";
                //document.getElementById("photo").style.visibility="visible";
            });


         /*   $(function(){
                $('.masonry').masonry({
                    itemSelector: '.item'
            })});*/
            //seller
            /*   if (jsonObj.Ack == "Success" && "Description" in jsonObj.Item)
                   document.getElementById("seller").innerHTML = jsonObj.Item.Description;
               else {

               }*/
            //details
          //  jsonObj.onload = genDetail(jsonObj);

          //  document.getElementById("detail_table").innerHTML = html_text;


        }

    }
    req.send(null);


}

function generatephoto(obj) {
    if (!("items" in obj)){
        return "<div style=' width:85%; margin:auto; background-color:  #ffe87c; color: #d39e00'> <span style='margin-left: 2%'>No Record.</span></div>";
    }

    pgn = obj.items;
 var html_text=
     "        <div class=\"row masonry\">\n";
    for (var i =0; i<pgn.length; i++) {
        html_text +=
            "        <div class=\"col-md-4 item\" >\n" +
            "       <div style='margin: 1px 1px;border: solid black'><a href='" + pgn[i].link + "' target='_blank'> <img style='width: 100%; height: 100%' src=" + pgn[i].link + " alt=\"\" class=\"img-responsive\"></a>\n" +
            "       </div> </div>\n"
    }
   html_text+=  "        </div>\n";


return html_text;


}

function wishcar() {
   /* if (animi==0) {
        document.getElementById("re_table").style.display = "none";
        document.getElementById("wishshopcar").style.display = "block";
        document.getElementById("pro_detail").style.display = "none";
        document.getElementById("details").style.display = "block";
        document.getElementById("res").style.display = "block";
    }
    else{*/
        var d = $("#pro_detail");
        d.animate({
            marginLeft:'80%'
        },1000,function () {
            $(this).css("display","none");
            $(this).css("margin","auto");

            document.getElementById("re_table").style.display = "none";
            document.getElementById("wishshopcar").style.display = "block";
            //  document.getElementById("pro_detail").style.display = "none";
            document.getElementById("details").style.display = "block";
            document.getElementById("res").style.display = "block";
        });


    /*}*/
    $("#results").removeClass("text-white bg-dark").addClass("text-black-50 bg-light");
    $("#wish").removeClass("text-black-50 bg-light").addClass("text-white bg-dark");
    obj_car="";
    car_array= new Array();
    //  html_text+="<div class='container'>";
   // console.log(localStorage)
    var product;
    var html_text="";
    var price = 0;
    html_text+="<table class='table table-striped table-dark ' style='width: 100%;'>"
    product= localStorage;
    if (product.length == 0)
    {

        document.getElementById("wishshopcar").innerHTML="<div style=' width:85%; margin:auto; background-color:  #ffe87c; color: #d39e00'> <span style='margin-left: 2%'>No Record.</span></div>";
        return null;
    }


    html_text+="<tbody>";
    html_text+="<tr>";
    // output the headers
    html_text += "<th>" + "#" + "</th>";
    html_text += "<th>" + "Image" + "</th>";
    html_text += "<th>" + "Title" + "</th>";
    html_text += "<th>" + "Price" + "</th>";
    html_text += "<th>" + "Shipping" + "</th>";

    html_text += "<th>" + "Seller" + "</th>";
    html_text += "<th>" + "Favorite" + "</th>";

    html_text+="</tr>";
    for (i=0; i<product.length;i++) {
        car_array.push(JSON.parse(localStorage.getItem(product.key(i))));
    }

    for (i=0; i<product.length;i++)
    {
        obj_car = JSON.parse(localStorage.getItem(product.key(i)));
     //   console.log(obj_car);
        html_text+="<tr>";
        html_text+="<td>";
        html_text+=i+1;
        html_text+="</td>";
        if ( "galleryURL" in obj_car) {
            html_text += "<td>";
            html_text += "<img width='80';height='80'; src=" + obj_car.galleryURL[0] + ">";
            html_text += "</td>";
        }
        else
        {
            html_text += "<td>";
            html_text += "N/A";
            html_text += "</td>";
        }
        if ( "title" in  obj_car){

            html_text += "<td   style = \" white-space: nowrap; \" >";

            if ((obj_car.title[0].length) <=35) {
                html_text += obj_car.title[0];
            }
            else {
                st = "";

                if (obj_car.title[0][34] !=" ") {
                    //   console.log(product[i].title[0][34]);
                    for (var j = 34; j >= 0; j--) {
                        if (obj_car.title[0][j] == " ") {
                            st = obj_car.title[0].substring(0, j);
                            break;
                        }
                    }
                }
                else
                    st =obj_car.title[0].substring(0, 35);
                html_text += st+"...";

            }
            html_text += "</td>";
        }
        else
        {
            html_text += "<td>";
            html_text += "N/A";
            html_text += "</td>";
        }
        if ( "sellingStatus" in obj_car) {
            html_text += "<td>";
            html_text += "$" + obj_car.sellingStatus[0].currentPrice[0].__value__;
            price +=Number(obj_car.sellingStatus[0].currentPrice[0].__value__);
            html_text += "</td>";
        }
        else
        {
            html_text += "<td>";
            html_text += "N/A";
            html_text += "</td>";
        }
        if ( "shippingInfo" in obj_car) {
            html_text += "<td>";
            var sh = obj_car.shippingInfo[0];
            if (!("shippingServiceCost" in sh) || sh.shippingServiceCost[0].__value__ == "0.0")
                html_text += sh.shippingType[0];
            else
                html_text += "$" + sh.shippingServiceCost[0].__value__;
        }
        else
        {
            html_text += "<td>";
            html_text += "N/A";
            html_text += "</td>";
        }

        if ( "sellerInfo" in obj_car) {
            html_text += "<td>";
            html_text += obj_car.sellerInfo[0].sellerUserName[0];
            html_text += "</td>";
        }
        else
        {
            html_text += "<td>";
            html_text += "N/A";
            html_text += "</td>";
        }
        html_text += "<td>";
        if (localStorage.getItem(obj_car.itemId[0]) ==null)
            html_text += "<button class='btn' onclick='shop(this.childNodes[1],car_array["+i+"])'> <i class='material-icons' '>add_shopping_cart</i></button>";
        else
            html_text += "<button class='btn' onclick='shop(this.childNodes[1],car_array["+i+"])'> <i class='material-icons' style='color: #d39e00' '>remove_shopping_cart</i></button>";


        html_text += "</td>";




        html_text+="</td>";
        html_text+="</tr>";

    }

    html_text+="<tr>";
    html_text+="<td colspan='5'>";
    html_text+="<td>";
    html_text+="Total Shopping";
    html_text+="</td>"
    html_text+="<td>";
    html_text+="$"+price;
    html_text+="</td>";
    html_text+="</tr>";
    html_text+="</tbody>";
    html_text+="</table>";
    document.getElementById("wishshopcar").innerHTML=html_text;
    //  html_text+="</div>";

}

function myclear() {
    document.getElementById("form1").reset();
    current_product = undefined;
    current_all = undefined;
 //   console.log(current_all);
    document.getElementById("re_table").style.display="none";
    document.getElementById("wishshopcar").style.display="none";
    document.getElementById("pro_detail").style.display="none";
    document.getElementById("detailsbutton").setAttribute("disabled","disabled");
    document.getElementById("details").style.display="none";




}