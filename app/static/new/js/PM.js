
	new Vue({

	el:'#app',
	data() {
	return {
	            msg: 'Welcome to Your Vue.js App',
                add:true,
                imgurl:'../static/src/img/img_15.jpg',
                name:'john',
                birthday:'2019-01-14',
                email:"123@qq.com",
                area:'area',
                likenumber:'1',
                message:"avaa",
                flag:true,
                check:{
                    "username":"12113@qq.com"
                  },
                todos:[
                  { name: 'Learn JavaScript' , birthday: '2019-02-21', area: 'Build Something Awesome',artical:'artical',imgurl:'../static/src/img/img_15.jpg',likenumber:'1'},

                ]
    }
  },
  methods:{

        post: function ()
        {
        const _this = this;
        _this.flag=true;
        alert(_this.msg);
       },
        post2:function(){
        const _this = this
        axios.post('/updata',{
        data:this.todos[0]
                                            })
     .then(function(response){
            _this.flag='ture';
            let msg = response.data[0][0]
            _this.msg = msg
     })
     .catch(function(err){
            console.log(err);
     });


     }
  },
  created:function()
  {
              console.log("----------------------------------------------")

                const _this = this
                console.log(_this.msg)
                axios.get('/getPM',{


                 })
                .then(function(response)
                {

                   let msg = response.data
                   console.log(msg.length)
                    if(msg.length!=0){
                        _this.todos[0].name = msg[0][1]
                        _this.todos[0].area=msg[0][2]
                        _this.todos[0].birthday=msg[0][6]
                        _this.todos[0].imgurl=msg[0][5]

                        _this.todos[0].artical=msg[0][7]
                        _this.todos[0].likenumber=msg[0][8]
                        }
                        else {
                            _this.add=!_this.add;
                            console.log(_this.add)
//                            if(confirm('NUll')==1){
//                             alert('返回1')}
                        }
                 })
                .catch(function(err)
                {
                  console.log(err);
                 });





   }

	});

new Vue({

	el:'#content',
	data() {
	return {
	            add:true,
	            reply:'',
	            msg: 'Welcome to Your Vue.js App',
                flag:true,
                check:{
                    "username":"12113@qq.com"
                  },
                todos:[


                ]
    }
  },
  methods:{

        post: function ()
        {
        const _this = this;
        _this.flag=true;
        alert(_this.msg);
       },
        post2:function(abc,b){
        console.log(abc,b)
        const _this = this
        axios.post('/reply',{
        data:{reply:abc,id:b }
                                            })
     .then(function(response){
            console.log(response.data)
     })
     .catch(function(err){
            console.log(err);
     });


     }
  },
  created:function(){


                const _this = this
                console.log(_this.msg)
                axios.get('/reply',{


                 })
                .then(function(response)
                {

                   let msg = response.data
                   if(msg.length!=0)
                   {
                    for(let i =0;i<msg.length;i++)
                        {
//                        console.log("----------------------------------------------")
                                _this.todos.push({
                                  name: msg[i][3] ,
                                  datetime: msg[i][2],
                                  artical:msg[i][1],
                                  reply:msg[i][6],
                                  id:msg[i][4],
                                  flag:true,
                                 });

//
//                        _this.todos[i].name = msg[i][3];

                        }
                       }
                      else{
                      _this.add=false
                      }

                 })
                .catch(function(err)
                {
                  console.log(err);
                 });





   }

	});


//function foo(event) {
//
//    formdata = new FormData();
//    formdata.append('file',event.target.files[0]);
//    formdata.append('action','test');
//    formdata.append('name',"abc");
//    var form = new Object();
//    form.name="123"
//    var data=JSON.stringify(form);
//    axios({
//        url:'/testupdata',
//        method:'post',
//        data:formdata,
////        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//    }).then((res)=>{
//    console.log(res)
//    if(res.status="200"){
//    console.log("succ")
//    }
//
//    })
//}
new Vue({

	el:'#updata',
	data() {
	return {
	            msg: 'Welcome to Your Vue.js App',
                add:true,
                imgurl:'',
                name:'',
                birthday:'',
                email:"",
                area:'',
                likenumber:'1',
                message:"avaa",
                flag:true,
                check:{
                    "username":"12113@qq.com"
                  },
                todos:[


                ]
    }
  },
  methods:{
        SendImg:function(event) {
                   const _this=this
                  formdata = new FormData();
                  formdata.append('file',event.target.files[0]);
                  formdata.append('action','test');
                  formdata.append('name',"abc");
                  var form = new Object();
                  form.name="123"
                  var data=JSON.stringify(form);
                  axios({
                      url:'/SaveImg',
                      method:'post',
                      data:formdata,
              //        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                  })
                  .then((res)=>{
                  console.log(res)

                  if(res.status=="200"){

                    _this.imgurl=res.data
                    _this.todos[0]['imgurl']=res.data

                  }

                  })

              },
              SendAll: function(){
              console.log(this.todos[0])

               axios.post('/UpData',
               this.todos[0],


                               )
              },

  },
  created:function(){

//                  获取访客基本资料
                  const _this = this
                  console.log(_this.msg)
                  axios.get('/UserIfo',{


                   })
                  .then(function(response)
                  {

                     let msg = response.data
                     console.log(response)
                     if(msg.length!=0)
                     {

                          console.log("----------------------------------------------")
                                  _this.todos.push({
                                    name: msg[5] ,
                                    birthday: msg[7],
                                    area:msg[4],
                                    email:msg[3],
                                    sex:msg[6],
                                    imgurl:"",
                                    artical:"",
                                    likenumber:"1",
                                   });


                            console.log(_this.todos[0])
                          }



                   })
                  .catch(function(err)
                  {
                    console.log(err);
                   });





     }




	});
$(document).ready(function(){
 	$("#updata").hide();
  $("#add").click(function(){
  $("#updata").toggle(1000);
  });
});