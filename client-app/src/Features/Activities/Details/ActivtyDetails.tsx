import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { Activity } from '../../../App/Models/Activity'

interface Props{
    activity: Activity;
    cancelSelectActivity : ()=>void;
    openForm: (id:string)=> void;

}

export default function ActivtyDetails({activity, cancelSelectActivity, openForm}:Props) {
  return (
    <Card>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
        <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>{activity.date}</Card.Meta>
            <Card.Description>
                {activity.description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            
            <Button.Group widths='2'>
                <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit'></Button>
                <Button onClick={cancelSelectActivity} basic color='grey' content='Cancel'></Button>

            </Button.Group>
        </Card.Content>
    </Card>
  )
}
