import React from 'react';

function ChatGPT(props) {
    return (
        <button className={props.className} onClick={props.onClick}>
            <u>{props.label}</u>
        </button>
    );
}

export default ChatGPT
