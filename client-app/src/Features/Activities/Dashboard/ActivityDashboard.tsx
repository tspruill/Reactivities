import { observer } from 'mobx-react-lite'
import { Grid,} from 'semantic-ui-react'
import { useStore } from '../../../App/stores/store'
import ActivtyDetails from '../Details/ActivtyDetails'
import ActivityForms from '../Forms/ActivityForms'
import ActivityList from './ActivityList'



export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {editMode,selectedActivity} = activityStore;
  return (
    <Grid>
        <Grid.Column width='10'>
        <ActivityList />
        </Grid.Column>
        <Grid.Column width='6'>
            {selectedActivity && !editMode &&
                <ActivtyDetails/>
            }
            {editMode &&
                <ActivityForms/>
            }
        </Grid.Column>
    </Grid>
  )
})
