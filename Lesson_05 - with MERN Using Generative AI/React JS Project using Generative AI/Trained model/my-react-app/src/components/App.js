import React, { useState } from 'react';
import { generate_app_structure_with_model } from '../utils/generateAppStructure';

const App = () => {
    const [appType, setAppType] = useState('');
    const [directoryStructure, setDirectoryStructure] = useState(null);

    const handleInputChange = (event) => {
        setAppType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const structure = generate_app_structure_with_model(appType);
        setDirectoryStructure(structure);
        console.log(structure);
    };

    return (
        <div>
            <h1>Application Structure Generator</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter application type (web, mobile, custom):
                    <input type="text" value={appType} onChange={handleInputChange} />
                </label>
                <button type="submit">Generate Structure</button>
            </form>
            {directoryStructure && (
                <div>
                    <h2>Generated Directory Structure:</h2>
                    <pre>{JSON.stringify(directoryStructure, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;