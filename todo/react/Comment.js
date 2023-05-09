/**
 * Created by lsq on 2020/12/12.
 * 提取组件
 */

'use strict';

function Avatar(props){
  return (
    <img className='Avatar'
         src={props.author.avatarUrl}
         alt={props.author.name}
    />
  );
}

function UserInfo(props){
  return (
    <div className='UserInfo'>
      <Avatar user={props.author}/>
      <div className='UserInfo-name'>
        {props.author.name}
      </div>
    </div>
  );
}

function Comment(props){
  return (
    <div className='Comment'>
      <UserInfo user={props.author}/>
      <div className='Comment-text'>
        {props.text}
      </div>
      <div className='Comment-date'>
        {formatDate(props.data)}
      </div>
    </div>
  );
}
