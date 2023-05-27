import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store';



export default function NavBar() {
    const {activityStore} = useStore();

  return (
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item header>
                <img src='/Assets/logo.png' alt="logo" />
                Reactivities
            </Menu.Item>
            <Menu.Item name='activities'/>
            <Menu.Item>
                <Button onClick={() => {activityStore.openForm()}} positive content='Create Activity'/>
            </Menu.Item>
        </Container>
    </Menu>
  )
}
