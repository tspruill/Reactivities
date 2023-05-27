import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../Models/Activity"
import {v4 as uuid} from 'uuid';

export default class ActivityStore{
    activityRegistry = new Map<string,Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode : boolean = false;
    loading : boolean = false;
    loadingInitial : boolean = true;


    constructor() {
        makeAutoObservable(this)
    }

    get ActivitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b) =>
         Date.parse(a.date) - Date.parse(b.date));
    }
    //Could have built with promises as well
    loadActivities = async () => {
        try{
            const ac = await agent.Activities.list();
            ac.forEach( a => {
                a.date = a.date.split("T")[0];
                this.activityRegistry.set(a.id,a);
        
              })
              this.setLoadingInitial(false)

        }catch(error){
            console.log(error);
            this.setLoadingInitial(false)

        }
    }
    selectActivty = (id:string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }
    cancelSelectedActvity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?:string) => {
        id ? this.selectActivty(id) : this.cancelSelectedActvity();
        this.setEditMode(true);

    }
    closeForm = () => {
        this.setEditMode(false);
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

                if(this.selectedActivity?.id === id) this.cancelSelectedActvity();
                this.setLoading(false)
            })
            
        }catch(error){
            console.log(error)
            this.setLoading(false);
        }
    }
}