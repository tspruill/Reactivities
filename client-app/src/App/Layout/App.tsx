import React, { Fragment, useEffect, useState } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../Models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [ediMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    agent.Activities.list()
    .then(res => {
      let activities:Activity[] = [];
      res.forEach( a => {
        a.date = a.date.split("T")[0]
        activities.push(a)

      })
      setActivities(activities);
      setLoading(false);
    })
  },[])

  function handleSelectedActivty(id: string){
    setSelectedActivity(activities.find(a => a.id === id))
  }

  function handleCancelSelect(){
    setSelectedActivity(undefined)
  }

  function handleFormOpen(id?:string){
    id? handleSelectedActivty(id) : handleCancelSelect();
    setEditMode(true);
  }
  function handleCreateOrEditActivity(activity:Activity){
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=> {
        setActivities([...activities.filter(a=> a.id !== activity.id),activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }else{
      activity.id = uuid()
      agent.Activities.create(activity).then(() => {
        setActivities([...activities,activity])
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }
  function handleDeleteActivity(id:string){
    setSubmitting(true)

    agent.Activities.del(id).then(()=>{
      setActivities([...activities.filter(a => a.id !== id)])
      setSubmitting(false)
    })
      
  }
  function handleFormClose(){
  
    setEditMode(false);
  }
  if(loading) return <LoadingComponent content='Loading App...'/>
  return (
    <>
     <NavBar openForm={handleFormOpen}/>
    <Container style={{marginTop: '7rem'}}>
      <ActivityDashboard 
      activities={activities} 
      selectedActivity = {selectedActivity}
      selectActivty = {handleSelectedActivty}
      cancelSelectActivity = {handleCancelSelect}
      editMode={ediMode}
      handleFormOpen={handleFormOpen}
      handleFormClose = {handleFormClose}
      createOrEdit={handleCreateOrEditActivity}
      deleteActivity={handleDeleteActivity}
      submitting={submitting}
      />
    </Container>
  
     
      
    </>
  );
}

export default App;
