import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../App/Layout/LoadingComponent';
import { useStore } from '../../../App/stores/store';
import ActivityDetailHeader from './ActivityDetailHeader';
import ActivityDetialChat from './ActivityDetialChat';
import ActivityDetialInfo from './ActivityDetialInfo';
import ActivityDetialSideBard from './ActivityDetialSideBard';



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
    <Grid>
        <Grid.Column width={10}>
            <ActivityDetailHeader activity={activity}/>
            <ActivityDetialInfo activity={activity}/>
            <ActivityDetialChat/>
        </Grid.Column>
        <Grid.Column width={6}>
            <ActivityDetialSideBard/>
        </Grid.Column>
    </Grid>


  )
})
