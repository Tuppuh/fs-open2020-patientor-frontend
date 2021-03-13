import React from "react";
import { Entry } from '../types';
import { useStateValue } from "../state";

const EntryView = (entry: Entry) => {
    const [{ diagnoses }, ] = useStateValue();

    const codeList = (codes: string[]) => {
        return codes.map(c => {
            const diagnoseName = diagnoses[c].name;
            return(<li key={c}>{c} {diagnoseName}</li>);});
    };

    return(
        <div>
            <div>{entry.date} {entry.description}</div>
            <ul>{entry.diagnosisCodes && codeList(entry.diagnosisCodes)}</ul>
        </div>
    );
};

export default EntryView;
