import React,{useEffect, useState} from 'react'; 
import axios from 'axios'; 
import {connect} from 'react-redux'


const Sidebar = (props) => {

    return(
        <div className='sidebar-container' >
            sidebar component
        </div>
    )
}
const mapStateToProps = (reduxState) => {
   return reduxState
}
export default connect(mapStateToProps)(Sidebar);