import  { useEffect } from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();
  useEffect(() => {
    activityStore.loadActivities();
  },[activityStore])

 
  
  

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading App...'/>
  return (
    <>
     <NavBar/>
    <Container style={{marginTop: '7rem'}}>
      <ActivityDashboard />
    </Container>
  
     
      
    </>
  );
}

export default observer(App);
