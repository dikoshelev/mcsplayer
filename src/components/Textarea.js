import React, {Component, PropTypes} from 'react'

function Textarea(props) {
  return (
    <div className="Textarea">
        <label className="Textarea-label" htmlFor={props.textareaId}>{props.label}</label>
        <textarea className="Textarea-input" id={props.inputId} value={props.value} onChange={props.onUpdate}/>
    </div>
    )
}

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default Textarea
