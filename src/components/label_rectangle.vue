<template>
     <div class="label_box">
       <div style="margin-top: 100px"></div>
       <div class="shadow p-3 mb-5 bg-white rounded rect_box">

<!--         左侧标注-->
        <div class="left_box">
<!--          标注区域-->
          <div class="image_label_box">
            <ui-marker ref="aiPanel-editor" class="ai-observer"
            :uniqueKey="uuid"
            :ratio="4/3"
            @vmarker:onImageLoad="onImageLoad"
            :imgUrl="imgUrl">
            </ui-marker>
          </div>

<!--     选择图片区域-->
          <div class="image_list_box">

            <div class="last" @click="last()">
              <img src="../assets/last.png" alt="">
            </div>

            <div class="upload_img" @click="fileclick()">
              <span>+</span>
            </div>

            <div class="images_box">
              <div class="box_activate" id="box_activate">{{img_index}}/{{wbz_length}}</div>

                <div class="image_lists" id="image_lists">
                  <img v-lazy="item" alt="" id="item" @click="changeimg(item)" v-for="item in imgList">
                </div>

            </div>


            <div class="next" @click="next()">
              <img src="../assets/next.png" alt="">
            </div>
          </div>
        </div>

<!--         右侧标签-->
        <div class="right_box">
<!--          输入框-->
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="输入新的标签"
                   aria-label="Recipient's username"
                   aria-describedby="button-addon2"
                    v-model="labelname">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                      @click="addlabel">添加</button>
            </div>
          </div>

<!--标签列表-->
          <div class="label_list">
            <transition-group>
            <div class="label_item" v-for="(item,index) in labelList" @click="setlabel(item)" :key="index" >
              <div class="bluebox"></div>
              <p>{{item.name}}</p>
               <div class="del" @click.stop="dellabel(item)">
                 <img src="../assets/del.png" alt="">
               </div>
            </div>
            </transition-group>
          </div>

<!--          底部下载-->
          <span class="tips" >*当前标注数量 ({{bz_length}}/{{wbz_length}})</span>
          <div class="download">
            <a href="#">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Download
            </a>
          </div>

        </div>

       </div>
<!--上传图片-->
       <input type="file" name="image" id='file' class="image_file"
          @change="show_img($event)"  multiple  />

     </div>
</template>

