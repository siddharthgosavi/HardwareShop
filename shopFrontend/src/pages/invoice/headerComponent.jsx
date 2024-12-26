import React, {Component} from 'react';
import './invoice.css';
import Logo from './Logo.png'

export default class HeaderComponent extends Component{
  render(){
    return(

      <header>

          <h1> INVOICE </h1>        
          <address>
            <p> Prop.Pritam Bhujbal </p>
            <p> Sai Enterprises (Sales & Services) </p>
            <p> Naigaon, Maharashtra 412801 </p>
            <p> +917083189399 / +919373315653 </p>
          </address>

          <span>
            <img alt="Sai Enterprises" src={Logo} className="rounded float-right align-top" />          
          </span>
                  
      </header>
    )
  }
}
