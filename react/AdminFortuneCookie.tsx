import React, { useState, useEffect } from 'react'
import { useLazyQuery,useMutation } from 'react-apollo'
import getAllFortuneCookie from './graphql/getAllFortuneCookie.gql'
import createFortuneCookie from './graphql/createFortuneCookie.gql'
import deleteFortuneCookie from './graphql/deleteFortuneCookie.gql'
import editFortuneCookie from './graphql/editFortuneCookie.gql'
import searchCookie from './graphql/searchCookie.gql'
import { Layout, PageBlock,Button,Modal,Input,Spinner, IconDelete, PageHeader,Box, IconPlusLines, IconEdit, InputSearch} from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
// import IconDelete from 'vtex.styleguide'

const AdminFortuneCookie = () => {
  const [modalAdd,setModalAdd]=useState(false)
  const [modalEdit,setModalEdit]=useState(false)
  const [cookieId,setCookieEdit]=useState("")
  const [cookieText,setCookieText]=useState("")
  const [searchText,setSearchText]=useState("")
  const[frase, setFrase]= useState("")
  const [change, setChange]= useState(false)
  // const {data} = useQuery(getAllFortuneCookie)
  const [mutationCreate] = useMutation(createFortuneCookie)
  const [mutationDelete] = useMutation(deleteFortuneCookie)
  const [mutationEdit] = useMutation(editFortuneCookie)
  const [queryGet,{data,loading}] = useLazyQuery(getAllFortuneCookie,{fetchPolicy:'network-only',notifyOnNetworkStatusChange:true})
  const [querySearch,info] = useLazyQuery(searchCookie,{fetchPolicy:'network-only',notifyOnNetworkStatusChange:true, variables:{searchText}})

  const HandleModalAdd:any = ()=>{
    setModalAdd(!modalAdd)
  }
  const HandleModalEdit:any = (id:string,text:string)=>{
    setCookieEdit(id)
    setCookieText(text)
    setModalEdit(!modalEdit)
  }
  
  const HandleSubmit:any = ()=>{
    mutationCreate({variables:{frase}, refetchQueries: [{ query: getAllFortuneCookie }]})
    setChange(!change)
    HandleModalAdd()
  }
  const HandleDelete:any = (id:string)=>{
    mutationDelete({variables:{id}, refetchQueries: [{ query: getAllFortuneCookie}]})
    setChange(!change)
  }
  
  const HandleEdit:any = ()=>{
    console.log(cookieId,cookieText,"edit")
    mutationEdit({variables:{cookieId, cookieText}, refetchQueries: [{ query: getAllFortuneCookie }]})
    setChange(!change)
    setCookieText("")
    HandleModalEdit(cookieId, cookieText)
  }

  const HandleSearch:any = ()=>{
    querySearch()
  }

  const HandleClear:any = ()=>{
    setSearchText("")
    querySearch()
  }


  console.log(searchText,"que llega")
  console.log(info.data?.searchCookie,"datos")
  
  useEffect(() => {
    queryGet()
  },[change]);



  return (
    <Layout>
      {data?
      <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-example.adminExample.title"/>}
        />
      }
    >
        <Modal isOpen={modalAdd} onClose={()=>setModalAdd(false)} bottomBar={
            <div className="nowrap">
              <Button onClick={HandleSubmit}><FormattedMessage id="admin-example.adminExample.button"/></Button>
            </div>
          } showBottomBarBorder={false}>
          <h2><FormattedMessage id="admin-example.adminExample.add"/></h2>
          <Input onChange={(e:any) => setFrase(e.target.value)} value={frase} placeholder="Ingresa la Frase" size="large"/>
          {/* <Button onClick={HandleSubmit}><FormattedMessage id="admin-example.adminExample.button"/></Button> */}
        </Modal>

        <Modal isOpen={modalEdit} onClose={()=>{setModalEdit(!modalEdit); setCookieText("")}} bottomBar={
            <div className="nowrap">
              <Button onClick={HandleEdit}><FormattedMessage id="admin-example.adminExample.buttonEdit"/></Button>
            </div>
          } showBottomBarBorder={false}>
          <h2><FormattedMessage id="admin-example.adminExample.Edit"/></h2>
          <Input onChange={(e:any) => setCookieText(e.target.value)} value={cookieText} placeholder="Ingresa la Frase" size="large"/>
          {/* <Button onClick={HandleEdit}><FormattedMessage id="admin-example.adminExample.buttonEdit"/></Button> */}
        </Modal>

        <div className='relative'>
        <PageBlock>
          <div className=' flex justify-between right-0 top-0 pb7'>
            <Button onClick={HandleModalAdd}><IconPlusLines color="white"/></Button>
            <div className='w-60'>
            <InputSearch size="regular" value={searchText} onClear={HandleClear} onChange={(e:any) => {setSearchText(e.target.value);querySearch()}} onSubmit={(HandleSearch)}/>
            </div>
          </div>
          {info.data?.searchCookie.length>0?info.data.searchCookie.map((cookie:any)=><Box key={cookie.id}><div className="flex justify-between items-center h3">{cookie.text}<div><Button onClick={() => HandleModalEdit(cookie.id,cookie.text) }><IconEdit color="white"/></Button> <div className="mt3"><Button variation="danger" onClick={() => HandleDelete(cookie.id)}><IconDelete color="white"/></Button></div></div></div></Box>)
          :info.data?.searchCookie.length<1? <h3><FormattedMessage id="admin-example.adminExample.Error"/></h3>:
          data?.getAllFortuneCookie.map((cookie:any)=><Box key={cookie.id}><div className="flex justify-between items-center h3">{cookie.text}<div><Button onClick={() => HandleModalEdit(cookie.id,cookie.text) }><IconEdit color="white"/></Button> <div className="mt3"><Button variation="danger" onClick={() => HandleDelete(cookie.id)}><IconDelete color="white"/></Button></div></div></div></Box>)}
        </PageBlock>
    </div>
      </Layout>
    : loading? <Spinner/>: <h1>Error data</h1>
    }

    </Layout>
  )
}

export default AdminFortuneCookie