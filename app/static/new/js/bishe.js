 
 function getElementsByClassName(abc) {
    var classElements = [],allElements = document.getElementsByClassName('newclass');
    var artical = [],allArtical = document.getElementsByClassName('entry-text');
    var link=[],alllink=document.getElementsByClassName('thumb-link');
    //所有div
    $(document).ready(function () {
	console.log(typeof(abc))
    var student = new Object();
    student.page=abc;

    student.location = "CHINA";
	student.sex="1";
	student.birthday="1995-01-14"

    var data = JSON.stringify(student)
    console.log(data)

	
	$.ajax({
        url: "/load_data",
        type: "POST",
        data: data,
        success: function (msg) {
        	console.log(msg);

         for (var i=0; i< allElements.length; i++ )
   {	
   	       if (allElements[i].className == 'newclass' ) {
   	       alllink[i].href="/contact/"+msg[i][0]+"";
           allElements[i].src=msg[i][5];
           allElements[i].alt=msg[i][0];
           var single=allArtical[i].getElementsByTagName("a");
           single[0].innerText=msg[i][1];
           allArtical[i].getElementsByTagName("span")[1].innerText=msg[i][2];
           allArtical[i].getElementsByTagName("span")[2].innerText=msg[i][6];
           allArtical[i].getElementsByTagName("i")[0].className="fa fa-heart-o";
           allArtical[i].getElementsByTagName("i")[0].innerText=msg[i][8];
           allArtical[i].getElementsByTagName("i")[0].id=msg[i][0];
           allArtical[i].getElementsByTagName("div")[2].innerText=msg[i][7];


        }
   }
  


   return "200";
    }
})
})
   
}


