import React from "react";
import { CreateCampingForm } from "../../components/provider-components/CreateCampingForm";
import { CreateSiteForm } from "../../components/provider-components/CreateSiteForm";

export function CreateCampingView(){
    return(
        <>
        <dib>
            <CreateCampingForm />
        </dib>
        <div>
        <CreateSiteForm/>
        </div>
        
        </>
    );
}