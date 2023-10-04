import React, {
    useEffect,
    createContext,
    useContext,
    useReducer
} from 'react';
import { Post }  from '../types'
import { useAuth } from './AuthContext'
import AuthToken from '../utils/AuthToken'

// const authRelatedData = localStorage.getItem('authTokens');
// const initialAuthToken = authRelatedData ? JSON.parse(authRelatedData) : null;
// const initialUser = initialAuthToken
// ? initialAuthToken.access
// : null;

const UsePostSource = (): {
  post: Post[];
} => {
  type PostState = {
    post: Post[];
  }

  type PostAction = { type: "setPost"; payload: Post[] };

  const reducer = (state: PostState, action: PostAction) => {
    switch (action.type) {
      case "setPost":
        return { ...state, post: action.payload };
      default:
        return state;
    }
  }

  const [{ post }, dispatch] = useReducer(reducer, {
    post: [],
  });

  const {logOutUser} = useAuth()

  useEffect(() => {
    getPosts()
  }, [])

  let getPosts = async() =>{
    let response = await fetch('http://localhost:8000/api/posts/', {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(AuthToken())
        }
    })
    let data = await response.json()

    if(response.status === 200){
        dispatch({ type: "setPost", payload: data })
    }else if(response.statusText === 'Unauthorized'){
        logOutUser()
    }
}
  console.log(post)

  return { post };
}


const PostContext = createContext<ReturnType<typeof UsePostSource>>(
  {} as ReturnType<typeof UsePostSource>
);

export const UsePost = () => useContext(PostContext)

export function PostProvider({
    children
}: {
    children: React.ReactNode
}) {
return (
    <div>
      <PostContext.Provider value={UsePostSource()}>
        {children}
      </PostContext.Provider>
    </div>
    )
}
