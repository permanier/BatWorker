var global=window;
import LogView from '../components/util/LogView.js'
import JobQueueView from '../components/body/JobQueueView.js'
var _ = require('lodash');

global.getPanelByType=function(type){
    if(type=="jobQueue"){
        return JobQueueView;
    }else if(type=="logView"){
        return LogView;
    }
    return null;
}

global.getPanelNameByType=function(type){
    if(type=="jobQueue"){
        return '执行队列';
    }else if(type=="logView"){
        return '日志';
    }
    return '未定义';
}


global.cloneCreate=function(data){
	var obj=_.clone(data,true);
    if(_.isString(obj)){
        return obj;
    }
    //循环id
    var chgId=function(obj){
        if(obj.hasOwnProperty('id')){
            obj.id=global.WorkStore.createIncId();
        }
        for(var key in obj){
            if(_.isArray(obj[key])||_.isObject(obj[key])){
                chgId(obj[key]);
            }
        }
    }
	
    chgId(obj);
    delete obj.viewFilters;
    delete obj.exec;
	console.log('dengyp new clone');
	console.dir(obj);
	return obj;
}

global.log=function(){
    var arr=Array.prototype.slice.call(arguments);
    var str=arr+"";
    console.log(str);
    global.LogActions.addLog(str);
}

global.globalReplace=function(value,vars){
            for(var kv in vars){
                var {name,val}=vars[kv];
                value=value.replace(new RegExp("\\$"+name,'g'),val);
            }
            return value;
        }