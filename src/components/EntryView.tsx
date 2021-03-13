import React from "react";
import { Entry } from '../types';

const EntryView = (entry: Entry) => {

    const codeList = (codes: string[]) => {
        return codes.map(c => <li key={c}>{c}</li>);
    };

    return(
        <div>
            <div>{entry.date} {entry.description}</div>
            <ul>{entry.diagnosisCodes && codeList(entry.diagnosisCodes)}</ul>
        </div>
    );
};

export default EntryView;
