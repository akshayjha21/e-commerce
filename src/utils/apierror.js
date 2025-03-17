class apierror extends ERROR{//inheriting the error class 
    constructor(
        statuscode,
        message="something went wrong",
        error=[],
        stack=""
    ){
        super(message);
        this.statuscode=statuscode,
        this.error=error;
        this.success=false;
        if(stack){
            this.stack=stack;
        }
        else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
    
}
export{apierror}

//stacktrace-> it is used in to trace where an error is happening,used to debug the code