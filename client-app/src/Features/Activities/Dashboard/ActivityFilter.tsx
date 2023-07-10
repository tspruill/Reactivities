import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'

export default function ActivityFilter() {
  return (
    <>
        <Menu vertical size='large' style={{width:'100%', marginTop:25}}>
        <Header icon='filter' attached color='teal' content='Filters'/>
        <Menu.Item content='Activtiies'/>
        <Menu.Item content='Activtiies 2'/>

        <Menu.Item content='Activtiies Three'/>

    </Menu>
    <Header content=''/>
    <Calendar/>
    </>

  )
}
