import React from "react";
import { Diagnosis, Entry, HospitalEntry, HealthCheckEntry, OccupationalHealthCareEntry, HealthCheckRating } from '../types';
import { List, Icon } from 'semantic-ui-react';

type DiagnoseData = {[code: string]: Diagnosis};

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const codeList = (codes: string[], diagnoses: DiagnoseData) => {
    return codes.map(c => {
        const diagnose = diagnoses[c];
        if (!diagnose) {
            return null;
        }
        return(
        <li key={c}>
            {c} {diagnose.name}
        </li>);});
};

const HospitalEntryDetails: React.FC<{entry: HospitalEntry, diagnoses: DiagnoseData}> = ( {entry, diagnoses} ) => {

    return(
        <List.Item>
            <List.Icon name='hospital'/>
            <List.Content>
                <List.Header>{entry.date} {" => "} {entry.discharge.date} if {entry.discharge.criteria} </List.Header>
                {entry.description}
                <ul>
                    {entry.diagnosisCodes && codeList(entry.diagnosisCodes, diagnoses)}
                </ul>
            </List.Content>
        </List.Item>
    );
};

const OccupationalHealthcareEntryDetails: React.FC<{entry: OccupationalHealthCareEntry, diagnoses: DiagnoseData}> = ( {entry, diagnoses} ) => {

    return(
        <List.Item>
            <List.Icon name='stethoscope'/>
            <List.Content>
                <List.Header>{entry.date}</List.Header>
                <List.Header>{entry.employerName}</List.Header>
                {entry.description}
                <ul>
                    {entry.diagnosisCodes && codeList(entry.diagnosisCodes, diagnoses)}
                </ul>
            </List.Content>
        </List.Item>
    );
};

const getHealthIcon = (rating: HealthCheckRating) => {
    console.log(rating);
    switch(rating) {
        case HealthCheckRating.Healthy:
            return <Icon name='heart' color='green'/>;
        case HealthCheckRating.LowRisk:
            return <Icon name='heart' color='yellow'/>;
        case HealthCheckRating.HighRisk:
            return <Icon name='heart' color='orange'/>;
        case HealthCheckRating.CriticalRisk:
            return <Icon name='heart' color='red'/>;
        default:
            return null;
    }
};

const HealthCheckEntryDetails: React.FC<{entry: HealthCheckEntry, diagnoses: DiagnoseData}> = ( {entry, diagnoses} ) => {

    return(
        <List.Item>
            <List.Icon name='user md'/>
            <List.Content>
                <List.Header>{entry.date}</List.Header>
                {entry.description}
                <ul>
                    {entry.diagnosisCodes && codeList(entry.diagnosisCodes, diagnoses)}
                </ul>
                {getHealthIcon(entry.healthCheckRating)}
            </List.Content>
        </List.Item>
    );
};

const EntryDetails: React.FC<{entry: Entry, diagnoses: DiagnoseData}> = ( {entry, diagnoses} ) => {
    switch(entry.type) {
        case "HealthCheck":
            return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses}/>;
        case "Hospital":
            return <HospitalEntryDetails entry={entry} diagnoses={diagnoses}/>;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
