import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../App/Layout/LoadingComponent';
import { useStore } from '../../../App/stores/store';



export default observer(function ActivtyDetails() {
    const {activityStore} = useStore();
    //Basically use the colon to rename function or property when destructring 
    const {selectedActivity:activity, loadActivitiy,loadingInitial} = activityStore;
    const {id} = useParams();
    useEffect(() => {
        if(id) loadActivitiy(id);
    },[id,loadActivitiy])
if( loadingInitial || !activity)return <LoadingComponent />;
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
                <Button as={Link} to={`/manage/${activity.id}`}  basic color='blue' content='Edit'></Button>
                <Button  as={Link} to={`/activities/${activity.id}`} basic color='grey' content='Cancel'></Button>

            </Button.Group>
        </Card.Content>
    </Card>
  )
})
