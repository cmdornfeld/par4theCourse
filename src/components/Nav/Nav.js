import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import styled from 'styled-components';

const NavBar = styled.div`
  background-color: steelblue;
  min-height: 32px;
  display: grid;
  grid-template-areas: "title buttons";
  grid-template-columns: auto 1fr;
  

  h2  {
    text-decoration: none;
    color: white;
  }

  button {
    background: none;
  }

  .nav-link {
    text-decoration: none;
    color: white;
  }

`;

const NavButtons =  styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Nav = (props) => (
  <NavBar>
    <Link className="nav-link" to="/home">
      <h2 className="nav-title">Par4theCourse</h2>
    </Link>
    <NavButtons>
    <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Home' : 'Login / Register'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      
      {/* Always show this link since the course page is not protected */}
      <Link className="nav-link" to="/courses">
        Courses
      </Link>

      {props.user.id && (
          <LogOutButton className="nav-link"/>
      )}
    </NavButtons>
  </NavBar>
);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
