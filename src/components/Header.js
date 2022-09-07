import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({ color, title, onAdd, showAdd }) => {
  
  return (
    <header className = 'header' >
        <h1 style={{color: 'red'}}>
            {title}
        </h1>
       <Button color= {showAdd? 'red': 'green'} text= {showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
    </header>
  )
} 
Header.defaultProps = {
    title: "Hello Task Tracker",
    color: "red"
}
Header.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string
}

export default Header