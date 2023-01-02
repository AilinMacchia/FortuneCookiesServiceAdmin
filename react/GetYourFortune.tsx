import React, { useEffect, useState } from 'react'
import { useLazyQuery } from 'react-apollo'
import getRandomFortuneCookie from './graphql/getRandomFortuneCookie.gql'
import { Layout, Spinner} from 'vtex.styleguide'
import{useCssHandles} from 'vtex.css-handles'

const CSS_HANDLES = ["phrase","fc", "spawned", "fcPart", "right", "left","fcCrumbs","fcCrumb", "fcFortune", "fcFortuneText","fcLuckyNumbers", "opened", "container"  ] as const

const GetYourFortune = () => {
  const[phrase, setPhrase]= useState("")
  const[open, setOpen]= useState(false)
  const [queryGet,{data,loading}] = useLazyQuery(getRandomFortuneCookie,{fetchPolicy:'network-only',notifyOnNetworkStatusChange:true})
  const [numero, setNumero] = useState<number[]>([])
  const handles = useCssHandles(CSS_HANDLES)

  const fortuneNumber:any = ()=>{
    for (let i = 0; i < 8; i++) {
    let random = Math.random();
    random = random * 9 + 1;
    random = Math.trunc(random);
    numero[i]=random;
  }
  console.log(numero)
  }
  
  function HandleCookie(){
    if(phrase){
      setPhrase("")
      setOpen(false)
    }else{
      queryGet()
      setNumero(numero)
      setOpen(!open)

    }
  }

  
  useEffect(()=>{
    fortuneNumber()
    setPhrase(data?.getRandomFortuneCookie.text)
},[data])


  return (
    <Layout>
<button className={open?`${handles.fc} ${handles.opened}`:`${handles.fc} ${handles.spawned}`} onClick={HandleCookie} type="button">
	<div className={`${handles.fcPart} ${handles.left}`}></div>
	<div className={`${handles.fcPart} ${handles.right}`}></div>
  {phrase?
        <div className={`${handles.container}`}>
          <h3 className={`${handles.fcFortuneText} mr5 ml5`}>{phrase}</h3>
          <h5 className={`${handles.fcLuckyNumbers}`}>{numero[0]}{numero[1]}-{numero[2]}{numero[3]}-{numero[4]}{numero[5]}-{numero[6]}{numero[7]}</h5>
        </div>
      :loading? <Spinner/>: null}
</button>

    </Layout>
  )
}

export default GetYourFortune
