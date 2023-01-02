// import { json } from 'co-body'

// export async function createFortuneCookie(ctx: Context, next: () => Promise<any>) {
//   const body = await json(ctx.req)
//   console.info("body",body)
//   try{
//     // const r = await ctx.clients.masterdata.searchDocuments({dataEntity:"FJ", fields:["id","text"],pagination:{page:1, pageSize:1000}})
//     const response= await ctx.clients.FortuneCookies.createFortuneCookie(body.text)
//     console.info('response', response)
//     ctx.body=response
  
//   }catch(e){
//     console.info('error get all cookies',e)
//     ctx.body={message:"Error get random cookies", error:e.response}
//   }
//   await next()
// }
