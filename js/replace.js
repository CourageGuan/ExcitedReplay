function getElements(tag) {
	console.log(tag);
	var x = document.getElementsByTagName(tag);
	var len = x.length;
	console.log("lens = %d",len);
	for(var i=0;i<len;++i) {
		x[i].innerHTML = x[i].innerHTML.replace(/[0-9][ ]*[-:比][]*[0-9]/g,'OOO');
		x[i].innerHTML = x[i].innerHTML.replace(/[0-9].*[-:比].*[0-9]/g,'OOO');
	}
}

function trim(str) {
	str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
	str = str.replace(/[ | ]*\n/g,''); //去除行尾空白
	//str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
	str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
	return str;
}

function judge(str) {
	var score = null;
	$.ajax({
	url: "http://127.0.0.1:8080",
	type: "post",
	async: false,
	data: {
		"query": str
	},
	dataType: 'json',
	success:	function(data,status) {
		//console.log(status);
		score = data;
	}
	});
	return score;
}

function gao(x) {
	//var x = document.getElementsByTagName(tag);
	var len = x.length;
	var arr = new Array();
	for(var i=0;i<len;++i){
		//var s = trim(x[i].innerHTML);
		var s = x[i].innerHTML;
		//console.log(s);
		var lst = s.split(/[,。.\s]+/);
		arr = arr.concat(lst);
	}
	var query = arr.join('|');
	var result = judge(query); 
	//console.log(result);
	if(result == null) return;
	var cnt = 0;
	for(var i=0;i<len;++i){
		var s = trim(x[i].innerHTML);
		var lst = s.split(/[,。.\s]+/);
		for(var j=0;j<lst.length;++j){
			var score = result[cnt]["Item2"][0]["Score"];
			cnt += 1;
			if(score >= 0.4)
				lst[j] = "███";
		}
		x[i].innerHTML = lst.join(',');
	}
}


function Replace(x) {
	console.log(x);
	for(var i=0;i<x.length;++i)
	{
		x[i].innerHTML = x[i].innerHTML.replace(/[0-9][ ]*[-:比][]*[0-9]/g,'███');
		x[i].innerHTML = x[i].innerHTML.replace(/[,。 ](*+)夺冠|追平|绝杀(*+)[,。 ]/g,'███');
	}
}

function Hide() {

	//Google
	$('._UMb').hide();

	// qq video
	$('#fullplaylist').hide();
	$('.wrapper_main').hide();
}

function Mosaic() {
	Replace($('.b_algo'));
}

function Main(){
	Hide();
	Mosaic();
}

Main();
