import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'



export default function NavBar() {

  return (
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item as={NavLink} to='/' header>
                <img src='/Assets/logo.png' alt="logo" />
                Reactivities
            </Menu.Item>
            <Menu.Item as={NavLink} to='/activities' name='activities'/>
            <Menu.Item>
                <Button as={NavLink} to='/createActivity' positive content='Create Activity'/>
            </Menu.Item>
        </Container>
    </Menu>
  )
}
