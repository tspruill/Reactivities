import { Button, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../App/Layout/LoadingComponent';
import { useStore } from '../../../App/stores/store';



export default function ActivtyDetails() {
    const {activityStore} = useStore();
    //Basically use the colon to rename function or property when destructring 
    const {selectedActivity:activity,openForm,cancelSelectedActvity:cancelSelectActivity} = activityStore;
if(!activity)return <LoadingComponent />;
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
