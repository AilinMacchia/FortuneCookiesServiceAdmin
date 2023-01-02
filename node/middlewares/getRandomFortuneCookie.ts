export async function getRandomFortuneCookie(ctx: Context, next: () => Promise<any>) {
  try{
      // const r = await ctx.clients.masterdata.searchDocuments({dataEntity:"FJ", fields:["id","text"],pagination:{page:1, pageSize:1000}})
    const response= await ctx.clients.FortuneCookies.getRandomFortuneCookie()
    console.info('response', response)
    
  
  }catch(e){
    console.info('error get all cookies',e)
    ctx.body={message:"Error get random cookies", error:e.response}
  }
  await next()
}
