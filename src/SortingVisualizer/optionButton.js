import React from 'react';

const OptionButton = (props) => {
    return (
        <button
            type="button"
            id={props.id}     
            onClick={() => props.clickCallback()}>
                {props.children}
        </button>
    );
};
export default OptionButton;