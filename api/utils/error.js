export const createError=(stat,message)=>{
    const err=new Error();
    err.status=stat;
    err.message=message;
    return err; 
}