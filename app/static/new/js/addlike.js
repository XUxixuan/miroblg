function like_Num(like_Num){
	
	// console.log(like_Num.innerText);
	// var a = parseInt(like_Num.innerText)+1;
	
	
	if (like_Num.className=="fa fa-heart-o")
	 {	
	 	
	 	like_Num.className="fa fa-heart";
		like_Num.innerText=parseInt(like_Num.innerText)+1;
		
		LIKE_NUM(like_Num.id,"+");
	 } 
	 else {
	 	var b=2
	 	like_Num.className="fa fa-heart-o";
	 	like_Num.innerText=parseInt(like_Num.innerText)-1;
	 	LIKE_NUM(like_Num.id,"-");


	 }
	}
	




function LIKE_NUM(id,b)
{	
	var student = new Object();
    student.id= id;
    student.b=b;

    

    var data = JSON.stringify(student)
    console.log(data)

	$.ajax({
        url: "/like_number",
        type: "POST",
        data: data	,
        success: function (msg) 
        {
  	
   	      console.log(msg)
        }	
   
  
  	 	
    		})

}