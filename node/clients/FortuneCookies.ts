import { InstanceOptions, IOContext, JanusClient } from '@vtex/api'


export default class FortuneCookiesClient extends JanusClient {

    constructor(context: IOContext, options?: InstanceOptions) {
        super(context,
            {
                ...options,
                headers: {
                    VtexIdclientAutCookie: context.authToken,
                    
                },
            })
    }

    public async getAllFortuneCookie(): Promise<any> {
      const data = await this.http.get(`/api/dataentities/FJ/search?_fields=id,text`)
      return data
    }

    public async getRandomFortuneCookie(): Promise<any> {
        let headers = {
            "REST-Range": "resources=0-1500"
        }
        const data = await this.http.get(`/api/dataentities/FJ/search?_fields=id,text`, {headers})
        return data[2]
        // const getRandomElement =data[Math.floor(Math.random() * data.length)];
        // return getRandomElement;
    }

    // public async createFortuneCookie(phrase:any): Promise<any> {
    //     let body = {
    //         "text":phrase
    //     }

    //     try {
    //         const data = this.http.post(`/api/dataentities/FJ/documents`, body)
    //         return data
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    public async deleteFortuneCookie(id:any): Promise<any> {
        try {
            const data = this.http.delete(`/api/dataentities/FJ/documents/${id}`)
            return data
        } catch (err) {
            console.error(err)
        }
    }
}