const validate = {
    msgHandler :(method,input,errorMessage,isvalid)=>{        
        validate.errSetter(errorMessage)
        method((preState)=>({
            ...preState,[input.current.id]:{isvalid:isvalid,message:errorMessage}
        }));
    },
    errSetter :(message,isvalid=false)=>{
        return {"status":isvalid,"message":message};
    },
    isFormValid :(elements)=>{
        let i = 0;
        elements.map((element) => {
            if(typeof(element.current) !== 'undefined'){
                if(validate.strLen(element) === 0 || element.current.value ==='0'){
                    i++ 
                }
            }
        });
        return (i>0) ? true:false;
    },
    onlyNumeric : (text)=>{
        return text.current.value= text.current.value.replace(/[^0-9]/g, '');
    },
    onlyAlpha : (text)=>{
        return text.current.value = text.current.value.replace(/[^A-Za-z\s]/g,''); 
    },
    passwordCompare :(n,c)=>{
        return (n.current.value.trim() === c.current.value.trim())? true: false;
    },
    isEmpty : (text)=>{
        return (text.current.value.trim().length === 0) ? true : false;
    },
    isSelected : (text)=>{
        return (text.current.value.trim() === '0') ? true :false ;
    },
    strLen : (text)=>{
        if(typeof(text.current) !== 'undefined'){
            return text.current.value.trim().length;
        }
    },
    validMobile : (text)=>{
        if(text.current.value > 5 && text.current.value !== undefined){
            return text.current.value = text.current.value.replace(/[^0-9]/g,'');   
        }
        text.current.value ='';
    },
    validUdiseCode : (text)=>{
        if(text.current.value ===11 && text.current.value !== undefined){
            return text.current.value = text.current.value.replace(/[^0-9]/g,'');   
        }
        text.current.value ='';
    },
    value :(text,length=0)=>{
        if(text.current.value.trim().length === length){
            return true;
        }
        if(text.current.value.trim().length < length){
            return true;
        }
        return false;
    },
    isPasswordStrong : (text)=>{
        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return regex.test(text.current.value);
    },
    validEmail : (text)=>{
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(text.current.value);
    }
};

export default validate;