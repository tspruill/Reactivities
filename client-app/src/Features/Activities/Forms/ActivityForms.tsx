import { observer } from 'mobx-react-lite';
import  { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../App/Layout/LoadingComponent';
import { Activity } from '../../../App/Models/Activity';
import { useStore } from '../../../App/stores/store';
import {v4 as uuid} from 'uuid';



export default observer(function ActivityForms() {
  const {activityStore} = useStore();
  const {createActivty,editActivty,loading,loadActivitiy,loadingInitial} = activityStore
  const {id} = useParams();
  const [activity,setActivity] = useState<Activity>({
    id: '',
    title:'',
    description:'',
    venue:'',
    city:'',
    date:'',
    category:''
  });
  const navigate = useNavigate();
  useEffect(() => {
    if(id) loadActivitiy(id).then( res => setActivity(res!))
  },[id,loadActivitiy])
  function handleSubmit(){
    if(!activity.id)
    {
      activity.id = uuid()
      createActivty(activity).then(() => navigate(`/activities/${activity.id}`))
    }else{
      editActivty(activity).then(() => navigate(`/activities/${activity.id}`))
    }
   
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const {name,value} = event.target;
    setActivity({...activity,[name]:value})

  }
  if(loadingInitial) return <LoadingComponent content='Loading Activtiy...'/>

  return (
    <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Input placholder='Title' value={activity.title} onChange={handleInputChange} name='title'/>
            <Form.TextArea placholder="Description" value={activity.description} name='description' onChange={handleInputChange} />
            <Form.Input placholder="Category" value={activity.category} name='category' onChange={handleInputChange}/>
            <Form.Input type='date' placholder="Date" value={activity.date} name='date'onChange={handleInputChange}/>
            <Form.Input placholder="City" value={activity.city} name='city' onChange={handleInputChange}/>
            <Form.Input placholder="Venue" value={activity.venue} name='venue' onChange={handleInputChange}/>
            <Button loading={loading}  floated='right'positive type='submit' content="Submit"/>
            <Button as={Link} to='/activities'  floated='right' type='button' content="Cancel"/>





        </Form>
    </Segment>
  )
})


