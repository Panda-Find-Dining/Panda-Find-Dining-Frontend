import React from 'react'

const PendingMatchedMeals = () => {
  return (
    <div className="dropdown is-active">
  <div className="dropdown-trigger">
    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Dropdown button</span>
      <span className="icon is-small">
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div className="dropdown-menu" id="dropdown-menu" role="menu">
    
  </div>
</div>
  )
}

export default PendingMatchedMeals