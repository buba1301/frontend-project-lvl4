import React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions/index';

const mapStateToProps = (state) => {
  const { messages } = state;
  return { messages: Object.values(messages.byId) };
};

const Messages = (props) => {
  const { messages } = props;

  return (

    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {messages.length > 0 && messages.map(({ user, text }) => {
            console.log(user);
            return (
              <div>
                <b>{user}</b>
                {':'}
                {text}
              </div>
            );
          })}

          <div className="mt-auto">
            <form noValidate>
              <div className="form-group">
                <div className="input-group">
                  <input name="body" className="form-control" valie="" />
                  <div className="d-block invalid-feedback">&nbsp;</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Messages);
