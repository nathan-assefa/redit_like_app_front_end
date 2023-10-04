import React, {
    useEffect,
    createContext,
    useContext,
    useReducer
} from 'react';
import { Comment }  from '../types'
import { useAuth } from './AuthContext'
import AuthToken from '../utils/AuthToken'


const UseCommentSource = (): {
  commment: Comment[];
} => {
  type CommentState = {
    commment: Comment[];
  }

  type CommentAction = { type: "setComment"; payload: Comment[] };

  const reducer = (state: CommentState, action: CommentAction) => {
    switch (action.type) {
      case "setComment":
        return { ...state, commment: action.payload };
      default:
        return state;
    }
  }

  const [{ commment }, dispatch] = useReducer(reducer, {
    commment: [],
  });

  const {logOutUser} = useAuth()

  useEffect(() => {
    getComments()
  }, [])

  let getComments = async() =>{
    let response = await fetch('http://localhost:8000/api/comments/', {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(AuthToken())
        }
    })
    let data = await response.json()

    if(response.status === 200){
        console.log('in')
        dispatch({ type: "setComment", payload: data })
    }else if(response.statusText === 'Unauthorized'){
        console.log('out')
        logOutUser()
    }
}

  return { commment };
}


const CommentContext = createContext<ReturnType<typeof UseCommentSource>>(
  {} as ReturnType<typeof UseCommentSource>
);

export const UseComment = () => useContext(CommentContext)

export function CommentProvider({
    children
}: {
    children: React.ReactNode
}) {
return (
    <div>
      <CommentContext.Provider value={UseCommentSource()}>
        {children}
      </CommentContext.Provider>
    </div>
    )
}