<script>
    import {AIMarker} from 'Vue-Picture-BD-Marker'
    export default {
        components:{ 'ui-marker': AIMarker},
        name: "label_rectangle",

      data(){
          return{
            uuid:55,
            imgUrl:'',
            id:0,
            imgList:[
              'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2771978851,2906984932&fm=26&gp=0.jpg',
              //'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg',
            ],
            labelList:[],
            labelname:'',
            dataList:{},
            find_url:{
              'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2771978851,2906984932&fm=26&gp=0.jpg':'test.jpg'
            },
            image_len:0,
            letfpx:'',
            image_hw:{
              'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2771978851,2906984932&fm=26&gp=0.jpg':'300x556'
            },
            bz_length:0,
            wbz_length:1,
            img_index:1,
          }
      },

      methods:{
        //  查询是否存在标签
        find_label(label){
          for (var i=0 ; i<this.labelList.length ;i++){
            if (this.labelList[i].name==label){
              return true
            }
          }
          return false
        },

        //  添加标签
        addlabel(){

          if (this.labelList.length==0){
            this.labelList.push({'name':this.labelname,'time':0})
            this.labelname=''
          }

          else if (!this.find_label(this.labelname)){
            // console.log(this.find_label(this.labelname))
            this.labelList.push({'name':this.labelname,'time':0})
            this.labelname=''
          }
          else {
            alert('请勿重复添加标签')
          }

        },

        //将标签加入到图片中
        setlabel(item){
          this.$refs['aiPanel-editor'].setTag({
            tagName: item.name,
            tag: "0x0001"
          });

          let item_index = this.labelList.indexOf(item)
          // console.log(this.labelList[item_index])
          this.labelList[item_index].time+=1

      },
        //图片加载完成
        onImageLoad(val){
          let hw = val.rawH+'x'+val.rawW
          // console.log(hw)
          this.image_hw[this.imgUrl]=hw
        },

        // 保存和刷新
        save_and_ref(item){
          // this.dataList[this.imgUrl]=this.$refs['aiPanel-editor'].getMarker().getData();
          this.$set(this.dataList,this.imgUrl,this.$refs['aiPanel-editor'].getMarker().getData())


          this.$refs['aiPanel-editor'].getMarker().clearData();

          this.imgUrl=item
          this.$refs['aiPanel-editor'].getMarker().renderData(this.dataList[item])
        },

        //修改图片
        changeimg(item){
          // this.dataList[this.imgUrl]=this.$refs['aiPanel-editor'].getMarker().getData();
          // this.$refs['aiPanel-editor'].getMarker().clearData();
          //
          // this.imgUrl=item
          // this.$refs['aiPanel-editor'].getMarker().renderData(this.dataList[item])

          this.save_and_ref(item)

          let item_doc = this.imgList.indexOf(item)
          let activate_box_index=item_doc-Math.abs(this.letfpx/100)
          let box_activate = document.getElementById('box_activate')
          box_activate.style.left=activate_box_index*100+"px"
        },

        //点击上传图片
        fileclick(){
        document.querySelector('#file').click()
        },

        //可视化图片
        show_img(event){
        let files=document.querySelector('#file').files

          for (var i =0 ; i<files.length;i++){
             this.imgList.push(this.getObjectURL(files[i]))
             this.find_url[this.getObjectURL(files[i])]=files[i].name
             this.image_len+=100
          }
      },

      //  获取图片的地址
      getObjectURL(file){
        let url=null
        if (window.createObjectURL != undefined){
          url=window.createObjectURL(file)
        }
        else if(window.webkitURL!=undefined){
          url=window.webkitURL.createObjectURL(file)
        }
        else if(window.URL!=undefined){
          url=window.urlURL.createObjectURL(file)
        }
        return url
      },

        //上一张图片
        last(){
          var image_list=document.getElementsByClassName('image_lists')[0]
           let letfpx= image_list.style.left
          if (letfpx==''){
            letfpx=0
          }
          else {
            letfpx=parseInt(letfpx)
          }

          //图片列表最左时不在滑动
          if (letfpx!=0){
              image_list.style.left=letfpx+100+"px"
              var item = this.imgList[this.imgList.indexOf(this.imgUrl)-1]
              this.save_and_ref(item)
              this.imgUrl=item
              this.letfpx=letfpx+100
          }


        },

        //下一张图片
        next(){
            var image_list=document.getElementsByClassName('image_lists')[0]
          // console.log(image_list.offsetWidth-400)
            let letfpx= image_list.style.left
          if (letfpx==''){
            letfpx=0
          }
          else {
            letfpx=parseInt(letfpx)
          }

          //图片列表最右时不滑动
          if (this.image_len==0){

          }
          else if (-letfpx>this.image_len-400){

          }
          else {
            image_list.style.left=letfpx-100+"px"
            var item = this.imgList[this.imgList.indexOf(this.imgUrl)+1]
            this.save_and_ref(item)
            this.imgUrl=item

            this.letfpx=letfpx-100
             // this.imgUrl=this.imgList[this.imgList.indexOf(this.imgUrl)+1]
          }

        },

        dellabel(item){
          // console.log(item)
          if (item.time>0){
            alert('该标签已使用过，无法删除')
          }
          else {
            this.labelList.splice(this.labelList.indexOf(item),1)
          }

        }
      },

      mounted() {
          this.imgUrl=this.imgList[0]
          // this.id=this.imgList[0]['id']
      },

      watch:{
          imgList(val){
            this.wbz_length=this.imgList.length
          },

          dataList(val){
            // console.log(this.image_hw)
            var count=0
            for (var key in this.dataList){
              console.log(this.dataList[key].length)
              if (this.dataList[key].length!=0){
                count++
              }

            }

            this.bz_length=count
          },

          imgUrl(val){
            this.img_index=this.imgList.indexOf(val)+1
          }


      },

    }
</script>

