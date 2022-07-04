const Settings={
    status:{'0':'Disable','1':'Enable'},
    checkNumber:(x)=>{
        x=Number(x);
        // console.log(typeof x);
        if(typeof x == "number"){
            if (Number.isInteger(x)) {
                if(Number.isInteger(x)===0){
                    // console.log('a');
                    return false;
                } else if(Number.isNaN(x)){
                    // console.log('b');
                    return false;
                } else {
                    // console.log('c');
                    return true;
                }
            } else if(Number.isNaN(x)){
                // console.log('d');
                return false;
            } else {
                // console.log('e');
                return true;
            }
        } else {
            // console.log('f');
            return false;
        }
    },
    checkQuantity:(x)=>{
        x=Number(x);
        // console.log(typeof x);
        if(typeof x == "number"){
            if (Number.isInteger(x)) {
                return true;
            } else {
                
                return true;
            }
        } else {
            return false;
        }
    }
}

export default Settings;