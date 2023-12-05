let task = "32-12^2/(3/6)^2"

let s=new Array();

//приведем исходную строку в массив, с ним будет удобнее работать и выполнять операции с многозначными числами//
let number="";
for(let i=0;i<task.length;i++){
	if(task[i]!="+" && task[i]!="-" && task[i]!="*" && task[i]!="/" && task[i]!="^"&& task[i]!="("&& task[i]!=")"){
		number+=task[i];
	}
	else if(number!=""){
		s.push(number);
		s.push(task[i]);
		number="";
	}
	else{s.push(task[i])}
}
if(number!=""){s.push(number)}

//создадим массив, который будет являться коненчым результатом(обратным польским выражением)//
let out=new Array();

//расставим приоритеты операций//
let priority=new Object();
priority[1]=["+","-"]
priority[2]=["*","/"]
priority[3]=["^"]
let stack=new Array();


//преобразовываем исходное выражение//
for(let i=0;i<s.length;i++){
	let flag=1;
	let key;
	for(key in priority){
		if(priority[key].indexOf(s[i]) != -1){
			flag=0;
			break;
		}
	}
	
	//если не операция и не скобки, то просто запушим число в out//
	if(flag==1 && s[i]!="(" && s[i]!=")"){
		out.push(s[i]);
		if(i==s.length-1){
			while(stack.length!=0){
				out.push(stack[stack.length-1][0]);
				stack.splice(stack.length-1,1);
			}
		}
	}
	
	/*на различных примерах понял, что в случае, когда скобка стоит в конце всего выражения, возникают определенные трудности, 
	поэтому вынес эту ситуацию в отдельный случай*/
	else if(flag==1 && s[i]==")" && i==s.length-1){
			while(stack.length!=0){
				if(stack[stack.length-1][0]!="("){
					out.push(stack[stack.length-1][0]);
				}
				stack.splice(stack.length-1,1);
			}
	}
	//аккуратная работа со стеком//
	else{
		if(s[i]=="("){
			stack.push([s[i],-1]);
		}
		else if(s[i]==")"){
			while(stack[stack.length-1][0]!="("){
				out.push(stack[stack.length-1][0]);
				stack.splice(stack.length-1,1);
			}
			stack.splice(stack.length-1,1);
		}
		else if(stack[0]==undefined){
			stack.push([s[i],key]);
		}
		else if(key>parseInt(stack[stack.length-1][1]) || (s[i]=="^" && stack[stack.length-1][0]=="^")){
			stack.push([s[i],key]);
		}
		else{
			while(stack.length!=0 && key<=parseInt(stack[stack.length-1][1])){
				out.push(stack[stack.length-1][0]);
				stack.splice(stack.length-1,1);
			}
			stack.push([s[i],key]);
		}
	}
}

 //вычислим значение выражения по обратной польской записи//
let res=out;
let i=0;
 
while(i<res.length){
	while(res[i]!="+" && res[i]!="-" && res[i]!="*" && res[i]!="/" && res[i]!="^" && i<res.length){
		i++;
	}
	if(i==res.length){break;}
	else if(res[i]=="+"){
		res=(res.slice(0,i-2).concat(parseFloat(res[i-2])+parseFloat(res[i-1]))).concat(res.slice(i+1));
	}
	else if(res[i]=="-"){
		res=(res.slice(0,i-2).concat(parseFloat(res[i-2])-parseFloat(res[i-1]))).concat(res.slice(i+1));
	}
	else if(res[i]=="/"){
		res=(res.slice(0,i-2).concat(parseFloat(res[i-2])/parseFloat(res[i-1]))).concat(res.slice(i+1));
	}
	else if(res[i]=="*"){
		res=(res.slice(0,i-2).concat(parseFloat(res[i-2])*parseFloat(res[i-1]))).concat(res.slice(i+1));
	}
	else if(res[i]=="^"){
		res=(res.slice(0,i-2).concat(parseFloat(res[i-2])**parseFloat(res[i-1]))).concat(res.slice(i+1));
	}
	i=0;
}
console.log(task)
console.log(out)
console.log(out.join(''))
console.log(res[0])