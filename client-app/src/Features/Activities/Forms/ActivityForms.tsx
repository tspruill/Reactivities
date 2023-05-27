import { observer } from 'mobx-react-lite';
import  { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../App/stores/store';



export default observer(function ActivityForms() {
  const {activityStore} = useStore();
    const {selectedActivity, closeForm,createActivty,editActivty,loading} = activityStore
  const intialState = selectedActivity ?? {
    id: '',
    title:'',
    description:'',
    venue:'',
    city:'',
    date:'',
    category:''
  }
  const [activity,setActivity] = useState(intialState);
  function handleSubmit(){
    activity.id ? editActivty(activity) : createActivty(activity); 
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const {name,value} = event.target;
    setActivity({...activity,[name]:value})

  }

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
            <Button onClick={closeForm} floated='right' type='button' content="Cancel"/>





        </Form>
    </Segment>
  )
})
