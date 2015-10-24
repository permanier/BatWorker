

var  KeyMgr={

    init:function(domEle){
    	//domEle.bind("keyup.ctrl_s",this.onKeyUp.bind(this));
    	this.domEle=domEle;
    },

    register:function(key,cb){
    	this.domEle.bind("keyup."+key,cb);
    },

    unregister:function(key,cb){
		this.domEle.unbind("keyup."+key,cb);
    }
}

module.exports=KeyMgr;
//export default KeyMgr;

