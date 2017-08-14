function judge(str) {
	return str;
	$.ajax({
	url: "https://t-yuguan-work",
	type: "post",
	data: {
	"query": str
	},
	dataType: 'json',
	success:	function(data,status) {
		console.log(str);
		console.log(data);
	}
	});
}

