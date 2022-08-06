import React, { Component } from 'react'
import "./Loader.css"

export default class Loader extends Component {
  render() {
    return (
        <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
  }
}
