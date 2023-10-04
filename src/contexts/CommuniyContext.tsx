import React, { useEffect, createContext, useContext, useReducer } from 'react';
import { Community }  from '../types'

// Define your types (Community) here

const UseCommunitySource = (): {
  community: Community[];
} => {
  type CommunityState = {
    community: Community[];
  }

  type CommunityAction = { type: "setCommunity"; payload: Community[] };

  const reducer = (state: CommunityState, action: CommunityAction) => {
    switch (action.type) {
      case "setCommunity":
        return { ...state, community: action.payload };
      default:
        return state;
    }
  }

  const [{ community }, dispatch] = useReducer(reducer, {
    community: [],
  });

  useEffect(() => {
    fetch('http://localhost:8000/api/communities/')
      .then(response => response.json())
      .then(data => dispatch({ type: "setCommunity", payload: data }));
  }, []);

  return { community };
}


const CommunityContext = createContext<ReturnType<typeof UseCommunitySource>>(
  {} as ReturnType<typeof UseCommunitySource>
);

export const UseCommunity = () => useContext(CommunityContext)

export function CommunityProvider({
    children
}: {
    children: React.ReactNode
}) {
return (
    <div>
      <CommunityContext.Provider value={UseCommunitySource()}>
        {children}
      </CommunityContext.Provider>
    </div>
    )
}
