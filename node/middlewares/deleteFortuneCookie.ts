export async function deleteFortuneCookie(ctx: Context, next: () => Promise<any>) {
  const {
    vtex:{
      route:{params}
    }
  } = ctx
  try{
    console.info('params', params.code )
    // const r = await ctx.clients.masterdata.searchDocuments({dataEntity:"FJ", fields:["id","text"],pagination:{page:1, pageSize:1000}})
    const response= await ctx.clients.FortuneCookies.deleteFortuneCookie(params.code)
    console.info('response', response)
    ctx.body=response
    
  
  }catch(e){
    console.info('error get all cookies',e)
    ctx.body={message:"Error delete cookie", error:e.response}
  }

  await next()
}
