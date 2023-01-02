
export const getAllFortuneCookie = async (
    _: any,
    __: any,
  
    { clients: { masterdata } }: Context
  ) =>
    masterdata
      .searchDocuments({
        dataEntity: "FJ",
        fields: ["id", "text"],
        pagination:{page:1, pageSize:1000}
      })
      .then((data) => data);

export const getRandomFortuneCookie = async (
    _: any,
    __: any,
  
    { clients: { masterdata } }: Context
  ) =>
    masterdata
      .searchDocuments({
        dataEntity: "FJ",
        fields: ["id", "text"],
        pagination:{page:1, pageSize:1000}
      })
      .then((data:any) => {
        const getRandomElement =data[Math.floor(Math.random() * data.length)];
        return getRandomElement;
      });

export const createFortuneCookie = async (
  _: any,
  { text }: { text: string },
      
  { clients: { masterdata } }: Context
      ) =>
        masterdata
          .createDocument({
            dataEntity: "FJ",
            fields: {text},
          })
          .then((data) => data);

export const deleteFortuneCookie = async (
  _: any,
  { code }: { code: string },
      
  { clients: { masterdata } }: Context
      ) =>
        masterdata
          .deleteDocument({
            dataEntity: "FJ",
            id:code,
          })
          .then((status) => status);


export const editFortuneCookie = async (
  _: any,
  { code, text }: { code: string, text:string},
      
  { clients: { masterdata } }: Context
      ) =>
        masterdata
          .updatePartialDocument({
            dataEntity: "FJ",
            id:code,
            fields:{
              text
            }
          })
          .then(() => {return {id:code , text:text, cookieEdit:true}});

export const searchCookie = async (
  _: any,
  {text}: {text:string},
          
  { clients: { masterdata } }: Context
  ) =>
    masterdata
    .searchDocuments({
      dataEntity: "FJ",
      fields: ["id", "text"],
      where:`text=*${text}*`,
      pagination:{page:1, pageSize:1000}
    })
    .then((data) => data);