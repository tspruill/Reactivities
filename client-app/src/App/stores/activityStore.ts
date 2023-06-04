import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../Models/Activity"
import {v4 as uuid} from 'uuid';

export default class ActivityStore{
    activityRegistry = new Map<string,Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode : boolean = false;
    loading : boolean = false;
    loadingInitial : boolean = false;


    constructor() {
        makeAutoObservable(this)
    }

    get ActivitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b) =>
         Date.parse(a.date) - Date.parse(b.date));
    }
    //Could have built with promises as well
    loadActivities = async () => {
        this.setLoadingInitial(true);

        try{
            const ac = await agent.Activities.list();
            ac.forEach( a => {
                this.setActivty(a);
        
              })
              this.setLoadingInitial(false)

        }catch(error){
            console.log(error);
            this.setLoadingInitial(false)

        }
    }
    loadActivitiy = async (id:string) => {
        
            let activity = this.getActivty(id)
            if(activity){
                this.selectedActivity = activity
                return activity
            } 
            else{
                this.setLoadingInitial(true);
                try{
                    activity = await agent.Activities.details(id)
                    this.setSelectedActivity(activity);
                    this.setActivty(activity);
                    this.setLoadingInitial(false);
                    return activity


                }catch(error){
                    console.log(error);
                    this.setLoadingInitial(false);
                }
            }
            
          

       
    }
    private setActivty = (a:Activity)=>{
        a.date = a.date.split("T")[0];
        this.activityRegistry.set(a.id,a);
    }

    private getActivty = (id:string) =>{
        return this.activityRegistry.get(id);
    }
  
    setSelectedActivity = (state:Activity) => {
        this.selectedActivity = state;
    }
    setEditMode = (state:boolean) => {
        this.editMode = state;
    }
    setLoading = (state:boolean) => {
        this.loading = state;
    }
    setLoadingInitial = (state:boolean) => {
        this.loadingInitial = state;
    }
   
    createActivty = async (activty: Activity) => {
        this.setLoading(true);
        activty.id = uuid();
        try{
            await agent.Activities.create(activty);
            runInAction(() => {
                this.activityRegistry.set(activty.id,activty);
                this.selectedActivity = activty
                this.setEditMode(false)
                this.setLoading(false)

            })
        }catch(error){
            console.log(error)
            this.setLoading(false);
        }

    }

    editActivty = async (activty: Activity) => {
        this.setLoading(true);
        try{
            await agent.Activities.update(activty);
            runInAction(() => {
                this.activityRegistry.set(activty.id,activty);

                this.selectedActivity = activty
                this.setEditMode(false)
                this.setLoading(false)

            })
        }catch(error){
            console.log(error)
            this.setLoading(false);
        }

    }

    deleteActivity = async (id:string) => {
        this.setLoading(true);
        try{
            await agent.Activities.del(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.setLoading(false)
            })
            
        }catch(error){
            console.log(error)
            this.setLoading(false);
        }
    }
}