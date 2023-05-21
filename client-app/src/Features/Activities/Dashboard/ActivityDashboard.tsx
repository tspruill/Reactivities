import React from 'react'
import { Grid, GridColumn ,List} from 'semantic-ui-react'
import { Activity } from '../../../App/Models/Activity'
import ActivtyDetails from '../Details/ActivtyDetails'
import ActivityForms from '../Forms/ActivityForms'
import ActivityList from './ActivityList'

interface Props {
    activities : Activity[];
    selectedActivity: Activity | undefined;
    selectActivty : (id:string) => void;
    cancelSelectActivity : ()=>void;
    editMode : boolean;
    handleFormOpen : (id:string) => void;
    handleFormClose : ()=>void;
    createOrEdit:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;
    submitting:boolean;

    
}

export default function ActivityDashboard({activities, selectActivty, 
    selectedActivity, cancelSelectActivity,editMode,handleFormOpen,handleFormClose,createOrEdit,deleteActivity,submitting} : Props) {
  return (
    <Grid>
        <Grid.Column width='10'>
        <ActivityList activities={activities}  selectActivty={selectActivty} deleteActivity={deleteActivity}                 submitting={submitting}
/>
        </Grid.Column>
        <Grid.Column width='6'>
            {selectedActivity && !editMode &&
                <ActivtyDetails 
                activity={selectedActivity} 
                cancelSelectActivity={cancelSelectActivity}
                openForm={handleFormOpen}/>
            }
            {editMode &&
                <ActivityForms 
                closeForm={handleFormClose}
                activity={selectedActivity}
                createOrEdit={createOrEdit}
                submitting={submitting}
                
                />
            }
        </Grid.Column>
    </Grid>
  )
}
