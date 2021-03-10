import React from "react";
import axios from "axios";
import { Header, Icon } from "semantic-ui-react";
import { PatientInfo, RouteParams, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addPatientInfo } from "../state";
import { useParams } from "react-router-dom";

type GenderIcon = "man" | "woman" | "other gender";

const PatientInfoPage: React.FC = () => {
    const [{ patientInfos}, dispatch] = useStateValue();
    const { id } = useParams<RouteParams>();

    const fetchPatientInfo = async (patientId: string) => {
        console.log("fetching...");
        try {
            const { data: patientInfoFromApi } = await axios.get<PatientInfo>(
                `${apiBaseUrl}/patients/${patientId}`
              );
            dispatch(addPatientInfo(patientInfoFromApi));
        } catch (e) {
            console.error(e);
        }
    };

    const getIcon = (gender: Gender): GenderIcon => {
        switch (gender){
            case "male":
                return "man";
            case "female":
                return "woman";
            default:
                return "other gender";
        }
    };

    const patientInfo = patientInfos[id];
    if(!patientInfo){
        void fetchPatientInfo(id);
        return (null);
    }
    const icon = getIcon(patientInfo.gender);
    console.log(getIcon(patientInfo.gender));

    return (
        <div>
            <Header as='h2'>{patientInfo.name}<Icon name={icon}/></Header>
            <div>ssn: {patientInfo.ssn}</div>
            <div>occupation: {patientInfo.occupation}</div>
        </div>
    );

};

export default PatientInfoPage;