<style scoped>

  ::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

  .label_box{
    position: fixed;
    top:0px;
    width: 100%;
    height: 1000px;
    background: #f4f4f4;
  }

  .rect_box{
    margin: 15px;
    display: flex;
    width: 1000px;
    margin: 0 auto;
  }

  .left_box{
    flex: 8;
  }

  .right_box{
    flex: 4;
    margin-left: 15px;
  }

  .image_label_box{
    width: 100%;
    height: 500px;
  }

  .image_list_box{
    width: 100%;
    height: 150px;
    display: flex;
  }

  .last{
    flex: 1;
    height: 150px;
  }

  .last img{
    margin-top: 48.5px;
    opacity: 0.5;
  }

  .last img:hover{
    opacity: 1;
  }

  .images_box{
    flex: 8;
    height: 150px;
  }

  .next{
    flex: 1;
    height: 150px;
  }

  .next img{
    margin-top: 48.5px;
    opacity: 0.5;
  }

  .next img:hover{
    opacity: 1;
  }

  .upload_img{
    width:90px;
    height: 90px;
    margin-top: 30px;
    margin-right: 5px;
    /*background: red;*/
    border: 2px dotted #cccccc;
  }

  .upload_img span{
    width: 100%;
    height: 100%;
    line-height: 90px;
    font-size: 50px;
    color: #cccccc;

  }

  .upload_img span:hover{
    color: #2197ef;
  }

  .images_box{
    width: 100%;
    overflow: hidden;
    height: 100px;
    margin-top: 25px;
    /*transform: translateX(0px);*/
    position: relative;
  }

  .box_activate{
    position: absolute;
    width: 90px;
    height: 90px;
    margin: 5px;
    /*float: left;*/
    border: 2px solid #2197ef;
    left: 0px;
    z-index: 99;
    transition: all 1s;
    text-align: center;
    text-indent:-9999px;
    line-height: 90px;
    overflow: hidden;
    /*color: white;*/
    /*background: #9e9d9d;*/
    /*opacity: 0.8;*/
  }

  .box_activate:hover{
    /*text-align: center;*/
    /*line-height: 90px;*/
    color: white;
    background: #2197ef;
    opacity: 0.7;
    text-indent: 1px;
  }

  .image_lists{
    position: absolute;
    /*float: left;*/
    width: auto;
    left: 0px;
    transition: all 0.5s;
  }
  .image_lists img{
    float: left;
    display: block;
    width: 90px;
    height: 90px;
    margin: 5px;
  }
  .image_lists img:hover{
    opacity: 0.8;
  }

  .label_list{
    width: 100%;
    margin-top: 20px;
    height: 490px;
    overflow-y: scroll;
    overflow-x: hidden;
    /*background: red;*/
  }

  .label_list p{
    margin: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }

  .label_item:hover{
    background: #c5e8fe;
  }

  #file{
    display: none;
  }
  .label_item {
    width: 100%;
    height: 40px;
    margin-bottom: 5px;
    display: flex;
  }
  .bluebox{
    max-width: 10px;
    height: 40px;
    float: left;
    background: #2197ef;
    flex: 1;
  }
  .label_item p{
    flex: 9;
    /*display: block;*/
    text-align: left;
    margin-left: 15px;
    line-height: 40px;
    /*font-size: 20px;*/

  }
  .del{
    flex: 2;
    border: none;
    /*background: red;*/
    /*color: white;*/
    max-width: 40px;
    /*height: 40px;*/
  }
  .del img{
    width: 50%;
    height: 50%;
    margin: 10px ;
    opacity: 0.5;
  }
  .del img:hover{
    opacity: 1;
  }

  /*.download{*/
  /*  width: 100%;*/
  /*  height: 50px;*/
  /*  background: #2197ef;*/

  /*}*/

  .download{
    z-index: 99;
    /*position: fixed;*/
    width: 300px;
    height: 50px;
    top: 0;
    left: 0;
    margin: 0 auto;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    /*min-height: 100vh;*/
    background: #031321;
    font-family: consolas;
  }

  .download a{
    position: relative;
    display: inline-block;
    /*padding: 8px 90px;*/
    width: 100%;
    height: 100%;
    line-height: 50px;
    color: #2196f3;
    /*text-transform: uppercase;*/
    letter-spacing: 4px;
    text-decoration: none;
    font-size: 24px;
    overflow: hidden;
    transition: 0.2s;
  }
  .download a:hover{
    color: #255784;
    background: #2196f3;
    box-shadow: 0 0 10px #2196f3,0 0 40px #2196f3,0 0 80px #2196f3;
    transition-delay: 1s;
  }
  .download a span:nth-child(1){
    position: absolute;
    top:0;
    left: -100%;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg,transparent,#2196f3);
  }
  .download a:hover span:nth-child(1){
    left: 100%;
    transition: 1s;
  }

  .download a span:nth-child(3){
    position: absolute;
    bottom:0;
    left: 100%;
    width: 100%;
    height: 5px;
    background: linear-gradient(270deg,transparent,#2196f3);
  }
  .download a:hover span:nth-child(3){
    left: -100%;
    transition: 1s;
    transition-delay: 0.5s;
  }

  .download a span:nth-child(2){
    position: absolute;
    right:0;
    top: -100%;
    width: 5px;
    height: 100%;
    background: linear-gradient(180deg,transparent,#2196f3);
  }
  .download a:hover span:nth-child(2){
    top: 100%;
    transition: 1s;
    transition-delay: 0.25s;
  }

  .download a span:nth-child(4){
    position: absolute;
    left:0;
    bottom: -100%;
    width: 5px;
    height: 100%;
    background: linear-gradient(360deg,transparent,#2196f3);
  }

  .download a:hover span:nth-child(4){
    bottom: 100%;
    transition: 1s;
    transition-delay: 0.75s;
  }

  .tips{
    width: 100%;
    height: 20px;
    text-align: left;
    display: block;
    line-height: 20px;
    margin-left:5px ;
  }

  /*.v-enter,.v-leave-to{*/
  /*  opacity: 0;*/
  /*  transform: translateY(-500px);*/
  /*}*/

  /*.v-enter-active,.v-leave-active{*/
  /*  transition:  all .8s ease;*/
  /*}*/
    .v-enter, .v-leave-to {
    opacity : 0 ;
      transform: translateZ(20px);
    }
    .v-enter-active, .v-leave-active {
        transition :all .8s ease;
    }

</style>
