// inlets and outlets
inlets = 1;
outlets = 0;

function list(){
	var msg = arrayfromargs(arguments);
	var half = msg.length/2;
	var p_num = msg.length/6;
	var pattrNames = new Array(p_num);
	var pattrTypes = new Array(p_num);
	var the_pattrs = new Array(p_num);
	
	for(k=0;k<p_num;k++){
		t = 3*k;
		pattrNames[k] = msg[t + 2];
		pattrTypes[k] = msg[t + 2 + half];
	}
	
	var pattr_in = patcher.getnamed("pattrs-inlet");
	var pattr_out = patcher.getnamed("pattrs-outlet");
	var the_spray = patcher.getnamed("spray");
	var the_funnel = patcher.getnamed("funnel");
	this.patcher.remove(the_spray);
	this.patcher.remove(the_funnel); // remove old spray and funnel if they exist

	the_spray = this.patcher.newdefault(20, 450, "spray " + p_num);
	the_spray.varname = "spray";
	the_funnel = this.patcher.newdefault(20, 544, "funnel " + p_num);
	the_funnel.varname = "funnel";
	
	for(k=0;k<1000;k++){
		the_pattrs[k] = patcher.getnamed("pattr_" + (k+1));
		this.patcher.remove(the_pattrs[k]); // remove old pattrs if they exist
	}

	for(k=0;k<p_num;k++){
		if (pattrTypes[k] == 'i'){
			the_pattrs[k] = this.patcher.newdefault(20+k*230, 500, "pattr_i @bindto parent::" + pattrNames[k]);}
		else{the_pattrs[k] = this.patcher.newdefault(20+k*230, 500, "pattr_f @bindto parent::"+ pattrNames[k]);}
		the_pattrs[k].varname = "pattr_"+ (k + 1)
		this.patcher.connect(pattr_in, 0, the_spray, 0);
		this.patcher.connect(the_spray, k, the_pattrs[k], 0);
		this.patcher.connect(the_pattrs[k], 0, the_funnel, k);
		this.patcher.connect(the_funnel, 0, pattr_out, 0);
	}
}