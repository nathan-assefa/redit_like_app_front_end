import { UseCommunity } from '../contexts/CommuniyContext'

export const CommunityList = () => {
    const { community } = UseCommunity();
    return (
      <div>
        {community.map(c => (
          <div key={c.id}>
            <div>{c.name}</div>
            <div>{c.description}</div>
            <hr />
          </div>
        ))}
      </div>
    )
  }