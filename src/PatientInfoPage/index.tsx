import React from "react";
import axios from "axios";
import { Header, Icon, List, Button } from "semantic-ui-react";
import { PatientInfo, RouteParams, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addPatientInfo } from "../state";
import { useParams } from "react-router-dom";
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

type GenderIcon = "man" | "woman" | "other gender";

const PatientInfoPage: React.FC = () => {
    const [{ patientInfos, diagnoses}, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const { id } = useParams<RouteParams>();

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        console.log(values);
        try {
          const { data: newEntry } = await axios.post<PatientInfo>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          dispatch(addPatientInfo(newEntry));
          closeModal();
        } catch (e) {
          console.error(e.response?.data || 'Unknown Error');
          setError(e.response?.data?.error || 'Unknown error');
        }
      };

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
            <List divided>
                {patientInfo.entries.map(e => <EntryDetails key={e.id} entry={e} diagnoses={diagnoses}/>)}
            </List>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add new Entry</Button>
        </div>
    );

};
export default PatientInfoPage;
