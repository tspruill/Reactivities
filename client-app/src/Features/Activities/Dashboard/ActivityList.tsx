import { observer } from 'mobx-react-lite';
import { Fragment} from 'react'
import {  Header, Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../App/stores/store';
import ActivityListItem from './ActivityListItem';



export default observer(function ActivityList() {
    const {activityStore} = useStore();
    const {GroupedActivities} = activityStore

  return (
    <>
    {GroupedActivities.map(([group,activities]) => (
        <Fragment key={group}>
            <Header sub color='teal'>
                {group}
            </Header>
         
                {activities.map(activity => (
                    <ActivityListItem key={activity.id} activity={activity} />
                    ))}
                
             
        </Fragment>
))}
    </>
  

  )
})
