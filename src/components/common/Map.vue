// 项目信息
<template>
<div class="mapBox">
    <div class="allmapBox">
        <div class="marB20">
            <span class="color999 fsize14">请输入地点：</span>
            <span class="suggestBox">
                <input class="suggest" v-model="suggestVal" type="text" id="suggestId" size="20">
            </span>
            
        </div>
        <div class="allmap" id="allmap"></div>
        <div ref="searchResultPanel" id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>    
        <div class="clearfix">
            <el-button class="floatRight marL10" type="primary" @click="confirmClick">确 定</el-button>
            <el-button class="floatRight"  @click="closeClick">取 消</el-button>
        </div>
    </div>
 </div>
</template>

<script>
import BMap from 'BMap'
export default {
    data () {
        return {
            lng:'',
            lat:'',
            addressd:'',
            suggestVal:''
        }
    },
    props: ['mapVisible','mapVal'],
    created(){
        if(this.mapVal.lng){
            this.lng = this.mapVal.lng
            this.lat = this.mapVal.lat
            this.addressd = this.mapVal.address
        }
        
    },
    mounted(){
        let map = new BMap.Map("allmap");          // 创建地图实例  
        let that = this
        // let opts = {type: BMAP_NAVIGATION_CONTROL_ZOOM} 
        // map.addControl(new BMap.NavigationControl(opts)); 自定义控件
        let myValue;
        function myFun(result){
            let point
            let pt
            if(that.mapVal.lng){
                point = new BMap.Point(that.mapVal.lng,that.mapVal.lat);  // 创建点坐标  
                myValue = that.mapVal.address
                that.suggestVal = that.mapVal.address
                map.clearOverlays();     
                 pt = new BMap.Point(that.mapVal.lng,that.mapVal.lat);
                let myIcon = new BMap.Icon("static/img/location.png", new BMap.Size(32,32));
                //https://api.map.baidu.com/images/marker_red_sprite.png
                let marker = new BMap.Marker(pt,{icon:myIcon}); // 创建点
                map.addOverlay(marker); // 创建点
            }else{
                pt = new BMap.Point(result.center.lng,result.center.lat);  // 创建点坐标  
            }
            map.centerAndZoom(pt, 15);                 // 初始化地图，设置中心点坐标和地图级别      
            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放 

            map.addControl(new BMap.NavigationControl());    
            map.addControl(new BMap.ScaleControl());    
            map.addControl(new BMap.OverviewMapControl());    
            map.addControl(new BMap.MapTypeControl()); 
             
            
        }
        let myCity = new BMap.LocalCity();
        let geoc = new BMap.Geocoder();  
        myCity.get(myFun);
    
        map.addEventListener("click",function(e){
            map.clearOverlays();     
            let pt = new BMap.Point(e.point.lng,e.point.lat);
            let myIcon = new BMap.Icon("static/img/location.png", new BMap.Size(32,32));
            //https://api.map.baidu.com/images/marker_red_sprite.png
            let marker = new BMap.Marker(pt,{icon:myIcon}); // 创建点
            map.addOverlay(marker); // 创建点

            geoc.getLocation(e.point, function(rs){    //经纬度逆解析地址
                console.log(rs)
                that.lat = rs.point.lat
                that.lng = rs.point.lng
                that.address = rs.address
                that.suggestVal = rs.address
            });  
        })
        
        //搜索
        let ac = new BMap.Autocomplete(    //建立一个自动完成的对象
            {"input" : "suggestId"
            ,"location" : map
        });
      
        
        ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
            let str = "";
            let _value = e.fromitem.value;
            let value = "";
            if (e.fromitem.index > -1) {
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }    
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
            
            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }    
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            that.$refs.searchResultPanel.innerHTML = str;
        })
        
        ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
        let _value = e.item.value;
            myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            that.$refs.searchResultPanel.innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
            
            setPlace();
        });

        function setPlace(){
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun(){
                let loc = local.getResults().getPoi(0)
                let pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                map.centerAndZoom(pp, 18);
            
                let myIcon = new BMap.Icon("static/img/location.png", new BMap.Size(32,32));
                //https://api.map.baidu.com/images/marker_red_sprite.png
                let marker = new BMap.Marker(pp,{icon:myIcon}); // 创建点
                map.addOverlay(marker);    //添加标注
                that.lat = loc.point.lat
                that.lng = loc.point.lng
                that.address = myValue
            }
            let local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
            });
            local.search(myValue);
        }

    },
    methods:{
        closeClick(){
            console.log('11')
            
            this.$emit('closeVisible', false)
        },
        confirmClick(){
            let local = {
                lat : this.lat,
                lng : this.lng,
                address : this.address
            }
            this.$emit('confirmVal', local)
        }
    },
    watch: {
        'mapVal':function(newData,oldData){
            this.data = newData
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.mapBox
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index 3333
#allmap
    height 540px
    width 100%
    margin-bottom 20px
.allmapBox
    position: relative;
    margin: 0 auto 50px;
    margin-top: 15vh
    width 70%
    padding 30px
    background #fff
.suggestBox
    position: relative;
    display inline-block
    width: 480px;
   
    background: #fff;
    border:1px solid #409EFF
    border-radius: 4px   
.suggest
    width 100%
    box-sizing: border-box;
    border: 0;
    padding: 9px 0;
    border-left: 10px solid transparent;
    border-right: 27px solid transparent;
    line-height: 20px;
    font-size: 14px;
    height: 32px;
    color: #999;
    position: relative;
    border-radius: 4px     
      
    
</style>
