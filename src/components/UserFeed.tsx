import React from 'react';
import './ComStyles.css';
import { BotsList } from './Extra';


interface Props {
  children?: React.ReactNode;
}

const UserFeed: React.FC<Props> = ({}) => {
  const Feed = BotsList
  return (
    <div className='uf-container'>

    </div>
  );
};

export default UserFeed;
