import React from 'react';

const NewMessageForm = (props) => {

  return (
    <div>
      <div class="ui fluid action input">
        <input type="text" placeholder="Type a message..." />
        <div class="ui button">Submit</div>
      </div>
    </div>
  )
}

export default NewMessageForm;
