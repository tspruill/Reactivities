import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Grid,} from 'semantic-ui-react'
import LoadingComponent from '../../../App/Layout/LoadingComponent'
import { useStore } from '../../../App/stores/store'

import ActivityList from './ActivityList'



export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities,activityRegistry,loadingInitial} = activityStore;
    useEffect(() => {
        if(activityRegistry.size <= 1) loadActivities();
        
    },[loadActivities,activityRegistry])
    if(loadingInitial) return <LoadingComponent content='Loading App...'/>

  return (
    <Grid>
        <Grid.Column width='10'>
        <ActivityList />
        </Grid.Column>
        <Grid.Column width='6'>
            <h3> Activity Filter</h3>
        </Grid.Column>
    </Grid>
  )
})
